from django.db import models

from materials.models import Material
from auth_app.models import User
# Create your models here.
class Schedule(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='schedules')
    date_time = models.DateTimeField()
    type = models.CharField(max_length=50)  # e.g., "pickup", "drop-off"
    material = models.ForeignKey(Material, null=True, blank=True, on_delete=models.SET_NULL, related_name='schedules')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.type.capitalize()} on {self.date_time} by {self.user.username}"