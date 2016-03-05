import {IonicApp, Page, Modal, Alert, NavParams, NavController} from 'ionic/ionic';
import {NewsletterData} from '../../providers/newsletter-data';
import {UserData} from '../../providers/user-data';

@Page({
	templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {
	constructor(app:IonicApp, nav:NavController, userData:UserData, navParams:NavParams, newsData:NewsletterData) {
		this.newsData    = newsData;
		this.userData    = userData;
		this.params      = navParams.data;
		this.app         = app;
		this.nav         = nav;
		this.newsletters = [];

		this.userData.getUserId().then((user_id) => {
			this.user_id = user_id;

			this.getNewsletters();
		});
	}

	getNewsletters() {
		this.newsData.getSettingsNewsletters().then(data => {
			this.newsletters = data;
		});
	}

	onChange(i, checked) {
		this.newsletters[i][this.user_id].checked = !checked;

		let url  = '/newsletters/' + this.newsletters[i].key + '/' + this.user_id;
		this.newsData.setUserDefaultNewsletters(url, {checked: !checked});
	}
}
