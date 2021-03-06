import {IonicApp, Page, Modal, Alert, NavController} from 'ionic-angular';
import {NewsletterData} from '../../providers/newsletter-data';
import {UserData} from '../../providers/user-data';
import {NewsletterListPage} from '../newsletter-list/newsletter-list';
import {FavoritesPage} from '../../pages/favorites/favorites';

@Page({
	templateUrl: 'build/pages/newsletters/newsletters.html'
})
export class NewslettersPage {
	static get parameters(){
		return [[IonicApp], [NavController], [UserData], [NewsletterData]];
	}
	constructor(app, nav, userData, newsData) {
		this.userData    = userData;
		this.newsData    = newsData;
		this.app         = app;
		this.nav         = nav;
		this.newsletters = [];
		this.segment     = 'newsletters';
		this.user_id     = null;
	}

	onPageDidEnter () {
		this.userData.getUserId().then((user_id) => {
			this.user_id = user_id;

			this.getNewsletters();
		});
	}

	getNewsletters() {
		this.newsData.getNewsletters(this.user_id).then(data => {
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
		if (this.segment === 'favorites') this.nav.push(FavoritesPage);
	}
}
