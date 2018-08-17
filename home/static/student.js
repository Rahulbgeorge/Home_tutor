var currentOption="allAnswers";
var userType=0;

$(document).ready(function(){

    $("#logout").click(function(){
        window.location="/logout";
    });

    $("#payment").click(function(){
        window.location="/payment/";
    });


$(".option").click(function(){
    var subjectName=this.id;
    $(this).addClass("active");
    console.log(currentOption);
    $("#"+currentOption).removeClass("active");
    currentOption=subjectName;

    
    if(userType==0)
        {
            console.log("User answers coming");
    switch(subjectName)
    {
        case 'allAnswers':
            recieveMyAnswer();
            break;
        case 'maths':
            recieveAnswer(1);
            break;
        case 'physics':
                recieveAnswer(4);
                break;
        case 'biology':
            recieveAnswer(2);
            break;
        case 'chemistry':
            recieveAnswer(3);    
            break;
        case 'english':
            recieveAnswer(0);
            break;
        case 'socialStudies':
            recieveAnswer(6);
            break;
        case 'computerScience':
            recieveAnswer(5);
            break;
    }
    }

    else if(userType==1)
        {
            switch(subjectName)
            {
                case 'maths':
                    recieveQuestion(1);
                    break;
                case 'physics':
                        recieveQuestion(4);
                        break;
                case 'biology':
                    recieveQuestion(2);
                    break;
                case 'chemistry':
                    recieveQuestion(3);    
                    break;
                case 'english':
                    recieveQuestion(0);
                    break;
                case 'socialStudies':
                    recieveQuestion(6);
                    break;
                case 'computerScience':
                    recieveQuestion(5);
                    break;
            }


        }
    
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
                       $("#replySection").prepend(populateBox1+getCookie("csrftoken")+populateBox2+questions[i][subject]['question']+populateBox3+questions[i][subject]['id']+populateBox4);
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
                  
                    $("#replySection").html(" ");
                   for(var subject in questions)
                    {
                        console.log("answer");
                    
                        console.log(questions[subject]["id"]);
                        console.log(questions[subject]["question"]);
                       $("#replySection").prepend(populateBox1+getCookie("csrftoken")+populateBox2+questions[subject]['question']+populateBox3+questions[subject]['id']+populateBox4);
                    }
                   //console.log(response);
               });

    


}
