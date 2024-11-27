from rest_framework import serializers
from .models import JobPost, JobApplication

class JobPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPost
        fields = '__all__' 

class JobApplicationSerializer(serializers.ModelSerializer):
    job_post = JobPostSerializer(read_only=True)  
    student = serializers.CharField(source='student.get_full_name', read_only=True)  

    class Meta:
        model = JobApplication
        fields = ['student', 'job_post', 'application_date', 'status'] 

