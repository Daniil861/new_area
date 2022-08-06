window.addEventListener('load', function () {
	const config = {
		type: Phaser.AUTO,
		parent: 'thegame',
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: 1270,
			height: 720
		},
		dom: {
			createContainer: true
		},
		scene: [BootScene, PrivacyScene, PreloadScene, StartScene, GameScene]
	}

	const game = new Phaser.Game(config);
	window.focus();
})

