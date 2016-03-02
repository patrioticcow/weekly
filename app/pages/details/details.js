import {IonicApp, Page, Modal, Alert, NavParams, NavController} from 'ionic/ionic';
import {NewsletterData} from '../../providers/newsletter-data';
import {ContentPage} from '../content/content';

@Page({
	templateUrl: 'build/pages/details/details.html'
})
export class DetailsPage {
	constructor(app:IonicApp, nav:NavController, navParams:NavParams, newsData:NewsletterData) {
		this.newsData    = newsData;
		this.params      = navParams.data;
		this.app         = app;
		this.nav         = nav;
		this.newsletters = [];

		this.getSubNewsletter();
	}

	getSubNewsletter() {
		this.newsData.getSubNewsletter(this.params.key).then(data => {
			console.log(data);

			this.newsletters = data;
		});
	}

	goToNewsletterContent(data) {
		this.nav.push(ContentPage, {data: data});
	}

}
