console.log("HERE");

requirejs.config({
	
	baseUrl: "assets/js",
	
}


requirejs(['Engine'],
function ($) {
	console.log("here");
	console.log(%.isYouAlive());
});