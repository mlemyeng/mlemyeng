// ./libs/LoadingBar.js

class LoadingBar {
	constructor() {
		// Load Google Fonts (if needed)
		const link = document.createElement('link');
		link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap';
		link.rel = 'stylesheet';
		document.head.appendChild(link);

		// Main loading box
		this.dom = document.createElement('div');
		this.dom.style.position = 'absolute';
		this.dom.style.top = '50%';
		this.dom.style.left = '50%';
		this.dom.style.transform = 'translate(-50%, -50%)';
		this.dom.style.width = '250px';
		this.dom.style.height = '150px';
		this.dom.style.backgroundColor = '#ffe6ee';
		this.dom.style.border = '2px solid #ffb6c1';
		this.dom.style.borderRadius = '20px';
		this.dom.style.display = 'flex';
		this.dom.style.alignItems = 'center';
		this.dom.style.justifyContent = 'center';
		this.dom.style.flexDirection = 'column';
		this.dom.style.fontFamily = '"Poppins", Arial, sans-serif';
		this.dom.style.fontWeight = '600';
		this.dom.style.zIndex = '1000';
		this.dom.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';

		// Text inside the box
		this.text = document.createElement('div');
		this.text.style.color = '#444';
		this.text.style.fontSize = '18px';
		this.text.style.textTransform = 'lowercase';
		this.text.innerText = 'loading';

		this.dom.appendChild(this.text);
		document.body.appendChild(this.dom);
	}

	set progress(value) {
		if (value >= 1) {
			this.text.innerText = 'ready to start!';
		}
	}

	set visible(value) {
		this.dom.style.display = value ? 'flex' : 'none';
	}
}

export { LoadingBar };
