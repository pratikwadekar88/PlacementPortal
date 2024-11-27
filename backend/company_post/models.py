from django.conf import settings
from django.db import models

class JobPost(models.Model):
    job_title = models.CharField(max_length=255)
    company_overview = models.TextField()
    job_description = models.TextField()
    skills_required = models.TextField()
    eligibility_criteria = models.TextField() 
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    job_location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=100)  
    work_mode = models.CharField(max_length=50)  
    selection_process = models.TextField()
    application_deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.job_title

class JobApplication(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 
    job_post = models.ForeignKey(JobPost, on_delete=models.CASCADE)
    application_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Pending')

    def __str__(self):
        return f"{self.student.get_full_name()} - {self.job_post.job_title} - {self.status}"
