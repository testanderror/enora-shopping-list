// First thing bring over the form itself, the input box and the items list
// The purpose is to create items list from the input text that we type in the box
// The form allows us to access tu submission

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

// Creation of a LI element off the text input in the box
// Appending whatever we submit into the dom. We start off by appending the input text into a LI we just create
// That LI though has also a button and an icon we must append programatically

function addItem(e) {
  e.preventDefault();
  //Validate input
  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an item');
    return;
  } 
  
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  

  itemList.appendChild(li);

  checkUI();

  itemInput.value = '';
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

function removeItem(e) {
  if(e.target.parentElement.classList.contains('remove-item')){
    e.target.parentElement.parentElement.remove();
    console.log('Removed');
  } 
  checkUI();
}

function clearAll() {
  confirm('Are you sure?');
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
  checkUI();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = document.querySelectorAll('li');

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  }
  )
}

function checkUI() {
  const items = document.querySelectorAll('li');

  if(items.length === 0) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }
}

itemList.addEventListener('click', removeItem);
itemForm.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearAll);
filter.addEventListener('input', filterItems);

checkUI();


// function addItem creates our LI element with the text or value from the input of the box


// Now we create another function to develop the button that will be appended within the LI 
// Such function will have one parameter that will collect the classes and assign them to the new element BUTTON



// As we console log the button we noticed it's been succesfully created but still has no icon within
// So intuitively now we create an icon to furtherly append it to our button



//Once created we head back to the button function and call out the icon function with the icon parameters.
// This will create an icon within the button function
// Once it's created we append it to the button and finally we return the button

// With the button completely integrated with the Icon element appended we head back to our addItem function and 
// append what's left. The button into the li item.
// So now the LI item is complete: it has the text node, the button element and the icon element
// It's ready to be appended into the list

//We add our itemList and append the LI element we just created with all the elements integrated
// And we finish off with the itemInput.value setting it up to '' so we make sure the input box clears up 
// after we add an item

