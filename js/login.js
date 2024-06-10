const loginForm = document.querySelector('.login-form');

//登入成功、失敗 todo
loginForm.addEventListener('submit', (event) =>{
  event.preventDefault();
  console.log("登入成功")
  console.log("登入失敗")
})