from django.shortcuts import render
from . import login_views
from . import models
from .models import QuestionBase
from django.http import HttpResponse
import json

# Create your views here.
#category is the subject

def signUp(request):

    if(request.user.is_authenticated):
        print('designation')
        print(request.user.profile.designation)
        if(request.user.profile.designation=='0'):
            return render(request,"student.html")
        else:
            return render(request,"teacher.html")
    if(request.method=="POST"):
        if("Sign Up" in request.POST['submit']):
            login_views.registration(request)
        else:
            login_views.login(request)

    return render(request,"signup.html")


#QUESTIONS POSTED BY STUDENT IN REGISTERED IN THE DATABASE
def postStudentQuestion(request):
    if(request.method=="POST"):
        print("entered")
        print(request.POST['category'])
        print(request.POST['question'])
        try:
            QuestionBase.postQuestion(request.user.id,int(request.POST['category']),request.POST['question'])
        except Exception as ex:
            print(ex)
        return HttpResponse("success")
    return HttpResponse("failure")

#THE QUESTION ARE REQUESTED BASED ON SUBJECT
def recieveQuestion(request,subject):
    print(subject," Query recieved for questions")
    data=[]
    question={}
    subjectDetails=models.QuestionBase.objects.filter(subject=subject,flag=False )
    for i in subjectDetails:
        data.append({'id':i.id,'question':i.question})
    data=json.dumps(data)
    return HttpResponse(data)


def answerQuestion(request):
    questionId=request.POST['submit']
    questionObject=models.QuestionBase.objects.get(id=questionId)
    questionObject.tid=request.user.id
    questionObject.flag=True
    questionObject.answer=request.POST['answer']
    questionObject.save()
    return HttpResponse("successful");

#TO RECIEVE ANSWERS OF SPECIFIC USERS QUESTIONS
def recieveMyAnswer(request):
    answerObjects=models.QuestionBase.objects.filter(flag=True,sid=request.user.id)
    data=[]
    for answer in answerObjects:
        data.append({'question':answer.question,'answer':answer.answer})

    data=json.dumps(data)
    return HttpResponse(data)

#TO SHOW GENERAL ANSWERS
def recieveAnswer(request,subject):
    answerObjects=models.QuestionBase.objects.filter(flag=True,subject=subject)
    data=[]
    for answer in answerObjects:
        data.append({"question":answer.question,"answer":answer.answer})

    return HttpResponse(json.dumps(data))
    
    

def payment(request):
    return render(request,"payment.html")
    



        

        




