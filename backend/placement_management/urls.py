from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path("user/", include("authentication.urls")),
    path('api-auth/', include('rest_framework.urls')),
    path('company-posts/', include('company_post.urls')),
    path('posts/', include('posts.urls')),
    path('comments/', include('comments.urls')),
]
