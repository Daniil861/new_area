class StartScene extends Phaser.Scene {
	constructor() {
		super('Start');
	}
	init() {
		this.detectTheThing();
		this.counterBtnStart = 0;
		if (!sessionStorage.getItem('player-team')) {
			sessionStorage.setItem('player-team', 1);
		}
		if (!sessionStorage.getItem('enemy-team')) {
			sessionStorage.setItem('enemy-team', 4);
		}
		if (!sessionStorage.getItem('money')) {
			sessionStorage.setItem('money', 7500);
		}
		if (!sessionStorage.getItem('bonus1')) {
			sessionStorage.setItem('bonus1', 0);
		}
		if (!sessionStorage.getItem('bonus2')) {
			sessionStorage.setItem('bonus2', 0);
		}
		if (!sessionStorage.getItem('active-shirt')) {
			sessionStorage.setItem('active-shirt', 2);
		}
		if (!sessionStorage.getItem('shirt-2')) {
			sessionStorage.setItem('shirt-2', true);
		}
		if (!sessionStorage.getItem('current-shirt')) {
			sessionStorage.setItem('current-shirt', 2);
		}
		if (!sessionStorage.getItem('current-bet')) {
			sessionStorage.setItem('current-bet', 50);
		}
	}
	create() {
		this.createSounds();
		this.createBg();
		this.createPlayer();
		this.createMainButtons();
		this.createBall();
		this.createStartButton();
		this.createBtnHome();
		this.createFlags();
		this.createPlayer2();

		// Переделать - создать класс cardScreen для того чтобы задавать общую анимацию появления
		this.createCardScreen();
	}

	detectTheThing() {
		let uagent = navigator.userAgent.toLowerCase();
		if (!uagent.search("iphone") || !uagent.search("ipad") || !uagent.search("webos") > -1) {
			this.createFullscreen();
		}
	}

	createCardScreen() {
		this.cardScreen = new CardScreen(this);
		this.shirtScreen = new ShirtScreen(this);
		this.cardScreen.show(false);
		this.shirtScreen.show(false);
	}
	createSounds() {
		this.sounds = {
			theme: this.sound.add('theme', { volume: 0.1, loop: true }),
			touch: this.sound.add('touch'),
		};
		this.sounds.theme.play();
	}

	createBg() {
		const background = this.add.sprite(0, 0, 'bg-preload').setOrigin(0);
	}
	createFullscreen() {
		this.fullscreen = this.add.sprite(config.scale.width - 70, 10, 'fullscreen')
			.setOrigin(0)
			.setInteractive();
		this.fullscreen.scale = 0.5
		this.fullscreen.on('pointerup', function () {
			if (!this.scale.isFullscreen) {
				this.scale.startFullscreen();
			} else {
				this.scale.stopFullscreen();
			}
		}, this);
	}

	createMainButtons() {
		let infoCard = this.textures.get('btn-card').getSourceImage();
		let widthCard = infoCard.width;
		let heightCard = infoCard.height;

		this.yCard = config.scale.height / 2 - heightCard;
		this.yShirt = config.scale.height / 2 + heightCard;

		this.card = this.add.sprite(config.scale.width / 5 + widthCard / 2, this.yCard, 'btn-card')
			.setInteractive();
		this.shirt = this.add.sprite(config.scale.width / 5 + widthCard / 2, this.yShirt, 'btn-shirt')
			.setInteractive();

		this.card.scale = 1.6;
		this.shirt.scale = 1.6;

		this.card.on('pointerdown', function () {
			this.scene.tweens.add({
				targets: this,
				scale: this.scale - 0.1,
				ease: 'Linear',
				duration: 150,
				onComplete: () => {
					this.scene.tweens.add({
						targets: this,
						scale: this.scale + 0.1,
						ease: 'Linear',
						duration: 150,
						onComplete: this.scene.onCardClicked()
					})
				}
			})
		})
		this.shirt.on('pointerdown', function () {
			this.scene.tweens.add({
				targets: this,
				scale: this.scale - 0.1,
				ease: 'Linear',
				duration: 150,
				onComplete: () => {
					this.scene.tweens.add({
						targets: this,
						scale: this.scale + 0.1,
						ease: 'Linear',
						duration: 150,
						onComplete: this.scene.onShirtClicked()
					})
				}
			})
		})
	}

	createPlayer() {
		let player = +sessionStorage.getItem('current-shirt');
		let info = this.textures.get('player1-1').getSourceImage();
		let width = info.width;

		this.xPlayer = config.scale.width / 2 - width / 2;
		this.yPlayer = 10;

		this.player = this.add.sprite(this.xPlayer, this.yPlayer, `player${player}-1`).setOrigin(0);
		this.player.scale = 1.8;
	}

	createPlayer2() {
		let player = +sessionStorage.getItem('current-shirt');
		let info = this.textures.get('player1-2').getSourceImage();

		this.xPlayer2 = -info.width - 500;
		this.xPlayer2Active = -info.width + 100;
		this.yPlayer2 = config.scale.height / 3 - 100;

		this.player2 = this.add.sprite(this.xPlayer2, this.yPlayer2, `player${player}-2`).setOrigin(0);
		this.player2.scale = 1.8;
	}

	createBall() {
		let info = this.textures.get('ball').getSourceImage();
		this.widthBall = info.width;
		this.heightBall = info.height;
		this.yBall = config.scale.height - this.heightBall / 2 - 50;
		this.xBall = config.scale.width / 2 + (this.widthBall / 2);

		this.ball = this.add.sprite(this.xBall, this.yBall, 'ball').setOrigin(0);
		this.ball.scale = 1.8;
	}

	createStartButton() {
		let info = this.textures.get('btn-start').getSourceImage();
		this.widthBtnStart = info.width;
		this.heightBtnStart = info.height;

		this.xBtnStart = config.scale.width - this.widthBtnStart - 25;
		this.yBtnStart = config.scale.height / 3 + this.heightBtnStart / 2;

		this.btnStart = this.add.sprite(this.xBtnStart, this.yBtnStart, 'btn-start')
			.setOrigin(0.5)
			.setInteractive();

		this.btnStart.scale = 1.8;

		this.btnStart.on('pointerdown', this.onBtnStartClicked, this.btnStart);
	}

	createBtnHome() {
		let info = this.textures.get('btn-home').getSourceImage();
		this.widthBtnHome = info.width;
		let height = info.height;
		this.xBtnHome = -this.widthBtnHome - 15;
		this.yBtnHome = 15 + height / 2;

		this.btnHome = this.add.sprite(this.xBtnHome, this.yBtnHome, 'btn-home').setInteractive();
		this.btnHome.scale = 1.3;

		this.btnHome.on('pointerdown', this.onBtnHomeClicked, this.btnHome);
	}

	createFlags() {
		this.flags = [];

		this.flagBox_1 = this.add.graphics();
		this.flagBox_2 = this.add.graphics();
		let flagWidth = this.textures.get('flag-1').getSourceImage().width;
		let flagHeight = this.textures.get('flag-1').getSourceImage().height;

		let columnGap = 30;

		this.widthFlagBox = ((flagWidth * 4) + (columnGap * 6));
		this.heightFlagBox = (flagHeight + columnGap * 2);

		this.flagBox_1.fillStyle(0x17293e);
		this.flagBox_1.fillRoundedRect(config.scale.width / 10, (config.scale.height / 2) - this.heightFlagBox - 25, this.widthFlagBox, this.heightFlagBox, 60);

		this.flagBox_2.fillStyle(0x17293e);
		this.flagBox_2.fillRoundedRect(config.scale.width / 10, (config.scale.height / 2) + 25, this.widthFlagBox, this.heightFlagBox, 60);

		this.flagBox_1.y = -1000;
		this.flagBox_2.y = 1000;

		// Создаем флаги
		for (let i = 0; i < 2; i++) {
			for (let j = 1; j < 5; j++) {
				if (i < 1) {
					this.flags.push(new Flag(this, config.scale.width / 10 + columnGap * j + (columnGap / 2 + flagWidth * (j - 1)), (config.scale.height / 2) - this.heightFlagBox + 5, `flag-${j}`, j, i));
				} else {
					this.flags.push(new Flag(this, config.scale.width / 10 + columnGap * j + (columnGap / 2 + flagWidth * (j - 1)), (config.scale.height / 2) + 55, `flag-${j}`, j, i));
				}
			}
		}

		this.input.on("gameobjectdown", this.onFlagClicked, this);
	}

	removeRect() {
		if (this.r1) this.r1.setStrokeStyle(0, 0x00D1FF);
		if (this.r2) this.r2.setStrokeStyle(0, 0x00D1FF);
		if (this.r3) this.r3.setStrokeStyle(0, 0x00D1FF);
		if (this.r4) this.r4.setStrokeStyle(0, 0x00D1FF);
		if (this.r5) this.r5.setStrokeStyle(0, 0x00D1FF);
		if (this.r6) this.r6.setStrokeStyle(0, 0x00D1FF);
		if (this.r7) this.r7.setStrokeStyle(0, 0x00D1FF);
		if (this.r8) this.r8.setStrokeStyle(0, 0x00D1FF);
	}

	onFlagClicked(pointer, flag) {
		this.sounds.touch.play();
		let x = flag.x - 2;
		let y = flag.y - 2;
		let width = flag.width + 4;
		let height = flag.height + 4;

		if (flag.value == 1 && flag.row == 0) {
			this.r1 = this.add.rectangle(x, y, width, height).setOrigin(0);
			this.r1.setStrokeStyle(3, 0x00D1FF);
			sessionStorage.setItem('player-team', 1);
			if (this.r2) this.r2.setStrokeStyle(0, 0x00D1FF);
			if (this.r3) this.r3.setStrokeStyle(0, 0x00D1FF);
			if (this.r4) this.r4.setStrokeStyle(0, 0x00D1FF);
		} else if (flag.value == 2 && flag.row == 0) {
			this.r2 = this.add.rectangle(x, y, width, height).setOrigin(0);
			this.r2.setStrokeStyle(3, 0x00D1FF);
			sessionStorage.setItem('player-team', 2);
			if (this.r1) this.r1.setStrokeStyle(0, 0x00D1FF);
			if (this.r3) this.r3.setStrokeStyle(0, 0x00D1FF);
			if (this.r4) this.r4.setStrokeStyle(0, 0x00D1FF);
		} else if (flag.value == 3 && flag.row == 0) {
			this.r3 = this.add.rectangle(x, y, width, height).setOrigin(0);
			this.r3.setStrokeStyle(3, 0x00D1FF);
			sessionStorage.setItem('player-team', 3);
			if (this.r1) this.r1.setStrokeStyle(0, 0x00D1FF);
			if (this.r2) this.r2.setStrokeStyle(0, 0x00D1FF);
			if (this.r4) this.r4.setStrokeStyle(0, 0x00D1FF);
		} else if (flag.value == 4 && flag.row == 0) {
			this.r4 = this.add.rectangle(x, y, width, height).setOrigin(0);
			this.r4.setStrokeStyle(3, 0x00D1FF);
			sessionStorage.setItem('player-team', 4);
			if (this.r1) this.r1.setStrokeStyle(0, 0x00D1FF);
			if (this.r2) this.r2.setStrokeStyle(0, 0x00D1FF);
			if (this.r3) this.r3.setStrokeStyle(0, 0x00D1FF);
		}

		if (flag.value == 1 && flag.row == 1) {
			this.r5 = this.add.rectangle(x, y, width, height).setOrigin(0);
			this.r5.setStrokeStyle(3, 0x00D1FF);
			sessionStorage.setItem('enemy-team', 1);
			if (this.r6) this.r6.setStrokeStyle(0, 0x00D1FF);
			if (this.r7) this.r7.setStrokeStyle(0, 0x00D1FF);
			if (this.r8) this.r8.setStrokeStyle(0, 0x00D1FF);
		} else if (flag.value == 2 && flag.row == 1) {
			this.r6 = this.add.rectangle(x, y, width, height).setOrigin(0);
			this.r6.setStrokeStyle(3, 0x00D1FF);
			sessionStorage.setItem('enemy-team', 2);
			if (this.r5) this.r5.setStrokeStyle(0, 0x00D1FF);
			if (this.r7) this.r7.setStrokeStyle(0, 0x00D1FF);
			if (this.r8) this.r8.setStrokeStyle(0, 0x00D1FF);
		} else if (flag.value == 3 && flag.row == 1) {
			this.r7 = this.add.rectangle(x, y, width, height).setOrigin(0);
			this.r7.setStrokeStyle(3, 0x00D1FF);
			sessionStorage.setItem('enemy-team', 3);
			if (this.r5) this.r5.setStrokeStyle(0, 0x00D1FF);
			if (this.r6) this.r6.setStrokeStyle(0, 0x00D1FF);
			if (this.r8) this.r8.setStrokeStyle(0, 0x00D1FF);
		} else if (flag.value == 4 && flag.row == 1) {
			this.r8 = this.add.rectangle(x, y, width, height).setOrigin(0);
			this.r8.setStrokeStyle(3, 0x00D1FF);
			sessionStorage.setItem('enemy-team', 4);
			if (this.r5) this.r5.setStrokeStyle(0, 0x00D1FF);
			if (this.r6) this.r6.setStrokeStyle(0, 0x00D1FF);
			if (this.r7) this.r7.setStrokeStyle(0, 0x00D1FF);
		}
	}

	onCardClicked() {
		this.sounds.touch.play();
		this.removeStartSprites();
		this.scene.scene.tweens.add({
			targets: this.ball,
			x: config.scale.width - this.widthBall * 1.25,
			y: config.scale.height - this.heightBall * 1.25,
			ease: 'Linear',
			duration: 150
		})
		this.addBtnHome();
		this.removeBtnStart();
		this.showPlayer2();
		setTimeout(() => {
			this.cardScreen.show(true);
		}, 500);
	}
	onShirtClicked() {
		this.sounds.touch.play();
		this.removeStartSprites();
		this.scene.scene.tweens.add({
			targets: this.ball,
			x: config.scale.width - this.widthBall * 1.25,
			y: config.scale.height - this.heightBall * 1.25,
			ease: 'Linear',
			duration: 150
		})
		this.addBtnHome();
		this.removeBtnStart();
		this.showPlayer2();
		setTimeout(() => {
			this.shirtScreen.show(true);
		}, 500);
	}

	onBtnHomeClicked() {
		this.scene.sounds.touch.play();
		this.scene.tweens.add({
			targets: this,
			scale: this.scale - 0.1,
			ease: 'Linear', // тип анимации
			duration: 150, // мс - время проигрывания анимации
			onComplete: () => {
				this.scene.tweens.add({
					targets: this,
					scale: this.scale + 0.1,
					ease: 'Linear', // тип анимации
					duration: 150, // мс - время проигрывания анимации
				})
				this.scene.backToMainMenu();
			}
		})
		setTimeout(() => {
			this.scene.cardScreen.show(false);
			this.scene.shirtScreen.show(false);
		}, 150);
	}

	onBtnStartClicked() {
		this.scene.sounds.touch.play();
		this.scene.tweens.add({
			targets: this,
			scale: this.scale - 0.1,
			ease: 'Linear',
			duration: 150,
			onComplete: () => {
				this.scene.tweens.add({
					targets: this,
					scale: this.scale + 0.1,
					ease: 'Linear',
					duration: 150,
					onComplete: this.scene.startTeamScreen()
				})
			}
		})
	}

	backToMainMenu() {
		this.counterBtnStart = 0;
		// Убираем кнопку назад и флаги
		this.scene.scene.tweens.add({
			targets: this.btnHome,
			x: this.xBtnHome,
			ease: 'Linear',
			duration: 150
		})

		this.scene.scene.tweens.add({
			targets: this.flagBox_2,
			y: 1000,
			ease: 'Linear',
			duration: 150,
			delay: 150
		})
		this.scene.scene.tweens.add({
			targets: this.flagBox_1,
			y: -1000,
			ease: 'Linear',
			duration: 150,
			delay: 150
		})

		this.flags.forEach(flag => {
			this.tweens.add({
				targets: flag,
				scaleX: 0,
				ease: 'Linear',
				duration: 150
			})
		})
		this.removeRect();
		//=======
		// добавляем стартовые спрайты
		this.scene.scene.tweens.add({
			targets: this.ball,
			y: this.yBall,
			x: this.xBall,
			ease: 'Linear',
			duration: 150,
			delay: 300
		})
		this.scene.scene.tweens.add({
			targets: this.card,
			y: this.yCard,
			ease: 'Linear',
			duration: 150,
			delay: 300
		})
		this.scene.scene.tweens.add({
			targets: this.shirt,
			y: this.yShirt,
			ease: 'Linear',
			duration: 150,
			delay: 300
		})
		this.scene.scene.tweens.add({
			targets: this.player,
			y: this.yPlayer,
			ease: 'Linear',
			duration: 150,
			delay: 300
		})
		this.addBtnStart();
		this.removePlayer2();
	}
	addBtnHome() {
		this.scene.scene.tweens.add({
			targets: this.btnHome,
			x: this.widthBtnHome + 15,
			ease: 'Linear',
			duration: 150,
			delay: 300
		})
	}
	addBtnStart() {
		this.scene.scene.tweens.add({
			targets: this.btnStart,
			x: this.xBtnStart,
			ease: 'Linear',
			duration: 150,
			delay: 300
		})
	}

	startTeamScreen() {
		// убираем лишние спрайты
		if (this.counterBtnStart == 0) {
			this.counterBtnStart = 1;
			this.removeStartSprites();
			this.scene.scene.tweens.add({
				targets: this.ball,
				y: window.innerHeight + 500,
				ease: 'Linear',
				duration: 150
			})
			//====
			// Добавляем кнопку назад и флаги
			this.checkSelectedFlags();
			this.addBtnHome();

			this.scene.scene.tweens.add({
				targets: this.flagBox_2,
				y: 0,
				ease: 'Linear',
				duration: 150,
				delay: 300,
			})
			this.scene.scene.tweens.add({
				targets: this.flagBox_1,
				y: 0,
				ease: 'Linear',
				duration: 150,
				delay: 300
			})

			this.flags.forEach(flag => {
				this.tweens.add({
					targets: flag,
					scaleX: 1,
					ease: 'Linear',
					duration: 150,
					delay: 600
				})
			})
		} else if (this.counterBtnStart == 1) {
			this.sounds.theme.stop();
			this.scene.start('Game');
		}
	}
	removeStartSprites() {
		// убираем лишние спрайты
		this.scene.scene.tweens.add({
			targets: this.card,
			y: -500,
			ease: 'Linear',
			duration: 150
		})
		this.scene.scene.tweens.add({
			targets: this.shirt,
			y: window.innerHeight + 500,
			ease: 'Linear',
			duration: 150
		})
		this.scene.scene.tweens.add({
			targets: this.player,
			rotation: -1.5,
			y: window.innerHeight,
			ease: 'Linear',
			duration: 150,
			onComplete: () => {
				this.scene.scene.tweens.add({
					targets: this.player,
					x: -this.player.height - 600,
					ease: 'Linear',
					duration: 150,
					onComplete: () => {
						this.player.rotation = 0;
						this.player.y = config.scale.height + 100;
						this.player.x = this.xPlayer;
					}
				})
			}
		})
	}
	removeBtnStart() {
		this.scene.scene.tweens.add({
			targets: this.btnStart,
			x: config.scale.width + this.widthBtnStart + 50,
			ease: 'Linear',
			duration: 150
		})
	}

	showPlayer2() {
		this.scene.scene.tweens.add({
			targets: this.player2,
			x: this.xPlayer2Active,
			ease: 'Linear',
			duration: 150,
			delay: 300
		})
	}
	removePlayer2() {
		this.scene.scene.tweens.add({
			targets: this.player2,
			x: this.xPlayer2,
			ease: 'Linear',
			duration: 150
		})
	}

	//Проверяем какие выбраны флаги, выделяем рамкой выбранные
	checkSelectedFlags() {
		let flag1 = +sessionStorage.getItem('player-team');
		let flag2 = +sessionStorage.getItem('enemy-team');
		let x1, x2, y1, y2, width1, width2, height1, height2;

		this.flags.forEach((flag, index) => {
			if (index === flag1 - 1) {
				x1 = flag.x - 2;
				y1 = flag.y - 2;
				width1 = flag.width + 4;
				height1 = flag.height + 4;
			}
			if (index === flag2 + 3) {
				x2 = flag.x - 2;
				y2 = flag.y - 2;
				width2 = flag.width + 4;
				height2 = flag.height + 4;
			}
		})

		setTimeout(() => {
			if (flag1 == 1) {
				this.r1 = this.add.rectangle(x1, y1, width1, height1).setOrigin(0);
				this.r1.setStrokeStyle(3, 0x00D1FF);
			} else if (flag1 == 2) {
				this.r2 = this.add.rectangle(x1, y1, width1, height1).setOrigin(0);
				this.r2.setStrokeStyle(3, 0x00D1FF);
			} else if (flag1 == 3) {
				this.r3 = this.add.rectangle(x1, y1, width1, height1).setOrigin(0);
				this.r3.setStrokeStyle(3, 0x00D1FF);
			} else if (flag1 == 4) {
				this.r4 = this.add.rectangle(x1, y1, width1, height1).setOrigin(0);
				this.r4.setStrokeStyle(3, 0x00D1FF);
			}
			if (flag2 == 1) {
				this.r5 = this.add.rectangle(x2, y2, width2, height2).setOrigin(0);
				this.r5.setStrokeStyle(3, 0x00D1FF);
			} else if (flag2 == 2) {
				this.r6 = this.add.rectangle(x2, y2, width2, height2).setOrigin(0);
				this.r6.setStrokeStyle(3, 0x00D1FF);
			} else if (flag2 == 3) {
				this.r7 = this.add.rectangle(x2, y2, width2, height2).setOrigin(0);
				this.r7.setStrokeStyle(3, 0x00D1FF);
			} else if (flag2 == 4) {
				this.r8 = this.add.rectangle(x2, y2, width2, height2).setOrigin(0);
				this.r8.setStrokeStyle(3, 0x00D1FF);
			}
		}, 800);
	}
}