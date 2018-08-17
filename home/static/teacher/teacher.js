var currentOption="maths";
var userType=0;
var userSubject=-1;


$(document).ready(function(){

    $("#teacherOptionRight").click(function(){
        console.log("registered");
        recieveAnswer(userSubject);
        $("#teacherOptionLeft").removeClass("teacherOptionLeftSelected");
        $(this).addClass("teacherOptionRightSelected");
        

    });

    $("#teacherOptionLeft").click(function(){
        recieveQuestion(userSubject);
        $("#teacherOptionRight").removeClass("teacherOptionRightSelected");
        $(this).addClass("teacherOptionLeftSelected");

    });

$(".option").click(function(){
    /* var subjectName=this.id;
     $(this).addClass("active");
    console.log(currentOption);
    $("#"+currentOption).removeClass("active"); */ 
    
   
    
});



$("#userIcon").click(function(){
    if($(".userDropDown").css("display")=="none")
        $(".userDropDown").css({"display":"block"});
    else
        $(".userDropDown").css({"display":"none"});
    

});



//POST THE QUESTION TO THE WEBSITE USING AJAX 
$("#ask").click(function(){
    console.log("sending");
    var category=$("#subject").val();
    var question=$("#question").val();

    $.ajaxSetup({
        headers: { "X-CSRFToken": getCookie("csrftoken") }
            });


           $.ajax(

               { csrfmiddlewaretoken: ['{{ csrf_token }}'],
               type:"POST",
               url:"/postStudentQuestion/",
               data:{category:category,question:question},
               datatype:"html"


               }
           ).done(function(response){
               //do nothing
               alert(response);
           });


          

});





});

function getCookie(val)
{
    var csrftoken=document.cookie;
    csrftoken=csrftoken.slice(10);
    return csrftoken

}


var categories={0:'english',1:'maths',2:'biology',3:'chemistry',4:'physics'
,5:'compterScience',6:'socialStudies'};
var questions=[]





populateBox1='<form method="post" action="/answerQuestion/"> <input type="hidden" name="csrfmiddlewaretoken" value="';
populateBox2='"><div class="populateBox" >';
populateBox3='<hr><textarea name="answer" rows=4 cols=70 placeholder="Enter Your Answer Here"></textarea><br><button type="submit" class="btn btn-info" name="submit" value="';
populateBox4='">Submit</button></form></div>';


populatebox0='<div class="populateBox" id="questionbox';
populatebox1='" >';
populatebox2='<hr><textarea id="answer'; 
populatebox3='" name="answer" rows=4 cols=70 placeholder="Enter Your Answer Here"></textarea><br><button class="btn btn-info answerclick" name="submit" value="';
populatebox4='">Submit</button></div>';




function recieveQuestions()
{
    userType=1;
    for(var i=0;i<7;i++)
    {

        $.ajaxSetup({
            headers: { "X-CSRFToken": getCookie("csrftoken") }
                });
    
    
               $.ajax(
    
                   { csrfmiddlewaretoken: ['{{ csrf_token }}'],
                   type:"GET",
                   url:"/recieveQuestion/"+i,
                   datatype:"html"
    
    
                   }
               ).done(function(response){
                   //do nothing
                   questions[i]=JSON.parse(response);
                  

                   for(var subject in questions[i])
                    {
                        console.log("answer");
                    
                        console.log(questions[i][subject]["id"]);
                        console.log(questions[i][subject]["question"]);
                       $("#replySection").prepend(populatebox1+questions[i][subject]['question']+populatebox2+question[i][subject]['id']+populatebox3+questions[i][subject]['id']+populatebox4);
                       
             //          $("#replySection").prepend(populateBox1+question[i][subject]['id']+populateBox2+questions[i][subject]['question']+populateBox3+questions[i][subject]['id']+populateBox4);
                       
                    }
                    
                   //console.log(response);
               });

    }


}


/*
# CATEGORY VALUES
# 0-ENGLISH
# 1-MATHS
# 2-BIOLOGY
# 3-CHEMISTRY
# 4-PHYSICS
# 5-COMPUTER SCIENCE
# 6-SOCIAL STUDIES
*/



populateAnswer1='<div class="populateBox" >';
populateAnswer2='<hr>';
populateAnswer3='</div>';


function recieveMyAnswer()
{
  userType=0;
    
            $.ajaxSetup({
                headers: { "X-CSRFToken": getCookie("csrftoken") }
                    });
        
        
                   $.ajax(
        
                       { csrfmiddlewaretoken: ['{{ csrf_token }}'],
                       type:"GET",
                       url:"/recieveMyAnswer/",
                       datatype:"html"
        
        
                       }
                   ).done(function(response){
                       //do nothing
                       answers=JSON.parse(response);
                      
    
                       for(var subject in answers)
                        {
                            console.log("answer");
                        
                            console.log(answers[subject]["id"]);
                            console.log(answers[subject]["question"]);
                           $("#replySection").prepend(populateAnswer1+answers[subject]['question']+populateAnswer2+answers[subject]['answer']+populateAnswer3);
                           
                        }
                       //console.log(response);
                       
                   });
    
        



}




function recieveAnswer(subject)
{
    $.ajaxSetup({
        headers: { "X-CSRFToken": getCookie("csrftoken") }
            });


           $.ajax(

               { csrfmiddlewaretoken: ['{{ csrf_token }}'],
               type:"GET",
               url:"/recieveAnswer/"+subject+"/",
               datatype:"html"


               }
           ).done(function(response){
               //do nothing
               console.log(response);
               questions=JSON.parse(response);
              
               $('#replySection').html(" ");
               
               for(var subject in questions)
                {
                    console.log("answer");
                
                    console.log(questions[subject]["answer"]);
                    console.log(questions[subject]["question"]);
                   $("#replySection").prepend(populateAnswer1+questions[subject]['question']+populateAnswer2+questions[subject]['answer']+populateAnswer3);
                }
               //console.log(response);
           });
    

}



function recieveQuestion(category)
{
    userType=1;
    
        $.ajaxSetup({
            headers: { "X-CSRFToken": getCookie("csrftoken") }
                });
    
    
               $.ajax(
    
                   { csrfmiddlewaretoken: ['{{ csrf_token }}'],
                   type:"GET",
                   url:"/recieveQuestion/"+category,
                   datatype:"html"
    
    
                   }
               ).done(function(response){
                   //do nothing
                   questions=JSON.parse(response);
                  
                   if(questions.length==0)
                        $("#replySection").html("<br><br><h3>No Questions to display</h3> ");
                   else
                    $("#replySection").html(" ");
                   
                    

                   for(var subject in questions)
                    {
                        console.log("answer");
                    
                        console.log(questions[subject]["id"]);
                        console.log(questions[subject]["question"]);
                      // $("#replySection").prepend(populateBox1+getCookie("csrftoken")+populateBox2+questions[subject]['question']+populateBox3+questions[subject]['id']+populateBox4);
                       $("#replySection").prepend(populatebox0+questions[subject]['id']+populatebox1+questions[subject]['question']+populatebox2+questions[subject]['id']+populatebox3+questions[subject]['id']+populatebox4);
                       
                    }
                    $(".answerclick").click(function(){
                        questionid=$(this).val();
                        answer=$("#answer"+questionid).val();
                        //animation for removal of the menu

                        sendAnswer(questionid,answer)
                        //send the value to the sever /answerQuestion/

                    });
                   //console.log(response);
               });

    


}


function sendAnswer(id,answer)
{
    console.log("sending answer");

    $.ajaxSetup({
        headers: { "X-CSRFToken": getCookie("csrftoken") }
            });


           $.ajax(

               { csrfmiddlewaretoken: ['{{ csrf_token }}'],
               type:"POST",
               url:"/answerQuestion/",
               data:{submit:id,answer:answer},
               datatype:"html"


               }
           ).done(function(response){
               //do nothing
                if(response=="successful")
                    {
                        closePopulateBox("questionbox"+id);
                    }
            });


}


function closePopulateBox(id){

    $("#"+id).animate({height:'0',width:'0'},800).css({display:'none'});

}