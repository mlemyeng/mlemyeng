import * as THREE from './libs/three/three.module.js';
import { GLTFLoader } from './libs/three/jsm/GLTFLoader.js';
import { DRACOLoader } from './libs/three/jsm/DRACOLoader.js';
import { RGBELoader } from './libs/three/jsm/RGBELoader.js';
import { Stats } from './libs/stats.module.js';
import { LoadingBar } from './libs/LoadingBar.js';
import { VRButton } from './libs/VRButton.js';
import { CanvasUI } from './libs/CanvasUI.js';
import { GazeController } from './libs/GazeController.js'
import { XRControllerModelFactory } from './libs/three/jsm/XRControllerModelFactory.js';

class App {
    constructor() {
        const container = document.createElement('div');
        document.body.appendChild(container);

        this.assetsPath = './assets/';

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 500);
        this.camera.position.set(0, 1.6, 0);

        this.dolly = new THREE.Object3D();
        this.dolly.position.set(0, 0, 10);
        this.dolly.add(this.camera);
        this.dummyCam = new THREE.Object3D();
        this.camera.add(this.dummyCam);

        this.scene = new THREE.Scene();
        this.scene.add(this.dolly);

        const ambient = new THREE.HemisphereLight(0xFFFFFF, 0xAAAAAA, 0.8);
        this.scene.add(ambient);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild(this.renderer.domElement);
        this.setEnvironment();

        window.addEventListener('resize', this.resize.bind(this));

        this.clock = new THREE.Clock();
        this.up = new THREE.Vector3(0, 1, 0);
        this.origin = new THREE.Vector3();
        this.workingVec3 = new THREE.Vector3();
        this.workingQuaternion = new THREE.Quaternion();
        this.raycaster = new THREE.Raycaster();

        this.stats = new Stats();
        container.appendChild(this.stats.dom);

        this.loadingBar = new LoadingBar();

        // 🔊 Add background music
        const listener = new THREE.AudioListener();
        this.camera.add(listener);

        const audioLoader = new THREE.AudioLoader();
        this.backgroundMusic = new THREE.Audio(listener);
        audioLoader.load(this.assetsPath + 'bgm.mp3', (buffer) => {
            this.backgroundMusic.setBuffer(buffer);
            this.backgroundMusic.setLoop(true);
            this.backgroundMusic.setVolume(0.5);
            this.backgroundMusic.play();
        });

        this.loadCollege();
        this.immersive = false;

        const self = this;
        fetch('./college.json')
            .then(response => response.json())
            .then(obj => {
                self.boardShown = '';
                self.boardData = obj;
            });
    }

    // Everything else unchanged...
    // (You can paste the rest of your working App.js code below)


    setEnvironment() {
        const loader = new RGBELoader().setDataType(THREE.UnsignedByteType);
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();

        const self = this;

        loader.load('./assets/hdr/venice_sunset_1k.hdr', (texture) => {
            const envMap = pmremGenerator.fromEquirectangular(texture).texture;
            pmremGenerator.dispose();
            self.scene.environment = envMap;
        }, undefined, (err) => {
            console.error('An error occurred setting the environment');
        });
    }

    // All other methods below remain unchanged: resize(), loadCollege(), setupXR(), buildControllers(), 
    // moveDolly(), selectPressed(), showInfoboard(), render()

    // Assume user will paste rest of code here
}

export { App };
