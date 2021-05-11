let loginForm = document.getElementById("login");
let registerForm = document.getElementById("register");
let logButton = document.getElementById("loginLogoutButtons");

function register(){
  loginForm.style.left = "-400px";
  registerForm.style.left = "50px";
  logButton.style.left = "110px";
}

function login(){
  loginForm.style.left = "50px";
  registerForm.style.left = "450px";
  logButton.style.left = "0";
}