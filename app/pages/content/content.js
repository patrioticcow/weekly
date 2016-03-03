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

		for (var key in data.content) {
			let value = data.content[key];

			this.contentPromice(value, data, value.count).then(response => {
				this.content.push(response);

				console.log(response);
			});

		}
	}

	contentPromice(value, data, count) {
		return new Promise(resolve => {
			let arr = [];
			for (var i = 1; i <= count; i++) {
				let url = '/' + value.key + '/' + data.key + '-' + i;
				this.newsData.getNewsletterDetails(url, false).then(resp => {
					arr.push(resp);

					resolve({
						title  : value.title,
						content: arr
					});
				});
			}
		});
	}

	getItems(searchbar) {
		// Reset items back to all of the items
		//this.getNewsletterContent();

		// set q to the value of the searchbar
		var q = searchbar.value;

		// if the value is an empty string don't filter the items
		if (q.trim() == '') return;

		this.content = this.content.filter((v) => {
			if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
				return true;
			}
			return false;
		})
	}
}
