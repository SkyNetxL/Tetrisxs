const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const jumpSound = document.getElementById("jumpSound");

let player = {
  x: 50,
  y: 300,
  width: 40,
  height: 40,
  dx: 0,
  dy: 0,
  color: "red",
  onGround: false
};

let gravity = 0.5;
let keys = {
  left: false,
  right: false,
  jump: false
};

let platforms = [
  { x: 0, y: 360, width: 800, height: 40 },
  { x: 200, y: 300, width: 100, height: 10 },
  { x: 400, y: 250, width: 150, height: 10 }
];

// Клавиатура
document.addEventListener("keydown", e => {
  if (e.code === "ArrowLeft") keys.left = true;
  if (e.code === "ArrowRight") keys.right = true;
  if (e.code === "Space") keys.jump = true;
});

document.addEventListener("keyup", e => {
  if (e.code === "ArrowLeft") keys.left = false;
  if (e.code === "ArrowRight") keys.right = false;
  if (e.code === "Space") keys.jump = false;
});

// Сенсорные кнопки
function moveLeft() { keys.left = true; setTimeout(() => keys.left = false, 200); }
function moveRight() { keys.right = true; setTimeout(() => keys.right = false, 200); }
function jump() { keys.jump = true; setTimeout(() => keys.jump = false, 200); }

function update() {
  player.dx = 0;
  if (keys.left) player.dx = -4;
  if (keys.right) player.dx = 4;
  if (keys.jump && player.onGround) {
    player.dy = -10;
    jumpSound.play();
  }

  player.x += player.dx;
  player.dy += gravity;
  player.y += player.dy;
  player.onGround = false;

  for (let plat of platforms) {
    if (
      player.x < plat.x + plat.width &&
      player.x + player.width > plat.x &&
      player.y + player.height > plat.y &&
      player.y + player.height < plat.y + plat.height &&
      player.dy >= 0
    ) {
      player.y = plat.y - player.height;
      player.dy = 0;
      player.onGround = true;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = "green";
  for (let plat of platforms) {
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();
