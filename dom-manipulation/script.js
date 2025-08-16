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
  const selectedQuote = quotes[randomIndex];

  // Display quote with its category
  quoteDisplay.textContent = `"${selectedQuote.text}" — [${selectedQuote.category}]`;
}

// Function to create the Add Quote form
function createAddQuoteForm() {
  const formDiv = document.createElement('div');

  const inputText = document.createElement('input');
  inputText.id = 'newQuoteText';
  inputText.type = 'text';
  inputText.placeholder = 'Enter a new quote';

  const inputCategory = document.createElement('input');
  inputCategory.id = 'newQuoteCategory';
  inputCategory.type = 'text';
  inputCategory.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;

  // Add inputs and button to form
  formDiv.appendChild(inputText);
  formDiv.appendChild(inputCategory);
  formDiv.appendChild(addButton);

  // Add form to body
  document.body.appendChild(formDiv);
}

// Function to add a new quote to the array
function addQuote() {
  const newText = document.getElementById('newQuoteText').value.trim();
  const newCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newText !== "" && newCategory !== "") {
    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);
    
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";

    showRandomQuote();
  } else {
    alert("Please fill in both the quote and the category.");
  }
}


newQuoteButton.addEventListener('click', showRandomQuote);


createAddQuoteForm();
