from rest_framework import views, status, permissions
from rest_framework.response import Response
from django.http import HttpResponse
from .models import JobPost, JobApplication
from .serializers import JobPostSerializer, JobApplicationSerializer
import xlwt  
from authentication.permission_classes import IsAdmin, IsStudent
from django.shortcuts import get_object_or_404

class JobPostView(views.APIView):
    permission_classes = [IsAdmin ]  

    def post(self, request, *args, **kwargs):
        serializer = JobPostSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def put(self, request, *args, **kwargs):
        # Fetch the JobPost object to be updated
        try:
            jobpost = JobPost.objects.get(pk=request.data["id"])  # Find the object by id
        except JobPost.DoesNotExist:
            return Response({"error": "Job post not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Remove the 'id' from request.data before passing to serializer
        data = request.data.copy()  # Make a copy of the request data
        data.pop("id", None)  # Remove 'id' key if it exists

        # Pass the existing job post instance to the serializer for update
        serializer = JobPostSerializer(jobpost, data=data, partial=True)  # Use partial=True for partial updates

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)  # Use 200 OK for successful update
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id, *args, **kwargs):
        print("Received DELETE request for post_id:", post_id)  # Debugging log
        job_post = get_object_or_404(JobPost, pk=post_id)
        job_post.delete()
        return Response({"message": "Job post deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    
    
class JobListView(views.APIView):
    permission_classes = [IsStudent | IsAdmin]  

    def get(self, request, *args, **kwargs):
        # Get all job posts
        job_posts = JobPost.objects.all()
        serializer = JobPostSerializer(job_posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

from django.http import HttpResponse
import xlwt

class JobApplicationsView(views.APIView):
    permission_classes = [IsAdmin]

    def get(self, request, post_id, *args, **kwargs):
        try:
            job_post = JobPost.objects.get(pk=post_id)
        except JobPost.DoesNotExist:
            return Response({"detail": "Job post not found."}, status=status.HTTP_404_NOT_FOUND)

        applications = JobApplication.objects.filter(job_post=job_post)
        
        # Construct data with first_name and last_name concatenated
        data = [
            {
                "student_name": f"{application.student.first_name} {application.student.last_name}".strip(),
                "email": application.student.email,
                "application_date": application.application_date.strftime("%Y-%m-%d %H:%M:%S"),
            }
            for application in applications
        ]
        
        return Response(data, status=status.HTTP_200_OK)

    def get_excel(self, request, post_id, *args, **kwargs):
        try:
            job_post = JobPost.objects.get(pk=post_id)
        except JobPost.DoesNotExist:
            return Response({"detail": "Job post not found."}, status=status.HTTP_404_NOT_FOUND)

        applications = JobApplication.objects.filter(job_post=job_post)

        # Create a new Excel workbook
        wb = xlwt.Workbook()
        sheet = wb.add_sheet("Applications")

        # Define the headers
        sheet.write(0, 0, "Student Name")
        sheet.write(0, 1, "Email")
        sheet.write(0, 2, "Application Date")

        # Populate the rows with data
        for idx, application in enumerate(applications, start=1):
            student_name = f"{application.student.first_name} {application.student.last_name}".strip()
            sheet.write(idx, 0, student_name)
            sheet.write(idx, 1, application.student.email)
            sheet.write(idx, 2, application.application_date.strftime("%Y-%m-%d %H:%M:%S"))

        # Prepare the HTTP response with the Excel file
        response = HttpResponse(content_type="application/vnd.ms-excel")
        response['Content-Disposition'] = f'attachment; filename={job_post.job_title}_applications.xls'
        wb.save(response)
        return response


class JobApplyView(views.APIView):
    permission_classes = [IsStudent]  

    def post(self, request, post_id, *args, **kwargs):
        # Check if the job post exists
        try:
            job_post = JobPost.objects.get(pk=post_id)
        except JobPost.DoesNotExist:
            return Response({"detail": "Job post not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the student has already applied
        if JobApplication.objects.filter(job_post=job_post, student=request.user).exists():
            return Response({"detail": "You have already applied for this job."}, status=status.HTTP_409_CONFLICT)

        # Validate and save the application
        serializer = JobApplicationSerializer(data=request.data)
        if serializer.is_valid():            
            serializer.save(job_post=job_post, student=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
