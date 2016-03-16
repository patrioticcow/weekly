import {IonicApp, Page, Modal, Alert, NavParams, NavController} from 'ionic-angular';
import {NewsletterData} from '../../providers/newsletter-data';
import {NewsletterSinglePage} from '../newsletter-single/newsletter-single';
import {NewslettersPage} from '../newsletters/newsletters';

@Page({
	templateUrl: 'build/pages/favorites/favorites.html'
})
export class FavoritesPage {
	static get parameters(){
		return [[IonicApp], [NavController], [NavParams], [NewsletterData]];
	}
	constructor(app, nav, navParams, newsData) {
		this.searchQuery = '';
		this.newsData    = newsData;
		this.params      = navParams.data;
		this.app         = app;
		this.nav         = nav;
		this.content     = [];
		this.segment     = 'favorites';

		this.getFavoritesContent();
	}

	getFavoritesContent() {
		this.newsData.getFavorites().then(data => {
			console.log(data);
			this.content = data;
		});
	}

	viewNewsletterContent(url) {
		this.nav.push(NewsletterSinglePage, {url: url});
		console.log(url);
	}

	updateNewsletter() {
		console.log(this.segment);
		if (this.segment === 'newsletters') this.nav.push(NewslettersPage);
	}
}
