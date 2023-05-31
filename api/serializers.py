from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from api.models import  User, Transport, Trip, Booking, Refund, Payment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['dni', 'email', 'password', 'name', 'last_name', 'date_of_birth', 'path_license', 'saldo']
         #esconder password
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}
        }
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class TransportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = ['id_transporte', 'user', 'patent', 'model']


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['id', 'start_datetime', 'end_datetime', 'state', 'user_driver', 'fee_passenger', 'transport', 'total_passengers']


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['trip', 'user', 'passengers_amount', 'state', 'opinion', 'calification']


class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = ['id_refund', 'percentage', 'days_before_trip', 'amount']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id_payment', 'state', 'amount', 'datetime', 'refund', 'booking']

