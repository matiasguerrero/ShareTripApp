from django.contrib.auth.backends import ModelBackend
from api.models import User

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=email)
            print("va a autenticar" , user)
        except User.DoesNotExist:
            return None
        print("va a chequear password")
        if user.check_password(password):
            print("va a ejecutar")
            print(user)
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
