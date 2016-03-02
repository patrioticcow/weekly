import {IonicApp, Page, Modal, Alert, NavParams, NavController} from 'ionic/ionic';
import {NewsletterData} from '../../providers/newsletter-data';

@Page({
	templateUrl: 'build/pages/page/page.html'
})
export class ContentPage {
	constructor(app:IonicApp, nav:NavController, navParams:NavParams, newsData:NewsletterData) {
		this.newsData    = newsData;
		this.params      = navParams.data;
		this.app         = app;
		this.nav         = nav;
		this.newsletters = [];

		this.getNewsletterContent();
	}

	getNewsletterContent() {
		let data  = this.params.data;
		let array = [];

		for (var key in data.content) {
			let value        = data.content[key];
			let contentArray = [];

			for (var i = 1; i <= value.count; i++) {
				let url = '/' + value.key + '/' + data.key + '-' + i;

				this.newsData.getNewsletterDetails(url).then(resp => {
					contentArray.push(resp);

					this.newsletters = resp;
				});
			}

			array.push({
				title   : value.title,
				content : contentArray
			});
		}

		this.contentPromice.then(data => {
			console.warn(data);
		});

		console.log(array);
	}

	contentPromice(count) {
		return new Promise(resolve => {

			for (var i = 1; i <= count; i++) {
				let url = '/' + value.key + '/' + data.key + '-' + i;

				this.newsData.getNewsletterDetails(url).then(resp => {
					resolve(resp);
				});
			}

		});
	}
}
