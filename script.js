const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems(){
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function addItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  addItemToDOM(newItem); 
  addItemToStorage(newItem);

  console.log(getItemsFromStorage());
  checkUI();

  itemInput.value = '';
  
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);

}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  // Add new item to the Array
  itemsFromStorage.push(item);

  //Convert to JSON string and set to local storage

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if(localStorage.getItem('items') === null){
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if(e.target.parentElement.classList.contains('remove-item')){
    removeItem(e.target.parentElement.parentElement);
  }
}

function removeItem(item) {
    // Remove item from DOM
    item.remove();
    // Remove item from Storage
    removeItemFromStorage(item.textContent);
    checkUI();
  
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter Out item to be removed

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  // Re-set to Local Storage

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  console.log(itemsFromStorage)
}

function clearAll() {
  confirm('Are u sure?')
  while (itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem('items');
  checkUI();
}

function filterItems(e){
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach((item) => { 
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1){
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })
}


function checkUI(){
  const items = itemList.querySelectorAll('li');

  if (items.length === 0){
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Initialize App

function init() {

itemForm.addEventListener('submit', addItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearAll);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
checkUI();
}

init();
