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


app.get('/logout', (c) => {
  setCookie(c, 'user', '');
  setCookie(c, 'email', '');
  return c.redirect('/login');
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
  let user = getCookie(c, 'user');
  if(!user) {
    user =  '1';
   //  return c.html(Login());
  }
  if(userEmail=='') {
    return c.html(Login());
  }
  const lessons = await c.env.DB
  .prepare("SELECT * FROM lessons WHERE section_id = ? ORDER BY order_index ASC")
  .bind(user)
  .all();

  console.log('User from cookie:', user);

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
app.get('/adf', (c) => {
  return c.html(creditCard());
});

app.get('/Artifacts/Part1/download', async (c) => {
  const url = new URL('/ADF/ASM-One.adf', c.req.url)

  const res = await c.env.ASSETS.fetch(new Request(url))

  return new Response(res.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": 'attachment; filename="ASM-One.adf"'
    }
  })
})

app.get('/Artifacts/Part1/downloadsource', async (c) => {
  const url = new URL('/ADF/CourseSources.adf', c.req.url)

  const res = await c.env.ASSETS.fetch(new Request(url))

  return new Response(res.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": 'attachment; filename="CourseSources.adf"'
    }
  })
})

app.get('/Artifacts/Part2/downloadsource2', async (c) => {
  const url = new URL('/ADF/courseScroll.adf', c.req.url)

  const res = await c.env.ASSETS.fetch(new Request(url))

  return new Response(res.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": 'attachment; filename="courseScroll.adf"'
    }
  })
})

app.get('/Artifacts/Part3/downloadsource3', async (c) => {
  const url = new URL('/ADF/DemoSrc.adf', c.req.url)

  const res = await c.env.ASSETS.fetch(new Request(url))

  return new Response(res.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": 'attachment; filename="DemoSrc.adf"'
    }
  })
})

app.get('/Artifacts/Part3/downloadsource4', async (c) => {
  const url = new URL('/ADF/stars3d.adf', c.req.url)

  const res = await c.env.ASSETS.fetch(new Request(url))

  return new Response(res.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": 'attachment; filename="stars3d.adf"'
    }
  })
})

app.get('/Artifacts/Part3/downloadvideo', async (c) => {
  const url = new URL('/Video/amigademo.mp4', c.req.url)

  const res = await c.env.ASSETS.fetch(new Request(url))

  return new Response(res.body, {
    status: res.status,
    headers: {
      ...res.headers,
      "Content-Type": "video/mp4",
      "Content-Disposition": 'attachment; filename="amigademo.mp4"'
    }
  })
})


app.get('*', (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
})


/**
 * 📦 Download file: ASM-One.adf
 */

app.get('download', async (c) => {
  const file = await c.env.ASSETS.fetch(
    new Request(new URL('/ADF/ASM-One.adf', c.req.url))
  )

  return new Response(file.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": 'attachment; filename="ASM-One.adf"'
    }
      
  })
  c.redirect('/');
})

app.get('/download2', async (c) => {

  const url = new URL('/ADF/ASM-One.adf', c.req.url)
  const res = c.env.ASSETS.fetch(new Request(url))
  return await new Response((await res).body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": 'attachment; filename="ASM-One.adf"'
    }
  })
})
/**
 * 📦 Download file: CourseSources.adf
 */
// app.get(
//   '/downloadsource',
//   serveStatic({
//     path: './ADF/CourseSources.adf',
//     onFound: (_path, c) => {
//       c.header(
//         'Content-Disposition',
//         'attachment; filename="CourseSources.adf"'
//       );
//     },
//   })
// );

// /**
//  * 📦 Download file: coursescroll.adf
//  */
// app.get(
//   '/downloadsource2',
//   serveStatic({
//     path: './ADF/coursescroll.adf',
//     onFound: (_path, c) => {
//       c.header(
//         'Content-Disposition',
//         'attachment; filename="coursescroll.adf"'
//       );
//     },
//   })
// );

// /**
//  * 📦 Download file: DemoSrc.adf
//  */
// app.get(
//   '/downloadsource3',
//   serveStatic({
//     path: './ADF/DemoSrc.adf',
//     onFound: (_path, c) => {
//       c.header('Content-Disposition', 'attachment; filename="DemoSrc.adf"');
//     },
//   })
// );

export default app