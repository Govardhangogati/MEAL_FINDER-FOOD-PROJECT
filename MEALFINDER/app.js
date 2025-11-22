async function loadcategories() {
    let side_list=document.getElementById('side-list')
    let data=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let products=await data.json()
    let product=products.categories.map(item=>{
        return`
            <a onclick='selectCategory(${JSON.stringify(item.strCategory)}, ${JSON.stringify(item.strCategoryDescription)})' href="./meals.html"  >
                <li>${item.strCategory}</li>
            </a>
        `
    })
    side_list.innerHTML=product.join('')
    console.log(side_list)
    
}
loadcategories()

let hamburger=document.getElementById('hamburger')
hamburger.addEventListener('click',()=>{
    let sidebar=document.getElementById('sidebar')
    sidebar.classList.add('activate-sidebar')
})




// FOR DISPLAYING ALL CATEGORIES
async function category(){
    let category_container=document.getElementById('category-container')
    let data=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let products=await data.json()
    console.log(products);
    
    let product=products.categories.map(item=>{
        return`
            <div id="category-card">
            <a onclick='selectCategory(${JSON.stringify(item.strCategory)}, ${JSON.stringify(item.strCategoryDescription)})' href="./meals.html"  ><img src="${item.strCategoryThumb}" alt="">
                <span class='category-name'>${item.strCategory.toUpperCase()}</span>
            </a>
            </div>
        `
    })
    category_container.innerHTML=product.join('')
}
category()

function selectCategory(categoryname,categoryDescription){
    localStorage.setItem('selectedcategory',categoryname.trim())
    localStorage.setItem('description',categoryDescription)
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
    let description=localStorage.getItem('description')
    let mealCategory=document.getElementById('mealCategory')
    let desc=document.getElementById('desc');
    mealCategory.innerHTML=category
    desc.innerHTML=description
    let prod=document.getElementById('prod')
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let res=await data.json()
    console.log(res)

    let product=res.meals.map(item =>{
        return`
            <div id="category-card">
            <a onclick="loadmealsDetails(${item.idMeal})" href="./meals_details.html"><img src="${item.strMealThumb}" alt="">
                <p id='pname'>${item.strMeal}</p>
            </a>
            </div>
        `
    })
    prod.innerHTML=product.join('')
}
if(document.getElementById('prod')){
    loadMeals()
}


function loadmealsDetails(mealId){
    localStorage.setItem('mealId',mealId)
}



// ___________________________________________________________________________


async function meals(){
    let id=localStorage.getItem('mealId')
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let res=await data.json()
    let meal_product=document.getElementById('meal-product')
    console.log(res);
    
    let product=res.meals.map(item =>{
        let ingredients=[]
        let measures=[]
        let instructions=item.strInstructions.replace(/\d+\.\s*/g, "").replace(/\r/g, "");

        let res=instructions.split('\n')
        let meal_name=document.getElementById('meal-name');
        console.log(item.strMeal);
        meal_name.innerHTML=item.strMeal.toUpperCase()
        

        
        
        for(let i=1;i<20;i++){
            let meas=item[`strMeasure${i}`]
            let ing=item[`strIngredient${i}`]
            if(ing!=''){
                ingredients.push(`${ing}`)
            }
            if(meas!=''&&meas!=' '){
                measures.push(meas)
            }
        }
        return`
            <div id="meal_product_card">
            <a href="">
            <div class="img-content" id="img-content">
                <img src="${item.strMealThumb}" alt="">
                <span id="text">
                    <h1>${item.strMeal}</h1>
                    <p id="category-text"><strong>CATEGORY: </strong>${item.strCategory.toUpperCase()}</p>
                    <p><strong>Source: </strong>${item.strSource}</p>
                    <p><strong>Tags:</strong>${item.strTags}</p>
                    <div class="ingredients-info"><h2>Ingredients</h2>
                        <ol id="ingredients">
                            ${ingredients.map(i => `<li>${i}</li>`).join('')}

                        </ol>
                    </div>
                </span>
            </div>
            <div class="measures-info" id="measures-info">
                <h2>Measures:</h2>
                <ul id="measures">
                    ${measures.map(i=>`
                        <div id="spoon-gap">
                        <i id="spoon" class="fa-solid fa-spoon" ></i>${i}
                        </div>
                        `).join('')
                        
                    }
                </ul>
            </div>
            <div id="instructions">
                    <h2>Instructions:</h2>
                    <div id="instr">
                        ${res.map(i=>i.trim()).filter(i=>i!='').map(i=>`
                        
                         <div class="step">   
                            <i id="check" class="fa-regular fa-square-check"></i>${i}
                           </div> 
                        
                        `).join('')}
                    </div>
            </div>
            </a>
            </div>
        `
    })
    meal_product.innerHTML=product.join('')
    
}
if(document.getElementById('meal-product')){
    meals()
}



let cancel=document.getElementById('cancel');
cancel.addEventListener('click',()=>{
    sidebar.classList.remove('activate-sidebar')

})



