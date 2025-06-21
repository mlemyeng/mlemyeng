// ./libs/LoadingBar.js

class LoadingBar {
	constructor() {
		this.dom = document.createElement('div');
		this.dom.style.position = 'absolute';
		this.dom.style.top = '0';
		this.dom.style.left = '0';
		this.dom.style.width = '100%';
		this.dom.style.height = '100%';
		this.dom.style.backgroundColor = '#fff0f5'; // soft pink background
		this.dom.style.display = 'flex';
		this.dom.style.alignItems = 'center';
		this.dom.style.justifyContent = 'center';
		this.dom.style.flexDirection = 'column';
		this.dom.style.zIndex = '1000';
		this.dom.style.fontFamily = 'Arial, sans-serif';

		// Progress bar container
		this.barContainer = document.createElement('div');
		this.barContainer.style.width = '60%';
		this.barContainer.style.maxWidth = '400px';
		this.barContainer.style.background = '#ffe6ee'; // lighter pink
		this.barContainer.style.border = '2px solid #ffb6c1'; // pink border
		this.barContainer.style.borderRadius = '10px';
		this.barContainer.style.overflow = 'hidden';
		this.barContainer.style.marginBottom = '20px';

		// Progress bar itself
		this.bar = document.createElement('div');
		this.bar.style.height = '20px';
		this.bar.style.width = '0%';
		this.bar.style.backgroundColor = '#ffb6c1'; // pastel pink
		this.bar.style.transition = 'width 0.3s ease';

		this.barContainer.appendChild(this.bar);
		this.dom.appendChild(this.barContainer);

		// Text below the bar
		this.text = document.createElement('div');
		this.text.style.color = '#333';
		this.text.style.fontSize = '16px';
		this.text.style.textTransform = 'lowercase'; // all lowercase
		this.text.innerText = 'loading... 0%';

		this.dom.appendChild(this.text);
		document.body.appendChild(this.dom);
	}

	set progress(value) {
		const percent = Math.round(value * 100);
		this.bar.style.width = `${percent}%`;
		this.text.innerText = `loading... ${percent}%`;
	}

	set visible(value) {
		this.dom.style.display = value ? 'flex' : 'none';
	}
}

export { LoadingBar };
