from django.urls import path
from .views import CommentView, ReplyView

urlpatterns = [
    path('<int:postid>/', CommentView.as_view(), name='comment-view'),
    path('<int:postid>/<int:commentid>/', CommentView.as_view(), name='comment-delete'),
    path('replies/<int:postid>/<int:commentid>/', ReplyView.as_view(), name='reply-view'),
    path('replies/<int:postid>/<int:commentid>/<int:replyid>/', ReplyView.as_view(), name='reply-delete'),
]
