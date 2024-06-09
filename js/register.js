const registerForm = document.querySelector("#register-form");

registerForm.addEventListener('submit', (event) =>{
  event.preventDefault();
  window.location.href="./login.html";
})