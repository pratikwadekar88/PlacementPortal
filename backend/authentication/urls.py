from django.urls import path

from . import login_view

urlpatterns = [
    path("register/", login_view.CreateAccount.as_view(), name="create_acc"),
    path('login/', login_view.Login.as_view(), name='login'),
    path('refresh-jwt/', login_view.RefreshJwt.as_view(), name='login'),
    path('hello/', login_view.Hello.as_view(), name='hello'),
    path('hello-student/', login_view.HelloStudent.as_view(), name='student'),
    path('hello-inc/', login_view.HelloINC.as_view(), name='inc'),
    path('status/', login_view.GetLoginStatus.as_view(), name='login_status'),
    path('profile/', login_view.UpdateProfile.as_view(), name='edit_user_profile'),
    path('profile/<int:id>/', login_view.GetUserProfile.as_view(), name='get_user_profile'),
    path('forgot-password/', login_view.ForgotPassword.as_view(), name='forgot_password'),
    path('reset-password/<str:token>/', login_view.ResetPassword.as_view(), name='reset_password'),
    path('search/', login_view.SearchUser.as_view(), name='search-user'),
    path('delete/', login_view.DeleteUser.as_view(), name='delete-user'),

]