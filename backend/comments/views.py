from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Comment, Reply
from posts.models import Post
from .serializers import CommentSerializer, ReplySerializer
from authentication.permission_classes import IsAdmin, IsStudent

class CommentView(APIView):
    permission_classes = [IsStudent | IsAdmin]

    def get(self, request, postid):
        try:
            post = Post.objects.get(id=postid)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        comments = Comment.objects.filter(post=post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, postid):
        try:
            post = Post.objects.get(id=postid)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        data['post'] = post.id
        data['author'] = request.user.id

        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, postid, commentid):
        try:
            comment = Comment.objects.get(id=commentid, post__id=postid)
        except Comment.DoesNotExist:
            return Response({"detail": "Comment not found."}, status=status.HTTP_404_NOT_FOUND)

        if comment.author != request.user:
            return Response({"detail": "You are not authorized to delete this comment."}, status=status.HTTP_403_FORBIDDEN)

        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReplyView(APIView):
    permission_classes = [IsStudent | IsAdmin]

    def get(self, request, postid, commentid):
        try:
            comment = Comment.objects.get(id=commentid, post__id=postid)
        except Comment.DoesNotExist:
            return Response({"detail": "Comment not found."}, status=status.HTTP_404_NOT_FOUND)

        replies = Reply.objects.filter(comment=comment)
        serializer = ReplySerializer(replies, many=True)
        return Response(serializer.data)

    def post(self, request, postid, commentid):
        try:
            comment = Comment.objects.get(id=commentid, post__id=postid)
        except Comment.DoesNotExist:
            return Response({"detail": "Comment not found."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        data['comment'] = comment.id
        data['author'] = request.user.id

        serializer = ReplySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, postid, commentid, replyid):
        try:
            reply = Reply.objects.get(id=replyid, comment__id=commentid, comment__post__id=postid)
        except Reply.DoesNotExist:
            return Response({"detail": "Reply not found."}, status=status.HTTP_404_NOT_FOUND)

        if reply.author != request.user:
            return Response({"detail": "You are not authorized to delete this reply."}, status=status.HTTP_403_FORBIDDEN)

        reply.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
