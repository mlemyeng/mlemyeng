class LoadingBar {
	constructor(options) {
		this.domElement = document.createElement("div");
		this.domElement.style.position = 'fixed';
		this.domElement.style.top = '0';
		this.domElement.style.left = '0';
		this.domElement.style.width = '100%';
		this.domElement.style.height = '100%';
		this.domElement.style.background = '#000';
		this.domElement.style.opacity = '0.7';
		this.domElement.style.display = 'flex';
		this.domElement.style.alignItems = 'center';
		this.domElement.style.justifyContent = 'center';
		this.domElement.style.zIndex = '1111';

		const barWrapper = document.createElement("div");
		barWrapper.style.position = 'relative';
		barWrapper.style.width = '70%';
		barWrapper.style.minWidth = '250px';

		const barBase = document.createElement("div");
		barBase.style.background = '#33f5f2';
		barBase.style.borderRadius = '10px';
		barBase.style.height = '15px';
		barBase.style.width = '100%';

		const bar = document.createElement("div");
		bar.style.background = '#41fdfe'; // your custom color
		bar.style.borderRadius = '10px';
		bar.style.height = '100%';
		bar.style.width = '0';

		// Percentage text
		const percentText = document.createElement("div");
		percentText.style.position = 'absolute';
		percentText.style.top = '50%';
		percentText.style.left = '50%';
		percentText.style.transform = 'translate(-50%, -50%)';
		percentText.style.color = '#fff';
		percentText.style.fontSize = '14px';
		percentText.style.fontFamily = 'sans-serif';
		percentText.textContent = '0%';

		barBase.appendChild(bar);
		barWrapper.appendChild(barBase);
		barWrapper.appendChild(percentText);
		this.domElement.appendChild(barWrapper);

		this.progressBar = bar;
		this.percentText = percentText;

		document.body.appendChild(this.domElement);
	}

	set progress(delta) {
		const percent = Math.round(delta * 100);
		this.progressBar.style.width = `${percent}%`;
		this.percentText.textContent = `${percent}%`;
	}

	set visible(value) {
		this.domElement.style.display = value ? 'flex' : 'none';
	}
}

export { LoadingBar };