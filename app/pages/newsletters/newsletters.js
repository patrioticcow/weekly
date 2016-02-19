import {IonicApp, Page, Modal, Alert, NavController} from 'ionic/ionic';
import {NewsletterData} from '../../providers/newsletter-data';
import {UserData} from '../../providers/user-data';

@Page({
	templateUrl: 'build/pages/newsletters/newsletters.html'
})
export class NewslettersPage {
	constructor(app:IonicApp, nav:NavController, user:UserData, newsData:NewsletterData){
		this.newsData = newsData;
		
		this.updateNewsletter();
	}

	updateNewsletter(resp){
		console.log(resp);
	}
}
