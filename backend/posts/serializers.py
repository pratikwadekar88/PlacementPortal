from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    upvotes_count = serializers.IntegerField(source='upvotes.count', read_only=True)
    downvotes_count = serializers.IntegerField(source='downvotes.count', read_only=True)
    # is_bookmarked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'content', 'category', 'author', 'created_at', 
            'updated_at', 'upvotes_count', 'downvotes_count'
        ]

    # def get_is_bookmarked(self, obj):
    #     user = self.context.get('request').user
    #     if user.is_authenticated:
    #         return obj.bookmarked_by.filter(id=user.id).exists()
    #     return False
