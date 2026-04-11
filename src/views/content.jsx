import { html } from 'hono/html'
import { db } from "../../db";

import React from 'react';




/**
 * 
 * @param {*} lessons 
 * @returns 
 */
export default function content(lessons) {
  
return html`
    <Main>
     <div class="card-container">

  ${lessons.map(
    (lesson) => html`

     <div class="card-container">

        <a href="./${lesson.content}" class="card"><i class="fas fa-home fa-2x"></i><span>${lesson.title}</span></a>
      </span></a> 
      </div>
    `
    
   )}
; 
    </div>
  </main>
`
}
