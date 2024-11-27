from rest_framework import serializers
from authentication.models import User,UserPermission
from authentication.authentication import JWTAuthentication
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from authentication.permission_classes import IsAdmin, IsStudent

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [ 'password', 'email', 'first_name', 'last_name','branch_name', 'degree','passing_year', 'designation', 'about', 'github', 'leetcode', 'linkedin', 'cgpa']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        print(attrs)
        if email is None or password is None:
            raise serializers.ValidationError("Username and password must be provided.")
        return attrs

    def create(self, validated_data):
        student_permission = UserPermission.objects.get(name="STUDENT")
        user = User(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            branch_name=validated_data['branch_name'],
            degree=validated_data['degree'],
            passing_year=validated_data['passing_year'],
            designation=validated_data['designation'],
            about=validated_data['about'],
            github=validated_data['github'],
            leetcode=validated_data['leetcode'],
            linkedin=validated_data['linkedin'],
            cgpa=validated_data['cgpa'],

        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        user.permissions.set([student_permission]) 
        return user


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    # We are assuming 'permissions' is a Many-to-Many field, so we'll handle it appropriately
    permission_classes = [IsStudent | IsAdmin]

    class Meta:
        model = User
        fields = [
            'first_name', 
            'last_name', 
            'branch_name', 
            'degree', 
            'permissions', 
            'passing_year', 
            'designation', 
            'about', 
            'github', 
            'leetcode', 
            'linkedin', 
            'cgpa'
        ]

    def update(self, instance, validated_data):
        # Handle the update logic for each field
        permissions = validated_data.pop('permissions', None)
        
        # Update the standard fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.branch_name = validated_data.get('branch_name', instance.branch_name)
        instance.degree = validated_data.get('degree', instance.degree)
        instance.passing_year = validated_data.get('passing_year', instance.passing_year)
        instance.designation = validated_data.get('designation', instance.designation)
        instance.about = validated_data.get('about', instance.about)
        instance.github = validated_data.get('github', instance.github)
        instance.leetcode = validated_data.get('leetcode', instance.leetcode)
        instance.linkedin = validated_data.get('linkedin', instance.linkedin)
        instance.cgpa = validated_data.get('cgpa', instance.cgpa)
        
        # Handle permissions (Many-to-Many field)
        if permissions is not None:
            instance.permissions.set(permissions)
        
        instance.save()
        return instance


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('email')
        password = attrs.get('password')
        if username is None or password is None:
            raise serializers.ValidationError("Invalid credentials")
        return attrs


class JwtRefreshSerializer(serializers.Serializer):
    refreshtoken = serializers.CharField()

    def validate(self, attrs):
        refresh_token = attrs.get('refreshtoken')
        if not refresh_token:
            raise serializers.ValidationError("Refresh token must be provided.")

        try:
            JWTAuthentication.validate_refresh_token(refresh_token)
        except Exception as e:
            raise serializers.ValidationError("Invalid refresh token.")

        user = JWTAuthentication.get_user_from_refresh_token(refresh_token)
        access_token = JWTAuthentication.generateJwts(user)
        return {
            'access-token': access_token,
            'refresh-token': refresh_token  
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'