import { getCookie } from 'hono/cookie';
import { html } from 'hono/html';

/**
 *
 * @param {*} lessons
 * @returns
 */
export default function content(lessons,cookie) {
  console.log('User cookie value in content component:', cookie); // Debug log to check cookie value
  let  part='';
  if(cookie == '1') {
    part = 'Artifacts/Part1';
  }
  if(cookie == '2') {
    part = 'Artifacts/Part2';
  }
  if(cookie == '3') {
    part = 'Artifacts/Part3';
  }
  //console.log('Lessons in content component:', lessons);
    
 
  return html`
    <Main>
     <div class="card-container">

  ${lessons.map(
    (lesson) => html`
  
     <div class="card-container">

        <a href="./${part}/${lesson.content}" class="card"><i class="fas fa-home fa-2x"></i><span>${lesson.title}</span></a>
      </span></a> 
      </div>
    `
  )}
; 
    </div>
  </main>
`;
}
