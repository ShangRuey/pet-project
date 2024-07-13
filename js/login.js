const loginForm = document.querySelector('.login-form');
const userName = document.querySelector('#username');
const password = document.querySelector('#password');

//模擬使用者資料
const user = {
  account: 'test',
  password: 'test'
}

console.log(user)
//模擬登入提交功能
loginForm.addEventListener('submit', (event) =>{
  event.preventDefault();
  const enterAccount = userName.value.trim();
  const enterPassword = password.value.trim();
  if(user.account === enterAccount && user.password === enterPassword){
    console.log("登入成功")
    /* 模擬擁有authkey 並儲存於Cookie
    const authkey = 'testAuth'
    setCookie('authkey', authkey)
    */
    //跳轉回前網頁
    window.history.back();    
  }
  else{
    console.log("登入失敗")
  }
})