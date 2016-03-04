import {IonicApp, Page, Modal, Alert, NavController} from 'ionic/ionic';
import {NewsletterData} from '../../providers/newsletter-data';
import {NewsletterListPage} from '../newsletter-list/newsletter-list';
import {FavoritesPage} from '../../pages/favorites/favorites';

@Page({
	templateUrl: 'build/pages/newsletters/newsletters.html'
})
export class NewslettersPage {
	constructor(app:IonicApp, nav:NavController, newsData:NewsletterData) {
		this.newsData    = newsData;
		this.app         = app;
		this.nav         = nav;
		this.newsletters = [];
		this.segment       = 'newsletters';

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
		this.nav.push(NewsletterListPage, {key: key});
	}

	updateNewsletter() {
		console.log(this.segment);
		if(this.segment === 'favorites') this.nav.push(FavoritesPage);
	}
}
