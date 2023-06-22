let pizzaList = document.querySelector('.pizzaList');
let orderList = document.querySelector('.orderList');
let previousFilter = document.querySelector(".filter .choose");
let order = [];

for (const filterButton of document.querySelectorAll(".filter button")){
    filterButton.addEventListener('click',() => setFilter(filterButton.name,filterButton));
}

for (const pizza of pizza_info){
    printPizza(pizza);
}

for (let i = 0;i < localStorage.length;i++){
    let pizza = JSON.parse(localStorage.getItem(localStorage.key(i)));
    pizza["index"] = +localStorage.key(i);
    order.push(pizza);
}
order.sort((a,b) => a.index-b.index).forEach((element) => printPizzaInOrder(element));
recalculateTotal();
document.querySelector(".order .count").textContent = order.length;

function printPizza(pizza){
    let pizzaItem = document.createElement("section");
    pizzaItem.id = pizza.id;
    pizzaItem.classList.add("pizzaItem");
    if (pizza.is_new === true)
        pizzaItem.classList.add("new");
    if (pizza.is_popular === true)
        pizzaItem.classList.add("popular");
    let image = document.createElement("img");
    image.setAttribute("src",pizza.icon);
    let nameLabel = document.createElement("label");
    nameLabel.innerHTML = `${pizza.title}`;
    nameLabel.classList.add("name");
    let typeOfPizzaLabel = document.createElement("label");
    typeOfPizzaLabel.innerHTML = `${pizza.type}`;
    typeOfPizzaLabel.classList.add("typeOfPizza");
    let ingridients = [];
    for (const ingridient in pizza.content){
        ingridients = ingridients.concat(pizza.content[ingridient]);
    }
    let descriprion = ingridients.join(', ');
    descriprion = descriprion.charAt(0).toLocaleUpperCase() + descriprion.slice(1);
    let ingredientsLabel = document.createElement("label");
    ingredientsLabel.classList.add("ingredients");
    ingredientsLabel.innerHTML = `${descriprion}`;
    let buySection = document.createElement("section");
    buySection.classList.add("buySection");
    if ('small_size' in pizza){
        let chooseSizeSection = document.createElement("section");
        chooseSizeSection.classList.add("chooseSize");

        let diametrSection = document.createElement("section")
        diametrSection.classList.add("diametr");
        let sizeImg = document.createElement("img");
        sizeImg.classList.add("sizeIcon");
        sizeImg.setAttribute("src","assets/images/size-icon.svg");
        let sizeLabel = document.createElement("label");
        sizeLabel.textContent = pizza.small_size.size;
        diametrSection.appendChild(sizeImg);
        diametrSection.appendChild(sizeLabel);

        let weightSection = document.createElement("section")
        weightSection.classList.add("weight");
        let weightImg = document.createElement("img");
        weightImg.classList.add("weightIcon");
        weightImg.setAttribute("src","assets/images/weight.svg");
        let weightLabel = document.createElement("label");
        weightLabel.textContent = pizza.small_size.weight;
        weightSection.appendChild(weightImg);
        weightSection.appendChild(weightLabel);

        let priceLabel = document.createElement("label");
        priceLabel.classList.add("price");
        priceLabel.textContent = pizza.small_size.price;

        let currencyLabel = document.createElement("label");
        currencyLabel.classList.add("currency");
        currencyLabel.textContent = "грн.";

        let buyButton = document.createElement("button");
        buyButton.classList.add("buyButton");
        buyButton.type = 'button';
        buyButton.name = "small";
        buyButton.addEventListener('click',() => addToOrder(buyButton));
        buyButton.textContent = "Купити";

        chooseSizeSection.appendChild(diametrSection);
        chooseSizeSection.appendChild(weightSection);
        chooseSizeSection.appendChild(priceLabel);
        chooseSizeSection.appendChild(currencyLabel);
        chooseSizeSection.appendChild(buyButton);
        buySection.appendChild(chooseSizeSection);
    }
    if ('big_size' in pizza){
        let chooseSizeSection = document.createElement("section");
        chooseSizeSection.classList.add("chooseSize");

        let diametrSection = document.createElement("section")
        diametrSection.classList.add("diametr");
        let sizeImg = document.createElement("img");
        sizeImg.classList.add("sizeIcon");
        sizeImg.setAttribute("src","assets/images/size-icon.svg");
        let sizeLabel = document.createElement("label");
        sizeLabel.textContent = pizza.big_size.size;
        diametrSection.appendChild(sizeImg);
        diametrSection.appendChild(sizeLabel);

        let weightSection = document.createElement("section")
        weightSection.classList.add("weight");
        let weightImg = document.createElement("img");
        weightImg.classList.add("weightIcon");
        weightImg.setAttribute("src","assets/images/weight.svg");
        let weightLabel = document.createElement("label");
        weightLabel.textContent = pizza.big_size.weight;
        weightSection.appendChild(weightImg);
        weightSection.appendChild(weightLabel);

        let priceLabel = document.createElement("label");
        priceLabel.classList.add("price");
        priceLabel.textContent = pizza.big_size.price;

        let currencyLabel = document.createElement("label");
        currencyLabel.classList.add("currency");
        currencyLabel.textContent = "грн.";

        let buyButton = document.createElement("button");
        buyButton.classList.add("buyButton");
        buyButton.type = 'button';
        buyButton.name = "big";
        buyButton.addEventListener('click',() => addToOrder(buyButton));
        buyButton.textContent = "Купити";

        chooseSizeSection.appendChild(diametrSection);
        chooseSizeSection.appendChild(weightSection);
        chooseSizeSection.appendChild(priceLabel);
        chooseSizeSection.appendChild(currencyLabel);
        chooseSizeSection.appendChild(buyButton);
        buySection.appendChild(chooseSizeSection);
    }
    pizzaItem.appendChild(image);
    pizzaItem.appendChild(nameLabel);
    pizzaItem.appendChild(typeOfPizzaLabel);
    pizzaItem.appendChild(ingredientsLabel);
    pizzaItem.appendChild(buySection);
    pizzaList.appendChild(pizzaItem);
    pizzaList.elements
}

function setFilter(properties,button){
    previousFilter.classList.remove('choose');
    document.querySelectorAll(".allPizza label")[0].textContent = button.textContent;
    let identifiers = [];
    for (const pizza of pizza_info){
        if (properties === 'all')
            identifiers.push(pizza.id)
        if (properties in pizza.content)
            identifiers.push(pizza.id)
    }
    if (properties === 'vega')
        identifiers.push(17);
    if (properties === 'all'){
        document.querySelectorAll(".allPizza label")[0].textContent = "Усі піци";
        identifiers.fill(1,100);
    }
    for (const pizzaItem of pizzaList.children){
        if (identifiers.includes(+pizzaItem.id)){
            pizzaItem.setAttribute("style","display:flex");
        } else {
            pizzaItem.setAttribute("style","display:none");
        }
    }
    document.querySelectorAll(".allPizza label")[1].textContent = identifiers.length;
    button.classList.add("choose");
    previousFilter = button;
}

function addToOrder(button){
    let size = button.name;
    let id = button.parentElement.parentElement.parentElement.id;
    for (const pizza of order){
        if (pizza.size == size && pizza.id == id){
            increaseCountOfPizza(pizza);
            return;
        }
    }

    let newPizza = {
        size,
        count:1,
        id,
        price:button.parentElement.querySelector(".price").textContent
    };
    order.push(newPizza);
    printPizzaInOrder(newPizza);
    recalculateTotal()
}

function printPizzaInOrder(pizza){
    let currentPizza;
    for (const pizzaFromList of pizza_info){
        if (pizzaFromList.id == pizza.id){
            currentPizza = pizzaFromList;
            break;
        }
    }
    let orderItemSection = document.createElement("section");
    orderItemSection.classList.add("orderItem");
    orderItemSection.classList.add(pizza.size + "" + pizza.id);
    let infoAboutPizza = document.createElement("section");
    infoAboutPizza.classList.add('infoAboutPizza');
    let nameLabel = document.createElement("label");
    if (pizza.size==="small"){
        nameLabel.textContent = currentPizza.title + " (Мала)";
    } else {
        nameLabel.textContent = currentPizza.title + " (Велика)";
    }
    infoAboutPizza.appendChild(nameLabel);
    let infoAboutSizeSection = document.createElement("section");
    infoAboutSizeSection.classList.add("infoAboutSize");
    if (pizza.size === 'small'){
        let diametrSection = document.createElement("section")
        diametrSection.classList.add("diametr");
        let sizeImg = document.createElement("img");
        sizeImg.classList.add("sizeIcon");
        sizeImg.setAttribute("src","assets/images/size-icon.svg");
        let sizeLabel = document.createElement("label");
        sizeLabel.textContent = currentPizza.small_size.size;
        sizeLabel.style.marginLeft = '5px';
        diametrSection.appendChild(sizeImg);
        diametrSection.appendChild(sizeLabel);
        infoAboutSizeSection.appendChild(diametrSection);

        let weightSection = document.createElement("section")
        weightSection.classList.add("weight");
        let weightImg = document.createElement("img");
        weightImg.classList.add("weightIcon");
        weightImg.setAttribute("src","assets/images/weight.svg");
        let weightLabel = document.createElement("label");
        weightLabel.textContent = currentPizza.small_size.weight;
        weightLabel.style.marginLeft = '5px';
        weightSection.appendChild(weightImg);
        weightSection.appendChild(weightLabel);
        infoAboutSizeSection.appendChild(weightSection);
    } else {
        let diametrSection = document.createElement("section")
        diametrSection.classList.add("diametr");
        let sizeImg = document.createElement("img");
        sizeImg.classList.add("sizeIcon");
        sizeImg.setAttribute("src","assets/images/size-icon.svg");
        let sizeLabel = document.createElement("label");
        sizeLabel.textContent = currentPizza.big_size.size;
        sizeLabel.style.marginLeft = '5px';
        diametrSection.appendChild(sizeImg);
        diametrSection.appendChild(sizeLabel);
        infoAboutSizeSection.appendChild(diametrSection);

        let weightSection = document.createElement("section")
        weightSection.classList.add("weight");
        let weightImg = document.createElement("img");
        weightImg.classList.add("weightIcon");
        weightImg.setAttribute("src","assets/images/weight.svg");
        let weightLabel = document.createElement("label");
        weightLabel.textContent = currentPizza.big_size.weight;
        weightLabel.style.marginLeft = '5px';
        weightSection.appendChild(weightImg);
        weightSection.appendChild(weightLabel);
        infoAboutSizeSection.appendChild(weightSection);
    }
    orderItemSection.appendChild(infoAboutSizeSection);
    let priceSection = document.createElement("section");
    priceSection.classList.add("price");
    let totalLabel = document.createElement("label");
    totalLabel.classList.add("total")
    totalLabel.textContent = ((pizza.size==="small"?currentPizza.small_size.price:currentPizza.big_size.price) * pizza.count) + 'грн';
    let minusButton = document.createElement("button");
    minusButton.classList.add("minus");
    minusButton.style.marginLeft = '10px';
    minusButton.textContent = "-";
    minusButton.addEventListener('click',() => decreaseCountOfPizza(pizza))
    let totalCount = document.createElement("label");
    totalCount.textContent = pizza.count;
    totalCount.classList.add("totalCount");
    totalCount.style.marginLeft = '10px';
    let addButton = document.createElement("button");
    addButton.classList.add("plus");
    addButton.addEventListener('click',() => increaseCountOfPizza(pizza))
    addButton.textContent = "+";
    addButton.style.marginLeft = '10px';
    let cancelButton = document.createElement("button");
    cancelButton.addEventListener('click',() => deletePizza(pizza))
    cancelButton.classList.add("cancel");
    cancelButton.textContent = "x";
    cancelButton.style.marginLeft = '20px';
    priceSection.appendChild(totalLabel);
    priceSection.appendChild(minusButton);
    priceSection.appendChild(totalCount);
    priceSection.appendChild(addButton);
    priceSection.appendChild(cancelButton);
    infoAboutPizza.appendChild(infoAboutSizeSection);
    infoAboutPizza.appendChild(priceSection)
    let orderImg = document.createElement("img");
    orderImg.setAttribute("src",currentPizza.icon);
    orderImg.classList.add("orderImage");
    orderItemSection.appendChild(infoAboutPizza);
    orderItemSection.appendChild(orderImg);
    orderList.appendChild(orderItemSection);
}

function increaseCountOfPizza(pizza){
    pizza.count+=1;
    let itemOfPizza = document.querySelector("."+pizza.size+pizza.id);
    itemOfPizza.querySelector(".totalCount").textContent = pizza.count;
    itemOfPizza.querySelector(".total").textContent = (pizza.count * pizza.price) + "грн";
    recalculateTotal()
}

function decreaseCountOfPizza(pizza){
    pizza.count-=1;
    let itemOfPizza = document.querySelector("."+pizza.size+pizza.id);
    if (pizza.count === 0){
        deletePizza(pizza);
    }
    itemOfPizza.querySelector(".totalCount").textContent = pizza.count;
    itemOfPizza.querySelector(".total").textContent = (pizza.count * pizza.price) + "грн";
    recalculateTotal()
}

function deletePizza(pizza){
    let itemOfPizza = document.querySelector("."+pizza.size+pizza.id);
    order.splice(order.indexOf(pizza),1);
    itemOfPizza.remove();
    recalculateTotal()
}

function recalculateTotal(){
    let total = 0;
    for (let pizza of order){
        total += pizza.count*pizza.price;
    }
    document.querySelector(".appendPrice .total").textContent = total+'грн';
    document.querySelector(".order .count").textContent = order.length;
}

document.querySelector(".order button").addEventListener('click', ()=> clearCart());

function clearCart(){
    order = [];
    document.querySelectorAll(".orderItem").forEach((element) => element.remove());
    recalculateTotal();
    document.querySelector(".order .count").textContent = order.length;
}

window.onbeforeunload = function(){
    localStorage.clear();
    let counter = 0;
    order.forEach((element) => localStorage.setItem(counter++,JSON.stringify(element)));
}