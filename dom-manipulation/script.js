let quotes = [];

if (localStorage.getItem('quotes')){
     quotes = JSON.parse(localStorage.getItem('quotes'));
} else {

quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Life is really simple, but we insist on making it complicated.", category: "Life" },
  { text: "We can do hard things with grit and growth mindset.", category: "Motivation" }
];
saveQuotes();
}
// New function to save quotes to localStorage(implemented as part of task 2 requirements)
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Get DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

// sessionStorage used here to store last viewed quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Display quote with its category
  quoteDisplay.innerHTML = `"${quote.text}" —  <em>${quote.category}</em>`;

  //Save last viewed quote to sessionStorage
  sessionStorage.setItem('lastQuote', quote.text);
}


// Function to add a new quote to the array
function addQuote() {
    const quoteTextInput = document.getElementById('newQuoteText');
    const quoteCategoryInput = document.getElementById('newQuoteCategory');

    const newText = quoteTextInput.value.trim();
    const newCategory = quoteCategoryInput.value.trim();

  if (newText !== '' && newCategory !== '') {
    const newQuote = { 
        text: newText,
        category: newCategory };
    quotes.push(newQuote);
    saveQuotes(); // Save to localStorage when new quote is added part of task 2 implementaion.
    populateCategories();
    filterQuotes();

    quoteTextInput.value = '';
    quoteCategoryInput.value = '';
  } else {
    alert('Please fill in both the quote and the category.');
  }
}

 //Create form dynamically with proper IDs
function createAddQuoteForm() {
  const formDiv = document.createElement('div');

  const inputQuote = document.createElement('input');
  inputQuote.type = 'text';
  inputQuote.id = 'newQuoteText';
  inputQuote.placeholder = 'Enter a new quote';

  const inputCategory = document.createElement('input');
  inputCategory.type = 'text';
  inputCategory.id = 'newQuoteCategory';
  inputCategory.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;

  //Export button for JSON
  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export Quotes';
  exportButton.onclick = exportToJsonFile;

  //Import input for JSON
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'importFile';
  fileInput.accept = '.json';
  fileInput.onchange = importFromJsonFile;

 //ADD Category Filter Dropdown
  const categoryFilter = document.createElement('select');
  categoryFilter.id = 'categoryFilter';
  categoryFilter.onchange = filterQuotes;

  // Add default 'All Categories' option
  const defaultOption = document.createElement('option');
  defaultOption.value = 'all';
  defaultOption.textContent = 'All Categories';
  categoryFilter.appendChild(defaultOption);

  // Append everything to form
  formDiv.appendChild(inputQuote);
  formDiv.appendChild(inputCategory);
  formDiv.appendChild(addButton);
  formDiv.appendChild(exportButton);  
  formDiv.appendChild(fileInput);  
  formDiv.appendChild(categoryFilter);   


  // Add form to body
  document.body.appendChild(formDiv);
}

//FUNCTION to dynamically populate categories in dropdown ===
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');

  // Clear all existing options
  categoryFilter.innerHTML = '';

  // Add default 'All Categories' option
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All Categories';
  categoryFilter.appendChild(allOption);

  // Extract unique categories from quotes array
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];

  // Add unique categories as options
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category from localStorage
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory && uniqueCategories.includes(savedCategory)) {
    categoryFilter.value = savedCategory;
  } else {
    categoryFilter.value = 'all';
  }
}

// ADD THIS FUNCTION to filter quotes and update display ===
function filterQuotes() {
  const categoryFilter = document.getElementById('categoryFilter');
  const selectedCategory = categoryFilter.value;

  // Save selection to localStorage
  localStorage.setItem('selectedCategory', selectedCategory);

  // Filter quotes based on selected category
  let filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = 'No quotes found for this category.';
    return;
  }

  // Show a random quote from filtered results
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — <em>${quote.category}</em>`;
}

//Function to export quotes as a downloadable JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  downloadLink.click();

  URL.revokeObjectURL(url);
}

//Function to import quotes from a selected JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);  // Add imported quotes
    saveQuotes();                    // Save to localStorage
    populateCategories();            // Add refresh categories after import
    filterQuotes();                  // Add update display after import
    alert('Quotes imported successfully!');
  };

  const file = event.target.files[0];
  if (file) {
    fileReader.readAsText(file);
  }
}

document.getElementById('addQuoteButton').onclick = addQuote;
document.getElementById('exportButton').onclick = exportToJsonFile;
document.getElementById('importFile').onchange = importFromJsonFile;
document.getElementById('categoryFilter').onchange = filterQuotes;
newQuoteButton.addEventListener('click', showRandomQuote);


createAddQuoteForm();
populateCategories();
filterQuotes();


// Simulate fetching quotes from a server
function fetchQuotesFromServer() {
  // Mock server URL (JSONPlaceholder for demo)
  const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

  return fetch(serverUrl)
    .then(response => response.json())
    .then(data => {
      // Map server data to quote format
      return data.slice(0, 5).map(item => ({
        text: item.title,
        category: 'Server'
      }));
    })
    .catch(err => {
      console.log('Server fetch failed:', err);
      return [];
    });
}

// Sync server quotes with local quotes
function syncQuotes() {
  fetchQuotesFromServer().then(syncQuotes => {
    let newQuotes = 0;

    serverQuotes.forEach(serverQuote => {
      // Check if quote already exists locally
      const exists = quotes.some(q => q.text === serverQuote.text);
      if (!exists) {
        quotes.push(serverQuote);
        newQuotes++;
      }
    });

    if (newQuotes > 0) {
      saveQuotes();       // Update localStorage
      populateCategories(); // Update category dropdown
      filterQuotes();     // Update displayed quote
      alert(`Synced ${newQuotes} new quote(s) from the server!`);
    
  

    const notification = document.createElement('div');
      notification.textContent = `Synced ${newQuotes} new quote(s) from the server!`;
      notification.style.background = '#d4edda';
      notification.style.padding = '10px';
      notification.style.marginTop = '10px';
      notification.style.border = '1px solid #c3e6cb';
      document.body.appendChild(notification);

      // Remove notification after 5 seconds
      setTimeout(() => document.body.removeChild(notification), 5000);

serverQuotes.forEach(serverQuote => {
      console.log('Posting quote to server (mock):', serverQuote.text);
        });
    }
  });
}

// Run sync every 10 seconds (periodic check)
setInterval(syncQuotes, 10000);

// Initial sync on page load
syncQuotes();


