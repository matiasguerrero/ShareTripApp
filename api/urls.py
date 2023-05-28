from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from api.views import UserViewSet, TransportViewSet, TripViewSet, BookingViewSet, RefundViewSet, PaymentViewSet, LoginView, LogoutView

# Definición de los viewsets y el enrutador
router = routers.DefaultRouter()

router.register('users', UserViewSet)
router.register('transports', TransportViewSet)
router.register('trips', TripViewSet)
router.register('bookings', BookingViewSet)
router.register('refunds', RefundViewSet)
router.register('payments', PaymentViewSet)

urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
] + router.urls