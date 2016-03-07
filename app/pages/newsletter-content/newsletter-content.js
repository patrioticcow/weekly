import {IonicApp, Platform, Page, Modal, Alert, NavParams, NavController} from 'ionic/ionic';
import {NewsletterData} from '../../providers/newsletter-data';

@Page({
	templateUrl: 'build/pages/newsletter-content/newsletter-content.html'
})
export class NewsletterContentPage {
	constructor(app:IonicApp, platform: Platform, nav:NavController, navParams:NavParams, newsData:NewsletterData) {
		this.searchQuery = '';
		this.platform    = platform;
		this.newsData    = newsData;
		this.params      = navParams.data;
		this.app         = app;
		this.nav         = nav;
		this.content     = [];
	}

	onPageDidEnter () {
		this.getNewsletterContent();
	}

	getNewsletterContent() {
		let data = this.params.data;

		for (var name in data.content) {
			let value = data.content[name];

			this.contentPromice(value, data, value.count, name).then(response => {
				this.content.push(response);

				console.log(response);
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
						content: arr
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
