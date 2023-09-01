const phHeadingBtn =async () => {
   const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
   const data = await response.json();
   display(data.data[0].category_id);
   const phBtnContainer = document.getElementById("phBtncontainer");
   data.data.forEach(btnData => {
      const div = document.createElement('div');
      div.innerHTML =  `<button onclick="display('${btnData.category_id}')" class="btn btn-active btn-ghost">${btnData.category}</button>`
      phBtnContainer.appendChild(div);
   });
   const category = data.data;
}
phHeadingBtn();

const display = async id => {
   const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
   const data = await res.json();
   console.log(data);
   const tubeContainer = document.getElementById('tube-container');
   tubeContainer.innerText = "";
   data.data.forEach(details => {
      console.log(details);
      const div = document.createElement('div');
      div.classList = `card w-full bg-base-100 shadow-xl max-w-[400px] mx-auto`
      div.innerHTML = 
      `<figure><img src="${details.thumbnail}" alt="Shoes" class="h-[200px]" /></figure>
      <div class="card-body flex flex-row">
         <div class="w-1/4">
            <img class="rounded-full h-[50px]" src="${details.authors[0].profile_picture}" alt="">
         </div>
         <div class="w-3/4">
            <h2 class="card-title">
               ${details.title}
            </h2>
            <p>${details.authors[0].profile_name}</p>
            <p>${details?.others?.views}</p>
         </div>
         
      </div>`;
      tubeContainer.appendChild(div);
   })
   if(tubeContainer.innerText === ""){
      const noContent = document.getElementById('no-content');
      noContent.classList.remove('hidden');
   }
   else{
      const noContent = document.getElementById('no-content');
      noContent.classList.add('hidden');
   }
}

