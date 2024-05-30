//設定 dom 變數
const imageMapContainer = document.querySelector(".image-map-container");

/*----------------------------Main----------------------------*/
imageMapContainer.addEventListener("click", (t) =>{
  
  console.log(t.target.className)
  if(t.target.className === 'image-shop-test'){
    console.log(123)
  }
})
/*----------------------------Main----------------------------*/
