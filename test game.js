startEngine("myCanvas");

var testobj = new GameObject.Entity("test object",100,100);

var renderComp = new Renderer.SpriteRenderer(AssetManager.getImage("player"), 32,32);
testobj.addComponent(renderComp, Renderer.SpriteRenderer);

var plyer = new PlayerController();
testobj.addComponent(plyer, PlayerController);

var enemy = new EnemyAI();
enemy.init();
testobj.addComponent(enemy, EnemyAI);

World.addObject(testobj);

Renderer.draw();