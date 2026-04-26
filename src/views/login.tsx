import { html } from 'hono/html';

/**
 *
 * @returns
 */
export default function Login() {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Login</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .login-card {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            width: 320px;
          }

          .login-card h2 {
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
          }

          .input-group input:focus {
            outline: none;
            border-color: #667eea;
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
            transition: 0.2s;
          }

          .btn:hover {
            background: #5a67d8;
          }

          .footer {
            text-align: center;
            margin-top: 1rem;
            font-size: 12px;
            color: #666;
          }

          .footer a {
            color: #667eea;
            text-decoration: none;
          }
        </style>
        <script>
          const form = document.getElementById('loginForm');
        </script>
      </head>
      <body>
        <form
          class="login-card"
          method="POST"
          action="/api/login"
          id="loginForm"
        >
          <h2>Sign In</h2>

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

          <button type="submit" class="btn">Login</button>

          <div class="footer">
            Don’t have an account? <a href="/register">Sign up</a>
          </div>
        </form>
      </body>
    </html>
  `;
}
