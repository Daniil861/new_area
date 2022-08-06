class ShirtScreen {
	constructor(scene) {
		this.scene = scene;
		this.prices = {
			shirt1: 2500,
			shirt2: 'SELECT',
			shirt3: 4500
		}
		this.createBoard();
		this.createTextBank();
		this.createIconMoney();

		this.createShirt1();
		this.createShirt2();
		this.createShirt3();
	}
	createBoard() {
		let info = this.scene.textures.get('board-2').getSourceImage();
		this.widthBoard = info.width;
		this.heightBoard = info.height;

		this.xBoard = config.scale.width / 2;
		this.yBoard = 0;

		this.board = this.scene.add.sprite(this.xBoard, this.yBoard, 'board-2').setOrigin(0.5, 0);

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.board.scale = 2.5;
		} else {
			this.board.scale = 1.5;
		}
	}
	createTextBank() {
		this.money = +sessionStorage.getItem('money');
		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xTextBalance = config.scale.width / 2 - this.widthBoard / 3 - 50;
			this.yTextBalance = 125;
			this.xTextMoney = config.scale.width / 2 + this.widthBoard / 3 + 50;
			this.yTextMoney = 125;
		} else {
			this.xTextBalance = config.scale.width / 2 - this.widthBoard / 3;
			this.yTextBalance = 75;
			this.yTextMoney = 75;
			this.xTextMoney = config.scale.width / 2 + this.widthBoard / 3;
		}

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

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xIcon = config.scale.width / 2 + this.widthBoard / 3 + 70;
			this.yIcon = 115;
		} else {
			this.xIcon = config.scale.width / 2 + this.widthBoard / 3 + 20;
			this.yIcon = 65;
		}

		this.icon = this.scene.add.sprite(this.xIcon, this.yIcon, 'icon').setOrigin(0, 0);

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.icon.scale = 1.8;
		} else {
			this.icon.scale = 1.5;
		}
	}
	createShirt1() {
		let info = this.scene.textures.get('shirt-1').getSourceImage();
		this.widthShirt1 = info.width;
		this.heightShirt1 = info.height;

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xShirt1 = config.scale.width / 2 - this.widthShirt1 / 2 - 70;
			this.yShirt1 = this.heightBoard / 3 + 150;
		} else {
			this.xShirt1 = config.scale.width / 2 - this.widthShirt1;
			this.yShirt1 = this.heightBoard / 3;
		}

		this.shirt1 = this.scene.add.sprite(this.xShirt1, this.yShirt1, 'shirt-1').setOrigin(1, 0);

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.shirt1.scale = 2;
		} else {
			this.shirt1.scale = 1.3;
		}
		this.createButtonShirt1();
	}
	createButtonShirt1() {
		let info = this.scene.textures.get('btn-green').getSourceImage();
		this.widthBtnGreen = info.width;
		this.heightBtnGreen = info.height;

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xBtnGreen1 = config.scale.width / 2 + 70;
			this.yBtnGreen1 = this.heightBoard / 3 + 170;
		} else {
			this.xBtnGreen1 = config.scale.width / 2 + 30;
			this.yBtnGreen1 = this.heightBoard / 3 + 30;
		}

		this.btnGreen1 = this.scene.add.sprite(this.xBtnGreen1, this.yBtnGreen1, 'btn-green')
			.setOrigin(0)
			.setInteractive();

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.btnGreen1.scale = 1.8;
		} else {
			this.btnGreen1.scale = 1.3;
		}
		this.btnGreen1.on('pointerdown', this.shirt1Clicked, this);
		this.createPriceBtnShirt1();
	}
	updateBank() {
		let money = sessionStorage.getItem('money');
		this.textMoney.setText(money);
	}
	shirt1Clicked() {
		let money = +sessionStorage.getItem('money');
		if (!sessionStorage.getItem('shirt-1')) {
			if (money >= this.prices.shirt1) {
				sessionStorage.setItem('shirt-1', true);
				sessionStorage.setItem('money', money - this.prices.shirt1);
				this.textShirt1Btn.setText('SELECT');
				this.updateBank();
			}
		} else {
			sessionStorage.setItem('current-shirt', 1);
			this.scene.player.setTexture('player1-1');
			this.scene.player2.setTexture('player1-2');
		}
	}
	createPriceBtnShirt1() {
		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xPriceBtnShirt1 = config.scale.width / 2 + 175;
			this.yPriceBtnShirt1 = this.heightBoard / 3 + 195;
		} else {
			this.xPriceBtnShirt1 = config.scale.width / 2 + this.widthBtnGreen / 2 + 55;
			this.yPriceBtnShirt1 = this.heightBoard / 3 + 46;
		}
		let status = this.prices.shirt1;
		if (sessionStorage.getItem('shirt-1')) {
			status = 'SELECT'
		}

		this.textShirt1Btn = this.scene.add.text(this.xPriceBtnShirt1, this.yPriceBtnShirt1, status, {
			font: '24px Inter-bold',
			fill: '#fff'
		}).setOrigin(0.5, 0);
	}

	createShirt2() {
		let info = this.scene.textures.get('shirt-2').getSourceImage();
		this.widthShirt2 = info.width;
		this.heightShirt2 = info.height;

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xShirt2 = config.scale.width / 2 - this.widthShirt2 / 2 - 70;
			this.yShirt2 = this.heightBoard / 3 + 150;
		} else {
			this.xShirt2 = config.scale.width / 2 - this.widthShirt2;
			this.yShirt2 = this.heightBoard * 2 / 3;
		}

		this.shirt2 = this.scene.add.sprite(this.xShirt2, this.yShirt2, 'shirt-2').setOrigin(1, 0);

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.shirt2.scale = 2;
		} else {
			this.shirt2.scale = 1.3;
		}
		this.createButtonShirt2();
	}
	createButtonShirt2() {
		let info = this.scene.textures.get('btn-green').getSourceImage();
		this.widthBtnGreen = info.width;
		this.heightBtnGreen = info.height;

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xBtnGreen2 = config.scale.width / 2 + 70;
			this.yBtnGreen2 = this.heightBoard / 3 + 170;
		} else {
			this.xBtnGreen2 = config.scale.width / 2 + 30;
			this.yBtnGreen2 = this.heightBoard * 2 / 3 + 30;
		}

		this.btnGreen2 = this.scene.add.sprite(this.xBtnGreen2, this.yBtnGreen2, 'btn-green')
			.setOrigin(0)
			.setInteractive();

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.btnGreen2.scale = 1.8;
		} else {
			this.btnGreen2.scale = 1.3;
		}
		this.btnGreen2.on('pointerdown', this.shirt2Clicked, this);
		this.createPriceBtnShirt2();
	}
	shirt2Clicked() {
		sessionStorage.setItem('current-shirt', 2);
		this.scene.player.setTexture('player2-1');
		this.scene.player2.setTexture('player2-2');
	}
	createPriceBtnShirt2() {
		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xPriceBtnShirt2 = config.scale.width / 2 + 175;
			this.yPriceBtnShirt2 = this.heightBoard / 3 + 195;
		} else {
			this.xPriceBtnShirt2 = config.scale.width / 2 + this.widthBtnGreen / 2 + 55;
			this.yPriceBtnShirt2 = this.heightBoard * 2 / 3 + 46;
		}
		let status = this.prices.shirt2;
		if (sessionStorage.getItem('shirt-2')) {
			status = 'SELECT'
		}

		this.textShirt2Btn = this.scene.add.text(this.xPriceBtnShirt2, this.yPriceBtnShirt2, status, {
			font: '24px Inter-bold',
			fill: '#fff'
		}).setOrigin(0.5, 0);
	}

	createShirt3() {
		let info = this.scene.textures.get('shirt-3').getSourceImage();
		this.widthShirt3 = info.width;
		this.heightShirt3 = info.height;

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xShirt3 = config.scale.width / 2 - this.widthShirt3 / 2 - 70;
			this.yShirt3 = this.heightBoard / 3 + 150;
		} else {
			this.xShirt3 = config.scale.width / 2 - this.widthShirt3;
			this.yShirt3 = this.heightBoard;
		}

		this.shirt3 = this.scene.add.sprite(this.xShirt3, this.yShirt3, 'shirt-3').setOrigin(1, 0);

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.shirt3.scale = 2;
		} else {
			this.shirt3.scale = 1.3;
		}
		this.createButtonShirt3();
	}
	createButtonShirt3() {
		let info = this.scene.textures.get('btn-green').getSourceImage();
		this.widthBtnGreen = info.width;
		this.heightBtnGreen = info.height;

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xBtnGreen3 = config.scale.width / 2 + 70;
			this.yBtnGreen3 = this.heightBoard / 3 + 170;
		} else {
			this.xBtnGreen3 = config.scale.width / 2 + 30;
			this.yBtnGreen3 = this.heightBoard + 30;
		}

		this.btnGreen3 = this.scene.add.sprite(this.xBtnGreen3, this.yBtnGreen3, 'btn-green')
			.setOrigin(0)
			.setInteractive();

		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.btnGreen3.scale = 1.8;
		} else {
			this.btnGreen3.scale = 1.3;
		}
		this.btnGreen3.on('pointerdown', this.shirt3Clicked, this);
		this.createPriceBtnShirt3();
	}
	shirt3Clicked() {
		let money = +sessionStorage.getItem('money');
		if (!sessionStorage.getItem('shirt-3')) {
			if (money >= this.prices.shirt3) {
				sessionStorage.setItem('shirt-3', true);
				sessionStorage.setItem('money', money - this.prices.shirt3);
				this.textShirt3Btn.setText('SELECT');
				this.updateBank();
			}
		} else {
			sessionStorage.setItem('current-shirt', 3);
			this.scene.player.setTexture('player3-1');
			this.scene.player2.setTexture('player3-2');
		}
	}
	createPriceBtnShirt3() {
		if (window.innerWidth > 1000 || window.innerHeight > 1000) {
			this.xPriceBtnShirt3 = config.scale.width / 2 + 175;
			this.yPriceBtnShirt3 = this.heightBoard / 3 + 195;
		} else {
			this.xPriceBtnShirt3 = config.scale.width / 2 + this.widthBtnGreen / 2 + 55;
			this.yPriceBtnShirt3 = this.heightBoard + 46;
		}
		let status = this.prices.shirt3;
		if (sessionStorage.getItem('shirt-3')) {
			status = 'SELECT'
		}

		this.textShirt3Btn = this.scene.add.text(this.xPriceBtnShirt3, this.yPriceBtnShirt3, status, {
			font: '24px Inter-bold',
			fill: '#fff'
		}).setOrigin(0.5, 0);
	}
	show(mode) {
		this.board.y = mode ? this.yBoard : -1000;
		this.textBank.y = mode ? this.yTextBalance : -1000;
		this.textMoney.y = mode ? this.yTextMoney : -1000;
		this.icon.y = mode ? this.yIcon : -1000;
		this.shirt1.y = mode ? this.yShirt1 : -1000;
		this.btnGreen1.y = mode ? this.yBtnGreen1 : -1000;
		this.textShirt1Btn.y = mode ? this.yPriceBtnShirt1 : -1000;
		this.shirt2.y = mode ? this.yShirt2 : -1000;
		this.btnGreen2.y = mode ? this.yBtnGreen2 : -1000;
		this.textShirt2Btn.y = mode ? this.yPriceBtnShirt2 : -1000;
		this.shirt3.y = mode ? this.yShirt3 : -1000;
		this.btnGreen3.y = mode ? this.yBtnGreen3 : -1000;
		this.textShirt3Btn.y = mode ? this.yPriceBtnShirt3 : -1000;
	}
}