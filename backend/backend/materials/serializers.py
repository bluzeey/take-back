from rest_framework import serializers
from .models import Material

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'name', 'description', 'tracking_id', 'owner', 'created_at']
        read_only_fields = ['owner', 'created_at']  # Owner and created_at are read-only