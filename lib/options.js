document.addEventListener('DOMContentLoaded', function() {
    //LOAD THE DOM FIRST THEN SCRIPTS WORKS//
    $('#set_new_password, #abou, #secure,#account, #help_div').hide();

//------------SIDE BAR FUNCTIONS--------------------//
$('#imvks-dashboard, .click_dash').click(function() {
    $("#imvks-dashboard").addClass('tablockx');
    $("#imvks-about,#imvks-account,#imvks-security").removeClass('tablockx');

    $('#secure, #abou,#account').hide();
    $("#dash").show();
    });

$('#imvks-security').click(function() {
    $("#imvks-security").addClass('tablockx');
    $("#imvks-dashboard,#imvks-about,#imvks-account").removeClass('tablockx');

    $('#abou, #dash, #account').hide();
    $('#secure').show();
});

$('#imvks-about').click(function() {
    $("#imvks-about").addClass('tablockx');
    $("#imvks-dashboard,#imvks-account,#imvks-security").removeClass('tablockx');

    $('#secure, #dash, #account').hide();
    $("#abou").show();
});

$('#imvks-account').click(function() {
    $("#imvks-account").addClass('tablockx');
    $("#imvks-dashboard,#imvks-security,#imvks-about").removeClass('tablockx');

    $('#secure, #dash,#abou').hide();
    $("#account").show();
});

$("#switch_signup").click(function(){
    $('#imvks-account').click();
})


   


//-----------Appear---------------------------//
$("#upload_img").click(function(){
    chrome.storage.local.get(['uid'], function(r) {
        uid = r.uid;
        console.log(uid);

        var form = $('#imageForm')[0];
        var formData = new FormData(form);
        formData.append('email', uid);
        console.log(formData);

        $.ajax({
            type: "POST",
            url: "https://tablockx.000webhostapp.com/upload.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                var responseData = JSON.parse(response); 
                console.log(responseData);
                $('#message').text(responseData.message);
            },
            error: function () {
                $('#message').text('Error uploading image.');
            }
        });
    });
});




//Setting the password for lock screen//
$("#set_lock_password").click(function(){
    console.log("Setting new lock SCREEN password");
    var pwd_n = $("#lock_screen_1").val();
    var pwd_c = $("#lock_screen_2").val();
    
    if (pwd_n === pwd_c) 
    {
        chrome.storage.local.set({ isVisible: false });
        chrome.storage.local.set({ 'imvks_password': pwd_n });
        $("#lock_screen_status").html("<p style='color:green;'>Password Set!</p>").show(); 
        setTimeout(() => {
            location.reload();
        }, 2000);
    } 
    else {
        $("#lock_screen_status").html("<p style='color:red;'>Password Mismatch!</p>").show();
    }
});

//--------------Secure--------------------------//
//change password//
$("#change_pwd").click(function(){
    var c_pwd = $("#c_pwd").val(); //current pass
    var n_pwd = $("#n_pwd").val();
    var cn_pwd = $("#cn_pwd").val();

    if(n_pwd === cn_pwd){
        $("#options-status").html("<p style='color:green;'>Password Matched!</p>").show();
        chrome.storage.local.get(['imvks_password'], function(r) {
            var r = r.imvks_password;
            if(c_pwd === r){
                chrome.storage.local.set({ 'imvks_password': n_pwd });
                $("#options-status").html("<p style='color:green;'>Password Changed!</p>").show();
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
            else{
                $("#options-status").html("<p style='color:red;'>Current Password Wrong!</p>").show();
            }
            });
    }
    else{
        $("#options-status").html("<p style='color:red;'>Password Mismatch!</p>").show();
    }
})

//-------CHECK AUTO LOCK STATUS-----//
$(document).ready(function() {
    try{
        chrome.storage.local.get(['auto_lock_status'], function(r) {
            if(r.auto_lock_status){
                $("#set_autolock,#show_autolock_setting,#turn_on_autolock").hide();
                $("#turn_off_autolock").show();
            }
            else{
                $("#turn_off_autolock").hide();
            }
        });
    }catch(e){
        console.log("Ext.ERROR!");
    }
});


//---------------THEME-------------------------//
$('#save_changes').click(function() {
    theme_value = $('input[name="theme"]:checked').val();
    chrome.storage.local.set({ isdark: theme_value });
});

$(".popup").click(function(){
    theme_value_popup = $('input[name="popup_theme"]:checked').val();
    chrome.storage.local.set({ popuptheme: theme_value_popup });
    console.log("THEME_VAL:",theme_value_popup);
    location.reload(); 
});

// $('#save_changes_popup').click(function() {
//     theme_value_popup = $('input[name="popup_theme"]:checked').val();
//     chrome.storage.local.set({ popuptheme: theme_value_popup });
// });

//change theme by loading//
$(document).ready(function() {
    $('input[name="theme"]').on('change', function() {
        if ($(this).val() === '0') {  //dark
            $("#dash, #secure, #abou,#account").addClass('dark');
            } else if ($(this).val() === '1') {   //light
            $("#dash, #secure, #abou,#account").removeClass('dark');
            }
    });
});

//try to check dark theme or not//
$(document).ready(function(){
try{
    //theme status//
    chrome.storage.local.get(['isdark','popuptheme'], function(r) {
        var theme = r.isdark;
        var theme_pop  = r.popuptheme;
        if(theme === '0'){
            $("#dash, #secure, #abou, #account").addClass('dark');
            $('#imvks-dark').prop('checked', true);
        }
        else if(theme === '1'){
            $("#dash, #secure, #abou, #account").removeClass('dark');
            $('#imvks-light').prop('checked', true);
        }

        switch(theme_pop){
            case '0': 
            $('#imvks-dark-popup').prop('checked', true).css('border','5px solid white');
            break;
          case '1':
            $('#imvks-light-popup').prop('checked', true).css('border','5px solid white');
            break;
          case '2':
            $('#imvks-purple-popup').prop('checked', true).css('border','5px solid white');
            break;
          case '3':
            $('#imvks-yellow-popup').prop('checked', true).css('border','5px solid white');
            break;
          default:
            $('#imvks-light-popup').prop('checked', true).css('border','5px solid white');
            break;
        }
    })

    //Password Status//
    chrome.storage.local.get(['imvks_password'], function(r) {
        try{
            if((r.imvks_password).length > 0){
                
                $('#pwd_status').html('<div class="bg-success text-white" style="width: 130px;border-radius: 6px;padding: 5px;"><p style="padding-top: 6px;padding-left: 6px;"><b>Password Set</b></p></div>');
            }
            else{
                $('#pwd_status').html('<div class="bg-danger text-white" style="width: 150px;border-radius: 6px;padding: 5px;"><p style="padding-top: 6px;padding-left: 6px;"><b>Password not Set</b></p></div>');
            }
        }
        catch(e){
            $('#pwd_status').html('<div class="bg-danger text-white" style="width: 160px;border-radius: 6px;padding: 5px;"><p style="padding-top: 6px;padding-left: 6px;"><b>Password Not Set</b></p></div>');
        }
    })

    
}
catch(e){
    console.log('THEME ERROR!');
}
})
      
//-----------------dashboard-------------------//
//login status//
$(document).ready(function() {
    try{
        chrome.storage.local.get(['isloggedin','uid'], function(r) {
            if(r.isloggedin){
                console.log('User Logged In');
                $("#signup_div, #login_div, #securenotlogged_div").hide();
                $("#logout_div").show();
                $("#user_email").html(r.uid).show();
            }
            else{
                console.log('User not Logged In');
                $("#logout_div, #profile_pic_div, #theme_div, #pwd_status_div, #secure_div").hide();
                $("#signup_div, #login_div, #securenotlogged_div").show();
            }
        })
    }
    catch(e){
        console.log('usr not logged');
    }
});

//setlockpwd status//
$(document).ready(function(){
    try{
        chrome.storage.local.get(['imvks_password'], function(r) {
            if(r.imvks_password){
                $("#passnotset").hide();
                $("#help_div").show();
            }
            else{
                $("#passnotset").show();
                $("#help_div").hide();
            }
        });
    }
    catch(e){
        console.log('password is not set');
    }
})

//whitelist domains//
$(document).ready(function(){
    try{
        chrome.storage.sync.get('whitelist', (data) => {
            if ('whitelist' in data) {
                const whitelistData = data.whitelist;
                console.log(whitelistData);
                whitelistData.forEach(item => {
                    $("#whitelist").append(`<tr><td>${item}</td><td><i class="material-icons" style="font-size: 15px;">delete_forever</i> Remove</td></tr>`);
                });
            }
            else {
                console.log('NO_DOMAINS_FOUND');
            }
        });
    }
    catch{
        console.log("NO_DOMAINS_FOUND");
    }
})

//------------ WHITELIST DOMAINS ------//
// Add domain to whitelist when the button is clicked
$('#addDomainButton').click(function(){
    const domain_data = $('#domainInput').val().trim();
    if (domain_data) {
        $("#whitelist").append(`<tr><td>${domain_data}</td><td>Remove</td></tr>`);
        $('#domainInput').val('');
            
        // Retrieve the 'whitelist' data from storage.sync
        chrome.storage.sync.get('whitelist', (data) => {
            let whitelistData = data.whitelist;
            if (typeof whitelistData === 'undefined' || whitelistData === null) 
            {
                let defaultWhitelist = [];
                chrome.storage.sync.set({ whitelist: defaultWhitelist }, () => {
                    console.log('Whitelist created with default value.');
                });
            } 
            else {
                console.log('Whitelist before push:', whitelistData);
                whitelistData.push(domain_data);
                chrome.storage.sync.set({ whitelist: whitelistData }, () => {
                    console.log('Data pushed to whitelist:', domain_data);
                });
            }
        });
    }
    else{
        console.log("NOT DATA");
    }  
});


//------- AUTO LOCK -----------------//
$("#turn_off_autolock").click(function(){
    console.log("TIMER_OFF");
    chrome.storage.local.set({auto_lock_status: false});
    $("#turn_on_autolock").show();
    $("#turn_off_autolock").hide();
});

$("#turn_on_autolock").click(function(){
    console.log("TIMER_ON");
    chrome.storage.local.set({auto_lock_status: true});
    $("#show_autolock_setting,#set_autolock,#lock_time_min").show()
});

$("#set_autolock").click(function(){
    var timemin = $("#lock_time_min").val();
    chrome.storage.local.set({ locktime: timemin,auto_lock_status: true});
    $("#autolock_status").show();
    setTimeout(() => {
        $("#autolock_status,#turn_on_autolock,#lock_time_min,#set_autolock").hide();
        $("#turn_off_autolock").show();
    }, 3000);
});


//-------- EMAIL VALIDATION -----------//
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
//-----SIGNUP NEW USER --------------//
$('#signup').click(function() {
    $("#response-back").html('').show();
    
    var data1 = $("#imvks-email-set").val();
    var data2 = $("#imvks-pwd-set").val();
    var data3 = $("#imvks-pwd-confirm").val();

    var dataToSend = {
        emailid: data1,
        passkey: data2
      };

    var t1 = true;
    var t2 = true;
    var t3 = true;

    if (!isValidEmail(data1)) {
        $("#response-back").html("<p style='color:red;'>Please enter a valid email address</p>").show();
        t1 = false;
    }
    if(data2.length < 8){
        $("#response-back").html("<p style='color:red;'>Password must be at least 8 characters long</p>").show();
        t2 = false;
    }
    if(data2 !== data3){
        $("#response-back").html("<p style='color:red;'>Password do not matched.</p>").show();
        t3 = false;
    }

    if(t1 && t2 && t3){
        $("#response-back").html("<p style='color:green;'>Sending verification mail....</p>").show();
        $.ajax({
            url: 'https://tablockx.000webhostapp.com/send_email.php',
            method: 'POST',
            data: dataToSend,
            success: function(response) {
            $('#responseMessage').text(response);
            issent = response;
            if(issent === 'email_sent'){
                $("#response-back").html("<p style='color:green;'>Verification Mail has been sent successfully.</p>").show();
                setTimeout(() => {
                    location.reload(); 
                }, 2000);
            }else{
                $("#response-back").html("<p style='color:red;'>Incorrect Email Address.</p>").show();
            }
            },
            error: function(xhr, status, error) {
            console.log('Error:', error);
            $("#response-back").html("<p style='color:red;'>An error occured to sending verification mail.</p>").show();
            }
        });
    }

});

//--------------LOGIN USER -----------//
$("#login").click(function(){
    var email = $("#imvks-email-get").val();
    var pwd = $("#imvks-pwd-get").val();
    var t1 = true;
    var t2 = true;
    var log_data = {
        email: email,
        pass: pwd
    };

    if (!isValidEmail(email)) {
        $("#response-back-get").html("<p style='color:red;'>Please enter a valid email address</p>").show();
        t1 = false;
    }
    if(pwd.length < 8){
        $("#response-back-get").html("<p style='color:red;'>Password must be at least 8 characters long</p>").show();
        t2 = false;
    }

    if(t1 && t2){
        $("#response-back-get").html("<p>Please Wait....</p>").show();
        $.ajax({
            url: 'https://tablockx.000webhostapp.com/login.php',
            method: 'POST',
            data: log_data,
            success: function(response) {

                if(response === 'Login successful!'){
                    chrome.storage.local.set({ isloggedin: true, uid: email });
                    $("#response-back-get").html("<p style='color:green;'>Login Successfull!</p>").show();
                    setTimeout(() => {
                        $("#response-back-get").html('');
                        $("#imvks-email-get").val('');
                        $("#imvks-pwd-get").val('');
                        location.reload(); 
                    }, 2000);
                }else{
                    $("#response-back-get").html("<p style='color:red;'>Incorrect Email or Password!</p>").show();
                }
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
                $("#response-back").html("<p style='color:red;'>An error occured to logging in.</p>").show();
            }
        });
    }

});

//------------ LOGOUT USER ------------//
$("#logout").click(function(){
    $("#logout-msg").html('<p style="color:green">Logout Success!</p>').show();
    setTimeout(() => {
        chrome.storage.local.set({ isloggedin: false, uid:'', imvks_password: '' });
        $("#logout-msg").html('').hide();
        location.reload(); 
    }, 2000);
});

//----- RESET THE LOCK SCREEN PASSWORD ---//
$("#reset_lock_password").click(function(){
    $("#reset_status").html('Please Wait...').show();
    chrome.storage.local.get(['uid'], function(r) {
        var email = r.uid;
        console.log(email);
        var user_data = {
            email: email
        }
        
        $.ajax({
            url: 'https://tablockx.000webhostapp.com/reset_password.php',
            method: 'POST',
            data: user_data,
            success: function(response) {
                console.log(response);
                if(response === 'email_sent'){
                    
                    $("#reset_status").html('<br><p style="color:green;">A new Password is sent to registered email address.</p>').show();
                    setTimeout(() => {
                        $("#set_new_password").show();

                    }, 2000);
                }else{
                    $("#reset_status").html("<p style='color:red;'>Incorrect Email!</p>").show();
                    $("#set_new_password").hide();
                }
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
                $("#reset_status").html("<p style='color:red;'>An error occured to resetting password.</p>").show();
                $("#set_new_password").hide();
            }
        });
    });
});

$("#token_change_pwd").click(function(){
    chrome.storage.local.get(['uid'], function(r) {
        var email = r.uid;
        var token = $("#token_pwd").val();
        var tnp = $("#token_n_pwd").val();
        var tcp = $("#token_cn_pwd").val();
        var token_data = {
            token: token,
            email: email
        }

        $.ajax({
            url: 'https://tablockx.000webhostapp.com/verify_token.php',
            method: 'POST',
            data: token_data,
            success: function(response) {
                console.log(response);
                if(response === 'success'){
                    $("#reset_status").html('<br><p style="color:green;">Password Reset Successfully!</p>').show();
                    chrome.storage.local.set({ imvks_password: tcp });
                    $("#set_new_password").hide();

                }else{
                    $("#reset_status").html("<p style='color:red;'>"+response+"</p>").show();
                    $("#set_new_password").hide();
                }
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
                $("#reset_status").html("<p style='color:red;'>An error occured to resetting password.</p>").show();
                $("#set_new_password").hide();
            }
        });

    });
})












//-------------------------------ADD CODE BEFORE END OF FUNCTION ---------------------------//
});