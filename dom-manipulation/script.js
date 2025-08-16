let quotes = [];

if (localStorage.getItem(quotes)){
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
    showRandomQuote();

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
  inputQuote.type = 'text';
  inputCategory.id = 'newQuoteCategory';
  inputCategory.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;

  //Export button for JSON
  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export Quotes';
  exportButton.onclick = exportQuotesToJson;

  //Import input for JSON
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'importFile';
  fileInput.accept = '.json';
  fileInput.onchange = importFromJsonFile;

  // Append everything to form
  formDiv.appendChild(inputQuote);
  formDiv.appendChild(inputCategory);
  formDiv.appendChild(addButton);
  formDiv.appendChild(exportButton);  
  formDiv.appendChild(fileInput);    


  // Add form to body
  document.body.appendChild(formDiv);
}

//Function to export quotes as a downloadable JSON file
function exportQuotesToJson() {
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
    alert('Quotes imported successfully!');
  };

  const file = event.target.files[0];
  if (file) {
    fileReader.readAsText(file);
  }
}
newQuoteButton.addEventListener('click', showRandomQuote);


createAddQuoteForm();
