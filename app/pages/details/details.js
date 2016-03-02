import {IonicApp, Page, Modal, Alert, NavParams, NavController} from 'ionic/ionic';
import {NewsletterData} from '../../providers/newsletter-data';

@Page({
	templateUrl: 'build/pages/details/details.html'
})
export class DetailsPage {
	constructor(app:IonicApp, nav:NavController, navParams:NavParams, newsData:NewsletterData) {
		this.newsData    = newsData;
		this.app         = app;
		this.nav         = nav;
		this.newsletters = [];

		console.log(navParams);

		this.updateNewsletter();
	}

	updateNewsletter() {
		this.newsData.getNewsletters().then(data => {
			console.log(data);

			this.newsletters = data;
		});
	}

}
