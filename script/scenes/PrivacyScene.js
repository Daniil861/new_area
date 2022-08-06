class PrivacyScene extends Phaser.Scene {
	constructor() {
		super('Privacy');
		this.config = {
			nameGame: 'Penalty Area',
			x: 0,
			y: 0,
			width: window.innerWidth,
			height: innerHeight,
		}
		this.content = [
			['Privacy Policy'],
			['Last Modified 1 March 2021'],
			['Privacy Policy is updated in accordance with The General Data Protection Regulation (GDPR).'],
			[' '],
			['1. Introduction',
				`This is Privacy Policy ${this.config.nameGame}, which explains how is collect, use and share data through mobile applications, our pages or presence on third party websites and other platforms, websites products, offers and Services that we offer from time to time, all of which together we refer as \“Services\” or \“Service\”`
			],
			[' '],
			['2. Collect of Personal Data',
				`${this.config.nameGame} collects and process through the mobile applications the Player's personal data.`,
				`Personal data means any information from which the player can be directly	or indirectly identified such as a name, location, email address,	communication language, IP address, IDFV (ID for vendor) or Android ID,	advertisement ID, push notifications token, game history, network logs,	cookie online identifier, gender, financial data, etc., (“Personal Data”). Your personal data are processed only to the extent strictly necessary,	depending on the particular purpose of the processing, as defined in point 6.`,
			],
			[' '],
			['3. Acceptance and Consent'],
			[`3.1 Read this Notice carefully before using the ${this.config.nameGame}. By using or registering via the apps, or submitting a query to the Company via the Apps or other means, including telephone or mail, you accept this notice. If you do not accept	this Notice, please don't use the ${this.config.nameGame}.`],
			[`3.2 By registering for a user account that enables you to use the service, you agree to the terms and conditions of this Privacy Policy, and you consent to the collection, use and disclosure of your information by 	${this.config.nameGame} in accordance with the terms and conditions of this Privacy Policy. If you do not agree to the terms and conditions of this Privacy Policy or If you do not want ${this.config.nameGame} to collect, store, use or share your information in	the ways described in this Privacy Policy, please do not use the service.`],
			[]
			[' '],
			['4. Changes to the Privacy Policy',
				`${this.config.nameGame} reserves the right to change, modify, add, or remove portions	of this Privacy Policy at any time, for example to reflect updates to the Service or to reflect changes in the law. If we make a material change to the Privacy Policy, we will provide you with appropriate notice and will seek your consent to the updated Privacy Policy in accordance with applicable legal requirements. Please check this Privacy Policy periodically for those changes. Your continued use of the Service after the posting of changes constitutes your binding acceptance of such changes.`
			],
			[' '],
			['5. Information Collection and Use',
				`Our primary goals in collecting and using information are to provide and improve the Service, to administer and assist you in administering your Account on the Service, and to provide you with a better experience with the service.`,
				`We process your personal data for the following specified purposes:`,
				'Provision of Services',
				'Negotiations on a contractual relationship',
				'Purposes contained within the data subject\'s consent',
				'Archiving based on legal regulations',
				'Direct marketing',
				'Customer service quality monitoring',
				'Collect feedback from the market'
			],
			[' '],
			['6. Which Personal Data we collect',
				`Data you provide to us: Contact information (such as full name and email address), profile information (such as age or gender or photograph), your messages to the Service (such as chat logs and player support tickets), other data you choose to give us.`,
				`Data we collect automatically: Data about your account and in-game progress, your IP address and mobile device identifiers (such as your device ID, advertising ID), data about your device, such as device manufacturer, model, operating system and language, general location data like country or city name, data about your use of the Service, such as gameplay data and your interactions with other players inside the games.`
			],
			[' '],
			['7. Information sharing practices',
				`We do not share any information we collect (including your personal e-mail address) with third parties:`,
				`unless you authorized us to do so under the terms of this Privacy Policy;`,
				`or we believe in good faith that the disclosure of the information is required by any applicable law, regulation, court order, legal proceedings or governmental demand;`,
				`or it is required to handle security breach or fraud investigations, or to enforce the terms of our Terms of Use.`,
				`Otherwise, we share your information with third parties with whom we have a business relationship, such as analytics providers. The information shared with these third parties may be used for industry analysis, or other purposes related to providing the Services to you.`,
			],
			[' '],
			['8. Cookies',
				`Like many websites, ${this.config.nameGame}  and service providers acting on our behalf, like Google Analytics, store log files and use tracking technologies such as "cookies" to collect information. A cookie is a small data file that is transferred to your computer’s hard disk or your mobile device for record-keeping purposes. The service may send cookies to a computer or a mobile device when a user accesses or views a service. Information contained in a cookie may be linked to personal information for purposes such as improving the quality of ${this.config.nameGame} Service, tailoring recommendations to interests, and making the Service easier to use.`,
				`Cookies can be disabled at any time by changing your web browser’s options to stop accepting cookies, to prompt you before accepting a cookie from the websites you visit, or limit the type of cookies you allow. Flash cookies operate differently than browser cookies, and cookie management tools available in a web browser may not remove flash cookies. If you do not accept cookies, however, you may not be able to use all features, portions or functionalities of the Service.`
			],
			[' '],
			['9. Personal data retention period',
				`We keep your personal data for as long, as you actively use our Services, but no later than the expiration of the statutory accounting and tax laws. After the retention time, your personal information will be completely erased.`
			],
			[' '],
			['10. Protect the information',
				`${this.config.nameGame} has made reasonable technical and organizational measures designed to secure your information both online and offline from accidental loss and from unauthorized access, use, alteration or disclosure, and we are committed to the protection of customer information. We will take reasonable steps to ensure that your data is treated securely and in accordance with this Privacy Policy.`,
				`While we take reasonable precautions against possible security breaches of our Services and our customer databases and records, no website or Internet transmission is completely secure, and ${this.config.nameGame} cannot guarantee that unauthorized access, hacking, data loss, or other breaches will never occur and that third parties will never be able to overcome those measures or use your personal information for improper purposes.`
			],
			[' '],
			['11. The rights of user',
				`You are entitled to obtain information from us on how we handle your personal data, to see copies of all personal data held by us and to request that your personal data is amended, corrected or deleted from our systems. You can also limit, restrict or object to the processing of your data. We do not carry out any decision-making based solely on automated processing, including profiling. You can object to our use of your personal data where we stated we rely on our legitimate business interests to do so. We explained the legitimate interests we rely on in sections ‘Why do we collect your personal data’ above. If you would like to exercise any of your above rights, contact us using the contact details below.`
			],
			[' '],
			['12. Age requirement',
				`We recognize the need to provide further privacy protections with respect to Personal Information we may collect from children, and take many special precautions to protect the privacy of children. We do not require any Personal Information from them at any time. Likewise, we encourage children to consult with their parents before submitting any information to any online resource. Likewise, we believe parents should be involved in the online activities of their children and suggest that parents do their best to provide their children with a safe and friendly online environment.`,
				`You must be at least 18 years old to use the ${this.config.nameGame}. By accepting the terms of this Privacy Policy and the Terms of Use presented to you before downloading or presenting the Software and while using it, you represent that you are 18 years old. We will not knowingly collect personal information from a user who is younger than 18 years old and, if we have reason to believe that you are younger than 18 years old, we will delete your information from our servers.`
			]
		]
	}
	create() {
		// this.createBackground();
		// this.createTextBlock();
		let preloader = this.add.dom(0, 0)
			.createFromCache("preload")
			.setOrigin(0);
		// this.createButton();
	}
	update() {
		if (sessionStorage.getItem('privacy')) this.scene.start('Preload');
	}
	createBackground() {
		this.add.sprite(0, 0, 'bg-preload').setOrigin(0);
	}
	createTextBlock() {
		let graphics = this.make.graphics();

		graphics.fillRect(this.config.x + 90, this.config.y + 20, config.scale.width, config.scale.height);

		let mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

		let text = this.add.text(this.config.x + 90, this.config.y + 20, this.content, {
			font: '26px Inter-bold',
			color: '#fff',
			wordWrap: { width: config.scale.width - 250 }
		});

		let minY = this.config.height - text.height - 20;

		if (text.height <= this.config.height - 20) {

			minY = this.config.y + 20;

		}
		text.setMask(mask);

		let zone = this.add.zone(this.config.x, this.config.y, config.scale.width - 250, config.scale.height)
			.setOrigin(0)
			.setInteractive({ useHandCursor: true, draggable: true });
		this.input.dragDistanceThreshold = 100;

		let y = this.config.y;

		zone.on('drag', function (pointer) {
			if (pointer.isDown) {
				text.y += pointer.velocity.y / 10;
				text.y = Phaser.Math.Clamp(text.y, minY, y + 20);
			}
		})
			.on('dragend', () => {
				zone.x = this.config.x;
				zone.y = this.config.y - 3;
			});
	}
	createButton() {
		let btn = this.add.sprite(config.scale.width - 100, config.scale.height - 100, 'btn-preload').setInteractive();
		btn.on('pointerdown', this.onBtnClick, btn);
		btn.scale = 1.5;
	}
	onBtnClick() {
		this.scene.tweens.add({
			targets: this,
			scale: 1.4,
			ease: 'Linear', // тип анимации
			duration: 150, // мс - время проигрывания анимации
			onComplete: () => {
				this.scene.tweens.add({
					targets: this,
					scale: 1.5,
					ease: 'Linear', // тип анимации
					duration: 150, // мс - время проигрывания анимации
				})
				sessionStorage.setItem('privacy', true);
				this.scene.scene.start('Preload');
			}
		})
	}
}

document.addEventListener('click', (e) => {
	let targetElement = e.target;
	if (targetElement.closest('.preloader__button')) {
		sessionStorage.setItem('privacy', true);
	}
})