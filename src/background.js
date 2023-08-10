//--------------- CTRL+SHIFT+L ----------------------------//
chrome.commands.onCommand.addListener(function(command) {  
  chrome.storage.local.get(['imvks_password'], function(r) {
  try
  {
    if(r.imvks_password.length > 0 && command === "show_lock_cmd"){

      console.log('Command function');
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
  
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
  
                isListenerActive = true;
                window.addEventListener('keydown', eventHandler);
                document.addEventListener('contextmenu', contextMenuHandler);
  
                document.getElementById('imvks-pwd').value = "";
                document.body.classList.add("body_blocker");
                var targetElement = document.querySelectorAll('.imvks-container-overlay, .imvks-container, .imvks-my_ip, .imvks-my_btn');
                targetElement.forEach(function(element) {  
                  element.style.display = 'block';
                });
  
  
                chrome.storage.local.set({ isVisible: true });
                document.getElementById('imvks-overlay').addEventListener('contextmenu', function(event) {
                  event.preventDefault();
                });
  
            }
          });
        }
      });
  
    
    }
    else{
      createNotification('Sorry! Lock Screen Password Not Set.','Please Click on Extension icon -> Click on Setting icon -> Set Your Password.');
    }
  }
  catch(e){
    createNotification('Sorry! Lock Screen Password Not Set.','Please Click on Extension icon -> Click on Setting icon -> Set Your Password.');
  }
  })
});

//---------------- SHOW/HIDE SCREEN ------------------------//
function show_lock_screen(){
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          document.getElementById('imvks-pwd').value = "";
          document.body.classList.add("body_blocker");
          document.querySelectorAll('.imvks-container-overlay, .imvks-container, .imvks-my_ip, .imvks-my_btn')
            .forEach(element => element.style.display = 'block');
        }
      });
    }
  });
}
function hide_lock_screen(){
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          document.getElementById('imvks-pwd').value = "";
          document.body.classList.remove("body_blocker");
          document.querySelectorAll('.imvks-container-overlay, .imvks-container, .imvks-my_ip, .imvks-my_btn')
            .forEach(element => element.style.display = 'none');
        }
      });
    }
  });
}

//-------------------- RELOAD/ON LOAD CODE INJECT CHECKER -------------//
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'htmlInjected') {
    try{
      chrome.storage.local.get(['isVisible'], function(r) {
        var a = r.isVisible;
        if(a){ show_lock_screen(); }
        else{ hide_lock_screen(); }
      });
    }
    catch(e){
      console.log('ER_BK_js');
    }
  }
});


//---------------- CONTEXT MENU -------------------------//
chrome.runtime.onInstalled.addListener(function() {
  // Create the context menu item
  chrome.contextMenus.create({
    id: "imvks-tablock",
    title: "Lock Tab",
    contexts: ["page", "selection", "link"],
  });
});

//--------------- LISTENER FOR CONTEXT MENU ----------------//
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "imvks-tablock" && tab && tab.url.startsWith("http")) {
        chrome.storage.local.set({ isVisible: true });
        chrome.storage.local.get(['isVisible'], function(r) {
          var a = r.isVisible;
          console.log('NEW STATE:',a);

          //CHECK FOR WHITELIST DOMAINS IF FOUND THEN ACTION//
          try{
              chrome.storage.sync.get('whitelist', (data) => {
                if ('whitelist' in data) {
                  const data1 = data.whitelist;
                  data1.forEach(item => {
                      console.log(item);
                      if(tab.url.includes(item)){ 
                        hide_lock_screen(); 
                        createNotification('The '+tab.url+' is in Whitelist.','You cannot Lock this Tab.');
                      }
                      else{ show_lock_screen(); }
                  });
                }
                else {
                  console.log('NO_DOMAINS_FOUND');
                  show_lock_screen();
                }
              });
              // if(a){ show_lock_screen(); }
              // else{ hide_lock_screen(); }    
            
          }
          catch{
            console.log("DOMAIN_LOCK_ERR:");
          }
          
          
        });
  }
});

//---------- STORAGE CHANGES -------------------//
function handleStorageChange(changes, area) {
  if (area === 'local' && changes.isVisible) {
    var newValue = changes.isVisible.newValue;
    if(newValue === true){
      show_lock_screen();
    }
    else{
      hide_lock_screen();
    }
  }
}

// Register the event listener for storage changes
chrome.storage.onChanged.addListener(handleStorageChange);

//-------------- NOTIFICATION CREATOR -----------//
function createNotification(title_g,msg) {
  var options = {
      type: 'basic',
      iconUrl: '/assets/icon.png',
      title: title_g,
      message: msg,
  };  
  chrome.notifications.create('notificationId', options, function(notificationId) {
  });
}


//------------------------------------------------------------ END OF BACKGROUND.JS --------------------------------------//
