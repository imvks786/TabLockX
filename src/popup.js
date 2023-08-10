var issent;

//LOCK THE TAB
document.addEventListener('DOMContentLoaded', function() {
  console.log('LISTER STARTED: LOCK BUTTON');
  var lockButton = document.querySelector('.btn');

  lockButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: show,
      });
    });
  });
});

//---------WORKING-------------//
try{
  chrome.storage.local.get(['uid'], function(r) {
  if(r.uid){
    $("#imvks-step-1").hide();
    $("#imvks-step-2").show();
  }
  else{
    $("#imvks-step-1").show();
    $("#imvks-step-2").hide();
  }
});
}
catch(e){ console.log('Not Logged In!'); }
//---------WORKING-------------//

try{
  chrome.storage.local.get(['popuptheme'], function(r) {
    var theme = r.popuptheme;
    console.log(`THEME_: ${theme}`);
    switch(theme){
      //0-DARK,1-LIGHT,2-PURPLE,3-YELLOW,DEF-LIGHT//
      case '0': 
        $("body").addClass('imvks-dark');
        $("#imvks-scheme").addClass('imvks-dark-card');
        break;
      case '1':
        $("body").addClass('imvks-default');
        $("#imvks-default-card").addClass('imvks-dark-card');
        break;
      case '2':
        $("body").addClass('imvks-purple');
        $("#imvks-scheme").addClass('imvks-purple-card');
        break;
      case '3':
        $("body").addClass('imvks-yellow');
        $("#imvks-scheme").addClass('imvks-yellow-card');
        break;
      default:
        $("body").addClass('imvks-default');
        $("#imvks-default-card").addClass('imvks-dark-card');
        break;
    }
  })
}
catch{
  console.log('theme error');
}




//SET THE PASSWORD//
// document.addEventListener('DOMContentLoaded', function() {
//   console.log('LISTER STARTED: SAVE_PWD');

//   var savePwdButton = document.getElementById('save_pwd');
//   savePwdButton.addEventListener('click', function() {

//     console.log('LISTEN RUN');
//     var setPasswordInput = document.getElementById('imvks-pwd-set');
//     var confirmPasswordInput = document.getElementById('imvks-pwd-confirm');
    
//     var password = setPasswordInput.value;
//     var confirmPassword = confirmPasswordInput.value;
    
//     if (password === confirmPassword) 
//     {
//       chrome.storage.local.set({ isVisible: false });
//       chrome.storage.local.set({ 'imvks_password': password });

//       $("#status").html("<p style='color:green;'>Password Saved!</p>").show();
//       $("#imvks-step-1").hide();
//       $("#imvks-step-2").show();
//       console.log('Password saved:', password);

//       chrome.storage.local.get(['imvks_password'], function(result) {
//         var value = result.imvks_password;
//         console.log('Password saved:', value);
//       });  
//      } 
//     else {
//       $("#status").html("<p style='color:red;'>Password Mismatch!</p>").show();
//       console.log('Passwords do not match');
//     }
//   });
// });

chrome.storage.local.get(['isVisible'], function(result) {
  var a = result.isVisible;
  console.log('State',a);
});


function setVisibilityState(status) {
  chrome.storage.local.set({ isVisible: status });
}

function showContainer() {
  setVisibilityState(true);
}
function hideContainer() {
  setVisibilityState(false);
}


//DISPLAYING THE LOCK SCREEN//
function show(){
  console.log('SHOW FUNCTION')
  var targetElement = document.querySelectorAll('.imvks-container-overlay, .imvks-container, .imvks-my_ip, .imvks-my_btn');
  targetElement.forEach(function(element) {  
    element.style.display = 'block';
  });
  chrome.storage.local.set({ isVisible: true });
  // showContainer();
}

try{
  chrome.storage.local.get(['isloggedin','imvks_password'], function(r) {
    
      //logged in and password is set//
      if(r.isloggedin && r.imvks_password){
        $("#imvks-step-1").hide();
        $("#imvks-step-2").show();
      }
      else if(r.isloggedin && !r.imvks_password){
        console.log('User is logged in, but password not set');
        $("#imvks-step-1").show();
        $("#imvks-step-2").hide();
      }
  })
}
catch(e){
  console.log('password or logged in is not set error');
}


$("#immvks-change-pwd-btn").click(function(){
  $("#imvks-step-2").hide();
  $("#imvks-cpwd, #imvks-spwd, #imvks-scpwd").val('');
  $("#imvks-step-3").show();
});


$("#imvks-settings").click(function(){
  $("#imvks-step-1, #imvks-step-2, #imvks-step-3").hide();
  $("#settings").show();
});

$("#immvks-change-pwd").click(function(){
  var c_p = $("#imvks-cpwd").val();
  var n_p = $("#imvks-spwd").val();
  var c_n_p = $("#imvks-scpwd").val();
  
  chrome.storage.local.get(['imvks_password'], function(result) {
    if (result.hasOwnProperty('imvks_password')) {
      if(c_p === result.imvks_password ){
        //THEN SETTNIG NEW PASWORD
        if(n_p === c_n_p){
          chrome.storage.local.set({ 'imvks_password': n_p });
          $("#status_n").html("<p style='color:green;'><b>Password Changed!</b></p>").show();
          setTimeout(() => {
            $("#imvks-step-3, #status_n").hide();
            $("#imvks-step-2").show();
          }, 3000);
        }
        else{
          $("#status_n").html("<p style='color:red;'><b>Password Mismatch!</b></p>").show();
        }
      } 
      else{
        $("#status_n").html("<p style='color:red;'><b>Current Password is Incorrect!</b></p>").show();
      }
    }
  });

  
})


document.addEventListener('DOMContentLoaded', function() {
  var openOptionsButton = document.getElementById('open-options');
    openOptionsButton.addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var openOptionsButton = document.getElementById('open-options2');
    openOptionsButton.addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });
});


$("#imvks-step-1").show();
// chrome.storage.local.get(['imvks_password'], function(result) {
//   var pwd_saved = result.imvks_password;
//   if(typeof pwd_saved === 'undefined' || pwd_saved === null){
//     console.log('Password is set:'+pwd_saved);
//   }
//   else{
//     console.log('Password not set:'+pwd_saved);
//   }
// });  