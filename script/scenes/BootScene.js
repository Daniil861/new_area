class BootScene extends Phaser.Scene {
	constructor() {
		super('Boot');
	}
	preload() {
		this.load.image('bg-preload', 'assets/sprites/other/bg.jpg');
		this.load.image('btn-preload', 'assets/sprites/icons/btn-preload.svg');
		this.load.html('preload', 'assets/test.html');
	}
	create() {
		// if (!sessionStorage.getItem('privacy')) {
		this.scene.start('Privacy');
		// } else {
		// 	this.scene.start('Preload');
		// }
	}


}