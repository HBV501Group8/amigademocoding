import { html } from 'hono/html';
/**
 *
 * @returns
 */
export default function Registration() {
    return html `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Register</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .card {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            width: 350px;
          }

          h2 {
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .input-group {
            margin-bottom: 1rem;
          }

          .input-group input {
            width: 100%;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ccc;
            font-size: 14px;
            transition: 0.2s;
          }

          .input-group input:focus {
            outline: none;
            border-color: #4facfe;
          }

          .btn {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 8px;
            background: #4facfe;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
          }

          .btn:hover {
            background: #3b82f6;
          }

          .footer {
            text-align: center;
            margin-top: 1rem;
            font-size: 12px;
            color: #666;
          }

          .footer a {
            color: #4facfe;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <form
          class="card"
          id="registerForm"
          action="/api/register"
          method="POST"
        >
          <h2>Create Account</h2>

          <div class="input-group">
            <input type="text" name="name" placeholder="Full Name" required />
          </div>

          <div class="input-group">
            <input type="email" name="email" placeholder="Email" required />
          </div>

          <div class="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <div class="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button type="submit" class="btn">Register</button>

          <div class="footer">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>

        <script>
          // const form = document.getElementById("registerForm");

          // form.addEventListener("submit", (e) => {
          //   e.preventDefault();

          //   const formData = new FormData(form);
          //   const password = formData.get("password");
          //   const confirm = formData.get("confirmPassword");

          //   if (password !== confirm) {
          //     alert("Passwords do not match!");
          //     return;
          //   }

          // const res = await fetch("/api/register", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json"
          //   },
          //   body: JSON.stringify({ email, password,name})
          // });

          //   alert("Form is valid! Ready to send.");
          //   // You can now send with fetch()
          // });
        </script>
      </body>
    </html>
  `;
}
