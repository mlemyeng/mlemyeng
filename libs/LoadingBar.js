class LoadingBar {
	constructor() {
		this.dom = document.createElement('div');
		this.dom.style.position = 'absolute';
		this.dom.style.top = '50%';
		this.dom.style.left = '50%';
		this.dom.style.transform = 'translate(-50%, -50%)';
		this.dom.style.width = '360px';
		this.dom.style.height = '150px';
		this.dom.style.background = '#fff0f5'; // very light pink
		this.dom.style.borderRadius = '20px';
		this.dom.style.display = 'flex';
		this.dom.style.flexDirection = 'column';
		this.dom.style.alignItems = 'center';
		this.dom.style.justifyContent = 'center';
		this.dom.style.boxShadow = '0 0 30px rgba(255, 105, 180, 0.4)'; // pink glow
		this.dom.style.zIndex = '1000';
		this.dom.style.border = '2px solid #ffb6c1'; // soft pink border

		// Loading text
		this.text = document.createElement('div');
		this.text.innerText = 'Loading...';
		this.text.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
		this.text.style.fontSize = '18px';
		this.text.style.color = '#cc2e8c';
		this.text.style.marginBottom = '14px';

		// Background bar container
		this.barBg = document.createElement('div');
		this.barBg.style.width = '85%';
		this.barBg.style.height = '16px';
		this.barBg.style.background = '#f8c8dc'; // pale pink
		this.barBg.style.borderRadius = '8px';
		this.barBg.style.position = 'relative';
		this.barBg.style.overflow = 'hidden';
		this.barBg.style.boxShadow = 'inset 0 0 5px #fff';

		// Progress bar
		this.bar = document.createElement('div');
		this.bar.style.width = '0%';
		this.bar.style.height = '100%';
		this.bar.style.background = '#ff69b4'; // hot pink
		this.bar.style.position = 'absolute';
		this.bar.style.top = '0';
		this.bar.style.left = '0';
		this.bar.style.transition = 'width 0.4s ease-in-out';
		this.bar.style.borderRadius = '8px';

		this.barBg.appendChild(this.bar);
		this.dom.appendChild(this.text);
		this.dom.appendChild(this.barBg);
		document.body.appendChild(this.dom);
	}

	set progress(value) {
		this.bar.style.width = `${value * 100}%`;
		if (value >= 1) {
			this.text.innerText = '🎉 Ready to load!';
		}
	}

	set visible(value) {
		this.dom.style.display = value ? 'flex' : 'none';
	}
}

export { LoadingBar };
