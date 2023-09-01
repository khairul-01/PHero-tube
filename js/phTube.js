const phHeadingBtn =async () => {
   const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
   const data = await response.json();
   const phBtnContainer = document.getElementById("phBtncontainer");
   data.data.forEach(btnData => {
      const button = document.createElement('button');
      button.classList = `btn btn-active btn-ghost`;
      button.innerText = btnData.category;
      phBtnContainer.appendChild(button);
   })
}
phHeadingBtn();