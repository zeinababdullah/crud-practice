var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productImage = document.getElementById("productImage");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var productList = [];
var currentIndex;

var regex = {
    productName : {
        regexValue: /^[a-zA-Z0-9]{3,8}$/,
        isValid : false
    },
    productPrice : {
        regexValue :/^([1-9][0-9]|100)$/,
        isValid : false
    },
    productDesc : {
        regexValue : /^.{10,20}$/,
        isValid : false
    },
    productCategory : {
        regexValue : /^(tv|laptop|mobile|screen|tablet)$/i,
        isValid : false
    }
}


if (localStorage.getItem("productlist") != null) {
    productList = JSON.parse(localStorage.getItem("productlist"));
    display(productList);
}

function adding() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value,
        image: `images/${productImage.files[0]?.name}`
    }
    
    productList.push(product);
    localStorage.setItem("productlist", JSON.stringify(productList));
    display(productList);
    clear();
}

function display(list) {
    var cartona = "";
    for (var i = 0; i < list.length; i++) {
        cartona += `<div class="col-md-4 py-5">
                <div class="border border-2 border-danger item rounded-3 overflow-hidden">
                    <img src="${list[i].image}" class="w-100" alt="image">
                    <div class="text-white p-2">
                        <h4>Name: ${list[i].newName ? list[i].newName : list[i].name}</h4>
                        <p>price: ${list[i].price}</p>
                        <p>desc: ${list[i].desc}</p>
                        <p>category: ${list[i].category}</p>
                        <button class="btn btn-outline-danger w-100 mb-2" onclick ="delet(${i})">Delete</button>
                        <button class="btn btn-outline-warning w-100" onclick="getToUpdate(${i})">Update</button>
                    </div>
                    
                </div>
            </div>`

    }
    document.getElementById("myData").innerHTML = cartona;
}
function clear() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
    productImage.value = "";
    addBtn.disabled = true;
}
function delet(index) {
    productList.splice(index, 1);
    localStorage.setItem("productlist", JSON.stringify(productList));
    display(productList);

}

function getToUpdate(index) {
    currentIndex = index;
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].category;
    productDesc.value = productList[index].desc;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}


function updating() {

    productList[currentIndex].name = productName.value;
    productList[currentIndex].price = productPrice.value;
    productList[currentIndex].category = productCategory.value;
    productList[currentIndex].desc = productDesc.value;

    display(productList);
    localStorage.setItem("productlist", JSON.stringify(productList));
    clear();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
}


function search(searchValue) {
    var searchList = [];

    if (searchValue == " ") {
        display(productList);
        return;
    }

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
            productList[i].newName = productList[i].name.toLowerCase().replace(searchValue.toLowerCase(), `<span class="text-danger">${searchValue}</span>`);
            searchList.push(productList[i]);
                // var x = productList[i].name.charAt(0).toUpperCase() + productList[i].name.slice(1);
                // var y = x.replace(productList[i].name , x);
                // console.log(y)  
        }
    }
    // var x =productName.value.charAt(0).toUpperCase() + productName.value.slice(1,).toLowerCase();
    // var y = replace(productName.value , x);
    display(searchList);
}

function validationInput(element){
    
    if(regex[element.id].regexValue.test(element.value) == true){
        element.nextElementSibling.classList.add("d-none");
        element.nextElementSibling.classList.remove("d-block");
        regex[element.id].isValid = true;
    }else{
        element.nextElementSibling.classList.remove("d-none");
        element.nextElementSibling.classList.add("d-block");
        regex[element.id].isValid = false;
    }
    toggleAddBtn();
}

function toggleAddBtn() {
    if(regex.productName.isValid && regex.productPrice.isValid && regex.productDesc.isValid && regex.productCategory.isValid){
        addBtn.disabled = false;
    }else{
        addBtn.disabled = true;
    }
}

// function validateName() {
//     var regexName = /^[a-zA-Z0-9]{3,8}$/;
//     var nameValue = productName.value;
//     if(regexName.test(nameValue) == true){
//         console.log("match")
//     }else{
//         console.log("not match")
//     }
// }

// function validatePrice() {
//     var regexPrice = /^([1-9][0-9]|100)$/;
//     var PriceValue = productPrice.value;
//     if(regexPrice.test(PriceValue) == true){
//         console.log("match")
//     }else{
//         console.log("not match")
//     }
// }


//!!-------------------------------------with clean code-------------------------------------*/

// var productName = document.getElementById("productName");
// var productPrice = document.getElementById("productPrice");
// var productCategory = document.getElementById("productCategory");
// var productDesc = document.getElementById("productDesc");
// var productImage = document.getElementById("productImage");
// var addBtn = document.getElementById("addBtn");
// var updateBtn = document.getElementById("updateBtn");
// var productList = [];
// var currentIndex;


// if (localStorage.getItem("productlist") != null) {
//     productList = JSON.parse(localStorage.getItem("productlist"));
//     display(productList)
// }

// function adding() {
//     var product = {
//         name: productName.value,
//         price: productPrice.value,
//         category: productCategory.value,
//         desc: productDesc.value,
//         image: "./images/stitch.jpg"
//     }
//     productList.push(product);
//     updateToLocalStorage();
//     display(productList);
//     clear();
// }

// function display(list) {
//     var cartona = "";
//     for (var i = 0; i < list.length; i++) {
//         cartona += `<div class="col-md-4 py-5">
//                 <div class="border border-2 border-danger item rounded-3 overflow-hidden">
//                     <img src="${list[i].image}" class="w-100" alt="image">
//                     <div class="text-white p-2">
//                         <h4>Name: ${list[i].newName ? list[i].newName : list[i].name}</h4>
//                         <p>price: ${list[i].price}</p>
//                         <p>desc: ${list[i].desc}</p>
//                         <p>category: ${list[i].category}</p>
//                         <button class="btn btn-outline-danger w-100 mb-2" onclick ="delet(${i})">Delete</button>
//                         <button class="btn btn-outline-warning w-100" onclick="getToUpdate(${i})">Update</button>
//                     </div>
                    
//                 </div>
//             </div>`

//     }
//     document.getElementById("myData").innerHTML = cartona;
// }

// function delet(index) {
//     productList.splice(index, 1);
//     updateToLocalStorage();
//     display(productList);

// }
// function clear(config) {
//     productName.value = config ? config.name : null;
//     productPrice.value = config ? config.price : null;
//     productCategory.value = config ? config.category : null;
//     productDesc.value = config ? config.desc : null;
// }
// function getToUpdate(index) {
//     currentIndex = index;
//     clear(productList[index]);
//     addBtn.classList.add("d-none");
//     updateBtn.classList.remove("d-none");
// }

// function updating() {

//     productList[currentIndex].name = productName.value;
//     productList[currentIndex].price = productPrice.value;
//     productList[currentIndex].category = productCategory.value;
//     productList[currentIndex].desc = productDesc.value;

//     display(productList);
//     updateToLocalStorage();
//     clear();
//     addBtn.classList.remove("d-none");
//     updateBtn.classList.add("d-none");
// }


// function updateToLocalStorage() {
//     localStorage.setItem("productlist", JSON.stringify(productList));
// }

// function search(searchValue) {
//     var searchList = [];

//     if (searchValue == " ") {
//         display(productList);
//         return;
//     }

//     for (var i = 0; i < productList.length; i++) {
//         var item = productList[i];
//         if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
//             item.newName = item.name.toLowerCase().replace(searchValue.toLowerCase(), `<span class="text-danger">${searchValue}</span>`);
//             searchList.push(item);
            
//         }
        
//     }
//     // productName.value = productName.value.charAt(0).toUpperCase() + productName.value.slice(1,);
//     display(searchList);

// }



