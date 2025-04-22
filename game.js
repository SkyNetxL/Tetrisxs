
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
let keys = {};

let platforms = [
  { x: 0, y: 360, width: 800, height: 40 },
  { x: 200, y: 300, width: 100, height: 10 },
  { x: 400, y: 250, width: 150, height: 10 }
];

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function moveLeft() { player.dx = -4; }
function moveRight() { player.dx = 4; }
function jump() {
  if (player.onGround) {
    player.dy = -10;
    jumpSound.play();
  }
}

function update() {
  player.dx = 0;
  if (keys["ArrowLeft"]) player.dx = -4;
  if (keys["ArrowRight"]) player.dx = 4;
  if (keys["Space"] && player.onGround) jump();

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
