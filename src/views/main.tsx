import { html } from 'hono/html';

import Header from './header.js';
import Footer from './footer.js';
import content from './content.js';

//import { db } from '../../db.js';


/**
 *
 * @param {*} cookie
 * @returns
 */
export default function Main(cookie, userEmail,lessons) {
  //const val = getCookie("user"); // Example of using getCookie, you can replace "user" with the actual cookie name you want to retrieve
 // const lessons = db.prepare("SELECT * FROM lessons where section_id = '" +  cookie + "' ORDER BY order_index ASC").all();
  
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>My Page</title>
        <link rel="stylesheet" href="./static/styles.css" />
      </head>
      <body>
        ${Header(cookie, userEmail)}
        <!-- include header -->
        <main>
          ${content(lessons,cookie)}
          <!-- dynamic content -->
        </main>
        ${Footer()}
        <!-- include footer -->
      </body>
    </html>
  `;
}
