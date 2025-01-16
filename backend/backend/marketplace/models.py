from django.db import models

from materials.models import Material
from auth_app.models import User
# Create your models here.
class Listing(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE, related_name='listings')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listings')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.material.name} - ${self.price}"