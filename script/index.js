const config = {
	type: Phaser.AUTO,
	parent: 'thegame',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 1270,
		height: 720
	},
	scene: [BootScene, PrivacyScene, PreloadScene, StartScene, GameScene]
}
window.addEventListener('load', function () {
	const game = new Phaser.Game(config);
	window.focus();
})


