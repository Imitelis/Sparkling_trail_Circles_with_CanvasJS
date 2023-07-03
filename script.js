const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
	x: undefined,
	y: undefined
}

let rgb = [
	[26, 188, 156],
	[46, 204, 113],
	[52, 152, 219],
	[155, 89, 182],
	[241, 196, 15],
	[230, 126, 34],
	[231, 76, 60]
];

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

class Ball {
	constructor() {
		this.x = mouse.x + getRandomInt(-20, 20);
		this.y = mouse.y + getRandomInt(-20, 20);
		this.size = getRandomInt(10, 20);
		this.rgb = rgb[getRandomInt(0, rgb.length - 1)];
		this.style = "rgba("+this.rgb[0]+","+this.rgb[1]+","+this.rgb[2]+", 0.5)";
	}
	
	draw() {
		ctx.fillStyle = this.style;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
	
	update() {
		if (this.size > 0) {
			let s = this.size - 0.3;
			this.size = (s <= 0) ? 0 : s;
		}
	}
}

class init {
  constructor() {
    this.animate = this.animate.bind(this);
    this.balls = [];

	this.resize();
    this.animate();
  }

  resize() {
    canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	if (mouse.x !== undefined && mouse.y !== undefined) {
		this.balls.push(new Ball());
	}
	
	if (this.balls.length > 200) {
		this.balls = this.balls.slice(1);
	}
	
	for (let i = 0; i < this.balls.length; i++) {
		this.balls[i].update();
		this.balls[i].draw();
	}

	requestAnimationFrame(this.animate);
  }
}

const animation = new init();

window.addEventListener('resize',
  function () {
    animation.resize();
	animation.animate();
  })
  
window.addEventListener('mousemove',
function(e){
    mouse.x = e.x;
	mouse.y = e.y;
})

window.addEventListener('mouseout',
function(){
    mouse.x = undefined;
	mouse.y = undefined;
})