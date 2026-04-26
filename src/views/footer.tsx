import { html } from 'hono/html';

/**
 *
 * @returns
 */

export default function footer() {
  return html`
  <footer>
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;display: block; margin: 20px auto; padding: 20px; background-color: black; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <p><strong>Author:</strong> Sigurjon Olafsson</p>

      <p>
        While I do not consider myself an expert in this field, I am committed to
        sharing what I have learned in the hope that it may be useful to others.
      </p>

      <p>
        If you have any questions, feedback, or suggestions for improvement,
        please feel free to get in touch.
      </p>

      <p>
        <strong>Contact:</strong>
        <a href="mailto:sigurjon@textor.is">sigurrvk@yahoo.com.is</a>
      </p>
    </div>
  </footer>
  `;
}
