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
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const green = Math.random() > 0.05 ? '#00ff41' : '#00ffcc';
      ctx.fillStyle = red;
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 50);
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
