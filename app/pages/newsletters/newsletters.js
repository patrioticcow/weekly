import {IonicApp, Page, Modal, Alert, NavController} from 'ionic/ionic';
import {NewsletterData} from '../../providers/newsletter-data';
import {DetailsPage} from '../details/details';

@Page({
	templateUrl: 'build/pages/newsletters/newsletters.html'
})
export class NewslettersPage {
	constructor(app:IonicApp, nav:NavController, newsData:NewsletterData) {
		this.newsData    = newsData;
		this.app         = app;
		this.nav         = nav;
		this.newsletters = [];

		this.getNewsletters();
	}

	getNewsletters() {
		this.newsData.getNewsletters().then(data => {
			console.log(data);

			this.newsletters = data;
		});
	}

	viewNewsletters(key) {
		console.log(key);
		this.nav.push(DetailsPage, {key: key});
	}
}
