// ALL javascript code that ineracts with the page is used here.

// This code is required in the HTML by a require('renderer.js) and thus runs from the page.

// The DOM can be accessed from this file.

const remote = require('electron').remote;
const main = remote.require('./main.js')


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDS0N-0jJfbDjpaojROLdOMlP25U_hV31A",
    authDomain: "projectpal-9f83d.firebaseapp.com",
    databaseURL: "https://projectpal-9f83d.firebaseio.com",
    projectId: "projectpal-9f83d",
    storageBucket: "",
    messagingSenderId: "99275679456"
};
var loginApp = firebase.initializeApp(config);



var signupBtn = document.getElementById("signUpButton");
var logInBtn = document.getElementById("logInButton");

signupBtn.addEventListener("click", function () {
    var emailField = document.getElementById("emailTextField").value;
    var passwordField = document.getElementById("passwordTextField").value;

    firebase.auth().createUserWithEmailAndPassword(emailField, passwordField).then(function () {
        $("<div>User created successfully!</div>").dialog();
        document.getElementById('emailTextField').value = "";
        document.getElementById('passwordTextField').value = "";
    }).catch(function (error) {
        if (error != null) {
            $("<div>Error in creating your account, please try again.</div>").dialog();
            document.getElementById('emailTextField').value = "";
            document.getElementById('passwordTextField').value = "";
            return;
        }
    });

})

logInBtn.addEventListener("click", function () {
    var emailField = document.getElementById("emailTextField").value;
    var passwordField = document.getElementById("passwordTextField").value;


    firebase.auth().signInWithEmailAndPassword(emailField, passwordField).then(function () {
        document.getElementById('emailTextField').value = "";
        document.getElementById('passwordTextField').value = "";
        var currentWindow = remote.getCurrentWindow()
        main.openWindow('main')
        currentWindow.close()

    }).catch(function (error) {
        if (error != null) {
            $("<div>Username or password incorrect, please try again.</div>").dialog();
            document.getElementById('emailTextField').value = "";
            document.getElementById('passwordTextField').value = "";
            return;
        }
    });

});