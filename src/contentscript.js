function load() {
  var containerHTML = `
    <style>
    #imvks-profile{
        height:70px !important;
        width:70px !important;
      }
    .imvks-container-overlay {
      display:none;
      position: fixed !important;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
      z-index: 9999 !important;
      backdrop-filter: blur(5px) !important;
      background-color: rgba(0, 0, 0, 0.5) !important;
    }
    .imvks-container{
      text-align:center !important;
      width: 260px !important;
      display: none;
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      z-index: 10000 !important;
      padding: 20px !important;
      background-color: white !important;
      border-radius: 5px !important;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
    }
    .imvks-my_ip {
      display: none;
      color: black !important;
      background-color: white !important;
      width: auto !important;
      margin: auto !important;
      height: 25px !important;
      padding: 10px !important;
      border-radius: 4px !important;
      border: 1px solid black !important;
      pointer-events:auto !important;
    }
    .imvks-my_btn {
      display: none;
      border: none !important;
      background-color: #2b8cff !important;
      color: #fff !important;
      cursor: pointer !important;
      display: inline-block !important;
      padding: 10px !important;
      border-radius: 3px !important;
      margin: auto !important;
      font-size: medium !important;
      pointer-events:auto !important;
    }
    #wrong_pwd{
      display: none;
    }
    .body_blocker{
      overflow:hidden !important;
      pointer-events:none !important;
      user-select: none !important;
    }
    .imvks-center{
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }
    </style>
    <div class="imvks-container-overlay" id="imvks-overlay" style="display: none;"></div>
    <div class="imvks-container" style="display: none;">
    <div class="imvks-center"><img src="" id="imvks-profile"></div>
      <br>  
      <br>
      <span style="color:grey;">Please Enter Password</span>
      <br>
      <br>
      <input type="password" class="imvks-my_ip" placeholder="Enter your password" style="display: none;" id="imvks-pwd" value="" placeholder="**********" required>
      <br>
      <span style="color:red;" id="wrong_pwd"><b>Wrong Password</b></span>
      <br>
      <button type="button" id="pwd" class="imvks-my_btn" style="display: none;">Submit</button>
    </div>`;

    var container = document.createElement('div');
    container.innerHTML = containerHTML.replace(/\n\s+/g, '');

    document.body.insertAdjacentHTML('afterbegin',containerHTML);
    // document.body.appendChild(container);

    const imageElement = document.getElementById('imvks-profile');
    const imageUrl =  chrome.runtime.getURL('assets/icon.png');
    imageElement.src = imageUrl;

    // Send a message to background.js to indicate injection is complete
    chrome.runtime.sendMessage({ action: 'htmlInjected' });

    addButtonClickListener();
}

//DEFINING THE ISVISIBLE TO FALSE NOT TO SHOW LOCKSCREEN//
//chrome.storage.local.set({ isVisible: false });
function addButtonClickListener() {
  var pwd = document.getElementById("pwd");
  
  if (pwd) {
    pwd.addEventListener('click', function() {
      var data = document.getElementById("imvks-pwd").value;
      chrome.storage.local.get(['imvks_password'], function(result) {
        var storedPassword = result.imvks_password;
        if (storedPassword === data) {
          chrome.storage.local.set({ isVisible: false });

          //user key blocker remove listener//
          isListenerActive = false;
          window.removeEventListener('keydown', eventHandler);
          document.removeEventListener('contextmenu', contextMenuHandler);
          document.getElementById("wrong_pwd").style.display = "none";
          document.body.classList.remove("body_blocker");
          var targetElement = document.querySelectorAll('.imvks-container-overlay, .imvks-container, .imvks-my_ip, .imvks-my_btn');
          targetElement.forEach(function(element) {  
            element.style.display = 'none';
          })
          

        } 
        else{
          
          document.getElementById("wrong_pwd").style.display = "block";
        }
      });

    });
  } else {
    console.log('Element with id "pwd" not found.');
  }
}

let isListenerActive = true;
//KEY FUNCTIONS//
function eventHandler(event) {
  if (!isListenerActive) return;
  if (event.key === 'F12') {
    alert('This Action is Not Allowed, Enter Password!');
    event.preventDefault();
  } 
  else if (event.ctrlKey && event.shiftKey && event.key === 'I') {
    alert('This Action is Not Allowed, Enter Password!');
    event.preventDefault();
  } 
  else if (event.ctrlKey && (event.key === 'I' || event.key === 'i')) {
    alert('This Action is Not Allowed, Enter Password!');
    event.preventDefault();
  }
}
//RIGHT CLICK FUNCTION//
function contextMenuHandler(e) {
  if (!isListenerActive) return;
  alert('This Action is Not Allowed, Enter Password!');
  e.preventDefault();
}

setTimeout(function(){
  try{
    chrome.storage.local.get(['isVisible'], function(result) {
      var a = result.isVisible;
      if(a){
        console.log('State Defined',a);     //true
        document.body.classList.add("body_blocker");
        
        isListenerActive = true;
        window.addEventListener('keydown', eventHandler);
        document.addEventListener('contextmenu', contextMenuHandler);
        // Start the event listener
        var targetElement = document.querySelectorAll('.imvks-container-overlay, .imvks-container, .imvks-my_ip, .imvks-my_btn');
                targetElement.forEach(function(element) {  
                  element.style.display = 'block';
        })
      }
      else{
        //console.log('State Undefined',a);     //false
        
        isListenerActive = false;
        window.removeEventListener('keydown', eventHandler);
        document.removeEventListener('contextmenu', contextMenuHandler);
        var targetElement = document.querySelectorAll('.imvks-container-overlay, .imvks-container, .imvks-my_ip, .imvks-my_btn');
        targetElement.forEach(function(element) {  
          element.style.display = 'none';
        })
      }
    });  
  }
  catch(e){
    console.log(e);
  }
},2000)

//====SHOW LOCK SCREEN=====//
function show_lock(){
  
  var targetElement = document.querySelectorAll('.imvks-container-overlay, .imvks-container, .imvks-my_ip, .imvks-my_btn');
  targetElement.forEach(function(element) {  
    element.style.display = 'block';
  })
}
function hide_lock(){
  
  var targetElement = document.querySelectorAll('.imvks-container-overlay, .imvks-container, .imvks-my_ip, .imvks-my_btn');
  targetElement.forEach(function(element) {  
    element.style.display = 'none';
  })
}



//==========AUTO LOCKER=================WORKING===========//
let lastActivityTime = Date.now();
var inactivityThreshold =  60000; //10 seconds//

function updateActivityTime() {
  lastActivityTime = Date.now();
}

function checkTabLockStatus() {
  const currentTime = new Date();
  //console.log(currentTime);
  try{
    chrome.storage.local.get(['locktime','auto_lock_status'], function(r) {
      
      const currentTime = Date.now();
      const inactiveDuration = currentTime - lastActivityTime;
      inactivityThreshold =  r.locktime*60000;

      if(r.auto_lock_status){
        //console.log('Auto lock is on!');
        if (inactiveDuration >= inactivityThreshold) {
          chrome.storage.local.set({ isVisible: true });
          //console.log('time up');
          isListenerActive = true;
          window.addEventListener('keydown', eventHandler);
          document.addEventListener('contextmenu', contextMenuHandler);
          check_visible();
        }
      }
      else{
        //console.log('Auto lock is off!');
      }
      
    });
  }catch(e){
    console.log('timer not set:',e);
  }
}


function check_visible() {
  chrome.storage.local.get(['isVisible'], function(r) {
    console.log('CHKING_STAT:',r.isVisible);
    if(r.isVisible){
      show_lock();
    }else{
      hide_lock();
    }
  })
}
// Listen for user activity events and update lastActivityTime accordingly
document.addEventListener('mousemove', updateActivityTime);
document.addEventListener('keydown', updateActivityTime);
document.addEventListener('click', updateActivityTime);

setInterval(checkTabLockStatus,30000)      //10 seconds//
//==========AUTO LOCKER=================WORKING===========//

document.addEventListener("DOMContentLoaded", function() {
  load();
});
// load();