import {IonicApp, Page, Modal, Alert, NavParams, NavController} from 'ionic/ionic';
import {NewsletterData} from '../../providers/newsletter-data';

@Page({
	templateUrl: 'build/pages/newsletter-single/newsletter-single.html'
})
export class NewsletterSinglePage {
	constructor(app:IonicApp, nav:NavController, navParams:NavParams, newsData:NewsletterData) {
		this.searchQuery = '';
		this.newsData    = newsData;
		this.params      = navParams.data;
		this.app         = app;
		this.nav         = nav;
		this.content     = [];

		console.log(this.params.url);

		this.getFavoritesContent();
	}

	getFavoritesContent() {
		this.newsData.getNewsletterSingle(this.params.url, false).then(data => {
			console.log(data);
			data.class = data.favorite ? 'button-clear-danger' : '';

			this.content = data;
		});
	}

	addAsFavorite() {
		let url     = this.params.url;
		let fav     = false;

		if (this.content.favorite === undefined) fav = true;
		if (this.content.favorite === false) fav = true;

		this.content.favorite = fav;
		this.content.class    = fav ? 'button-clear-danger' : '';

		this.newsData.addAsFavorite(url, this.content.title, fav);
	}
}
