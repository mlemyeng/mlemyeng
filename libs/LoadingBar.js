import * as THREE from './three/three.module.js';

class LoadingBar {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'loading-bar';
        Object.assign(this.container.style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '40px',
            backgroundColor: '#f0f0f0',
            borderRadius: '12px',
            border: '2px solid #ccc',
            textAlign: 'center',
            lineHeight: '40px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#555',
            zIndex: 9999
        });

        this.container.textContent = 'loading scene...';

        document.body.appendChild(this.container);
        this.visible = true;
    }

    set progress(value) {
        // Hide once fully loaded
        if (value >= 1) {
            this.visible = false;
        }
    }

    set visible(value) {
        this.container.style.display = value ? 'block' : 'none';
    }
}

export { LoadingBar };
