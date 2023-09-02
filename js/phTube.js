// Fetching category name and id
const phHeadingBtn =async () => {
   // fetching from api
   const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
   const data = await response.json();

   // Normally displaying first category data automatically
   display(data.data[0].category_id);

   const phBtnContainer = document.getElementById("phBtncontainer");
   data.data.forEach(btnData => {
      // Dynamically creating button and it's attribute and assign each button name
      const div = document.createElement('div');
      div.innerHTML =  `<button id="${btnData.category_id}" onclick="display('${btnData.category_id}', '${this}')" class="btn btn-active btn-ghost">${btnData.category}</button>`
      phBtnContainer.appendChild(div);
   });
   // first button background and text
   btnBackground(data.data[0].category_id);
   
}
phHeadingBtn();

// Displaying each category data by fetching from api
const display = async (id) => {
   // fetching from api
   const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
   const data = await res.json();
   console.log(data);
   let sort = data.data;
   const tubeContainer = document.getElementById('tube-container');
   
   // initially setting no content
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
            <p>${details.authors[0].profile_name}  <span id="${details.authors[0].profile_name}" class="badge badge-primary badge-xs rounded-full p-2 hidden"><i class="fa-solid fa-check"></i></span></p>
            <p>${details?.others?.views}</p>
         </div>
         
      </div>`;
      tubeContainer.appendChild(div);
      if(details.authors[0].verified === true){
         document.getElementById(`${details.authors[0].profile_name}`).classList.remove('hidden');
      }
      else{
         document.getElementById(`${details.authors[0].profile_name}`).classList.add('hidden');
      }
   })
   if(tubeContainer.innerText === ""){
      const noContent = document.getElementById('no-content');
      noContent.classList.remove('hidden');
   }
   else{
      const noContent = document.getElementById('no-content');
      noContent.classList.add('hidden');
   }
   
   // Sort method call
   document.getElementById('sort-view').addEventListener('click', () =>{
      dataSortByView(data.data);
   });
}

// background change function 
const btnBackground = id => {
   document.getElementById(id).classList.add('text-white');
   document.getElementById(id).classList.remove('btn-ghost');
   document.getElementById(id).classList.add('btn-error');
}

function dataSortByView(id){
   console.log(id);
   const arr = [];
   for(const i of id){
      arr.push(i);
   }
   for(const i of arr){
      i.others.views = parseFloat(i.others.views);
   }
   console.log(arr);
   
   arr.sort(function(a, b){
      return b.others.views - a.others.views;
   });
   for(const i of arr){
      i.others.views = i.others.views + "K";
   }
   console.log('after:', arr);


   const tubeContainer = document.getElementById('tube-container');
   
   // initially setting no content
   tubeContainer.innerText = "";

   arr.forEach(details => {
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
            <p>${details.authors[0].profile_name}  <span id="${details.authors[0].profile_name}" class="badge badge-primary badge-xs rounded-full p-2 hidden"><i class="fa-solid fa-check"></i></span></p>
            <p>${details?.others?.views}</p>
         </div>
         
      </div>`;
      tubeContainer.appendChild(div);
      if(details.authors[0].verified === true){
         document.getElementById(`${details.authors[0].profile_name}`).classList.remove('hidden');
      }
      else{
         document.getElementById(`${details.authors[0].profile_name}`).classList.add('hidden');
      }
   })
}