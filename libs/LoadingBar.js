class LoadingBar {
	constructor() {
		this.dom = document.createElement('div');
		this.dom.style.position = 'absolute';
		this.dom.style.top = '50%';
		this.dom.style.left = '50%';
		this.dom.style.transform = 'translate(-50%, -50%)';
		this.dom.style.width = '360px';
		this.dom.style.height = '140px';
		this.dom.style.background = '#fff0f5'; // very light pink
		this.dom.style.borderRadius = '20px';
		this.dom.style.display = 'flex';
		this.dom.style.flexDirection = 'column';
		this.dom.style.alignItems = 'center';
		this.dom.style.justifyContent = 'center';
		this.dom.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
		this.dom.style.zIndex = '1000';
		this.dom.style.border = '1.5px solid #f2aebe'; // soft outline

		// Loading text
		this.text = document.createElement('div');
		this.text.innerText = 'loading...';
		this.text.style.fontFamily = '"Trebuchet MS", sans-serif';
		this.text.style.fontSize = '17px';
		this.text.style.color = '#b23a70';
		this.text.style.marginBottom = '12px';
		this.text.style.letterSpacing = '0.5px';

		// Background bar container
		this.barBg = document.createElement('div');
		this.barBg.style.width = '85%';
		this.barBg.style.height = '14px';
		this.barBg.style.background = '#f8d4e2'; // pale pink
		this.barBg.style.borderRadius = '7px';
		this.barBg.style.position = 'relative';
		this.barBg.style.overflow = 'hidden';

		// Progress bar
		this.bar = document.createElement('div');
		this.bar.style.width = '0%';
		this.bar.style.height = '100%';
		this.bar.style.background = '#e87ba9'; // soft rose pink
		this.bar.style.position = 'absolute';
		this.bar.style.top = '0';
		this.bar.style.left = '0';
		this.bar.style.transition = 'width 0.4s ease-in-out';
		this.bar.style.borderRadius = '7px';

		this.barBg.appendChild(this.bar);
		this.dom.appendChild(this.text);
		this.dom.appendChild(this.barBg);
		document.body.appendChild(this.dom);
	}

	set progress(value) {
		this.bar.style.width = `${value * 100}%`;
		if (value >= 1) {
			this.text.innerText = 'ready to load!';
		}
	}

	set visible(value) {
		this.dom.style.display = value ? 'flex' : 'none';
	}
}

export { LoadingBar };
