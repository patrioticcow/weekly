import {IonicApp, Page, NavController, MenuController, Alert} from 'ionic/ionic';
import {Storage, LocalStorage, Events} from 'ionic/ionic';
import {SettingsPage} from '../settings/settings';
import {UserData} from '../../providers/user-data';

@Page({
	templateUrl: 'build/pages/facebook/facebook.html'
})
export class FacebookPage {
	constructor(nav:NavController, userData:UserData, menu:MenuController) {
		this.nav      = nav;
		this.userData = userData;
		this.menu     = menu;
		this.storage  = new Storage(LocalStorage);
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

				that.nav.push(SettingsPage);
			}
		});
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
