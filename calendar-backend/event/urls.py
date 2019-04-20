from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import events, event_detail


urlpatterns = [
    path('', events),
    path('/<int:pk>', event_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
