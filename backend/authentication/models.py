from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, first_name=None, last_name=None,branch_name=None, degree=None, **extra_fields):
        
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        user = self.model(username=email, email=email, first_name=first_name, last_name=last_name,branch_name=branch_name, degree=degree, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,  email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)
    

# Table name : authentication_userpermission
class UserPermission(models.Model):
    name = models.CharField(max_length=10, unique=True) 

    def __str__(self):
        return self.name
    
# Table Name : authentication_user
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=30)
    branch_name = models.CharField(max_length=255, null=True, blank=True)  # New field
    degree = models.CharField(max_length=255, null=True, blank=True)  # New field
    permissions = models.ManyToManyField(UserPermission, related_name='users') # Many to many table name = authentication_user_permissions
    is_email_verified = models.BooleanField(default=False)
    passing_year = models.CharField(max_length=4)  # Assuming year as a 4-digit string
    designation = models.CharField(max_length=255)
    about = models.TextField()
    github = models.URLField(max_length=500, null=True, blank=True)
    leetcode = models.URLField(max_length=500, null=True, blank=True)
    linkedin = models.URLField(max_length=500, null=True, blank=True)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)

    USERNAME_FIELD = 'username'  # Use 'email' as the main identifier
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Email is required for registration

    objects = UserManager()
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username
