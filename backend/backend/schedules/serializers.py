from rest_framework import serializers
from .models import Schedule
from materials.models import Material
from auth_app.models import User

class ScheduleSerializer(serializers.ModelSerializer):
    material = serializers.PrimaryKeyRelatedField(queryset=Material.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Schedule
        fields = ['id', 'user', 'date_time', 'type', 'material', 'notes']