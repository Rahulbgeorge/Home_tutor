from django.shortcuts import render,HttpResponseRedirect,HttpResponse
from django.contrib.auth.models import User
from django.contrib import auth
from . import models
from . import views
# Create your views here.

def registration(request):
    user_info={}
    if request.method=="POST":
        user_info["username"]=request.POST['user']
        user_info["password"]=request.POST['password']
        user_info["email"]=request.POST["email"]
        if(request.POST['profession']=="Teacher"):
            user_info['profession']='1'
            user_info['subject']=int(request.POST['subject'])

        else:
            user_info['profession']='0'
            user_info['subject']=-1


            

        
        user=User.objects.create_user(username=user_info['username']
        ,email=user_info['email'],password=user_info['password'])
        print(user_info['profession'])
        user.save()
        profile=models.userProfile(user=user,designation=user_info['profession'],subject=user_info['subject'])
        profile.save()
        return HttpResponseRedirect("signIn/")


        
       

    return render(request,"signup.html")
        
    

def logout(request):
    auth.logout(request)
    return HttpResponseRedirect("/")
        
def login(request):
    if request.method=="POST":
        print('login processing')
        username,password=request.POST['user'],request.POST['password']
        user=auth.authenticate(username=username,password=password)
        if(user is not None):
            print("valid login")
            auth.login(request,user)
            return HttpResponseRedirect("/")
        else:
            return render(request,"signUp.html",{"response":"Invalid credentials"})

            
        

    
    return render(request,"signUp.html")

def validate_password(password1, password2):
    return(password1==password2)


        
