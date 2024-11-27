from django.urls import path
from . import views

urlpatterns = [
    path('', views.JobPostView.as_view(), name='create_job_post'),  
    path('list/', views.JobListView.as_view(), name='list_job_posts'),  
    path('jobapplications/<int:post_id>/', views.JobApplicationsView.as_view(), name='list_job_applications'),  
    path('jobapplications/excel/<int:post_id>/', views.JobApplicationsView.as_view(), name='export_job_applications_excel'),  
    path('apply/<int:post_id>/', views.JobApplyView.as_view(), name='apply_for_job'),
    path('delete/<int:post_id>/', views.JobPostView.as_view(), name='delete_job_post'),
]
