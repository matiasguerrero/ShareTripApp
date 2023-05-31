from rest_framework import viewsets, permissions, status,views, response, authentication
from django.contrib.auth.models import User
from django.contrib.auth import logout ,authenticate, login 
from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes

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
    #Solo podra usarse estando autenticado
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Obtener los datos de la solicitud
        data = request.data

        # Realizar la verificación de existencia
        if Transport.objects.filter(patent=data['patent']).exists():
            return response.Response({'error': 'El transporte ya existe.'}, status=status.HTTP_400_BAD_REQUEST)

        # Llamar a la creación super().create()
        return super().create(request, *args, **kwargs)

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


@authentication_classes([authentication.TokenAuthentication])
@permission_classes([permissions.AllowAny])     
class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        # Recuperamos las credenciales y autenticamos al usuario
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        if email is None or password is None:
            return response.Response({'message': 'Por favor provea email y contraseña'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request=request, email=email, password=password)
        if not user:
            return response.Response({'message': 'Email o contraseña incorrectos'}, status=status.HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=user)

        login(request,user)
        print(request.user)
        user_data = {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'last_name': user.last_name,
        }

        return response.Response({'message': 'Inicio de sesión exitoso', 'token': token.key,'user': user_data }, status=status.HTTP_200_OK)
      
@authentication_classes([authentication.TokenAuthentication])
#Solo permitira usarse si esta logueado
class LogoutView(views.APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request):
        # Eliminamos el token de autenticación del usuario
        request.user.auth_token.delete()
        logout(request)
        # Devolvemos la respuesta al cliente
        return response.Response({'message': 'Sesión cerrada y token eliminado'}, status=status.HTTP_200_OK)
