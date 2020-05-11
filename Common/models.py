from django.db import models

# Create your models here.

class Pincode(models.Model):
    pin=models.IntegerField()
    area=models.CharField(max_length=30)