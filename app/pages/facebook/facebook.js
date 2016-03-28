import {IonicApp, Page, NavController, MenuController, Alert, NavParams} from 'ionic-angular';
import {Storage, LocalStorage, Events} from 'ionic-angular';
import {NewsletterData} from '../../providers/newsletter-data';
import {SettingsPage} from '../settings/settings';
import {UserData} from '../../providers/user-data';

@Page({
	templateUrl: 'build/pages/facebook/facebook.html'
})
export class FacebookPage {
	static get parameters() {
		return [[NavController], [UserData], [MenuController], [NewsletterData], [NavParams]];
	}

	constructor(nav, userData, menu, newsData, navParams) {
		this.nav      = nav;
		this.userData = userData;
		this.newsData = newsData;
		this.params   = navParams.data;
		this.menu     = menu;
		this.user_id  = null;
		this.storage  = new Storage(LocalStorage);

		this.storage.remove('first_name');
		this.storage.remove('last_name');
		this.storage.remove('email');
		this.storage.remove('user_id');
	}

	doLogin() {
		var that = this;
		var ref  = this.userData.firebaseRef();
		ref.authWithOAuthPopup("facebook", function (error, authData) {
			if (error) {
				console.log("Login Failed!", error);
				let alert = Alert.create({
					title   : 'Login Failed',
					subTitle: 'Please make sure you are connected to the internet and fallowed the instructions properly',
					buttons : ['Ok']
				});
				that.nav.present(alert);
			} else {
				var data = authData.facebook.cachedUserProfile;
				ref.child("users").child(data.id).set(data);
				ref.child("users").on('child_added', function (snapshot) {
					var user = snapshot.val();
					console.log(user);

					that.storage.set('first_name', user.first_name);
					that.storage.set('last_name', user.last_name);
					that.storage.set('email', user.email);
					that.storage.set('user_id', user.id);
					that.userData.setLoggedIn();
				});

				that.user_id = data.id;

				that.newsData.getNewsletters(data.id).then(data => {
					console.log(data);
					that.setDefault(data);
					that.nav.push(SettingsPage, {user_id: that.user_id});
				});

			}
		});
	}

	setDefault(data) {
		for (var i = 0; i < data.length; i++) {
			let url  = '/newsletters/' + data[i].key + '/' + this.user_id;
			var that = this;

			(function (url) {
				that.newsData.getUserDefaultNewsletters(url).then(data => {
					if (!data) that.newsData.setUserDefaultNewsletters(url, {checked: false});
				});
			})(url);
		}
	}

	onPageDidEnter() {
		// the left menu should be disabled on the tutorial page
		this.menu.enable(false);
		this.menu.swipeEnable(false);
	}

	onPageDidLeave() {
		// enable the left menu when leaving the tutorial page
		this.menu.enable(true);
		this.menu.swipeEnable(true);
	}

}
