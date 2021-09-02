let Component = GameObject.Component;

class PlayerController extends Component {
	init() {
		this.position = this.gameObject.position;
		this.speed = 3.5;
	}
	
	update() {
		this.position.x -= Input.KEY_A*this.speed;
		this.position.x += Input.KEY_D*this.speed;
		this.position.y -= Input.KEY_W*this.speed;
		this.position.y += Input.KEY_S*this.speed;
		
	}
}

class Bullet extends Component {
	start() {
		this.dx = 0;
		this.dy = 0;
		this.speed = 0;
	}
	
	update() {
		super.update();
		this.position.x += this.dx*this.speed;
		this.position.y += this.dy*this.speed;
	}
}

class EnemyAI extends Component {
	
	init() {
		this.target = new GameObject.Transform(100,100);
		this.speed = 1;
	}
	
	update() {
		const deltaX = this.target.x - this.gameObject.position.x;
		const deltaY = this.target.y - this.gameObject.position.y;
		const angle = Math.atan2( deltaY, deltaX );
		this.gameObject.position.translate( this.speed * Math.cos( angle ),this.speed * Math.sin( angle ));
	}
}