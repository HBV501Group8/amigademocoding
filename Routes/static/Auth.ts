import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import  Registration  from "../../src/views/Registration.jsx";   
import  Login from "../../src/views/Login.jsx";   

const auth = new Hono();


auth.get('/login', (c) => {
  setCookie(c, "email", "");
  return c.html(Login())
})

auth.get('/registration', (c) => {
  return c.html(Registration())
})

export default auth;