// ── Starfield ──────────────────────────────────────────
(function () {
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      op: 0,
      maxOp: Math.random() * 0.55 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function initStars() {
    stars = [];
    const count = Math.min(Math.floor((W * H) / 5000), 280);
    for (let i = 0; i < count; i++) stars.push(createStar());
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.008;
    stars.forEach((s) => {
      s.op = s.maxOp * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.op})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  initStars();
  draw();
  window.addEventListener("resize", () => {
    resize();
    initStars();
  });
})();

// ── Nav scroll ─────────────────────────────────────────
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
});
