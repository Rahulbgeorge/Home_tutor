
from django.conf.urls import url
from . import views
from . import login_views

urlpatterns = [

    url(r'^$',views.signUp),
    url(r'^logout/',login_views.logout),
    url(r'^postStudentQuestion/',views.postStudentQuestion),
    url(r'^recieveQuestion/(?P<subject>[\d]+)/',views.recieveQuestion),
    url(r'^answerQuestion/',views.answerQuestion),
    url(r'^recieveMyAnswer/',views.recieveMyAnswer),
    url(r'^recieveAnswer/(?P<subject>[\d]+)/',views.recieveAnswer),
    url(r'^signUp/',login_views.registration),
    url(r'^signIn/',login_views.login),
    url(r'^payment/',views.payment)
]
