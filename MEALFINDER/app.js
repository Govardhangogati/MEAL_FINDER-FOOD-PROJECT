async function category(){
    let category_container=document.getElementById('category-container')
    let data=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let products=await data.json()
    let product=products.categories.map(item=>{
        return`
            <div id="category-card">
            <a href="${item.strCategory}"><img src="${item.strCategoryThumb}" alt="">
                <span class='category-name'>${item.strCategory.toUpperCase()}</span>
            </a>
            </div>
        `
    })
    category_container.innerHTML=product.join('')
}
category()

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
                <a href="#"><img src="${item.strMealThumb}" alt="image"></a>
                <p>${item.strCategory}</p>
                <p>${item.strMeal}</p>
            </div>
        `;
    });

    meals_products.innerHTML = product.join('');
}



