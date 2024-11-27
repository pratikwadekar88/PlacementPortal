from django.db import models
from django.conf import settings  

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=100, blank=True, null=True)  
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts',null=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)

    upvotes = models.IntegerField( blank=True,null=True)
    downvotes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='downvoted_posts', blank=True)

    
    bookmarked_by = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='bookmarked_posts', blank=True)

    def __str__(self):
        return self.title
