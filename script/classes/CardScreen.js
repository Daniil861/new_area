class CardScreen {
	constructor(scene) {
		this.scene = scene;
		this.prices = {
			bonus1: 5000,
			bonus2: 5000,
			shirt1: 2500,
			shirt3: 4000
		}
		this.createBoard();
		this.createBonus1();
		this.createBonus2();
		this.createTextBank();
		this.createIconMoney();
	}
	createBoard() {
		let info = this.scene.textures.get('board').getSourceImage();
		this.widthBoard = info.width;
		this.heightBoard = info.height;

		this.xBoard = config.scale.width / 2;
		this.yBoard = 0;

		this.board = this.scene.add.sprite(this.xBoard, this.yBoard, 'board').setOrigin(0.5, 0);
		this.board.scale = 1.5;

	}
	createBonus1() {
		let info = this.scene.textures.get('bonus-1').getSourceImage();
		this.widthBonus1 = info.width;
		this.heightBonus1 = info.height;

		this.xBonus1 = config.scale.width / 2 - this.widthBonus1 / 2;
		this.yBonus1 = this.heightBoard / 3 + 50;

		this.bonus1 = this.scene.add.sprite(this.xBonus1, this.yBonus1, 'bonus-1').setOrigin(1, 0);

		this.bonus1.scale = 1.5;
		this.createButtonBonus1();
		this.createCircleBonus1();
	}
	createButtonBonus1() {
		let info = this.scene.textures.get('btn-green').getSourceImage();
		this.widthBtnGreen = info.width;
		this.heightBtnGreen = info.height;

		this.xBtnGreen1 = config.scale.width / 2 + 25;
		this.yBtnGreen1 = this.heightBoard / 3 + 50 + this.heightBtnGreen / 2;

		this.btnGreen1 = this.scene.add.sprite(this.xBtnGreen1, this.yBtnGreen1, 'btn-green')
			.setOrigin(0)
			.setInteractive();
		this.btnGreen1.scale = 1.3;

		this.btnGreen1.on('pointerdown', this.bounus1Clicked, this);
		this.createPriceBtnBonus1();
	}
	bounus1Clicked() {

		let money = +sessionStorage.getItem('money');
		let bonus1 = +sessionStorage.getItem('bonus1');
		if (money >= this.prices.bonus1) {
			sessionStorage.setItem('money', money - this.prices.bonus1);
			sessionStorage.setItem('bonus1', bonus1 + 1);
			this.textCountCircle1.setText(sessionStorage.getItem('bonus1'));
			this.textMoney.setText(sessionStorage.getItem('money'));
		}
	}
	createCircleBonus1() {
		let count = sessionStorage.getItem('bonus1');

		this.xCircle1 = config.scale.width / 2 - this.widthBoard / 2 + 25;
		this.yCircle1 = this.heightBoard / 3 + 30;

		this.xCountCircle1 = config.scale.width / 2 - this.widthBoard / 2 + 50;
		this.yCountCircle1 = this.heightBoard / 3 + 55;

		this.circle1 = this.scene.add.circle(this.xCircle1, this.yCircle1, 25, 0x000000).setStrokeStyle(3, 0xffffff).setOrigin(0);

		this.textCountCircle1 = this.scene.add.text(this.xCountCircle1, this.yCountCircle1, count, {
			font: '24px Inter-medium',
			fill: '#fff'
		}).setOrigin(0.5);
	}
	createPriceBtnBonus1() {
		this.xPriceBtnBonus1 = config.scale.width / 2 + this.widthBtnGreen / 2 + 15;
		this.yPriceBtnBonus1 = this.heightBoard / 3 + 90;

		this.textBonus1Btn = this.scene.add.text(this.xPriceBtnBonus1, this.yPriceBtnBonus1, this.prices.bonus1, {
			font: '24px Inter-bold',
			fill: '#fff'
		}).setOrigin(0);
	}
	createBonus2() {
		let info = this.scene.textures.get('bonus-2').getSourceImage();
		this.widthBonus2 = info.width;
		this.heightBonus2 = info.height;

		this.xBonus2 = config.scale.width / 2 - this.widthBonus2 / 2;
		this.yBonus2 = this.heightBoard * 2 / 3 + 75;

		this.bonus2 = this.scene.add.sprite(this.xBonus2, this.yBonus2, 'bonus-2').setOrigin(1, 0);
		this.bonus2.scale = 1.5;

		this.createButtonBonus2();
		this.createCircleBonus2();
	}
	createButtonBonus2() {
		let info = this.scene.textures.get('btn-green').getSourceImage();
		this.widthBtnGreen = info.width;
		this.heightBtnGreen = info.height;

		this.xBtnGreen2 = config.scale.width / 2 + 25;
		this.yBtnGreen2 = this.heightBoard * 2 / 3 + 85 + this.heightBtnGreen / 2;

		this.btnGreen2 = this.scene.add.sprite(this.xBtnGreen2, this.yBtnGreen2, 'btn-green')
			.setOrigin(0)
			.setInteractive();

		this.btnGreen2.scale = 1.3;

		this.btnGreen2.on('pointerdown', this.bounus2Clicked, this);
		this.createPriceBtnBonus2();
	}
	bounus2Clicked() {
		let money = +sessionStorage.getItem('money');
		let bonus2 = +sessionStorage.getItem('bonus2');
		if (money >= this.prices.bonus2) {
			sessionStorage.setItem('money', money - this.prices.bonus2);
			sessionStorage.setItem('bonus2', bonus2 + 1);
			this.textCountCircle2.setText(sessionStorage.getItem('bonus2'));
			this.textMoney.setText(sessionStorage.getItem('money'));
		}
	}
	createCircleBonus2() {
		let count = sessionStorage.getItem('bonus2');

		this.xCircle2 = config.scale.width / 2 - this.widthBoard / 2 + 25;
		this.yCircle2 = this.heightBoard * 2 / 3 + 60;

		this.xCountCircle2 = config.scale.width / 2 - this.widthBoard / 2 + 50;
		this.yCountCircle2 = this.heightBoard * 2 / 3 + 85;

		this.circle2 = this.scene.add.circle(this.xCircle2, this.yCircle2, 25, 0x000000).setStrokeStyle(3, 0xffffff).setOrigin(0);

		this.textCountCircle2 = this.scene.add.text(this.xCountCircle2, this.yCountCircle2, count, {
			font: '24px Inter-medium',
			fill: '#fff'
		}).setOrigin(0.5);
	}
	createPriceBtnBonus2() {
		this.xPriceBtnBonus2 = config.scale.width / 2 + this.widthBtnGreen / 2 + 15;
		this.yPriceBtnBonus2 = this.heightBoard * 2 / 3 + 125;

		this.textBonus2Btn = this.scene.add.text(this.xPriceBtnBonus2, this.yPriceBtnBonus2, this.prices.bonus2, {
			font: '24px Inter-bold',
			fill: '#fff'
		}).setOrigin(0);
	}
	createTextBank() {
		this.money = +sessionStorage.getItem('money');

		this.xTextBalance = config.scale.width / 2 - this.widthBoard / 3;
		this.yTextBalance = 70;
		this.yTextMoney = 70;
		this.xTextMoney = config.scale.width / 2 + this.widthBoard / 3;

		this.textBank = this.scene.add.text(this.xTextBalance, this.yTextBalance, 'BALANCE', {
			font: '24px Inter-medium',
			fill: '#fff'
		}).setOrigin(0.5);
		this.textMoney = this.scene.add.text(this.xTextMoney, this.yTextMoney, this.money, {
			font: '24px Inter-bold',
			fill: '#fff'
		}).setOrigin(1, 0.5);
	}
	createIconMoney() {
		let info = this.scene.textures.get('icon').getSourceImage();
		this.widthIcon = info.width;
		this.heightIcon = info.height;

		this.xIcon = config.scale.width / 2 + this.widthBoard / 3 + 20;
		this.yIcon = 60;

		this.icon = this.scene.add.sprite(this.xIcon, this.yIcon, 'icon').setOrigin(0, 0);
		this.icon.scale = 1.5;
	}
	show(mode) {
		this.board.y = mode ? this.yBoard : -1000;
		this.bonus1.y = mode ? this.yBonus1 : -1000;
		this.btnGreen1.y = mode ? this.yBtnGreen1 : -1000;
		this.circle1.y = mode ? this.yCircle1 : -1000;
		this.textCountCircle1.y = mode ? this.yCountCircle1 : -1000;
		this.textBonus1Btn.y = mode ? this.yPriceBtnBonus1 : -1000;
		this.textBank.y = mode ? this.yTextBalance : -1000;
		this.textMoney.y = mode ? this.yTextMoney : -1000;
		this.bonus2.y = mode ? this.yBonus2 : -1000;
		this.btnGreen2.y = mode ? this.yBtnGreen2 : -1000;
		this.circle2.y = mode ? this.yCircle2 : -1000;
		this.textCountCircle2.y = mode ? this.yCountCircle2 : -1000;
		this.textBonus2Btn.y = mode ? this.yPriceBtnBonus2 : -1000;
		this.icon.y = mode ? this.yIcon : -1000;
	}
}