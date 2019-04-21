from django.db import models


class Event(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    start = models.DateTimeField()
    end = models.DateTimeField()
