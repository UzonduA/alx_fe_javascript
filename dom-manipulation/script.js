// Initial array of quotes
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Life is really simple, but we insist on making it complicated.", category: "Life" },
  { text: "We can do hard things with grit and growth mindset.", category: "Motivation" }
];

// Get DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Display quote with its category
  quoteDisplay.innerHTML = `"${quote.text}" —  <em>${quote.category}</em>`;
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

  // Add inputs and button to form
  formDiv.appendChild(inputQuote);
  formDiv.appendChild(inputCategory);
  formDiv.appendChild(addButton);

  // Add form to body
  document.body.appendChild(formDiv);
}
newQuoteButton.addEventListener('click', showRandomQuote);


createAddQuoteForm();
