import { html } from 'hono/html'


export default function footer() {
  
    return html`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Payment</title>

<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .card-preview {
    width: 320px;
    height: 190px;
    border-radius: 16px;
    padding: 20px;
    color: white;
    background: linear-gradient(135deg, #667eea, #764ba2);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .card-type {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 14px;
    opacity: 0.8;
  }

  .card-number {
    font-size: 18px;
    letter-spacing: 2px;
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .form {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    width: 320px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }

  .input-group {
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  input:focus {
    outline: none;
    border-color: #667eea;
  }

  .row {
    display: flex;
    gap: 10px;
  }

  .btn {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #667eea;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  .btn:hover {
    background: #5a67d8;
  }

  .error {
    color: red;
    font-size: 12px;
  }
</style>
</head>

<body>

<div class="container">

  <!-- 💳 Card Preview -->
  <div class="card-preview">
    <div class="card-type" id="cardType">CARD</div>
    <div class="card-number" id="cardNumber">#### #### #### ####</div>
    <div class="card-bottom">
      <span id="cardName">Your Name</span>
      <span id="cardExpiry">MM/YY</span>
    </div>
  </div>

  <!-- 🧾 Form -->
  <form class="form" id="paymentForm">
    <h2>Payment</h2>

    <div class="input-group">
      <input type="text" id="name" placeholder="Cardholder Name" required>
    </div>

    <div class="input-group">
      <input type="text" id="number" placeholder="Card Number" required>
      <div class="error" id="numberError"></div>
    </div>

    <div class="row">
      <input type="text" id="expiry" placeholder="MM/YY" required>
      <input type="password" id="cvv" placeholder="CVV" maxlength="4" required>
    </div>

    <button class="btn" type="submit">Pay Now</button>
  </form>

</div>

<script>
const number = document.getElementById("number");
const name = document.getElementById("name");
const expiry = document.getElementById("expiry");
const cardType = document.getElementById("cardType");

// 💳 Format card number
number.addEventListener("input", () => {
  let value = number.value.replace(/\D/g, "").substring(0, 16);
  value = value.replace(/(.{4})/g, "$1 ").trim();
  number.value = value;

  document.getElementById("cardNumber").innerText =
    value || "#### #### #### ####";

  detectCardType(value);
});

// 🧠 Detect card type
function detectCardType(num) {
  if (num.startsWith("4")) {
    cardType.innerText = "VISA";
  } else if (/^5[1-5]/.test(num)) {
    cardType.innerText = "MASTERCARD";
  } else {
    cardType.innerText = "CARD";
  }
}

// 👤 Name
name.addEventListener("input", () => {
  document.getElementById("cardName").innerText =
    name.value || "Your Name";
});

// 📅 Expiry
expiry.addEventListener("input", () => {
  document.getElementById("cardExpiry").innerText =
    expiry.value || "MM/YY";
});

// 🔐 Luhn validation
function isValidCard(num) {
  let sum = 0;
  let shouldDouble = false;

  num = num.replace(/\s/g, "");

  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

// 🚀 Submit
document.getElementById("paymentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const error = document.getElementById("numberError");

  if (!isValidCard(number.value)) {
    error.innerText = "Invalid card number";
    return;
  }

  error.innerText = "";
  alert("Payment submitted (demo)");
});
</script>

</body>
</html>
`}