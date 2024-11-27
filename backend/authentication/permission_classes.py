from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        print("Hello Amana")
        p = request.user.permissions.all()
        for per in p:
            if per.name== "ADMIN":
                return True
        return False


class IsStudent(BasePermission):
    def has_permission(self, request, view):
        p = request.user.permissions.all()
        for per in p:
            if per.name== "STUDENT":
                return True
        return False
    


class IsINC(BasePermission):
    def has_permission(self, request, view):
        p = request.user.permissions.all()
        for per in p:
            if per.name== "INC":
                return True
        return False