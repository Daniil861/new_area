class GameScene extends Phaser.Scene {
	constructor() {
		super('Game');
	}
	init() {
		this.detectTheThing();
		this.state = 1;
		this.createSounds();
		this.bonus1Active = 0;
		this.bonus2Active = 0;
	}
	create() {
		this.createBg();
		this.createBoard();
		this.createGate();
		this.createBall();
		this.createBtnHome();
		this.createBonuses();
		this.createPlayer();
		this.createFooter();
		this.createFullscreen();
		this.createEvents();
	}
	detectTheThing() {
		let uagent = navigator.userAgent.toLowerCase();
		if (!uagent.search("iphone") || !uagent.search("ipad") || !uagent.search("webos") > -1) {
			this.createFullscreen();
		}
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
	createSounds() {
		this.sounds = {
			theme: this.sound.add('theme', { volume: 0.1, loop: true }),
			touch: this.sound.add('touch'),
			hit: this.sound.add('hit', { volume: 0.6 }),
			goal: this.sound.add('goal', { volume: 0.3 }),
			loose: this.sound.add('loose', { volume: 0.3 })
		};
		this.sounds.theme.play();
	}
	createEvents() {
		this.input.on('gameobjectdown', this.onSceneClicked, this);
	}
	onSceneClicked(pointer, element) {
		if (element.type == 'Arc' && this.state == 2) {
			this.gloveCoord = element.value;
			this.removeAreasBalls();
			this.moveGame2();
		} else if (element.type == 'Arc' && this.state == 1) {
			this.ballCoordFly = element.value;
			this.removeAreasBalls();
			this.startGame();
		}
	}
	startGame() {
		setTimeout(() => {
			this.flyBall();
			this.flyGoalkeeper();
		}, 1000);
	}

	flyBall() {
		let x = 0;
		let y = 0;
		let scale = this.ball.scale - 0.4;

		if (this.state == 2) {
			this.ballCoordFly = Math.floor(Math.random() * (4 - 1) + 1);
		}
		this.sounds.hit.play();
		if (this.ballCoordFly == 1) {
			x = this.configBalls.x1;
			y = this.configBalls.y1;
			this.tweens.add({
				targets: this.ball,
				x: x,
				y: y,
				scale: scale,
				ease: 'Elastic.easeInOut',
				duration: 200
			})
		} else if (this.ballCoordFly == 2) {
			x = this.configBalls.x2;
			y = this.configBalls.y2;
			this.tweens.add({
				targets: this.ball,
				x: x,
				y: y,
				scale: scale,
				ease: 'Elastic.easeInOut',
				duration: 200
			})
		} else if (this.ballCoordFly == 3) {
			x = this.configBalls.x3;
			y = this.configBalls.y3;
			this.tweens.add({
				targets: this.ball,
				x: x,
				y: y,
				scale: scale,
				ease: 'Elastic.easeInOut',
				duration: 200
			})
		}
	}
	flyGoalkeeper() {
		let count = Math.floor(Math.random() * (4 - 1) + 1);
		this.keeperValue = count;
		if (this.keeperValue == 1) {
			this.tweens.add({
				targets: this.player,
				angle: -60,
				x: this.player.x - 60,
				y: this.player.y - 30,
				ease: 'expo.easeIn',
				duration: 200,
				onComplete: this.checkWinGame1.bind(this)
			})
		} else if (this.keeperValue == 2) {
			setTimeout(() => {
				this.checkWinGame1();
			}, 200);
		} else if (this.keeperValue == 3) {
			this.tweens.add({
				targets: this.player,
				angle: 60,
				x: this.player.x + 60,
				y: this.player.y - 30,
				ease: 'expo.easeIn',
				duration: 200,
				onComplete: this.checkWinGame1.bind(this)
			})
		}
	}
	checkWinGame1() {
		if (this.keeperValue !== this.ballCoordFly) {
			this.sounds.goal.play();
			this.drawWinCount(this.bonus1Active);
		} else {
			this.drawLooseCount(this.bonus1Active);
			this.sounds.loose.play();
		}
		setTimeout(() => {
			if (this.state == 1) {
				this.state = 2;
				if (this.state == 2) {
					this.startGame2();
				}
			}
		}, 3000);
	}
	checkWinGame2() {
		if (this.gloveCoord !== this.ballCoordFly) {
			this.drawLooseCount(this.bonus2Active);
			this.sounds.loose.play();
		} else {
			this.drawWinCount(this.bonus2Active);
			this.sounds.goal.play();
		}
		setTimeout(() => {
			this.restartGame();
		}, 3000);
	}
	restartGame() {
		this.state = 1;
		this.bonus1Active = 0;
		this.bonus2Active = 0;
		this.gloveCoord = 2;
		this.ballCoordFly = 2;
		this.removeGlove2();
		this.showButtons();
		this.showPlayer();
		this.getBallStartPosition();
		this.drawStartTexts();
	}
	startGame2() {
		this.drawStartTexts();
		this.player.alpha = 0;
		this.getBallStartPosition();
		this.createAreasGloveBalls();
	}
	moveGame2() {
		setTimeout(() => {
			this.flyBall();
			this.flyGlove();
		}, 1000);
	}
	flyGlove() {
		let x = 0;
		let y = 0;
		if (this.gloveCoord == 1) {
			x = this.configBalls.x1;
			y = this.configBalls.y1;
			this.tweens.add({
				targets: this.circleGlove2,
				x: x,
				y: y,
				ease: 'expo.easeIn',
				duration: 200,
				onComplete: this.checkWinGame2.bind(this)
			})
		} else if (this.gloveCoord == 2) {
			setTimeout(() => {
				this.checkWinGame2();
			}, 200);
		} else if (this.gloveCoord == 3) {
			x = this.configBalls.x3;
			y = this.configBalls.y3;
			this.tweens.add({
				targets: this.circleGlove2,
				x: x,
				y: y,
				ease: 'expo.easeIn',
				duration: 200,
				onComplete: this.checkWinGame2.bind(this)
			})
		}
	}
	drawWinCount(bonus) {
		let bet = +sessionStorage.getItem('current-bet');
		if (bonus == 1) {
			bet *= 1.5;
		}
		let winCount = bet * 2;
		this.atackBoardText.setText(`+${winCount}`);
		if (this.state == 1) {
			this.resultText.setText('GOAL!!!');
		} else if (this.state == 2) {
			this.resultText.setText('HIT THE BALL!!!');
		}

		this.resultText.alpha = 1;
		this.updateBank(winCount, 1);
	}
	drawLooseCount(bonus) {
		let bet = +sessionStorage.getItem('current-bet');
		if (bonus == 1) {
			bet /= 2;
		}
		this.atackBoardText.setText(`-${bet}`);
		if (this.state == 1) {
			this.resultText.setText('NO GOAL');
		} else if (this.state == 2) {
			this.resultText.setText('MISS GOAL');
		}
		this.resultText.alpha = 1;
		this.updateBank(-(bet /= 2), 0);
	}
	drawStartTexts() {
		this.atackBoardText.setText('ATACK');
		this.resultText.alpha = 0;
	}
	updateBank(count, status) {
		let money = +sessionStorage.getItem('money');
		sessionStorage.setItem('money', money + count);
		this.textMoney.setText(sessionStorage.getItem('money'));
		if (status == 1) {
			this.textMoney.setTint(0xFFFF00, 0x00FFFF, 0x00FF00, 0xFFFF00);
		} else {
			this.textMoney.setTint(0xFF0000, 0xDC143C, 0xFF0000, 0xFF1493);
		}

		this.tweens.add({
			targets: this.textMoney,
			y: status == 1 ? this.textMoney.y - 5 : this.textMoney.y + 5,
			ease: 'Linear',
			duration: 500,
			onComplete: this.backText.bind(this, status)
		})
	}
	backText(status) {
		this.tweens.add({
			targets: this.textMoney,
			y: status == 1 ? this.textMoney.y + 5 : this.textMoney.y - 5,
			ease: 'Linear',
			duration: 250,
			onComplete: function () {
				this.parent.scene.textMoney.setTint(0xffffff)
			}
		})
	}

	createBg() {
		const background = this.add.sprite(0, 0, 'bg-game').setOrigin(0);
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
	createBoard() {
		this.board = this.add.sprite(config.scale.width / 2, 10, 'game-board').setOrigin(0.5, 0);
		this.board.scale = 1.5;

		this.atackBoardText = this.add.text(config.scale.width / 2 - 140, 30, 'ATACK', {
			font: '22px Inter-bold',
			fill: '#fff'
		}).setOrigin(0.5, 0);

		this.defenseBoardText = this.add.text(config.scale.width / 2 + 140, 30, 'DEFENSE', {
			font: '22px Inter-bold',
			fill: '#fff'
		}).setOrigin(0.5, 0);

		this.resultText = this.add.text(config.scale.width / 2 - 140, 80, 'GOAL!!!', {
			font: '22px Inter-bold',
			fill: '#fff'
		}).setOrigin(0.5, 0);
		this.resultText.alpha = 0;

		this.createFlag1();
		this.createFlag2();
	}
	createFlag1() {
		let count = sessionStorage.getItem('player-team');
		this.flag1 = this.add.image(config.scale.width / 2 - 250, 40, `flag-${count}`);
		this.flag1.scale = 0.8;
		this.flag1Mask = this.make.graphics();

		this.flag1Mask.fillStyle(0x000000);
		this.flag1Mask.beginPath();

		this.flag1Mask.arc(config.scale.width / 2 - 250, 40, 30, 0, 6);

		this.flag1Mask.fillPath();

		let mask = this.flag1Mask.createGeometryMask();
		this.flag1.setMask(mask);
	}
	createFlag2() {
		let count = sessionStorage.getItem('enemy-team');
		this.flag2 = this.add.image(config.scale.width / 2 + 250, 40, `flag-${count}`);
		this.flag2.scale = 0.8;
		this.flag2Mask = this.make.graphics();

		this.flag2Mask.fillStyle(0x000000);
		this.flag2Mask.beginPath();

		this.flag2Mask.arc(config.scale.width / 2 + 250, 40, 30, 0, 6);

		this.flag2Mask.fillPath();

		let mask = this.flag2Mask.createGeometryMask();
		this.flag2.setMask(mask);
	}
	createGate() {
		this.gate = this.add.sprite(config.scale.width / 2, 150, 'gate').setOrigin(0.5, 0);
		this.gate.scale = 1.5;
	}
	createBtnHome() {
		let info = this.textures.get('btn-home').getSourceImage();
		this.widthBtnHome = info.width;
		let height = info.height;
		this.xBtnHome = 60;
		this.yBtnHome = 15 + height / 2;

		this.btnHome = this.add.sprite(this.xBtnHome, this.yBtnHome, 'btn-home').setInteractive();
		this.btnHome.scale = 1.3;

		this.btnHome.on('pointerdown', this.onBtnHomeClicked, this.btnHome);
	}
	onBtnHomeClicked() {
		this.scene.state = 0;
		this.scene.removeCircles();
		this.scene.sounds.touch.play();
		this.scene.sounds.theme.stop();
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
					onComplete: this.scene.scene.start('Start')
				})
			}
		})
	}
	createBonuses() {
		this.createBonus1();
		this.createBonus2();
	}
	createBonus1() {
		let info = this.textures.get('bonus-1').getSourceImage();
		this.widthBonus1 = info.width;
		this.heightBonus1 = info.height;

		this.xBonus1 = config.scale.width - this.widthBonus1 - 50;
		this.yBonus1 = config.scale.height - this.heightBonus1 - 170;

		this.bonus1 = this.add.sprite(this.xBonus1, this.yBonus1, 'bonus-1')
			.setOrigin(0)
			.setInteractive();

		this.bonus1.scale = 1.3;

		this.createCircleBonus1();

		this.bonus1.on('pointerdown', function () {
			if (this.scene.bonus1.active == true) {
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
							onComplete: this.scene.onBonus1Clicked()
						})
					}
				})
			}
		})
	}
	createCircleBonus1() {
		let count = sessionStorage.getItem('bonus1');

		this.xCircle1 = config.scale.width - this.widthBonus1 / 2 - 105;
		this.yCircle1 = config.scale.height - this.heightBonus1 - 190;

		this.xCountCircle1 = config.scale.width - this.widthBonus1 / 2 - 80;
		this.yCountCircle1 = config.scale.height - this.heightBonus1 - 165;

		this.circle1 = this.add.circle(this.xCircle1, this.yCircle1, 25, 0x000000).setStrokeStyle(3, 0xffffff).setOrigin(0);

		this.textCountCircle1 = this.add.text(this.xCountCircle1, this.yCountCircle1, count, {
			font: '24px Inter-medium',
			fill: '#fff'
		}).setOrigin(0.5);
	}
	onBonus1Clicked() {
		this.sounds.touch.play();
		if (+sessionStorage.getItem('bonus1') > 0) {
			this.bonus1Active = 1;
			this.holdBonus1();
			this.holdBonus2();
			sessionStorage.setItem('bonus1', +sessionStorage.getItem('bonus1') - 1);
			this.textCountCircle1.setText(sessionStorage.getItem('bonus1'));
		}
	}
	createBonus2() {
		let info = this.textures.get('bonus-2').getSourceImage();
		this.widthBonus2 = info.width;
		this.heightBonus2 = info.height;

		this.xBonus2 = config.scale.width - this.widthBonus2 - 50;
		this.yBonus2 = config.scale.height - this.heightBonus2 - 40;

		this.bonus2 = this.add.sprite(this.xBonus2, this.yBonus2, 'bonus-2')
			.setOrigin(0)
			.setInteractive();

		this.bonus2.scale = 1.3;

		this.createCircleBonus2();

		this.bonus2.on('pointerdown', function () {
			if (this.scene.bonus2.active == true) {
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
							onComplete: this.scene.onBonus2Clicked()
						})
					}
				})
			}
		})
	}
	createCircleBonus2() {
		let count = sessionStorage.getItem('bonus2');

		this.xCircle2 = config.scale.width - this.widthBonus2 / 2 - 110;
		this.yCircle2 = config.scale.height - this.heightBonus2 - 60;

		this.xCountCircle2 = config.scale.width - this.widthBonus2 / 2 - 85;
		this.yCountCircle2 = config.scale.height - this.heightBonus2 - 35;

		this.circle2 = this.add.circle(this.xCircle2, this.yCircle2, 25, 0x000000).setStrokeStyle(3, 0xffffff).setOrigin(0);

		this.textCountCircle2 = this.add.text(this.xCountCircle2, this.yCountCircle2, count, {
			font: '24px Inter-medium',
			fill: '#fff'
		}).setOrigin(0.5);
	}
	onBonus2Clicked() {
		this.sounds.touch.play();
		if (+sessionStorage.getItem('bonus2') > 0) {
			this.bonus2Active = 1;
			this.holdBonus1();
			this.holdBonus2();
			sessionStorage.setItem('bonus2', +sessionStorage.getItem('bonus2') - 1);
			this.textCountCircle2.setText(sessionStorage.getItem('bonus2'));
		}
	}
	createFooter() {
		this.createButtonPlay();
		this.createBetInfo();
		this.createBankInfo();
	}
	createButtonPlay() {
		let info = this.textures.get('btn-play').getSourceImage();
		this.widthBtnPlay = info.width;
		this.heightBtnPlay = info.height;

		this.xBtnPlay = config.scale.width / 2;
		this.yBtnPlay = config.scale.height - this.heightBtnPlay + 10;


		this.btnPlay = this.add.sprite(this.xBtnPlay, this.yBtnPlay, 'btn-play').setInteractive();
		this.btnPlay.depth = 11;
		this.btnPlay.scale = 1.5;

		let currentScaleMin = this.btnPlay.scale - 0.1;
		let currentScale = this.btnPlay.scale;
		this.btnPlay.on('pointerdown', function () {
			if (this.scene.btnPlay.active == true) {
				this.scene.tweens.add({
					targets: this,
					scale: currentScaleMin,
					ease: 'Linear',
					duration: 150,
					onComplete: () => {
						this.scene.tweens.add({
							targets: this,
							scale: currentScale,
							ease: 'Linear',
							duration: 150,
							onComplete: this.scene.onBtnPlayClicked()
						})
					}
				})
			}

		})
	}
	onBtnPlayClicked() {
		this.sounds.touch.play();
		this.holdButtons();
		this.createAreasBalls();
	}
	holdButtons() {
		this.holdBtnPlay();
		this.holdBonus1();
		this.holdBonus2();
		this.holdBetBox();
	}
	showButtons() {
		this.showBtnPlay();
		this.showBonus1();
		this.showBonus2();
		this.showMinus();
		this.showPlus();
	}
	holdBtnPlay() {
		this.btnPlay.active = false;
		this.btnPlay.alpha = 0;
	}
	showBtnPlay() {
		this.btnPlay.active = true;
		this.btnPlay.alpha = 1;
	}
	holdBonus1() {
		this.bonus1.active = false;
		this.bonus1.alpha = 0.5;
	}
	showBonus1() {
		this.bonus1.active = true;
		this.bonus1.alpha = 1;
	}
	holdBonus2() {
		this.bonus2.active = false;
		this.bonus2.alpha = 0.5;
	}
	showBonus2() {
		this.bonus2.active = true;
		this.bonus2.alpha = 1;
	}
	createBetInfo() {
		this.betBox = this.add.graphics();

		this.configBetBox = {
			width: 250,
			height: 60
		}
		this.coordBetBox = {
			x: config.scale.width / 2 - this.configBetBox.width - 100,
			y: config.scale.height - this.configBetBox.height - 15,
		}

		this.betBox.fillStyle(0x000000);
		this.betBox.fillRoundedRect(this.coordBetBox.x, this.coordBetBox.y, this.configBetBox.width, this.configBetBox.height);

		this.createTextBet();
		this.createIconMoney(-200);
		this.createBtnMinus();
		this.createBtnPlus();
	}
	createBankInfo() {
		this.bankBox = this.add.graphics();

		this.configBankBox = {
			width: 250,
			height: 60
		}
		this.coordBankBox = {
			x: config.scale.width / 2 + 100,
			y: config.scale.height - this.configBankBox.height - 15,
		}

		this.bankBox.fillStyle(0x000000);
		this.bankBox.fillRoundedRect(this.coordBankBox.x, this.coordBankBox.y, this.configBankBox.width, this.configBankBox.height);

		this.createTextBank();
		this.createIconMoney(270);

	}
	createTextBank() {
		this.money = +sessionStorage.getItem('money');

		this.xTextBalance = config.scale.width / 2 + 230;
		this.yTextBalance = config.scale.height - 90;

		this.xTextMoney = config.scale.width / 2 + 260;
		this.yTextMoney = config.scale.height - 45;

		this.textBank = this.add.text(this.xTextBalance, this.yTextBalance, 'BALANCE', {
			font: '24px Inter-medium',
			fill: '#fff'
		}).setOrigin(0.5);
		this.textMoney = this.add.text(this.xTextMoney, this.yTextMoney, this.money, {
			font: '24px Inter-bold',
			fill: '#fff'
		}).setOrigin(1, 0.5);
	}
	createIconMoney(x) {
		let info = this.textures.get('icon').getSourceImage();
		this.widthIcon = info.width;
		this.heightIcon = info.height;

		this.xIcon = config.scale.width / 2 + x;
		this.yIcon = config.scale.height - 55;

		this.icon = this.add.sprite(this.xIcon, this.yIcon, 'icon').setOrigin(0);

		this.icon.scale = 1.5;
	}
	createTextBet() {
		this.bet = +sessionStorage.getItem('current-bet');

		this.xTextBet = config.scale.width / 2 - 220;
		this.yTextBet = config.scale.height - 90;

		this.xTextCountBet = config.scale.width / 2 - 220;
		this.yTextCountBet = config.scale.height - 45;

		this.textBet = this.add.text(this.xTextBet, this.yTextBet, 'BET', {
			font: '24px Inter-medium',
			fill: '#fff'
		}).setOrigin(0.5);
		this.textCountBet = this.add.text(this.xTextCountBet, this.yTextCountBet, this.bet, {
			font: '24px Inter-bold',
			fill: '#fff'
		}).setOrigin(1, 0.5);
	}
	createBtnMinus() {
		this.xMinus = config.scale.width / 2 - 310;
		this.yMinus = config.scale.height - 47;

		this.textMinus = this.add.text(this.xMinus, this.yMinus, '-', {
			font: '50px Inter-bold',
			fill: '#fff'
		}).setOrigin(0.5).setInteractive();
		this.textMinus.on('pointerdown', function () {
			if (this.scene.textMinus.active == true) {
				this.scene.tweens.add({
					targets: this,
					scale: 0.9,
					ease: 'Linear',
					duration: 150,
					onComplete: () => {
						this.scene.tweens.add({
							targets: this,
							scale: 1,
							ease: 'Linear',
							duration: 150,
							onComplete: this.scene.onMinusClicked()
						})
					}
				})
			}
		})
	}
	createBtnPlus() {
		this.xPlus = config.scale.width / 2 - 140;
		this.yPlus = config.scale.height - 47;

		this.textPlus = this.add.text(this.xPlus, this.yPlus, '+', {
			font: '46px Inter-bold',
			fill: '#fff'
		}).setOrigin(0.5).setInteractive();

		this.textPlus.on('pointerdown', function () {
			if (this.scene.textPlus.active == true) {
				this.scene.tweens.add({
					targets: this,
					scale: 0.9,
					ease: 'Linear',
					duration: 150,
					onComplete: () => {
						this.scene.tweens.add({
							targets: this,
							scale: 1,
							ease: 'Linear',
							duration: 150,
							onComplete: this.scene.onPlusClicked()
						})
					}
				})
			}
		})
	}
	onMinusClicked() {
		this.sounds.touch.play();
		let bet = +sessionStorage.getItem('current-bet');
		if (bet > 50) {
			sessionStorage.setItem('current-bet', bet - 50);
			this.textCountBet.setText(sessionStorage.getItem('current-bet'));
		}
	}
	onPlusClicked() {
		this.sounds.touch.play();
		let money = +sessionStorage.getItem('money');
		let bet = +sessionStorage.getItem('current-bet');
		if (money > bet + 50 && bet < 1000) {
			sessionStorage.setItem('current-bet', bet + 50);
			this.textCountBet.setText(sessionStorage.getItem('current-bet'));
		}
	}
	holdBetBox() {
		this.holdMinus();
		this.holdPlus();
	}
	holdMinus() {
		this.textMinus.active = false;
		this.textMinus.alpha = 0.5;
	}
	showMinus() {
		this.textMinus.active = true;
		this.textMinus.alpha = 1;
	}
	holdPlus() {
		this.textPlus.active = false;
		this.textPlus.alpha = 0.5;
	}
	showPlus() {
		this.textPlus.active = true;
		this.textPlus.alpha = 1;
	}
	createBall() {
		this.getStartPositionBall();

		this.ball = this.add.sprite(this.xBall, this.yBall, 'ball');
		this.ball.depth = 10;

		this.scalingBall();
	}
	scalingBall() {
		this.ball.scale = 0.6;
	}
	getStartPositionBall() {
		this.xBall = config.scale.width / 2;
		this.yBall = config.scale.height - 70;
	}
	getBallStartPosition() {
		this.scalingBall();
		this.getStartPositionBall();
		this.tweens.add({
			targets: this.ball,
			x: this.xBall,
			y: this.yBall,
			ease: 'Linear',
			duration: 150
		})
	}
	createPlayer() {
		let count = +sessionStorage.getItem('current-shirt');

		let info = this.textures.get('game-player1-1').getSourceImage();
		this.widthPlayer = info.width;
		this.heightPlayer = info.height;

		this.xPlayer = config.scale.width / 2;
		this.yPlayer = config.scale.height / 2 + this.heightPlayer / 2 + 65;

		this.player = this.add.sprite(this.xPlayer, this.yPlayer, `game-player${count}-1`).setOrigin(0.5, 1);

		this.player.scale = 1.3;
	}
	showPlayer() {
		this.player.alpha = 1;
		this.player.x = this.xPlayer;
		this.player.y = this.yPlayer;
		this.player.angle = 0;
	}
	createAreasBalls() {
		this.configBalls = {
			radius: 45,
			color: 0xff0000,
			x1: config.scale.width / 2 - config.scale.width / 5,
			x2: config.scale.width / 2,
			x3: config.scale.width / 2 + config.scale.width / 5,
			y1: config.scale.height / 2 + 30,
			y2: config.scale.height / 2 + 60,
			y3: config.scale.height / 2 + 30,
		}
		if (!this.circleBall1) {
			this.circle1 = this.add.circle(this.configBalls.x1, this.configBalls.y1, this.configBalls.radius, this.configBalls.color)
				.setInteractive();
			this.circle1.alpha = 0.5;
			this.circle1.value = 1;

			this.circle2 = this.add.circle(this.configBalls.x2, this.configBalls.y2, this.configBalls.radius, this.configBalls.color)
				.setInteractive();
			this.circle2.alpha = 0.5;
			this.circle2.value = 2;

			this.circle3 = this.add.circle(this.configBalls.x3, this.configBalls.y3, this.configBalls.radius, this.configBalls.color)
				.setInteractive();
			this.circle3.alpha = 0.5;
			this.circle3.value = 3;

			this.circleBall1 = this.add.sprite(this.configBalls.x1, this.configBalls.y1, 'ball');
			this.circleBall1.scale = 0.25;
			this.circleBall1.alpha = 0.5;

			this.circleBall2 = this.add.sprite(this.configBalls.x2, this.configBalls.y2, 'ball');
			this.circleBall2.scale = 0.25;
			this.circleBall2.alpha = 0.5;

			this.circleBall3 = this.add.sprite(this.configBalls.x3, this.configBalls.y3, 'ball');
			this.circleBall3.scale = 0.25;
			this.circleBall3.alpha = 0.5;
		} else {
			this.circle1.alpha = 0.5;
			this.circle2.alpha = 0.5;
			this.circle3.alpha = 0.5;
			this.circleBall1.alpha = 0.5;
			this.circleBall2.alpha = 0.5;
			this.circleBall3.alpha = 0.5;
		}

	}
	createAreasGloveBalls() {
		this.configGloveBalls = {
			radius: 30,
			color: 0xff0000,
			x1: config.scale.width / 2 - config.scale.width / 5,
			x2: config.scale.width / 2,
			x3: config.scale.width / 2 + config.scale.width / 5,
			y1: config.scale.height / 2 + 60,
			y2: config.scale.height / 2 + 30,
			y3: config.scale.height / 2 + 60,
		}
		if (!this.circleGlove1) {
			this.circleGlove1 = this.add.sprite(this.configBalls.x1, this.configBalls.y1, 'glove');
			this.circleGlove1.scale = 1.2;

			this.circleGlove2 = this.add.sprite(this.configBalls.x2, this.configBalls.y2, 'glove');
			this.circleGlove2.scale = 1.2;

			this.circleGlove3 = this.add.sprite(this.configBalls.x3, this.configBalls.y3, 'glove');
			this.circleGlove3.scale = 1.2;

			this.circle4 = this.add.circle(this.configBalls.x1, this.configBalls.y1, this.configBalls.radius, this.configBalls.color)
				.setInteractive();
			this.circle4.alpha = 0.5;
			this.circle4.value = 1;

			this.circle5 = this.add.circle(this.configBalls.x2, this.configBalls.y2, this.configBalls.radius, this.configBalls.color)
				.setInteractive();
			this.circle5.alpha = 0.5;
			this.circle5.value = 2;

			this.circle6 = this.add.circle(this.configBalls.x3, this.configBalls.y3, this.configBalls.radius, this.configBalls.color)
				.setInteractive();
			this.circle6.alpha = 0.5;
			this.circle6.value = 3;
		} else {
			this.circle4.alpha = 0.5;
			this.circle5.alpha = 0.5;
			this.circle6.alpha = 0.5;
			this.circleGlove1.alpha = 1;
			this.circleGlove2.alpha = 1;
			this.circleGlove3.alpha = 1;
		}

	}
	removeAreasBalls() {
		this.tweens.add({
			targets: [this.circle1, this.circle2, this.circle3, this.circleBall1, this.circleBall2, this.circleBall3, this.circle4, this.circle5, this.circle6, this.circleGlove1, this.circleGlove3],
			alpha: 0,
			ease: 'Linear',
			duration: 150,
		})
	}
	removeGlove2() {
		this.tweens.add({
			targets: [this.circleGlove2],
			alpha: 0,
			x: this.configBalls.x2,
			y: this.configBalls.y2,
			ease: 'Linear',
			duration: 150,
		})
	}
	removeCircles() {
		if (this.circleBall1) {
			delete this.circle1;
			delete this.circle2;
			delete this.circle3;
			delete this.circleBall1;
			delete this.circleBall2;
			delete this.circleBall3;
		}
		if (this.circleGlove1) {
			delete this.circle4;
			delete this.circle5;
			delete this.circle6;
			delete this.circleGlove1;
			delete this.circleGlove2;
			delete this.circleGlove3;
		}
	}
}