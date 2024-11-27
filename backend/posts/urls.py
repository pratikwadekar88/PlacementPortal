from django.urls import path
from .views import (
    PostListCreate, PostDetail, UserPosts, BookmarkPost,
    RelatedPosts, UpvotePost, DownvotePost, CompanyAndRoles
)

urlpatterns = [
    path('', PostListCreate.as_view(), name='post-list-create'),
    path('<int:pk>/', PostDetail.as_view(), name='post-detail'),
    path('user/all/<int:user_id>/', UserPosts.as_view(), name='user-posts'),
    path('user/bookmarked/<int:pk>/', BookmarkPost.as_view(), name='bookmark-post'),
    path('posts/related/<int:pk>/', RelatedPosts.as_view(), name='related-posts'),
    path('upvote/<int:pk>/', UpvotePost.as_view(), name='upvote-post'),
    path('downvote/<int:pk>/', DownvotePost.as_view(), name='downvote-post'),
    path('data/company-roles/', CompanyAndRoles.as_view(), name='company-roles'),
    path('edit/<int:pk>/', PostDetail.as_view(), name='edit_post'),
]