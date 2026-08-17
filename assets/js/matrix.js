export function startMatrixRain(canvasId = 'matrix-canvas') {
  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    console.warn(`Matrix canvas #${canvasId} not found.`);
    return;
  }

  const ctx = canvas.getContext('2d');

  const chars =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]|\\;:.,?!@#$%^&*()_+-=~`';

  const fontSize = 14;

  let columns = 0;
  let drops = [];

  // ─────────────────────────────
  // CANVAS RESIZE
  // ─────────────────────────────
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);

    drops = Array(columns).fill(0).map(() => {
      return Math.floor(Math.random() * -50);
    });
  }

  resize();

  window.addEventListener('resize', resize);

  // ─────────────────────────────
  // MATRIX DRAW
  // ─────────────────────────────
  function draw() {

    // Dark fade / trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Matrix font
    ctx.font = `bold ${fontSize}px monospace`;

    for (let i = 0; i < columns; i++) {

      const char =
        chars[Math.floor(Math.random() * chars.length)];

      const chance = Math.random();

      // ─────────────────────────
      // CHARACTER BRIGHTNESS
      // ─────────────────────────

      if (chance > 0.97) {

        // Bright head
        ctx.fillStyle = '#ff6666';

      } else if (chance > 0.82) {

        // Medium red
        ctx.fillStyle = '#ff2222';

      } else {

        // Normal red
        ctx.fillStyle = '#e60000';
      }

      // Draw character
      ctx.fillText(
        char,
        i * fontSize,
        drops[i] * fontSize
      );

      // ─────────────────────────
      // RESET DROP
      // ─────────────────────────

      if (
        drops[i] * fontSize > canvas.height &&
        Math.random() > 0.975
      ) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  // 50ms = smooth Matrix animation
  setInterval(draw, 50);
}


// ─────────────────────────────────
// TYPEWRITER EFFECT
// ─────────────────────────────────

export function typeWriter(
  elementId,
  text,
  speed = 80,
  callback
) {

  const el = document.getElementById(elementId);

  if (!el) return;

  el.textContent = '';

  let i = 0;

  const cursor = document.createElement('span');

  cursor.className = 'cursor';
  cursor.textContent = '|';

  el.appendChild(cursor);

  const interval = setInterval(() => {

    if (i < text.length) {

      el.insertBefore(
        document.createTextNode(text[i]),
        cursor
      );

      i++;

    } else {

      clearInterval(interval);

      if (callback) {
        callback();
      }
    }

  }, speed);
}


// ─────────────────────────────────
// GLITCH TEXT EFFECT
// ─────────────────────────────────

export function glitchText(el) {

  if (!el) return;

  const original = el.textContent;

  const glitchChars =
    '!@#$%^&*<>{}[]|';

  let count = 0;

  const interval = setInterval(() => {

    el.textContent = original
      .split('')
      .map((c, i) => {

        if (i < count) {
          return c;
        }

        return glitchChars[
          Math.floor(
            Math.random() * glitchChars.length
          )
        ];

      })
      .join('');

    count++;

    if (count > original.length) {

      el.textContent = original;

      clearInterval(interval);
    }

  }, 40);
}
