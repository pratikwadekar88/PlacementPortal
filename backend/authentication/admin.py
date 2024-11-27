from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# class UserManager(UserAdmin):
#     model = User
#     list_display = ('first_name', 'last_name', 'is_staff', 'is_active')
#     ordering = ('email',)

 
# admin.site.register(User, UserManager)
admin.site.register(User)