from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.
#Designation is a single character if 1 then teacher if 0 then student
# 1- teacher
# 0- Student

# CATEGORY VALUES
# 0-ENGLISH
# 1-MATHS
# 2-BIOLOGY
# 3-CHEMISTRY
# 4-PHYSICS
# 5-COMPUTER SCIENCE
# 6-SOCIAL STUDIES

#subject -1 indicates student 

class userProfile(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    designation=models.CharField(max_length=1)
    subject=models.IntegerField(default=-1)
    User.profile = property(lambda u: userProfile.objects.get_or_create(user=u)[0])


    def isTeacher(request):
        user=UserProfile.objects.get(user=request.user).values("designation")[0]
        if user.designation=='1':
            return True
        else:
            return False

    def isStudent(request):
        user=UserProfile.objects.get(user=request.user).values("designation")[0]
        if user.designation=='1':
            return False
        else:
            return True
    @staticmethod
    def listTeachers():
        return UserProfile.objects.filter(designation='1')
    @staticmethod
    def listStudents():
        return UserProfile.objects.filter(designation='0')


    



class QuestionBase(models.Model):
    sid=models.IntegerField(null=True)
    tid=models.IntegerField(null=True)
    question=models.CharField(max_length=2000)
    answer=models.TextField(blank=True)
    comments=models.TextField(blank=True)
    date = models.DateTimeField(default=timezone.now, blank=True)
    subject=models.IntegerField()
    flag=models.BooleanField(default=False)

    def getUserQuestions(request):
        user=userProfile.objects.get(user=request.user)[0]
        if user.designation=='1':
            return QuestionBase.objects.filter(subject=user.subject).values('id','question')
        else:
            return QuestionBase.objects.filter(sid=request.user.id)
    

    def postQuestion(sid,subject,question):
        post=QuestionBase(sid=sid,question=question,subject=subject)
        post.save()