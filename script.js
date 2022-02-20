const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const halfBtn = document.getElementById('half');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const sortByNameBtn = document.getElementById('sort-name');
const calculateWealthBtn = document.getElementById('calculate-wealth');
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
halfBtn.addEventListener('click', halfMoney);
sortBtn.addEventListener('click', sortByRichest);
sortByNameBtn.addEventListener('click', sortByName);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();


  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: (Math.floor(Math.random() * 100))*10000000
  };

  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return number.toLocaleString('en-IN',{style: 'currency', currency: 'INR'});
}


// Double eveyones money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Half eveyones money
function halfMoney() {
  data = data.map(user => {
    return { ...user, money: user.money / 2 };
  });

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Sort users by name
function sortByName() {
  data.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }
  });

  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}
