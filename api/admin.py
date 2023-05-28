from django.contrib import admin
# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import  User, Transport, Trip, Booking, Refund, Payment

# Registro de modelos personalizados en el sitio de administración


admin.site.register(User)  # Utilizamos UserAdmin para aprovechar las funcionalidades del modelo de usuario
admin.site.register(Transport)
admin.site.register(Trip)
admin.site.register(Booking)
admin.site.register(Refund)
admin.site.register(Payment)