import {IonicApp, Platform, Page, Modal, Alert, NavParams, NavController} from 'ionic-angular';
import {NewsletterData} from '../../providers/newsletter-data';

@Page({
	templateUrl: 'build/pages/newsletter-content/newsletter-content.html'
})
export class NewsletterContentPage {
	static get parameters() {
		return [[IonicApp], [Platform], [NavController], [NavParams], [NewsletterData]];
	}

	constructor(app, platform, nav, navParams, newsData) {
		this.searchQuery = '';
		this.platform    = platform;
		this.newsData    = newsData;
		this.params      = navParams.data;
		this.app         = app;
		this.nav         = nav;
		this.showAll     = true;
		this.content     = [];
	}

	onPageDidEnter() {
		this.getNewsletterContent();
	}

	showFilterContent() {
		this.nav.present(this.initiateAlert());
	}

	initiateAlert() {
		let alert = Alert.create();
		alert.setTitle('Show only..');
		alert.addInput({type: 'radio', label: 'Show all', value: true, checked: false});
		alert.addButton('Cancel');
		alert.addButton({
			text   : 'Ok',
			handler: data => {
				if (data !== undefined) {
					this.showAll = data;
					this.filterContent();
				}
			}
		});

		if (this.content) {
			for (let i in this.content) {
				alert.addInput({type: 'radio', label: this.content[i].title, value: this.content[i].name, checked: false});
			}
		}

		return alert;
	}

	filterContent() {
		if (this.content) {
			for (let i in this.content) {
				if (this.showAll !== true && this.showAll !== this.content[i].name) this.content[i].visible = false;
			}
		}

		console.log(this.showAll);
		console.log(this.showAll === true);
		console.log(this.content);
	}

	getNewsletterContent() {
		let data = this.params.data;

		for (var name in data.content) {
			let value = data.content[name];

			this.contentPromice(value, data, value.count, name).then(response => {
				if (this.showAll !== true) {
					if (this.showAll === response.name) this.content = [response];
				} else {
					this.content.push(response);
				}
			});
		}
	}

	contentPromice(value, data, count, name) {
		return new Promise(resolve => {
			let arr = [];
			for (var i = 1; i <= count; i++) {
				let url = '/' + value.key + '/' + data.key + '-' + i;
				this.newsData.getNewsletterDetails(url, false).then(resp => {
					resp.class = resp.favorite ? 'button-clear-danger' : '';

					arr.push(resp);

					resolve({
						name   : name,
						key    : data.key,
						title  : value.title,
						content: arr,
						visible: true
					});
				});
			}
		});
	}

	addAsFavorite(i, j) {
		let article = this.content[i];
		let content = article.content[j];
		let url     = '/' + article.name + '/' + article.key + '-' + content.id;
		let fav     = false;

		if (content.favorite === undefined) fav = true;
		if (content.favorite === false) fav = true;

		this.content[i].content[j].favorite = fav;
		this.content[i].content[j].class    = fav ? 'button-clear-danger' : '';

		this.newsData.addAsFavorite(url, content.title, fav);
	}

	goToLink(url) {
		window.open(encodeURI(url), '_system');
	}

	getItems(searchbar) {
		return false;
	}
}
