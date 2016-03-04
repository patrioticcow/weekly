import {IonicApp, Page, Modal, Alert, NavParams, NavController} from 'ionic/ionic';
import {NewsletterData} from '../../providers/newsletter-data';

@Page({
	templateUrl: 'build/pages/content/content.html'
})
export class ContentPage {
	constructor(app:IonicApp, nav:NavController, navParams:NavParams, newsData:NewsletterData) {
		this.searchQuery = '';
		this.newsData    = newsData;
		this.params      = navParams.data;
		this.app         = app;
		this.nav         = nav;
		this.content     = [];

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
					if(resp.favorite) resp.class = 'button-clear-danger';

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

		let url = '/' + article.name + '/' + article.key + '-' + content.id;
		let fav = content.favorite === undefined;

		if(fav) content.class = 'button-clear-danger';

		console.log(fav);
		console.log(content);

		this.newsData.addAsFavorite(url, content.title, fav);
	}

	goToLink(url) {
		window.open(encodeURI(url), '_system');
	}

	getItems(searchbar) {
		return false;
	}
}
