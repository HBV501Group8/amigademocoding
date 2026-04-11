import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from "@hono/node-server/serve-static";
import Main from './views/main.jsx';
import Login from './views/login.jsx';
import Registration from './views/Registration.jsx';
import creditCard from './views/creditcard..jsx';
import { setCookie, getCookie } from "hono/cookie";
//import staticRoutes from "../Routes/static/servestataic.ts";
import { db } from '../db.js';

const app = new Hono()

/**
 * 🔐 Login user
 * @route POST /api/login
 * @body {email: string, password: string}
 * @returns HTML redirect or login page
 */
app.post("/api/login", async (c) => {
  const body = await c.req.parseBody();

  const email = body.email;
  const password = body.password;

  const lessons =   db.prepare("SELECT * FROM Users WHERE Email = ? AND Password = ?")
   .all(email+"", password+"");
  if (lessons.length > 0) {
    setCookie(c, "email", email + "");
    return c.redirect("/");
  } else {
    setCookie(c, "email", "");
    return c.html(Login());
  }
});

/**
 * 📝 Register new user
 * @route POST /api/register
 * @body {name: string, email: string, password: string, confirmPassword: string}
 * @returns HTML login page or JSON error
 */
app.post("/api/register", async (c) => {
  const body = await c.req.parseBody();

  const name = body.name;
  const email = body.email;
  const password = body.password;
  const confirm = body.confirmPassword;

  // 🔍 Validation
  if (!name || !email || !password || !confirm) {
    return c.json({ error: "All fields required" }, 400);
  }

  if (password !== confirm) {
    return c.json({ error: "Passwords do not match" }, 400);
  }

  const insertUser = db
    .prepare("INSERT INTO Users (Name,Email,Password) VALUES(?, ?, ?)")
    .run([name, email, password]);

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
app.get("/set", (c) => {
  setCookie(c, "user", "1");
  return c.redirect("/");
});

/**
 * 🧪 Debug route: set user cookie = 2
 */
app.get("/set2", (c) => {
  setCookie(c, "user", "2");
  return c.redirect("/");
});

/**
 * 🧪 Debug route: set user cookie = 3
 */
app.get("/set3", (c) => {
  setCookie(c, "user", "3");
  return c.redirect("/");
});

/**
 * 🏠 Home page
 * Reads cookies:
 * - user
 * - email
 */
app.get('/', (c) => {
  const userEmail = getCookie(c, "email");
  console.log("User email from cookie:", userEmail);

  const user = getCookie(c, "user");
  return c.html(Main(user, userEmail));
});

/**
 * 🔑 Login page
 */
app.get('/login', (c) => {
  setCookie(c, "email", "");
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

//app.route("/", staticRoutes);
app.get('*', serveStatic({ root: './src/static' }))
app.get('*', serveStatic({ root: './Video' }))
app.get('*', serveStatic({ root: './images' }))
app.get('*', serveStatic({ root: './src/views/artifacts/part1' }))
app.get('*', serveStatic({ root: './src/views/artifacts/part2' }))
app.get('*', serveStatic({ root: './src/views/artifacts/part3' }))
app.get('*', serveStatic({ root: './src/views/artifacts/part2/styles' }))
app.get('*', serveStatic({ root: './ADF' }))

/**
 * 📦 Download file: ASM-One.adf
 */
app.get(
  '/download',
  serveStatic({
    path: './ADF/ASM-One.adf',
    onFound: (_path, c) => {
      c.header('Content-Disposition', 'attachment; filename="ASM-One.adf"');
    },
  })
);

/**
 * 📦 Download file: CourseSources.adf
 */
app.get(
  '/downloadsource',
  serveStatic({
    path: './ADF/CourseSources.adf',
    onFound: (_path, c) => {
      c.header('Content-Disposition', 'attachment; filename="CourseSources.adf"');
    },
  })
);

/**
 * 📦 Download file: coursescroll.adf
 */
app.get(
  '/downloadsource2',
  serveStatic({
    path: './ADF/coursescroll.adf',
    onFound: (_path, c) => {
      c.header('Content-Disposition', 'attachment; filename="coursescroll.adf"');
    },
  })
);

/**
 * 📦 Download file: DemoSrc.adf
 */
app.get(
  '/downloadsource3',
  serveStatic({
    path: './ADF/DemoSrc.adf',
    onFound: (_path, c) => {
      c.header('Content-Disposition', 'attachment; filename="DemoSrc.adf"');
    },
  })
);

/**
 * 🚀 Start server
 */
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
});