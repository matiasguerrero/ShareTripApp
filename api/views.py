from rest_framework import viewsets, permissions, status,views, response, authentication
from django.contrib.auth.models import User
from django.contrib.auth import logout ,authenticate, login 
from rest_framework.authtoken.models import Token

from api.models import  User, Transport, Trip, Booking, Refund, Payment
from api.serializers import  UserSerializer, TransportSerializer, TripSerializer, BookingSerializer, RefundSerializer, PaymentSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [permissions.IsAdminUser,]
    authentication_classes = [authentication.BasicAuthentication,]

class TransportViewSet(viewsets.ModelViewSet):
    queryset = Transport.objects.all()
    serializer_class = TransportSerializer
    permission_classes = [permissions.AllowAny]

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [permissions.AllowAny]

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]

class RefundViewSet(viewsets.ModelViewSet):
    queryset = Refund.objects.all()
    serializer_class = RefundSerializer
    permission_classes = [permissions.AllowAny]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.AllowAny]

from django.contrib.auth import get_user_model

def authenticate_user(email, password):
        User = get_user_model()
        try:
            user = User.objects.get(email=email)
            print("imprime"+str(user))
            if user.check_password(password):
                print("va a retornar")
                return user
        except User.DoesNotExist:
            return None
        
class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        # Recuperamos las credenciales y autenticamos al usuario
        username = request.data.get('username', None)
        password = request.data.get('password', None)

        if username is None or password is None:
            return response.Response({'message': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        print(user)
        if not user:
            return response.Response({'message': 'Usuario o contraseña incorrectos'}, status=status.HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=user)

        # Si la autenticación es correcta, puedes realizar cualquier otra lógica que necesites

        return response.Response({'message': 'Inicio de sesión exitoso', 'token': token.key}, status=status.HTTP_200_OK)
      

class LogoutView(views.APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request):
        # Eliminamos el token de autenticación del usuario
        request.user.auth_token.delete()

        # Devolvemos la respuesta al cliente
        return response.Response({'message': 'Sesión cerrada y token eliminado'}, status=status.HTTP_200_OK)
