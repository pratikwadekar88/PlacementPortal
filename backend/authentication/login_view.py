from django.contrib.auth import get_user_model
from rest_framework import views, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from authentication.serializers import UserRegistrationSerializer,UserLoginSerializer,JwtRefreshSerializer,UserSerializer,UserProfileUpdateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from authentication.authentication import JWTAuthentication,ExpiredJWTAuthentication
from authentication import responce_constant
from django.contrib.auth import authenticate
from authentication.models import User
from authentication import permission_classes
from authentication.permission_classes import IsAdmin, IsStudent

User = get_user_model()
    
class CreateAccount(views.APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        print(request.data);
        serializer:UserRegistrationSerializer = UserRegistrationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(responce_constant.BAD_REQUEST, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save();
        return Response({
            'message': responce_constant.ACCOUNT_CREATED
        }, status=status.HTTP_201_CREATED)
        
        
class Login(views.APIView):
    permission_classes=[permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        print(request.data);
        serializer = UserLoginSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            print(f"{serializer.validated_data['email']} This is printed")
            user = authenticate(username=serializer.validated_data['email'], password=serializer.validated_data['password'])
            if user is None:
                return Response(responce_constant.INVALID_CREDENTIALS, status=status.HTTP_401_UNAUTHORIZED)
            access_token,refresh_token=JWTAuthentication.generateJwts(user);

            user_data = UserSerializer(user).data
            return Response({
                'access-token': access_token,
                'refresh-token': refresh_token,
                'user' : user_data
                
            }, status=status.HTTP_200_OK)
        return Response(responce_constant.BAD_REQUEST, status=status.HTTP_400_BAD_REQUEST)

class UpdateProfile(views.APIView):
    permission_classes = [IsStudent | IsAdmin]

    def get(self, request, *args, **kwargs):
        # Return the current profile data for the authenticated user
        user = request.user
        serializer = UserProfileUpdateSerializer(user)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        user = request.user
        serializer = UserProfileUpdateSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile updated successfully.'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class RefreshJwt(views.APIView):
    authentication_classes = [ExpiredJWTAuthentication]
    def post(self, request, *args, **kwargs):
        serializer = JwtRefreshSerializer(data=request.data)
        if serializer.is_valid():
            
            refresh_token=serializer.validated_data['refreshtoken']
            
            JWTAuthentication.validate_refresh_token(refresh_token,request.user)
            access_token,refresh_token=JWTAuthentication.generateJwts(request.user);
            return Response({
                'access-token': access_token,
                'refresh-token': refresh_token
            }, status=status.HTTP_200_OK)
        return Response(responce_constant.INVALID_CREDENTIALS, status=status.HTTP_400_BAD_REQUEST)

class Hello(views.APIView):
    permission_classes = [permission_classes.IsAdmin]
    def post(self, request, *args, **kwargs):
        print(f"{request.user.first_name} {request.user.email} {request.user.permissions}")
        return Response({'message': 'Hello'})
    
class HelloStudent(views.APIView):
    permission_classes = [permission_classes.IsStudent]
    def post(self, request, *args, **kwargs):
        print(f"{request.user.first_name} {request.user.email} {request.user.permissions}")
        return Response({'message': 'Hello Student'})
    
class HelloINC(views.APIView):
    permission_classes = [permission_classes.IsINC,]
    def post(self, request, *args, **kwargs):
        print(f"{request.user.first_name} {request.user.email} {request.user.permissions}")
        return Response({'message': 'Hello INC'})
    

class GetLoginStatus(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({"status": "Logged in", "email": request.user.email}, status=status.HTTP_200_OK)


class EditUserProfile(views.APIView):
    permission_classes = [IsAdmin |IsStudent ]

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = UserRegistrationSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUserProfile(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
            serializer = UserRegistrationSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class ForgotPassword(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        # Logic to send reset password email
        email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
            # Add logic to generate and email a token
            return Response({"message": "Password reset link sent"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Email not found"}, status=status.HTTP_404_NOT_FOUND)

class ResetPassword(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, token, *args, **kwargs):
        # Validate token and reset password
        new_password = request.data.get("password")
        # Add token validation logic here
        return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)

class SearchUser(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get("query", "")
        users = User.objects.filter(email__icontains=query)
        serializer = UserRegistrationSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteUser(views.APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
