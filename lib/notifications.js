export function createNotification() {
console.log('finctiojs,dfnkd');
var options = {
    type: 'basic',
    iconUrl: '/assets/icon.png',
    title: 'Sorry, Please Enter Password',
    message: 'This Feature is not available right now!',
};

chrome.notifications.create('notificationId', options, function(notificationId) {
    console.log('Notification created with ID: ' + notificationId);
});
}
