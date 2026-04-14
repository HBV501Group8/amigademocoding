import { Hono } from 'hono';
import Main from './views/main.jsx';
import Login from './views/login.js';
import Registration from './views/Registration.js';
import creditCard from './views/creditcard..js';
import { setCookie, getCookie } from 'hono/cookie';
//import { db } from '../db.js';

type Bindings = {
  DB: D1Database
  ASSETS: Fetcher
}

const app = new Hono<{ Bindings: Bindings }>()
/**
 * 🔐 Login user
 * @route POST /api/login
 * @body {email: string, password: string}
 * @returns HTML redirect or login page
 */
app.post('/api/login', async (c) => {
  const body = await c.req.parseBody();

  const email = body.email;
  const password = body.password;

  const lessons = c.env.DB
    .prepare('SELECT * FROM Users WHERE Email = ? AND Password = ?')
    .bind(email, password)
    .first();
  if (lessons) {
    setCookie(c, 'email', email + '');
    return c.redirect('/');
  } else {
    setCookie(c, 'email', '');
    return c.html(Login());
  }
});

app.get('/test-db', async (c) => {
  const result = await c.env.DB
    .prepare('SELECT 1 as test')
    .first()

  return c.json(result)
})
/**
 * 📝 Register new user
 * @route POST /api/register
 * @body {name: string, email: string, password: string, confirmPassword: string}
 * @returns HTML login page or JSON error
 */
app.post('/api/register', async (c) => {
  const body = await c.req.parseBody();

  const name = body.name;
  const email = body.email;
  const password = body.password;
  const confirm = body.confirmPassword;

  // 🔍 Validation
  if (!name || !email || !password || !confirm) {
    return c.json({ error: 'All fields required' }, 400);
  }

  if (password !== confirm) {
    return c.json({ error: 'Passwords do not match' }, 400);
  }

     c.env.DB
    .prepare('INSERT INTO Users (Name,Email,Password) VALUES(?, ?, ?)')
    .run.bind(name,email, password)
    .first();

  /**
   * ⚠️ NOTE: BUG HERE
   * `user` is not defined, but used below.
   * You probably meant insertUser.lastInsertRowid or similar.
   */
  // setCookie(c, "user", String(user.id), {
  //   httpOnly: true,
  //   path: "/",
  //   maxAge: 60 * 60 * 24
  // });

  return c.html(Login());
});

/**
 * 🧪 Debug route: set user cookie = 1
 * @route GET /set
 */
app.get('/set', (c) => {
  setCookie(c, 'user', '1');
  return c.redirect('/');
});

/**
 * 🧪 Debug route: set user cookie = 2
 */
app.get('/set2', (c) => {
  setCookie(c, 'user', '2');
  return c.redirect('/');
});

/**
 * 🧪 Debug route: set user cookie = 3
 */
app.get('/set3', (c) => {
  setCookie(c, 'user', '3');
  return c.redirect('/');
});

/**
 * 🏠 Home page
 * Reads cookies:
 * - user
 * - email
 */
app.get ('/', async(c) => {
  const userEmail = getCookie(c, 'email');
  console.log('User email from cookie:', userEmail);

  const user = getCookie(c, 'user');

  const lessons = await c.env.DB
  .prepare("SELECT * FROM lessons WHERE section_id = ? ORDER BY order_index ASC")
  .bind(user)
  .all();

console.log('Lessons from DB:', lessons.results);

return c.html(Main(user, userEmail, lessons.results));
    
});

/**
 * 🔑 Login page
 */
app.get('/login', (c) => {
  setCookie(c, 'email', '');
  return c.html(Login());
});

/**
 * 📝 Register page
 */
app.get('/register', (c) => {
  return c.html(Registration());
});

/**
 * 💳 Credit card page
 */
app.get('/creditcard', (c) => {
  return c.html(creditCard());
});

app.get('*', (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
})
export default app