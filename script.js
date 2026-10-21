const foods = [
  {id:1,name:"Smash Burger",category:"Burgers",price:850,rating:4.9,time:"20–25 min",badge:"BESTSELLER",emoji:"🍔",description:"Double smashed beef, cheddar, pickles and our signature house sauce.",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85"},
  {id:2,name:"Margherita Pizza",category:"Pizza",price:1250,rating:4.8,time:"25–30 min",badge:"CLASSIC",emoji:"🍕",description:"Stone-baked crust, rich tomato sauce, mozzarella and fresh basil.",image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=85"},
  {id:3,name:"Crispy Chicken Bowl",category:"Healthy",price:790,rating:4.7,time:"20–25 min",badge:"FRESH PICK",emoji:"🥗",description:"Golden chicken, crunchy greens, avocado and a zesty lemon dressing.",image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85"},
  {id:4,name:"Spicy Ramen",category:"Asian",price:990,rating:4.9,time:"25–30 min",badge:"SPICY FAVE",emoji:"🍜",description:"Comforting broth, springy noodles, mushrooms, egg and chilli oil.",image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85"},
  {id:5,name:"Truffle Fries",category:"Burgers",price:520,rating:4.6,time:"15–20 min",badge:"SNACK TIME",emoji:"🍟",description:"Crispy golden fries tossed with truffle seasoning and herbs.",image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85"},
  {id:6,name:"Garden Pesto Pizza",category:"Pizza",price:1380,rating:4.8,time:"25–35 min",badge:"VEGGIE",emoji:"🍕",description:"Basil pesto, roasted vegetables, mozzarella and a crisp crust.",image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=85"},
  {id:7,name:"Salmon Rice Bowl",category:"Healthy",price:1450,rating:4.9,time:"25–30 min",badge:"BALANCED",emoji:"🍱",description:"Glazed salmon over rice with cucumber, greens and sesame.",image:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=85"},
  {id:8,name:"Chocolate Lava Cake",category:"Desserts",price:620,rating:4.9,time:"15–20 min",badge:"SWEET TREAT",emoji:"🍰",description:"Warm chocolate cake with a gooey centre and a dusting of cocoa.",image:"https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=85"},
  {id:9,name:"Creamy Alfredo Pasta",category:"Asian",price:1100,rating:4.7,time:"20–30 min",badge:"COMFORT FOOD",emoji:"🍝",description:"Silky parmesan cream sauce, herbs and perfectly cooked pasta.",image:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85"},
  {id:10,name:"Berry Cheesecake",category:"Desserts",price:680,rating:4.8,time:"15–20 min",badge:"HOUSE FAVOURITE",emoji:"🍰",description:"Creamy cheesecake with a buttery crumb and berry topping.",image:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=85"},
  {id:11,name:"Classic Chicken Burger",category:"Burgers",price:720,rating:4.7,time:"20–25 min",badge:"CRISPY",emoji:"🍔",description:"Crispy chicken, fresh lettuce, tomato and creamy pepper mayo.",image:"https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=85"},
  {id:12,name:"Veggie Noodle Bowl",category:"Asian",price:760,rating:4.6,time:"20–25 min",badge:"PLANT POWER",emoji:"🍜",description:"Stir-fried noodles, colourful vegetables and a savoury sesame sauce.",image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85"}
];

const state = { category:"All", search:"", cart:new Map() };
const $ = (selector) => document.querySelector(selector);
const foodGrid = $("#foodGrid");
const cartDrawer = $("#cartDrawer");
const overlay = $("#overlay");
let toastTimer;

function money(value){ return `Rs. ${value.toLocaleString("en-PK")}`; }
function filteredFoods(){
  const query = state.search.trim().toLowerCase();
  return foods.filter(food => (state.category === "All" || food.category === state.category) &&
    (!query || `${food.name} ${food.category} ${food.description}`.toLowerCase().includes(query)));
}
function renderFoods(){
  const items = filteredFoods();
  foodGrid.innerHTML = items.map(food => `
    <article class="food-card">
      <div class="food-image-wrap" data-details="${food.id}" role="button" tabindex="0" aria-label="View ${food.name} details">
        <img src="${food.image}" alt="${food.name}" loading="lazy" onerror="this.style.opacity='.25';this.alt='Food image unavailable';">
        <span class="food-badge">${food.badge}</span>
        <button class="quick-add" data-add="${food.id}" aria-label="Add ${food.name} to cart">+</button>
      </div>
      <div class="food-info">
        <div class="food-category">${food.category} · ${food.time}</div>
        <div class="food-name-row"><h3>${food.name}</h3><span class="food-rating">★ ${food.rating}</span></div>
        <p class="food-description">${food.description}</p>
        <div class="food-card-bottom"><div class="food-price">${money(food.price)} <small>/ item</small></div><button class="details-link" data-details="${food.id}">View details ↗</button></div>
      </div>
    </article>`).join("");
  $("#resultsCount").textContent = items.length ? `Showing ${items.length} ${items.length === 1 ? "dish" : "dishes"}` : "No dishes found";
  $("#emptyState").classList.toggle("hidden", items.length !== 0);
  foodGrid.classList.toggle("hidden", items.length === 0);
}
function showToast(message){
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
function addToCart(id){
  const food = foods.find(item => item.id === Number(id)); if(!food) return;
  const current = state.cart.get(food.id);
  state.cart.set(food.id, {food, quantity:(current?.quantity || 0)+1});
  renderCart(); showToast(`${food.name} added to your order`);
}
function changeQuantity(id, delta){
  const item = state.cart.get(Number(id)); if(!item) return;
  item.quantity += delta;
  if(item.quantity <= 0) state.cart.delete(Number(id));
  renderCart();
}
function cartQuantities(){ return [...state.cart.values()].reduce((sum,item)=>sum+item.quantity,0); }
function subtotalValue(){ return [...state.cart.values()].reduce((sum,item)=>sum+item.food.price*item.quantity,0); }
function deliveryValue(){ return subtotalValue() >= 2000 || subtotalValue() === 0 ? 0 : 150; }
function renderCart(){
  const entries = [...state.cart.values()];
  const count = cartQuantities();
  $("#cartCount").textContent = count;
  $("#drawerItemCount").textContent = `(${count})`;
  $("#cartItems").innerHTML = entries.map(({food,quantity}) => `
    <div class="cart-item">
      <img src="${food.image}" alt="${food.name}">
      <div><h3>${food.name}</h3><p>${money(food.price)} each</p>
        <div class="qty-control"><button data-qty="${food.id}" data-delta="-1" aria-label="Remove one ${food.name}">−</button><span>${quantity}</span><button data-qty="${food.id}" data-delta="1" aria-label="Add one ${food.name}">+</button></div>
      </div>
      <div class="cart-item-total">${money(food.price*quantity)}<button class="remove-item" data-remove="${food.id}">Remove</button></div>
    </div>`).join("");
  $("#cartEmpty").classList.toggle("hidden", entries.length > 0);
  $("#cartSummary").classList.toggle("hidden", entries.length === 0);
  $("#subtotal").textContent = money(subtotalValue());
  $("#deliveryFee").textContent = deliveryValue() === 0 ? "Free" : money(deliveryValue());
  $("#cartTotal").textContent = money(subtotalValue()+deliveryValue());
  $("#checkoutTotal").textContent = money(subtotalValue()+deliveryValue());
}
function openCart(){
  cartDrawer.classList.add("open"); cartDrawer.setAttribute("aria-hidden","false");
  overlay.classList.remove("hidden"); document.body.classList.add("locked"); $("#closeCart").focus();
}
function closePanels(){
  cartDrawer.classList.remove("open"); cartDrawer.setAttribute("aria-hidden","true");
  overlay.classList.add("hidden"); document.body.classList.remove("locked");
  $("#foodModal").classList.add("hidden"); $("#checkoutModal").classList.add("hidden");
}
function openFoodDetails(id){
  const food = foods.find(item => item.id === Number(id)); if(!food) return;
  $("#foodModalContent").innerHTML = `<div class="detail-layout"><img src="${food.image}" alt="${food.name}"><div><div class="eyebrow">${food.category.toUpperCase()} · ${food.time}</div><h2 id="modalTitle">${food.name}</h2><p>${food.description}</p><div class="detail-meta">★ ${food.rating} &nbsp; · &nbsp; Popular pick</div><div class="detail-price">${money(food.price)}</div><button class="button button-primary" data-add="${food.id}">Add to order <span>+</span></button></div></div>`;
  $("#foodModal").classList.remove("hidden"); overlay.classList.remove("hidden"); document.body.classList.add("locked");
}
function openCheckout(){
  if(state.cart.size === 0){showToast("Add a dish before checking out.");return;}
  cartDrawer.classList.remove("open"); cartDrawer.setAttribute("aria-hidden","true");
  $("#checkoutTotal").textContent = money(subtotalValue()+deliveryValue());
  $("#checkoutModal").classList.remove("hidden"); overlay.classList.remove("hidden"); document.body.classList.add("locked");
  $("#checkoutForm").querySelector("input").focus();
}

$("#categoryList").addEventListener("click", event => {
  const button = event.target.closest("[data-category]"); if(!button) return;
  state.category = button.dataset.category;
  document.querySelectorAll(".category-chip").forEach(chip => chip.classList.toggle("selected", chip === button));
  renderFoods();
});
$("#searchInput").addEventListener("input", event => {state.search = event.target.value; renderFoods();});
foodGrid.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  if(add){event.stopPropagation();addToCart(add.dataset.add);return;}
  const details = event.target.closest("[data-details]");
  if(details) openFoodDetails(details.dataset.details);
});
foodGrid.addEventListener("keydown", event => {
  if((event.key === "Enter" || event.key === " ") && event.target.matches("[data-details]")){event.preventDefault();openFoodDetails(event.target.dataset.details);}
});
$("#foodModal").addEventListener("click", event => {const add = event.target.closest("[data-add]");if(add){addToCart(add.dataset.add);$("#foodModal").classList.add("hidden");overlay.classList.add("hidden");document.body.classList.remove("locked");}});
$("#cartItems").addEventListener("click", event => {
  const qty = event.target.closest("[data-qty]"); const remove = event.target.closest("[data-remove]");
  if(qty) changeQuantity(qty.dataset.qty,Number(qty.dataset.delta));
  if(remove){state.cart.delete(Number(remove.dataset.remove));renderCart();}
});
$("#openCart").addEventListener("click",openCart);
$("#closeCart").addEventListener("click",closePanels);
$("#closeFoodModal").addEventListener("click",closePanels);
$("#closeCheckout").addEventListener("click",closePanels);
overlay.addEventListener("click",closePanels);
$("#browseMenu").addEventListener("click",()=>{closePanels();$("#menu").scrollIntoView({behavior:"smooth"});});
$("#checkoutButton").addEventListener("click",openCheckout);
$("#resetFilters").addEventListener("click",()=>{state.category="All";state.search="";$("#searchInput").value="";document.querySelectorAll(".category-chip").forEach(chip=>chip.classList.toggle("selected",chip.dataset.category==="All"));renderFoods();});
$("#checkoutForm").addEventListener("submit",event=>{
  event.preventDefault();
  if(!event.currentTarget.reportValidity()) return;
  const formData = new FormData(event.currentTarget);
  const firstName = String(formData.get("fullName")).trim().split(/\s+/)[0] || "there";
  const orderId = `CR-${Math.floor(10000+Math.random()*90000)}`;
  state.cart.clear();renderCart();event.currentTarget.reset();closePanels();
  showToast(`Thanks, ${firstName}! Demo order ${orderId} is complete.`);
});
$("#menuToggle").addEventListener("click",()=>{
  const nav=$("#mainNav");const isOpen=nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded",String(isOpen));
});
document.querySelectorAll(".nav-link").forEach(link=>link.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}));
document.addEventListener("keydown",event=>{
  if(event.key==="Escape") closePanels();
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();$("#searchInput").focus();}
});
$("#year").textContent = new Date().getFullYear();
renderFoods();renderCart();
