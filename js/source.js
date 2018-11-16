//Requires
const THREE = require('three');
//GLTF for 3D Models
//const GLTFLoader = require('three-gltf-loader');
const OrbitControls = require('three-orbitcontrols');
const Armario = require('./armario');
const Gaveta = require('./gaveta');
//Variables
var renderer = new THREE.WebGLRenderer({
	antialias: true
});
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
var scene = new THREE.Scene();
controls = new OrbitControls(camera, renderer.domElement);

var texture = new THREE.TextureLoader().load('floor.jpg', function (texture) {

	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	//texture.offset(0, 0);
	texture.repeat.set(10, 10);
});

var floor = new THREE.Mesh(
	new THREE.PlaneGeometry(200, 200, 200, 200),
	new THREE.MeshPhongMaterial({
		map: texture,
		side: THREE.FrontSide
	})
);
floor.rotation.x -= Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

function init() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
}

var angle = 0;

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	var h = Math.sqrt(directionalLight.position.x * directionalLight.position.x + directionalLight.position.z * directionalLight.position.z);
	directionalLight.position.x = h * Math.cos(angle);
	directionalLight.position.z = h * Math.sin(angle);
	angle += 0.003;
}

var armario = new Armario();
armario.position.y = 6;

var gaveta = new Gaveta();
armario.add(gaveta);
//gaveta.position.x = 30;
gaveta.position.y = 5;
gaveta.position.z = 1;

scene.add(armario);
scene.add(gaveta);

var ambientLight = new THREE.AmbientLight(0x404040, 0.2);
scene.add(ambientLight);
camera.position.set(0, 20, 20);
camera.lookAt(0, 0, 0);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.castShadow = true;
directionalLight.position.set(-5, 20, 10);
directionalLight.shadow.bias = -0.001;
scene.add(directionalLight);
init();
render();