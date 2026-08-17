export function startMatrixRain(canvasId = 'matrix-canvas') {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]|\\;:.,?!@#$%^&*()_+-=~`';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);
 function draw() {
  // Keep old characters visible a little longer
  ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `bold ${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {

    const char = chars[Math.floor(Math.random() * chars.length)];
    const chance = Math.random();

    // Brightness levels
    if (chance > 0.97) {
      // Very bright head
      ctx.fillStyle = '#ff6666';
    } else if (chance > 0.82) {
      // Medium bright
      ctx.fillStyle = '#ff2222';
    } else {
      // Dark red, but still visible
      ctx.fillStyle = '#cc0000';
    }

    ctx.fillText(
      char,
      i * fontSize,
      drops[i] * fontSize
    );

    if (
      drops[i] * fontSize > canvas.height &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

export function typeWriter(elementId, text, speed = 80, callback) {
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
      el.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

export function glitchText(el) {
  const original = el.textContent;
  const glitchChars = '!@#$%^&*<>{}[]|';
  let count = 0;
  const interval = setInterval(() => {
    el.textContent = original.split('').map((c, i) => {
      if (i < count) return c;
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }).join('');
    count++;
    if (count > original.length) {
      el.textContent = original;
      clearInterval(interval);
    }
  }, 40);
}
