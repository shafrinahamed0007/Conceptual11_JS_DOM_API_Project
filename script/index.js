const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const allTressBtn = document.getElementById("allTressBtn");
const treeDetailsModal = document.getElementById("tree_details_modal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalDectription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalTitle = document.getElementById("modalTitle");

let cart = [];

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  treesContainer.innerHTML = "";
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

// load All Categoires
async function loadCategories() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );

  const data = await res.json();

  data.categories.forEach((category) => {
    // console.log(category.category_name)

    const btn = document.createElement("button");
    btn.className = "btn bg-outline my-1 w-full";
    btn.textContent = category.category_name;
    btn.onclick = () => selectCategory(category.id, btn);
    categoriesContainer.appendChild(btn);
  });
}

async function selectCategory(categoryId, btn) {
  //   console.log(categoryId, btn)
  showLoading();

  const allButtons = document.querySelectorAll(
    "#categoriesContainer button, #allTressBtn",
  );
  //   console.log(allButtons)
  allButtons.forEach((btn) => {
    btn.classList.remove("bgPrimary");
    btn.classList.add("btn-outline");
  });
  btn.classList.add("bgPrimary");
  btn.classList.remove("btn-outline");

  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`,
  );
  const data = await res.json();
  //   console.log(data);
  displayTress(data.plants);
  hideLoading();
}

allTressBtn.addEventListener("click", () => {
  // update active button style
  const allButtons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesBtn",
  );

  allButtons.forEach((btn) => {
    btn.classList.remove("bgPrimary");
    btn.classList.add("btn-outline");
  });

  allTressBtn.classList.add("bgPrimary");
  allTressBtn.classList.remove("btn-outline");
  loadTress();
});

// loading tress data
async function loadTress() {
  showLoading();

  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  hideLoading();
  displayTress(data.plants);
}

// display trees details
function displayTress(trees) {
  // console.log(trees)
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100  shadow-sm";
    card.innerHTML = `
        <figure class="rounded-md m-2 h-[178px] object-cover cursor-pointer">
                            <img src="${tree.image}" title = "${tree.name}" onclick = "openTreeModal(${tree.id})" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title cursor-pointer hover:text-green-500"  onclick = "openTreeModal(${tree.id})">${tree.name}</h2>
                            <p class="text-left text-[12px] line-clamp-2">${tree.description}</p>
                            <div class="grid grid-cols-2 ">
                                <div class="badge bg-[#DCFCE7] text-[#15803D] py-1 px-3 ">${tree.category}</div>
                                <p class="text-right text-[#1F2937]">৳${tree.price}</p>

                            </div>
                            <div class="card-actions justify-end mt-4">

                                <button class="btn bgPrimary py-3 p-5 w-full rounded-4xl" onclick = "addToCard(${tree.id}, '${tree.name}', ${tree.price})">Add To Cart</button>
                            </div>
                        </div>
        
        `;
    treesContainer.appendChild(card);
  });
}

async function openTreeModal(treeId) {
  // console.log(treeId, "TreeID")
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${treeId}`,
  );
  const data = await res.json();
  const plantsDetails = data.plants;
  // console.log(plantsDetails)
  treeDetailsModal.showModal();
  modalTitle.textContent = plantsDetails.name;
  modalImage.src = plantsDetails.image;
  modalDectription.textContent = plantsDetails.description;
  modalCategory.textContent = plantsDetails.category;
  modalPrice.textContent = plantsDetails.price;
}

function addToCard(id, name, price) {
  // console.log(id, name, price);
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1,
    });
  }
  updateCart();
}

function updateCart() {
  cartContainer.innerHTML = "";
  // console.log(cart);
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "card card-body bg-gray-100";
    cartItem.innerHTML = `
    <div class="card card-body shadow-2xl">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h2>${item.name}</h2>
                                    <p>৳${item.price} * ${item.quantity}</p>
                                </div>
                                <button onclick="removeFromCart(${item.id})" class="btn btn-ghost"><i class="fa-solid fa-x"></i></button>
                            </div>
                            <p class="text-right font-semibold text-xl">৳${item.price} * ${item.quantity}</p>

                        </div>
                      
    
    `;
    cartContainer.appendChild(cartItem);
  });
}

function removeFromCart(treeId){
  // console.log(treeId)
  const updatedCartElements = cart.filter(item => item.id != treeId);
  // console.log(updatedCartElements)
  cart = updatedCartElements;
  updateCart();


}

loadCategories();
loadTress();
