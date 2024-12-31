const leftSideImg =async (petId)=>{
  const uri=(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
 const res=await fetch(uri);
 const data=await res.json();
 displayImg(data.petData)
}
const displayImg=(img)=>{
  console.log(img)
  
  const showImg=document.getElementById('showImg');
 

 const {image}=img; 
 const div=document.createElement('div');
 div.classList.add('m-4')
 
 
 div.innerHTML=`
 

  <img class="w-20 h-20 rounded-lg" src=${image}/>


 

 
 
 `;
 showImg.appendChild(div)

}


/**
 * ! left side functionality
 */
const removeActiveClass=()=>{
  const buttons=document.getElementsByClassName("category-btn");
  for(let btn of buttons){
    btn.classList.remove("active")
  }
}






const loadCategoryData = (id) => {

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn=document.getElementById(`btn-${id}`);
    activeBtn.classList.add("active")
      
      displayAllPets(data.data)
    })  
};
// loadButton
const loadButton=()=>{
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
  .then(res=>res.json())
  .then(data=>displayButton(data.categories))
}
// display button
const displayButton=(buttons)=>{
buttons.forEach(button=>{
  const {category,category_icon,id}=button;
  const buttonContainer =document.getElementById('buttonContainer');
  buttonContainer.classList="grid grid-cols-1 gap-4 text-center mt-12 mb-12 md:grid-cols-2 lg:grid-cols-4"
  const buttonFunctionality=document.createElement('div');
  buttonFunctionality.classList='flex justify-center items-center';
  buttonFunctionality.innerHTML=`
 
  <button id="btn-${category}" class="btn w-32 mx-auto flex items-center category-btn">
  <img class="w-8 h-8 mr-3" src=${category_icon} alt="${category} icon">
  ${category}
  </button>
  `;
   // Add onclick event using JavaScript
   const buttonElement = buttonFunctionality.querySelector('button');
   buttonElement.onclick = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block'; // Show spinner
     setTimeout(() => {
      spinner.style.display = 'none';
       loadCategoryData(category);
     }, 2000); // 2-second delay
   };

  buttonContainer.appendChild(buttonFunctionality)
})
}
// button call
loadButton();

/**
 * ! load pets
 */
const allPetsLoad=()=>{
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
  .then(res=>res.json())
  .then(data=>displayAllPets(data.pets))
};
const displayAllPets=(animal)=>{
  
  const leftSideFunctionality = document.getElementById('left-side-functionality');
  leftSideFunctionality.innerHTML = '';
  if(animal.length===0){
    leftSideFunctionality.classList.remove('md:grid', 'lg:grid', 'lg:grid-cols-3', 'md:grid-cols-2', 'grid-cols-1')
    leftSideFunctionality.innerHTML=`
    <div class="min-h-screen flex flex-col gap-5 justify-center items-center mx-auto">
    <img src="assets/images/error.webp">
    <h2 class="font-bold text-2xl text-gray-800">No Information Available</h2>
    <p class="font-light text-md text-gray-800">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
    return;
  }
  else{leftSideFunctionality.classList.add('md:grid', 'lg:grid', 'lg:grid-cols-3', 'md:grid-cols-2', 'grid-cols-1')}

  animal.forEach(pet => {
    const { image, pet_name, breed, date_of_birth, gender, price,petId} = pet;
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="card w-[210px] object-cover shadow-sm ">
        <figure class="pt-10">
          <img src=${image || "fallback-image.jpg"} alt="Pet Image" class="rounded-xl" />
        </figure>
        <div>
          <h2 class="text-2xl font-bold">${pet_name}</h2>
          <div class="flex gap-2 text-gray-500 items-center">
            <img class="w-4 h-4" src="assets/Frame.jpg">
            <span>Breed: ${breed}</span>
          </div>
          <div>
            ${date_of_birth 
              ? `<div class="flex gap-2 text-gray-500 items-center"><img class="w-4 h-4" src="assets/Vector.jpg">Birth: <span>${date_of_birth}</span></div>` 
              : `<span class="text-gray-500 pl-3">Not available data</span>`}
            ${gender 
              ? `<div class="flex gap-2 text-gray-500 items-center"><img class="w-4 h-4" src="assets/Frame (1).jpg"><span>Gender: ${gender}</span></div>` 
              : `<span class="text-gray-500 pl-3">Not available data</span>`}
            <div class="flex gap-2 text-gray-500 items-center"><img class="w-4 h-4" src="assets/Frame (2).jpg"><span>Price: ${price}</span></div>
          </div>
          <div class="flex justify-evenly items-center">
            <button class="btn btn-sm" onclick="leftSideImg('${petId}')"><img class="w-6 h-6" src="assets/Frame 1171276315.jpg"></button>
            <button onclick="coundownStart()" class="btn btn-sm" >Adopt</button>
            <button onclick="petDetails('${petId}')" class="btn btn-sm">Details</button>
          </div>
        </div>
      </div>
    `;
    leftSideFunctionality.appendChild(container);
  });
}

const petDetails =async (petId)=>{
  const uri=(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
 const res=await fetch(uri);
 const data=await res.json();
 displayDetails(data.petData)
}

const displayDetails=(details)=>{
  const { image, pet_name, breed, date_of_birth, gender, price,petId,vaccinated_status,
    pet_details
    } = details
  const detailsContainer=document.getElementById('modal-content');
 
  detailsContainer.innerHTML=`
  <img src=${image} class="w-full h-40">
  <h2 class="text-2xl font-bold mt-5 pl-5">${pet_name}</h2>
<div class="container flex justify-between px-10">
<div class="left-side">
 <div class="flex gap-2 text-gray-500 items-center">
            <img class="w-4 h-4" src="assets/Frame.jpg">
            <span>Breed: ${breed}</span>
          </div>
           ${gender 
              ? `<div class="flex gap-2 text-gray-500 items-center"><img class="w-4 h-4" src="assets/Frame (1).jpg"><span>Gender: ${gender}</span></div>` 
              : `<span class="text-gray-500 pl-3">Not available data</span>`}
              <p class="font-bold text-md text-blue-500">Vaccinated status: ${vaccinated_status}</p>
</div>

<div>

 ${date_of_birth 
              ? `<div class="flex gap-2 text-gray-500 items-center"><img class="w-4 h-4" src="assets/Vector.jpg">Birth: <span>${date_of_birth}</span></div>` 
              : `<span class="text-gray-500 pl-3">Not available data</span>`}
              <div class="flex gap-2 text-gray-500 items-center"><img class="w-4 h-4" src="assets/Frame (2).jpg"><span>Price: ${price}</span></div>



</div>
</div>
<p class="font-medium text-md text-teal-900 mt-8 mb-10">Details information</p>
<p class="font-semibold text-md text-red-400">${pet_details}</p>`
  document.getElementById('my_modal_5').showModal();
}

/**
 * coundown modal
 */

function coundownStart(){
  
  const timerDisplay=document.getElementById('timer');
  const show=document.getElementById('coundownModal');
show.classList.remove('hidden');
const startCoundown=()=>{
  let time= 3;
  timerDisplay.textContent=time;
  const interVal=setInterval(()=>{
    time--;
    timerDisplay.textContent=time;
    if(time<=0){
      clearInterval(interVal);
      show.classList.add('hidden');
    }
  },1000)

}
startCoundown();

}





  // all pets data call
 allPetsLoad();
 





