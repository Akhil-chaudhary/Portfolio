const firebaseConfig = {
    apiKey: "AIzaSyAIl-EpAdZmjnEJAmWyUR2VaeTsD2mup_w",
    authDomain: "portfolio-1cfc2.firebaseapp.com",
    databaseURL: "https://portfolio-1cfc2.firebaseio.com",
    projectId: "portfolio-1cfc2",
    storageBucket: "portfolio-1cfc2.appspot.com",
    messagingSenderId: "345848544510",
    appId: "1:345848544510:web:de617f893f95e18bceb9af"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//Message collection reference
var messagesRef = firebase.database().ref('messages');

//Listen for form
document.getElementById('contactForm').addEventListener('submit',submitForm);

//Submit form
function submitForm(e){
    // e.preventDeafault();
    //getb values
    var name=getInputVal('contactName');
    var email=getInputVal('contactEmail');
    var subject=getInputVal('contactSubject');
    var message=getInputVal('contactMessage');
    //Save message
    console.log(name);
    sLoader.slideUp("slow"); 
    $('.message-warning').fadeOut();
    $('#contactForm').fadeOut();
    $('.message-success').fadeIn();
    saveMessage(name,email,subject,message);
}

//Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save message to firebase
function saveMessage(name,email,subject,message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name:name,
        email:email,
        subject:subject,
        message:message,
    });
}