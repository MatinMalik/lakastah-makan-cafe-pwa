// Login Form Handler
function handleLogin(event) {
  event.preventDefault()
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  if (email && password) {
    alert("Login successful!")
    window.location.href = "home.html"
  }
}

// Signup Form Handler
function handleSignup(event) {
  event.preventDefault()
  const name = document.getElementById("name").value
  const phone = document.getElementById("phone").value
  const email = document.getElementById("email").value

  if (name && phone && email) {
    window.location.href = "verification.html"
  }
}

// Toggle Password Visibility
function togglePassword() {
  const passwordInput = document.getElementById("password")
  if (passwordInput.type === "password") {
    passwordInput.type = "text"
  } else {
    passwordInput.type = "password"
  }
}

// Verification Code Input
function moveToNext(input, index) {
  if (input.value.length === 1) {
    const inputs = document.querySelectorAll(".code-input")
    if (index < inputs.length) {
      inputs[index].focus()
    }
  }
}

function verifyCode() {
  const inputs = document.querySelectorAll(".code-input")
  let code = ""
  inputs.forEach((input) => {
    code += input.value
  })

  if (code.length === 4) {
    alert("Verification successful!")
    window.location.href = "home.html"
  } else {
    alert("Please enter the complete 4-digit code")
  }
}

// Cart Quantity Update
function updateQuantity(itemIndex, change) {
  const cartItems = document.querySelectorAll(".cart-item")
  const item = cartItems[itemIndex]
  const quantityElement = item.querySelector(".quantity")
  let quantity = Number.parseInt(quantityElement.textContent)

  quantity += change
  if (quantity < 1) quantity = 1

  quantityElement.textContent = quantity
  updateTotal()
}

function updateTotal() {
  const cartItems = document.querySelectorAll(".cart-item")
  let total = 0

  cartItems.forEach((item) => {
    const price = Number.parseFloat(item.querySelector(".cart-item-price").textContent.replace("$", ""))
    const quantity = Number.parseInt(item.querySelector(".quantity").textContent)
    total += price * quantity
  })

  document.getElementById("totalAmount").textContent = "$" + total.toFixed(2)
}

// Payment Method Selection
function selectPayment(method) {
  const cardForm = document.getElementById("cardForm")
  const paymentMethods = document.querySelectorAll(".payment-method")

  paymentMethods.forEach((pm) => (pm.style.backgroundColor = "#D4A843"))
  event.target.closest(".payment-method").style.backgroundColor = "#C09835"

  if (method === "card") {
    cardForm.style.display = "block"
  } else {
    cardForm.style.display = "none"
  }
}

function confirmPayment() {
  alert("Payment confirmed! Thank you for your order.")
  window.location.href = "home.html"
}

//Search Bar Toggle
// Select elements
const searchInput = document.querySelector(".search-input");
const featuredCards = document.querySelectorAll(".featured-card, .discount-card");

// Listen to input changes
searchInput.addEventListener("input", function() {
    const query = this.value.toLowerCase();

    featuredCards.forEach(card => {
        const name = card.getAttribute("data-name").toLowerCase();
        // Show or hide based on match
        card.style.display = name.includes(query) ? "block" : "none";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Select the search input and all menu cards
    const searchInput = document.querySelector(".search-input");
    const menuGrid = document.querySelector(".menu-grid");

    if (!searchInput || !menuGrid) return; // Exit if page has no menu

    const menuCards = menuGrid.querySelectorAll(".menu-card");

    // Listen for input in search bar
    searchInput.addEventListener("input", function() {
        const query = this.value.toLowerCase();
        let foundAny = false;

        menuCards.forEach(card => {
            const nameElement = card.querySelector(".menu-name");
            const nameText = nameElement.textContent.toLowerCase();

            // Reset previous highlights
            nameElement.innerHTML = nameElement.textContent;

            if(nameText.includes(query)) {
                card.style.display = "block";
                foundAny = true;

                // Highlight matched text
                if(query !== "") {
                    const regex = new RegExp(`(${query})`, "gi");
                    nameElement.innerHTML = nameText.replace(regex, '<span style="background-color: yellow;">$1</span>');
                }
            } else {
                card.style.display = "none";
            }
        });

        // Handle "No results found"
        let noResult = menuGrid.querySelector(".no-result");
        if(!foundAny && query !== "") {
            if(!noResult) {
                noResult = document.createElement("div");
                noResult.className = "no-result";
                noResult.textContent = "No results found";
                noResult.style.textAlign = "center";
                noResult.style.marginTop = "20px";
                menuGrid.appendChild(noResult);
            }
        } else if(noResult) {
            noResult.remove();
        }
    });
});


