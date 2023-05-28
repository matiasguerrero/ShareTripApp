from django.db import models 
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import datetime
from django.contrib.auth.models import Group, Permission
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

from datetime import date
class UserManager(BaseUserManager):
    def create_user(self, dni, username, email, name, last_name, date_of_birth, password=None, **extra_fields):
        # Valida los campos requeridos
        if not dni:
            raise ValueError('El DNI debe ser proporcionado')
        if not username:
            raise ValueError('El username debe ser proporcionado')
        if not email:
            raise ValueError('El email debe ser proporcionado')
        if not name:
            raise ValueError('El nombre debe ser proporcionado')
        if not last_name:
            raise ValueError('El apellido debe ser proporcionado')
        if not date_of_birth:
            raise ValueError('La fecha de nacimiento debe ser proporcionada')
        
        # Crea una instancia del usuario
        user = self.model(
            dni=dni,
            username=username,
            email=email,
            name=name,
            last_name=last_name,
            date_of_birth=date_of_birth,
            path_license=None,
            saldo=None,
            CBU=None,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, dni, email, name, last_name, date_of_birth, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(
            dni=dni,
            username=username,
            email=email,
            name=name,
            last_name=last_name,
            date_of_birth=date_of_birth,
            password=password,
            **extra_fields
        )



class User(AbstractBaseUser, PermissionsMixin):
    dni = models.IntegerField(primary_key=True)
    username=models.CharField(max_length=50,unique=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=30)
    date_of_birth = models.DateField()
    path_license = models.TextField(null=True)
    password = models.CharField(max_length=128)
    saldo = models.DecimalField(max_digits=15, decimal_places=4, null=True)
    CBU = models.IntegerField(null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['dni', 'email', 'name', 'last_name', 'date_of_birth']
    
    # Otros campos requeridos como contraseña, email, etc.

    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        related_name='api_users'  # Specify a unique related_name for the reverse accessor
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name='api_users'  # Specify a unique related_name for the reverse accessor
    )

    def __str__(self):
        return str(self.dni)


class Transport(models.Model):
    id_transporte = models.IntegerField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    patent = models.CharField(max_length=25)
    model = models.CharField(max_length=30)

class Trip(models.Model):
    id = models.IntegerField(primary_key=True)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    state = models.CharField(max_length=20)
    user_driver = models.ForeignKey(User, on_delete=models.CASCADE)
    fee_passenger = models.DecimalField(max_digits=15, decimal_places=4)
    transport = models.ForeignKey(Transport, on_delete=models.CASCADE)
    total_passengers = models.IntegerField()

class Booking(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    passengers_amount = models.IntegerField()
    state = models.CharField(max_length=30)
    opinion = models.CharField(max_length=120, null=True)
    calification = models.IntegerField(null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'trip'], name='booking_unique_constraint')
        ]


class Refund(models.Model):
    id_refund = models.IntegerField(primary_key=True)
    percentage = models.IntegerField()
    days_before_trip = models.IntegerField()
    amount = models.DecimalField(max_digits=15, decimal_places=4)

class Payment(models.Model):
    id_payment = models.IntegerField(primary_key=True)
    state = models.CharField(max_length=20)
    amount =  amount = models.DecimalField(max_digits=15, decimal_places=4)
    datetime = models.DateTimeField()
    refund = models.ForeignKey(Refund, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)

# Create your models here.

