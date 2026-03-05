const categoriesContainer = document.getElementById("categoriesContainer");

async function loadCategories() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  //   console.log(data);

  data.categories.forEach((category) => {
    // console.log(category.category_name);
    const btn = document.createElement("button");
    btn.className = "btn bg-outline my-1 w-full";
    btn.textContent = category.category_name;
    categoriesContainer.appendChild(btn);
  });

  
}

loadCategories();
