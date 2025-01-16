from django.db import models
from auth_app.models import User
# Create your models here.
class Material(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    tracking_id = models.CharField(max_length=50, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='materials')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name