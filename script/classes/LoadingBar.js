class LoadingBar {
	constructor(scene) {
		this.scene = scene;
		this.style = {
			boxColor: 0x8FBC8F,
			barColor: 0x006400,
			x: config.scale.width / 2 - 450,
			y: config.scale.height / 2 + 250,
			width: 900,
			height: 25
		}

		this.progressBox = this.scene.add.graphics();
		this.progressBar = this.scene.add.graphics();
		// this.loadFile = this.scene.add.text(config.scale.width / 2, config.scale.height / 2 - 100, 'file').setOrigin(0.5);
		// this.loadFileStatus = this.scene.add.text(config.scale.width / 2, config.scale.height / 2 - 50, 'status').setOrigin(0.5);
		// this.loadFileUrl = this.scene.add.text(config.scale.width / 2, config.scale.height / 2, 'url').setOrigin(0.5);


		this.showProgressBox();

		this.setEvents();
	}
	setEvents() {
		this.scene.load.on('progress', this.showProgressBar, this); // событие, которое отслеживает прогресс выполнения загрузки. В функцию передает значение от 0 до 1
		this.scene.load.on('fileprogress', this.onFileProgress, this);
		this.scene.load.on('complete', this.onLoadComplete, this); // событие, которое отслеживает завершение загрузки
	}

	showProgressBox() {
		// цепочка вызовов, то же самое что и прописывание в каждой строчке this.progressBox вместе со свойством
		this.progressBox
			.fillStyle(this.style.boxColor) // устанавливаем цвет заливки блока
			.fillRect(this.style.x, this.style.y, this.style.width, this.style.height);
	}
	onFileProgress(file) {
		// this.loadFile.setText(file.key);
		// this.loadFileStatus.setText(`status - ${file.xhrLoader.status}`);
		// this.loadFileUrl.setText(file.xhrLoader.responseURL);
	}

	showProgressBar(value) {
		this.progressBar
			.clear()
			.fillStyle(this.style.barColor) // устанавливаем цвет заливки блока
			.fillRect(this.style.x, this.style.y, this.style.width * value, this.style.height);
	}

	onLoadComplete() {
		// метод, который вызывается когда загрузка завершена
		this.progressBar.destroy();
		this.progressBox.destroy();
	}
}