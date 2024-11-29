// Selectors
const filterInput = document.querySelector('#filter');
const fruitList = document.querySelector(".fruits");
const fruitInput = document.querySelector("#fruit-to-add");
const descriptionInput = document.querySelector("#fruit-discription");
const form = document.querySelector("form");

// Event Listener for Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload
  const fruitName = fruitInput.value.trim();
  const description = descriptionInput.value.trim();

  if (fruitName !== "") {
    addFruit(fruitName, description);
    fruitInput.value = ""; // Clear input fields
    descriptionInput.value = "";
  } else {
    alert("Please enter a fruit name!");
  }
});

// Function to Add a Fruit
function addFruit(fruitName, description) {
  const li = document.createElement("li");
  li.classList.add("fruit");
  li.innerHTML = `
        <strong>${fruitName}</strong> ${description ? ` - ${description}` : ""}
        <button class="delete-btn">X</button>
        <button class="edit-btn">Edit</button>
    `;

  fruitList.appendChild(li);
  attachEventListeners(li); // Add event listeners to the new fruit item
}

// Function to Attach Event Listeners to Buttons
function attachEventListeners(li) {
  const deleteBtn = li.querySelector(".delete-btn");
  const editBtn = li.querySelector(".edit-btn");

  // Delete Button Functionality
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  // Edit Button Functionality
  editBtn.addEventListener("click", () => {
    const currentText = li.firstChild.textContent.trim(); // Get current text
    const [fruitName, description] = currentText.split(" - "); // Split into name and description (if present)
    fruitInput.value = fruitName;
    descriptionInput.value = description || ""; // Populate description if it exists
    li.remove(); // Remove the item being edited
  });
}

// Attach Event Listeners to Existing List Items
document.querySelectorAll(".fruit").forEach((li) => attachEventListeners(li));






// Event Listener for Filter Input
filterInput.addEventListener('input', filterFruits);

// Function to Filter Fruits
function filterFruits(e) {
    const searchTerm = e.target.value.toLowerCase(); // Get the search term and convert to lowercase
    const fruits = document.querySelectorAll('.fruit'); // Select all fruit list items

    fruits.forEach((fruit) => {
        const fruitText = fruit.textContent.toLowerCase(); // Get the text of the fruit (name + description)
        if (fruitText.includes(searchTerm)) {
            fruit.style.display = ''; // Show fruit if it matches the search term
        } else {
            fruit.style.display = 'none'; // Hide fruit if it doesn't match
        }
    });
}
