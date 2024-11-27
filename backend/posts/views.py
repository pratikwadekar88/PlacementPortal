from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from authentication.models import User, UserPermission 
from authentication.permission_classes import IsAdmin, IsStudent


class PostListCreate(APIView):
    # permission_classes = [permissions.IsAuthenticated & (IsStudent | IsAdmin)]

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True )
        return Response(serializer.data)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetail(APIView):
    permission_classes = [permissions.IsAuthenticated & (IsStudent | IsAdmin)]

    def get(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        if post.author != request.user:
            return Response({"detail": "You are not authorized to edit this post."}, status=status.HTTP_403_FORBIDDEN)

        serializer = PostSerializer(post, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        if post.author != request.user:
            return Response({"detail": "You are not authorized to delete this post."}, status=status.HTTP_403_FORBIDDEN)

        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserPosts(APIView):
    permission_classes = [permissions.IsAuthenticated & (IsStudent | IsAdmin)]

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        posts = Post.objects.filter(author=user)
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)


class BookmarkPost(APIView):
    permission_classes = [permissions.IsAuthenticated & (IsStudent | IsAdmin)]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        request.user.bookmarked_posts.add(post)
        return Response({"detail": "Post bookmarked successfully."}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        request.user.bookmarked_posts.remove(post)
        return Response({"detail": "Post removed from bookmarks."}, status=status.HTTP_200_OK)


class RelatedPosts(APIView):
    permission_classes = [permissions.IsAuthenticated & (IsStudent | IsAdmin)]

    def get(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        related_posts = Post.objects.filter(category=post.category).exclude(pk=pk)[:5]
        serializer = PostSerializer(related_posts, many=True, context={'request': request})
        return Response(serializer.data)


class UpvotePost(APIView):
    permission_classes = [permissions.IsAuthenticated & (IsStudent | IsAdmin)]

    def post(self, request, pk=None):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        post.upvotes.add(request.user)
        return Response({"detail": "Post upvoted successfully."}, status=status.HTTP_200_OK)
    
    def put(self, request,pk=None):
        post = Post.objects.filter(id=pk)
        post.upvotes += 1
        post.save()
        # payload = {'upvotes': 1+1}
        #     # Update only the specified fields using partial=True
        serializer = PostSerializer(
                instance=post,
                # data=request.data,
                partial=True,
            )
 
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response('serializer.data')



class DownvotePost(APIView):
    permission_classes = [permissions.IsAuthenticated & (IsStudent | IsAdmin)]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        post.downvotes.add(request.user)
        return Response({"detail": "Post downvoted successfully."}, status=status.HTTP_200_OK)


class CompanyAndRoles(APIView):
    permission_classes = [permissions.IsAuthenticated & (IsStudent | IsAdmin)]

    def get(self, request):
        # Placeholder for company and role data
        data = {"companies": ["Company A", "Company B"], "roles": ["Role X", "Role Y"]}
        return Response(data, status=status.HTTP_200_OK)
