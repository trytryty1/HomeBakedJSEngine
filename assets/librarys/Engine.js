

var AssetManager = {
	getImage: function(name) {
		if(this.loadedAssets == undefined)
			this.loadedAssets = {};
		
		if(this.loadedAssets[name] == undefined) {
			let img = new Image();
			img.src = 'assets\\sprites\\' + name + '.png';
			this.loadedAssets[name] = img;
		}
		return this.loadedAssets[name];
	}
}

var GUI = {
	init: function() {
		this.items = [];
	},
	
	addItem: function(item) {
		this.items.push(item);
	},
	
	mouseDown: function() {
		for(const item of this.items) {
			if(item.mouseDown != undefined)
				if(item.mouseDown())
					return true;
		}
	},
	
	draw: function() {
		for(const item of this.items) {
			item.draw();
		}
	},
	
	GUIButton: class {
		constructor(x,y,width,height, listener) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.listener = listener;
		}
		
		draw() {
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
		
		mouseDown() {
			const x = Input.Mouse.x;
			const y = Input.Mouse.y;
			if(x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
				this.listener();
				return true;
			}
		}
	},
}

var World = {
	init: function() {
		this.gameObjects = [];
	},
	
	addObject: function(object) {
		this.gameObjects.push(object);
		object.init();
	},
	
	removeObject: function(object) {
		this.gameObjects.splice(this.gameObjects.indexOf(object), 1);
	},
	
	update: function() {
		for(var i = 0; i < this.gameObjects.length; ++i) {
			this.gameObjects[i].update();
		}
	},
	
	draw: function() {
		for(var i = 0; i < Math.pow(this.tileGridSize,2); ++i) {
			ctx.drawImage(this.tiles[i].img, (i%this.tileGridSize)*this.tileSize - cam.x, Math.floor(i/this.tileGridSize)*this.tileSize - cam.y);
		}
		for(var i = 0; i < this.gameObjects.length; ++i) {
			this.gameObjects[i].draw();
		}
	},
}

var GameObject = {
	Entity: class {
		constructor(name, x,y) {
			this.name = name;
			this.position = new GameObject.Transform(x,y);
			this.active = true;
			
			//init components
			this.components = {};
		}
		
		init() {
			for(const componentType in this.components) {
				const component = this.components[componentType];
				component.init();
			}
		}
		
		addComponent(component, T) {
			if(this.components[T] != undefined) {
				console.log("Tried adding component: <<" + T.toString() + ">> but failded because the object: <<" + this.toString + ">> already contains a component of that type");
				return false;
			} else {
				this.components[T] = component;
				component.gameObject = this;
			}
			
		}
		
		getComponent(T) {
			if(components[T] == undefined) {
				console.log("Tried getting component: <<" + T.toString() + ">> but failded because the entity: <<" + this.toString + ">> does not contain a component of that type");
				return false;
			} else {
				return components[T];
			}
		}
		
		update() {
			for(const componentType in this.components) {
				const component = this.components[componentType];
				if(component.active)
					component.update();
			}
		}
		
		destroy() {
			for(const componentType in this.components) {
				const component = this.components[componentType];
				component.destroy();
			}
			this.active = false;
		}
		
		toString() {
			return "(type: Entity, name: " + this.name + ")";
		}
	},
	
	Transform: class {
		constructor(x, y) {
			// default transform is (0, 0)
			this.x = x == undefined ? 0: x;
			this.y = y == undefined ? 0: y;
		}
		
		translate(x, y) {
			this.x += x;
			this.y += y;
		}
	},
	
	Component: class {
		constructor(gameObject) {
			this.gameObject = gameObject;
			this.active = true;
		}
		
		init() {
			
		}
		
		update() {
			
		}
		
		destroy() {
			
		}
	}
}

var Physics = {
	
	RigidBody: class extends GameObject.Component {
		
	},
	
}

var Input = {
	
	KEY_A: 0,KEY_S: 0,KEY_D:0,KEY_W:0,
	
	mouseMoved: function(e) {
		var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
		var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
		var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make
	},

	mouseDown: function(e) {
		var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
		var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
		var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make
		
		GUI.mouseDown();
	},

	mouseUp: function(e) {
		var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
		var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
		var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make
	},

	keyPress: function(e) {
		if(e.code == "KeyA") {
			Input.KEY_A = 1;
		}
		if(e.code == "KeyD") {
			Input.KEY_D = 1;
		}
		if(e.code == "KeyS") {
			Input.KEY_S = 1;
		}
		if(e.code == "KeyW") {
			Input.KEY_W = 1;
		}
		if(e.code == "Space") {
			Input.KEY_SPACE = 1;
		}
		
		if(e.code == "KeyR") {
			Input.KEY_R = 1;
		}
	},
		
	keyUp: function(e) {
		if(e.code == "KeyA") {
			Input.KEY_A = 0;
		}
		if(e.code == "KeyD") {
			Input.KEY_D = 0;
		}
		if(e.code == "KeyS") {
			Input.KEY_S = 0;
		}
		if(e.code == "KeyW") {
			Input.KEY_W = 0;
		}
		if(e.code == "Space") {
			Input.KEY_SPACE = 0;
		}
		
		if(e.code == "KeyR") {
			Input.KEY_R = 0;
		}
	},

}

var Renderer = {
	init: function() {
		this.items = [];
	},
	
	draw: function() {
		//Clear canvas
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, 500, 500);
		for(const item of this.items) {
			Renderer.rotate(item.gameObject.position.x, item.gameObject.position.y, 0);
			ctx.drawImage(item.sprite,
			-item.width/2,
			-item.height/2,
			item.width,
			item.height);
			ctx.restore();
		}
		//ctx.drawImage(AssetManager.getImage("woodwall"),50,50, Math.PI);
	},
	
	rotate: function(x,y,angle) {
		ctx.save();
		ctx.translate(x,y);
		ctx.rotate(angle);
	},
	
	addItem: function(item) {
		this.items.push(item);
	},
	
	removeItem: function(item) {
		this.items.splice(this.items.indexOf(item), 1);
	},
	
	SpriteRenderer: class extends GameObject.Component {
		constructor(sprite, width, height, offsetx, offsety) {
			super();
			this.sprite = sprite;
			this.width = width;
			this.height = height;
			this.offsetx = offsetx == undefined? 0: offsetx;
			this.offsety = offsety == undefined? 0: offsety;
		}
		
		init() {
			Renderer.addItem(this);
		}
		
		destroy() {
			Renderer.removeItem(this);
		}
	}
}

var canvas;
var ctx;
function startEngine(canvasName) {
	console.log("Starting Engine...");
	
	canvas = document.getElementById(canvasName);
	ctx = undefined;
	if(canvas == undefined) {
		console.log("cannot find canvas with name: <<" + canvasName + ">>");
		return false;
	}
	
	ctx = canvas.getContext("2d");
	
	GUI.init();
	World.init();
	Renderer.init();
	
	document.addEventListener('keypress', Input.keyPress);
	document.addEventListener('keyup', Input.keyUp);
	document.addEventListener('mousedown', Input.mouseDown);
	document.addEventListener('mouseup', Input.mouseUp);
	document.addEventListener('mousemove', Input.mouseMoved);
	
	setInterval(update, 50);
	
	console.log("Done");
}



function update() {
	Renderer.draw();
	World.update();
}