from rest_framework import viewsets, permissions, status,views, response, authentication
from django.contrib.auth.models import User
from django.contrib.auth import logout ,authenticate, login 
from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes
from django.db.models import Q
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
    #Solo podra usarse estando autenticado
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Obtener los datos de la solicitud
        data = request.data

        # Realizar la verificación de existencia
        start_datetime = data.get('start_datetime')
        end_datetime = data.get('end_datetime')
        user_driver = request.user  # Obtener el usuario actualmente autenticado

        if start_datetime and end_datetime:
            if Trip.objects.filter(Q(start_datetime=start_datetime) | Q(end_datetime=end_datetime), user_driver=user_driver).exists():
                return response.Response({'error': 'El viaje ya existe.'}, status=status.HTTP_400_BAD_REQUEST)

        # Llamar a la creación super().create()
        return super().create(request, *args, **kwargs)

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        # Obtener los datos de la solicitud
        data = request.data

        # Realizar la verificación de existencia
        if Booking.objects.filter(user=data['user'],trip=data['trip']).exists():
            return response.Response({'error': 'Ya tienes una reserva para este viaje.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                #Control de asientos disponibles
                trip = Trip.objects.get(id=data['trip'])
                total_passengers = trip.total_passengers
                if ((total_passengers - int(data["passengers_amount"]))<0):
                    return response.Response({'error': 'El viaje no dispone de suficientes asientos disponibles'}, status=status.HTTP_400_BAD_REQUEST)
            except Trip.DoesNotExist:
                # Manejar el caso cuando no se encuentra ningún objeto Trip con el id especificado
                return response.Response({'error': 'No se puede realizar la reserva porque el viaje no existe.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Llamar a la creación super().create()
        return super().create(request, *args, **kwargs)

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
        print("entra a python")
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        print(email)
        print(password)
        if email is None or password is None:
            print("pasa aca4")
            return response.Response({'message': 'Por favor provea email y contraseña'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request=request, email=email, password=password)
        if not user:
            print("usuario no autenticado")
            return response.Response({'message': 'Email o contraseña incorrectos'}, status=status.HTTP_404_NOT_FOUND)
        print("pasa aca3")
        token, _ = Token.objects.get_or_create(user=user)

        login(request,user)
        print(user)
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
