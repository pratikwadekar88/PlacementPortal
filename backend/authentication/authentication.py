
import jwt
from django.conf import settings
from rest_framework import authentication, exceptions
from django.contrib.auth.models import User
from authentication.models import User
from datetime import datetime, timedelta
from django.utils import timezone



class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        print("Hello from line 13")
        if not token:
            return None
        try:
            print("Hello from line 13")
            token = token.split()[1] 
            payload = jwt.decode(token, settings.SIMPLE_JWT["JWT_SECRET_KEY"], algorithms=['HS256'])
            user = User.objects.prefetch_related('permissions').get(id=payload['user_id'])

            permissions = user.permissions.all()

            for permission in permissions:
                print(permission.name)
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')

        return (user, token)
    def validate_refresh_token(refresh_token,user:User):
        try:
            payload = jwt.decode(refresh_token, settings.SIMPLE_JWT["JWT_SECRET_KEY_REFRESH"], algorithms=['HS256'])
            print('jwt payload: ',payload)
            print('user: ',user.pk)
            if payload is None or payload['user_id'] is None or payload['user_id'] != user.pk:
                raise exceptions.AuthenticationFailed('Token did\'nt match')
            return user,refresh_token
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')
        

    def generateJwts(user:User):

        user_permissions = user.permissions.values_list('name', flat=True)

        payload = {
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'permissions': list(user_permissions),
            'iat': datetime.now(tz=timezone.utc),  
            'exp': datetime.now(tz=timezone.utc) + settings.SIMPLE_JWT["TOKEN_LIFETIME"] # Expires in 1 hour
        }
        payload_refresh = {
            'user_id': user.id,
            'iat': datetime.now(tz=timezone.utc), 
            'exp': datetime.now(tz=timezone.utc) + settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"] # Expires in 1 hour
        }
        access_token = jwt.encode(payload, settings.SIMPLE_JWT["JWT_SECRET_KEY"], algorithm='HS256')
        refresh_token = jwt.encode(payload_refresh, settings.SIMPLE_JWT["JWT_SECRET_KEY_REFRESH"], algorithm='HS256')
        return access_token,refresh_token
    
class ExpiredJWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        if not token:
            return None
        try:
            token = token.split()[1]  # Get the token part
            payload = jwt.decode(token, settings.SIMPLE_JWT["JWT_SECRET_KEY"], algorithms=['HS256'],options={"verify_exp": False})
            user:User = User.objects.get(id=payload['user_id'])
            return user,token
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')