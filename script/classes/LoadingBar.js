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

		this.showProgressBox();

		this.setEvents();
	}
	setEvents() {
		this.scene.load.on('progress', this.showProgressBar, this); // �������, ������� ����������� �������� ���������� ��������. � ������� �������� �������� �� 0 �� 1
		this.scene.load.on('complete', this.onLoadComplete, this); // �������, ������� ����������� ���������� ��������
	}

	showProgressBox() {
		// ������� �������, �� �� ����� ��� � ������������ � ������ ������� this.progressBox ������ �� ���������
		this.progressBox
			.fillStyle(this.style.boxColor) // ������������� ���� ������� �����
			.fillRect(this.style.x, this.style.y, this.style.width, this.style.height);
	}

	showProgressBar(value) {
		this.progressBar
			.clear()
			.fillStyle(this.style.barColor) // ������������� ���� ������� �����
			.fillRect(this.style.x, this.style.y, this.style.width * value, this.style.height);
	}

	onLoadComplete() {
		// �����, ������� ���������� ����� �������� ���������
		this.progressBar.destroy();
		this.progressBox.destroy();
	}
}