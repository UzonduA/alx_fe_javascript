let quotes = [];

if (localStorage.getItem('quotes')) {
  quotes = JSON.parse(localStorage.getItem('quotes'));
} else {
  quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
    { text: "Life is really simple, but we insist on making it complicated.", category: "Life" }
  ];
  saveQuotes();
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" — <em>${quote.category}</em>`;
  sessionStorage.setItem('lastQuote', quote.text);
}

// Add new quote from form
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text !== "" && category !== "") {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories(); // update dropdown with new category if needed
    showRandomQuote();
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  } else {
    alert("Please fill in both fields.");
  }
}

// Populate dropdown with unique categories
function populateCategories() {
  let categories = quotes.map(q => q.category);
  let uniqueCategories = [...new Set(categories)];

  const select = document.getElementById('categoryFilter');
  select.innerHTML = ""; // clear existing options

  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });

  // Restore previously selected category
  const savedCategory = localStorage.getItem('lastCategory');
  if (savedCategory) {
    select.value = savedCategory;
    filterQuote(); // show quote from that category
  }
}

// Filter quote by selected category
function filterQuote() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastCategory', selectedCategory);

  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" — <em>${quote.category}</em>`;
  } else {
    document.getElementById('quoteDisplay').innerHTML = "No quotes in this category.";
  }
}

// Create form and dropdown dynamically
function createAddQuoteForm() {
  const formDiv = document.createElement('div');

  const inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.id = 'newQuoteText';
  inputText.placeholder = 'Enter a new quote';

  const inputCategory = document.createElement('input');
  inputCategory.type = 'text';
  inputCategory.id = 'newQuoteCategory';
  inputCategory.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;

  const categoryFilter = document.createElement('select');
  categoryFilter.id = 'categoryFilter';
  categoryFilter.onchange = filterQuote;

  formDiv.appendChild(inputText);
  formDiv.appendChild(inputCategory);
  formDiv.appendChild(addButton);
  formDiv.appendChild(categoryFilter);

  document.body.insertBefore(formDiv, document.getElementById('quoteDisplay'));
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

createAddQuoteForm();
populateCategories();
