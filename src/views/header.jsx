import { getCookie } from 'hono/cookie'
import { html } from 'hono/html'

/**
 * 
 * @param {*} id 
 * @returns 
 */

export default function header(cookie,userEmail) {
    console.log("Header received cookie:", cookie); // Log the received cookie value for debugging
    //const cookieValue = getCookie("email"); // Example of using getCookie, you can replace "email" with the actual cookie name you want to retrieve
    //console.log("Cookie value:", cookieValue); // Log the cookie value to the console for debugging
    let strpart = "Basic of Amiga register using";
    if(cookie=="2") {
      strpart = "Blitter,scrolling and plasma";
    }
    if(cookie=="3") {
      strpart = "The 3rd dimension, projection and rotations";
    }

    return html`
   <style>
   .nav {
    display: flex;
    gap: 20px;          /* space between items */
    align-items: center;
    justify-content: center;
}
   </style>

   <header>
    <img src="./AmigaLogo.PNG" alt="Amiga Logo" class="logo">
      <h4>Logged in as ${userEmail}</h4>

    <h1>Welcome to the Amiga demo coding for beginners</h1>
    <div class="nav">
      
      <h2><a href="/set"> Part 1 </a></h2>
      <h2><a href="/set2"> Part 2 </a></h2>
      <h2><a href="/set3"> Part 3 </a></h2>
      
    </div>
    <div>
      <h2>${strpart}</h2>
    
    </div>


  </header>
  `}
