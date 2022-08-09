class Flag extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, value, row) {
		super(scene, x, y, texture);
		this.value = value;
		this.row = row;
		this.scene.add.existing(this);
		this.setInteractive();
		this.setOrigin(0);
		this.scaleX = 0;
	}
}