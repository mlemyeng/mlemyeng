// ./libs/LoadingBar.js

class LoadingBar {
	constructor() {
		this.dom = document.createElement('div');
		this.dom.style.position = 'absolute';
		this.dom.style.top = '0';
		this.dom.style.left = '0';
		this.dom.style.width = '100%';
		this.dom.style.height = '100%';
		this.dom.style.backgroundColor = '#000'; // dark backdrop
		this.dom.style.display = 'flex';
		this.dom.style.alignItems = 'center';
		this.dom.style.justifyContent = 'center';
		this.dom.style.flexDirection = 'column';
		this.dom.style.zIndex = '9999';
		this.dom.style.fontFamily = 'Arial, sans-serif';

		this.barContainer = document.createElement('div');
		this.barContainer.style.width = '60%';
		this.barContainer.style.maxWidth = '500px';
		this.barContainer.style.background = 'rgba(255, 255, 255, 0.1)';
		this.barContainer.style.border = '2px solid rgba(255, 255, 255, 0.6)';
		this.barContainer.style.borderRadius = '12px';
		this.barContainer.style.overflow = 'hidden';
		this.barContainer.style.boxShadow = '0 0 15px rgba(255, 0, 128, 0.5)';

		this.bar = document.createElement('div');
		this.bar.style.height = '24px';
		this.bar.style.width = '0%';
		this.bar.style.background = 'linear-gradient(90deg, #ff69b4, #ff1493)';
		this.bar.style.transition = 'width 0.4s ease';

		this.barContainer.appendChild(this.bar);
		this.dom.appendChild(this.barContainer);

		// Fancy loading text
		this.text = document.createElement('div');
		this.text.style.color = '#fff';
		this.text.style.marginTop = '20px';
		this.text.style.fontSize = '18px';
		this.text.style.letterSpacing = '1px';
		this.text.innerText = 'Loading... 0%';
		this.dom.appendChild(this.text);

		document.body.appendChild(this.dom);
	}

	set progress(value) {
		const percent = Math.round(value * 100);
		this.bar.style.width = `${percent}%`;
		this.text.innerText = `Loading... ${percent}%`;
	}

	set visible(value) {
		this.dom.style.display = value ? 'flex' : 'none';
	}
}

export { LoadingBar };
