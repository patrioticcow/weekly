import {IonicApp, Page, Modal, Alert, NavParams, NavController} from 'ionic-angular';
import {NewsletterData} from '../../providers/newsletter-data';
import {NewsletterContentPage} from '../newsletter-content/newsletter-content';

@Page({
	templateUrl: 'build/pages/newsletter-list/newsletter-list.html'
})
export class NewsletterListPage {
	static get parameters(){
		return [[IonicApp], [NavController], [NavParams], [NewsletterData]];
	}
	constructor(app, nav, navParams, newsData) {
		this.newsData    = newsData;
		this.params      = navParams.data;
		this.app         = app;
		this.nav         = nav;
		this.newsletters = [];
	}

	onPageDidEnter () {
		this.getSubNewsletter();
	}

	getSubNewsletter() {
		this.newsData.getSubNewsletter(this.params.key).then(data => {
			console.log(data);

			this.newsletters = data;
		});
	}

	goToNewsletterContent(data) {
		this.nav.push(NewsletterContentPage, {data: data});
	}

}
