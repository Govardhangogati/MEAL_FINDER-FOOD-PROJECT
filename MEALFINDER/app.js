// FOR DISPLAYING ALL CATEGORIES
async function category(){
    let category_container=document.getElementById('category-container')
    let data=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let products=await data.json()
    let product=products.categories.map(item=>{
        return`
            <div id="category-card">
            <a onclick="selectCategory('${item.strCategory}')" href="./meals.html"  ><img src="${item.strCategoryThumb}" alt="">
                <span class='category-name'>${item.strCategory.toUpperCase()}</span>
            </a>
            </div>
        `
    })
    category_container.innerHTML=product.join('')
}
category()

function selectCategory(categoryname){
    localStorage.setItem('selectedcategory',categoryname)
}
// _______________________________________________________________________________

// FOR SEARCHING A MEAL

async function search() {
    let meals = document.getElementById('meals-container');
    meals.classList.toggle('active');

    let meals_products = document.getElementById('meals-products');
    let input = document.getElementById('user-input').value.trim();

    let searchData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
    let searchProduct = await searchData.json();

    console.log(searchProduct);

    if (searchProduct.meals === null || input.length === 0) {
        meals_products.innerHTML = `No data found`;
        return;
    }

    let product = searchProduct.meals.map(item => {
        return `
            <div id="category-card">
                <a href="#"><img src="${item.strMealThumb}" alt="image">
                <p class='para1'>${item.strArea}</p>
                <p class='para2'>${item.strMeal}</p>
                <span class='meal-name'>${item.strCategory.toUpperCase()}</span>
                </a>
            </div>
        `;
    });

    meals_products.innerHTML = product.join('');
}

// ______________________________________________________________


// FILTER FOOD BASED ON CATEGORY WHEN CLICK ON CATEGORY

async function loadMeals(){
    let category=localStorage.getItem('selectedcategory')
    let prod=document.getElementById('prod')
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let res=await data.json()
    console.log(res)

    let product=res.meals.map(item =>{
        return`
            <div id="category-card">
            <a href=""><img src="${item.strMealThumb}" alt="">
                <p id='pname'>${item.strMeal}</p>
            </a>
            </div>
        `
    })
    prod.innerHTML=product.join('')
}
loadMeals()

// ___________________________________________________________________________




