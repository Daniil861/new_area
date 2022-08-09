class PreloadScene extends Phaser.Scene {
	constructor() {
		super('Preload');
	}
	preload() {
		this.preloadAssets();
		this.createBg();
		const loadingBar = new LoadingBar(this);
	}
	preloadAssets() {
		this.load.audio('theme', 'assets/audio/theme.mp3');
		this.load.audio('hit', [
			'assets/audio/hit.wav',
			'assets/audio/hit.m4a'
		]);
		this.load.audio('goal', [
			'assets/audio/goal.mp3',
			'assets/audio/goal.m4a'
		]);
		this.load.audio('touch', 'assets/audio/touch.wav');
		this.load.audio('loose', [
			'assets/audio/loose.mp3',
			'assets/audio/loose.m4a'
		]);
		this.load.image('bg-game', 'assets/sprites/other/gameBg.jpg');
		this.load.image('btn-start', 'assets/sprites/icons/btn-start.svg');
		this.load.image('btn-card', 'assets/sprites/icons/btn-card.png');
		this.load.image('btn-shirt', 'assets/sprites/icons/btn-shirt.png');

		this.load.image('player1-1', 'assets/sprites/icons/player-1-1.png');
		this.load.image('player1-2', 'assets/sprites/icons/player-1-2.png');
		this.load.image('player2-1', 'assets/sprites/icons/player-2-1.png');
		this.load.image('player2-2', 'assets/sprites/icons/player-2-2.png');
		this.load.image('player3-1', 'assets/sprites/icons/player-3-1.png');
		this.load.image('player3-2', 'assets/sprites/icons/player-3-2.png');

		this.load.image('game-player1-1', 'assets/sprites/icons/game-pl-1-1.png');
		this.load.image('game-player1-2', 'assets/sprites/icons/game-pl-1-2.png');
		this.load.image('game-player2-1', 'assets/sprites/icons/game-pl-2-1.png');
		this.load.image('game-player2-2', 'assets/sprites/icons/game-pl-2-2.png');
		this.load.image('game-player3-1', 'assets/sprites/icons/game-pl-3-1.png');
		this.load.image('game-player3-2', 'assets/sprites/icons/game-pl-3-2.png');

		this.load.image('ball', 'assets/sprites/icons/ball.png');
		this.load.image('glove', 'assets/sprites/icons/gloves.png');
		this.load.image('board', 'assets/sprites/icons/board.png');
		this.load.image('board-2', 'assets/sprites/icons/board-2.png');
		this.load.image('bonus-1', 'assets/sprites/icons/bonus-1.png');
		this.load.image('bonus-2', 'assets/sprites/icons/bonus-2.png');
		this.load.image('btn-green', 'assets/sprites/icons/btn-green.svg');
		this.load.image('icon', 'assets/sprites/icons/icon.png');
		this.load.image('shirt-1', 'assets/sprites/icons/shirt-1.png');
		this.load.image('shirt-2', 'assets/sprites/icons/shirt-2.png');
		this.load.image('shirt-3', 'assets/sprites/icons/shirt-3.png');
		this.load.image('btn-home', 'assets/sprites/icons/btn-home.png');
		this.load.image('fullscreen', 'assets/sprites/icons/fullscreen.png');
		this.load.image('volume', 'assets/sprites/icons/volume.png');

		this.load.image('gate', 'assets/sprites/icons/gate.png');
		this.load.image('game-board', 'assets/sprites/icons/game-board.png');
		this.load.image('btn-play', 'assets/sprites/icons/btn-play.png');

		this.load.image('flag-3', 'assets/sprites/flags/flag-brazil.png');
		this.load.image('flag-2', 'assets/sprites/flags/flag-bulgary.png');
		this.load.image('flag-4', 'assets/sprites/flags/flag-swiss.png');
		this.load.image('flag-1', 'assets/sprites/flags/flag-usa.png');
	}
	createBg() {
		const background = this.add.sprite(0, 0, 'bg-preload').setOrigin(0);
	}
	create() {
		this.scene.start('Start');
	}
}