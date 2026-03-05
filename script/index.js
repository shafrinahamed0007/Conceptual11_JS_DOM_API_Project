const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");

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
    categoriesContainer.appendChild(btn);
  });
}


// loading tress data
async function loadTress() {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  displayTress(data.plants);
}


// display trees details
function displayTress(trees) {
  // console.log(trees)
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100  shadow-sm";
    card.innerHTML = `
        <figure class="rounded-md m-2 h-[178px] object-cover">
                            <img src="${tree.image}" title = "${tree.name}" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">${tree.name}</h2>
                            <p class="text-left text-[12px] line-clamp-2">${tree.description}</p>
                            <div class="grid grid-cols-2 ">
                                <div class="badge bg-[#DCFCE7] text-[#15803D] py-1 px-3 ">${tree.category}</div>
                                <p class="text-right text-[#1F2937]">৳${tree.price}</p>

                            </div>
                            <div class="card-actions justify-end mt-4">

                                <button class="btn bgPrimary py-3 p-5 w-full rounded-4xl">Add To Cart</button>
                            </div>
                        </div>
        
        `;
        treesContainer.appendChild(card)
  });
}

loadCategories();
loadTress();
