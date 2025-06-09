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

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );

		this.assetsPath = './assets/';
        
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 500 );
		this.camera.position.set( 0, 1.6, 0 );
        
        this.dolly = new THREE.Object3D();
        this.dolly.position.set(0, 0, 10);
        this.dolly.add( this.camera );
        this.dummyCam = new THREE.Object3D();
        this.camera.add( this.dummyCam );
        
		this.scene = new THREE.Scene();
        this.scene.add( this.dolly );
        
		const ambient = new THREE.HemisphereLight(0xFFFFFF, 0xAAAAAA, 0.8);
		this.scene.add(ambient);

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		container.appendChild( this.renderer.domElement );
        this.setEnvironment();
	
        window.addEventListener( 'resize', this.resize.bind(this) );
        
        this.clock = new THREE.Clock();
        this.up = new THREE.Vector3(0,1,0);
        this.origin = new THREE.Vector3();
        this.workingVec3 = new THREE.Vector3();
        this.workingQuaternion = new THREE.Quaternion();
        this.raycaster = new THREE.Raycaster();
        
        this.stats = new Stats();
		container.appendChild( this.stats.dom );
        
		this.loadingBar = new LoadingBar();
		
		this.loadCollege();
        
        this.immersive = false;

        this.keyStates = {};
        window.addEventListener('keydown', (event) => {
            this.keyStates[event.code] = true;
        });
        window.addEventListener('keyup', (event) => {
            this.keyStates[event.code] = false;
        });
        
        const self = this;
        
        fetch('./college.json')
            .then(response => response.json())
            .then(obj =>{
                self.boardShown = '';
                self.boardData = obj;
            });
	}

    handleKeyboardControls(dt) {
        const speed = 2;
        const move = new THREE.Vector3();

        if (this.keyStates['KeyW']) move.z -= 1;
        if (this.keyStates['KeyS']) move.z += 1;
        if (this.keyStates['KeyA']) move.x -= 1;
        if (this.keyStates['KeyD']) move.x += 1;

        if (move.lengthSq() === 0) return;

        move.normalize().multiplyScalar(speed * dt);

        const dir = new THREE.Vector3();
        this.dummyCam.getWorldDirection(dir);
        dir.y = 0;
        dir.normalize();

        const right = new THREE.Vector3();
        right.crossVectors(this.up, dir).normalize();

        const moveOffset = new THREE.Vector3();
        moveOffset.copy(dir).multiplyScalar(move.z).add(right.multiplyScalar(move.x));

        this.dolly.position.add(moveOffset);
    }

    setEnvironment(){ /* unchanged */ }
    resize(){ /* unchanged */ }
    loadCollege(){ /* unchanged */ }
    setupXR(){ /* unchanged */ }
    buildControllers( parent = this.scene ){ /* unchanged */ }
    moveDolly(dt){ /* unchanged */ }
    get selectPressed(){ /* unchanged */ }
    showInfoboard( name, info, pos ){ /* unchanged */ }

	render( timestamp, frame ){
        const dt = this.clock.getDelta();

        if (this.renderer.xr.isPresenting){
            let moveGaze = false;
            if ( this.useGaze && this.gazeController!==undefined){
                this.gazeController.update();
                moveGaze = (this.gazeController.mode == GazeController.Modes.MOVE);
            }

            if (this.selectPressed || moveGaze){
                this.moveDolly(dt);
                if (this.boardData){
                    const scene = this.scene;
                    const dollyPos = this.dolly.getWorldPosition( new THREE.Vector3() );
                    let boardFound = false;
                    Object.entries(this.boardData).forEach(([name, info]) => {
                        const obj = scene.getObjectByName( name );
                        if (obj !== undefined){
                            const pos = obj.getWorldPosition( new THREE.Vector3() );
                            if (dollyPos.distanceTo( pos ) < 3){
                                boardFound = true;
                                if ( this.boardShown !== name) this.showInfoboard( name, info, pos );
                            }
                        }
                    });
                    if (!boardFound){
                        this.boardShown = "";
                        this.ui.visible = false;
                    }
                }
            }
        } else {
            this.handleKeyboardControls(dt);
        }

        if ( this.immersive != this.renderer.xr.isPresenting){
            this.resize();
            this.immersive = this.renderer.xr.isPresenting;
        }

        this.stats.update();
		this.renderer.render(this.scene, this.camera);
	}
}

export { App };
