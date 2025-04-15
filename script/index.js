let currentData = [];

const fetchCatagoryData = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
        const data = await response.json();
        // console.log(data.categories);
        displayCatagory(data.categories);
    } catch (error) {
        console.error("Error fetching animal data:", error);
    }
}

const activeBtn = (catagory) => {
    const container = document.getElementById("catagoryShowcase");
    const buttons = container.querySelectorAll("button");
    buttons.forEach((button) => {
        if (button.id === catagory) {
            button.classList.remove("bg-white");
            button.classList.add("bg-[#008a5626]", "border-[#0E7A81]");
            button.classList.remove("hover:bg-[#e7e3e4]");
        } else {
            button.classList.remove("bg-[#008a5626]", "border-[#0E7A81]");
            button.classList.add("hover:bg-[#e7e3e4]");
        }
    })
}

const displayCatagory = (catagories) => {
    const container = document.getElementById("catagoryShowcase");

    catagories.forEach((catagory) => {
        const catagorybtn = document.createElement("button");
        catagorybtn.id = catagory.category;
        catagorybtn.classList = "btn w-36 p-6 rounded-2xl bg-white hover:bg-[#e7e3e4] font-bold text-lg";
        catagorybtn.innerHTML = `
            <img src=${catagory.category_icon} alt="" class="w-6 mr-1" />
            ${catagory.category}
        `;
        catagorybtn.addEventListener("click", () => {
            fetchFilteredAnimalData(` https://openapi.programming-hero.com/api/peddy/category/${catagory.category.toLowerCase()}`);
            // console.log("loading");
            activeBtn(catagory.category);
        })

        container.appendChild(catagorybtn);
    })
}

const fetchAnimalData = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
        const data = await response.json();
        // console.log(data.pets);
        currentData = data.pets;
        displayAnimals(data.pets);
    } catch (error) {
        console.error("Error fetching animal data:", error);
    }
}

const fetchFilteredAnimalData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.pets);
        if (data.data.length === 0) {
            currentData = data.data;
            noInfo();
        }
        else {
            currentData = data.data;displayAnimals(data.data);
        }
    } catch (error) {
        console.error("Error fetching animal data:", error);
    }
}

const addToLikedList = (image, name) => {
    const container = document.getElementById("likedList");

    const likedCard = document.createElement("div");
    likedCard.classList = "w-[124px] h-[82px] border";
    likedCard.innerHTML = `
        <img src=${image} alt=${name} class="w-[124px] object-scale-down object-center">
    `;
    container.appendChild(likedCard);    
}

const sortByPrice = () => {
    const sortedData = [...currentData].sort((a, b) => b.price - a.price);
    displayAnimals(sortedData);
};

document.getElementById("btnSortByPrice").addEventListener("click", sortByPrice);

const displayAnimals = (animals) => {
    const container = document.getElementById("petShowcase");
    container.innerHTML = "";
    container.classList = "w-fit flex-1 flex flex-wrap gap-4 justify-center md:justify-start";

    animals.forEach((animal) => {
        const animalCard = document.createElement("div");
        animalCard.id = animal.petId;
        animalCard.classList = "border border-[#13131340] w-fit max-w-[300px] p-4 rounded-xl";
        animalCard.innerHTML = `
            <div class="rounded-lg">
                <img src=${animal.image} alt=${animal.image} class="object-cover w-[266px] h-[178px] rounded-lg">
            </div>

            <div class="text-[#6c6964]">
                <h3 class="mt-4 mx-1 text-lg font-bold text-black">${animal.pet_name || "N/A"}</h3>
                <p class="flex gap-2 m-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                    </svg> Breed: ${animal.breed || "N/A"}
                </p>

                <p class="flex gap-2 m-1">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
                    </svg> Birth: ${animal.date_of_birth || "N/A"}
                </p>

                <p class="flex gap-2 mx-1">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" width="24px" height="24px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <line style="fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;" x1="4" y1="22.583" x2="9.417" y2="28"></line> <polyline style="fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;" points="22,4 28,4 28,10 "></polyline> <line style="fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;" x1="28" y1="4" x2="22.232" y2="9.768"></line> <line style="fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;" x1="4" y1="28" x2="9.454" y2="22.546"></line> <path d="M15.86,11.255c-0.114,0.087-0.232,0.167-0.334,0.27c-0.433,0.433-0.723,0.964-0.883,1.538 c1.09,0.14,2.102,0.612,2.892,1.402C18.479,15.409,19,16.665,19,18s-0.521,2.591-1.465,3.536S15.335,23,14,23 s-2.591-0.52-3.535-1.464S9,19.335,9,18c0-0.865,0.239-1.686,0.65-2.421C9.553,15.063,9.5,14.536,9.5,14 c0-0.498,0.05-0.987,0.133-1.467c-0.201,0.162-0.397,0.332-0.582,0.517C7.729,14.373,7,16.13,7,18s0.729,3.627,2.051,4.95 S12.13,25,14,25s3.627-0.728,4.949-2.05S21,19.87,21,18s-0.729-3.627-2.051-4.95C18.078,12.179,17.016,11.572,15.86,11.255z"></path> <path d="M22.949,9.05C21.627,7.728,19.87,7,18,7s-3.627,0.728-4.949,2.05S11,12.13,11,14s0.729,3.627,2.051,4.95 c0.871,0.871,1.933,1.478,3.089,1.795c0.114-0.087,0.232-0.167,0.334-0.27c0.433-0.433,0.723-0.964,0.883-1.538 c-1.09-0.14-2.102-0.612-2.892-1.402C13.521,16.591,13,15.335,13,14s0.521-2.591,1.465-3.536S16.665,9,18,9s2.591,0.52,3.535,1.464 S23,12.665,23,14c0,0.865-0.239,1.686-0.65,2.421c0.096,0.516,0.15,1.043,0.15,1.579c0,0.498-0.05,0.987-0.133,1.467 c0.201-0.162,0.397-0.332,0.582-0.517C24.271,17.627,25,15.87,25,14S24.271,10.373,22.949,9.05z"></path> </g></svg> Gender: ${animal.gender || "N/A"}
                </p>

                <p class="flex gap-2 m-1">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
                    </svg> Price: ${animal.price || "N/A"}$
                </p>       
            </div>
            
            <div class="divider my-1"></div>

            <div class="flex justify-between items-center gap-4">
                <button id=${`like${animal.petId}`} class="btn rounded-lg border-[#008a5626] hover:text-[#0E7A81] hover:border-[#008a5626]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                </button>
                <button class="btn rounded-lg px-4 text-[#0E7A81] text-lg font-bold border-[#008a5626] hover:bg-[#0E7A81] hover:text-white">Adopt</button>

                <button class="btn rounded-lg px-4 text-[#0E7A81] text-lg font-bold border-[#008a5626] hover:bg-[#0E7A81] hover:text-white">Details</button>
            </div>
        `;

        animalCard.querySelector(`#like${animal.petId}`).addEventListener("click", () => {
            console.log("liked");
            addToLikedList(animal.image, animal.pet_name);
        });

        container.appendChild(animalCard);
    })
}

const noInfo = () => {
    const container = document.getElementById("petShowcase");
    container.innerHTML = `
        <div class="hero bg-base-200 h-[440px] rounded-xl">
            <div class="hero-content  text-center flex items-center justify-center flex-col">
                <div class="max-w-md">
                    <img src="./assets/error.webp" alt="" class="object-cover m-auto mt-2">
                    <h1 class="py-4 text-5xl font-bold">No Information Available</h1>
                    <p class="">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
            </div>
        </div>
    `;
}



fetchCatagoryData();
fetchAnimalData();