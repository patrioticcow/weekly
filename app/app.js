import {App, IonicApp, Platform} from 'ionic/ionic';
import {FirebaseService} from 'firebase-angular2/core';
import {HomePage} from './pages/home/home';
import {ListPage} from './pages/list/list';
import {SettingsPage} from './pages/settings/settings';

@App({
	templateUrl: 'build/app.html',
	config     : {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
	constructor(app:IonicApp, platform:Platform) {

		// set up our app
		this.app      = app;
		this.platform = platform;
		this.initializeApp();

		// set our app's pages
		this.pages = [
			{title: 'Home', component: HomePage},
			{title: 'My First List', component: ListPage},
			{title: 'Settings', component: SettingsPage}
		];

		// make HomePage the root (or first) page
		this.rootPage = HomePage;
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// The platform is now ready. Note: if this callback fails to fire, follow
			// the Troubleshooting guide for a number of possible solutions:
			//
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			//
			// First, let's hide the keyboard accessory bar (only works natively) since
			// that's a better default:
			//
			//
			// For example, we might change the StatusBar color. This one below is
			// good for light backgrounds and dark text;
			if (window.StatusBar) {
				window.StatusBar.styleDefault();
			}
		});
	}

	openPage(page) {
		// close the menu when clicking a link from the menu
		this.app.getComponent('leftMenu').close();
		// navigate to the new page if it is not the current page
		let nav = this.app.getComponent('nav');
		nav.setRoot(page.component);
	}
}
