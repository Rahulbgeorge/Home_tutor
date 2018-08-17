

var professionSelect=0;
$(document).ready(function(){

    $("#signUpForm").css({"display":"none"});

    $("#signUp").click(function(){
        $("#signInForm").css({"display":"none"});
        $("#signUpForm").css({"display":"block"});    
        $("#signIn").removeClass("active").addClass("inactive").addClass("underlineHover");
        $("#signUp").removeClass("inactive").removeClass("underlineHover").addClass("active");
    });

    $("#signIn").click(function(){
        $("#signUpForm").css({"display":"none"});
        $("#signInForm").css({"display":"block"});   
        $("#signUp").removeClass("active").addClass("inactive").addClass("underlineHover"); 
        $("#signIn").removeClass("inactive").removeClass("underlineHover").addClass("active");   
    });

    $("#profession").click(function(){
        
            if($(this).val()=="Teacher")
                $("#subject").css({display:'block'}).prop('required',true);
            else if($(this).val()=="Student")
                $("#subject").css({display:'none'}).prop('required',false);
    });




});