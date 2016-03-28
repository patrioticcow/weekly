import {App, IonicApp, Events, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ConferenceData} from './providers/conference-data';
import {NewsletterData} from './providers/newsletter-data';
import {UserData} from './providers/user-data';
import {FacebookPage} from './pages/facebook/facebook';
import {NewslettersPage} from './pages/newsletters/newsletters';
import {FavoritesPage} from './pages/favorites/favorites';
import {SettingsPage} from './pages/settings/settings';
import {TutorialPage} from './pages/tutorial/tutorial';

@App({
	templateUrl: 'build/app.html',
	providers  : [ConferenceData, NewsletterData, UserData],
	config     : {}
})

class ConferenceApp {
	static get parameters() {
		return [
			[IonicApp], [Events], [NewsletterData], [ConferenceData], [UserData], [Platform]
		]
	}

	constructor(app, events, newsData, confData, userData, platform) {
		this.app      = app;
		this.userData = userData;
		this.events   = events;

		// load the conference data
		confData.load();
		newsData.load();

		this.root = TutorialPage;

		// create an list of pages that can be navigated to from the left menu
		// the left menu only works after login
		// the login page disables the left menu
		this.pages = [
			{title: 'Newsletters', component: NewslettersPage, icon: 'book', hide: false},
			{title: 'Favorites', component: FavoritesPage, icon: 'bookmarks', hide: false},
			{title: 'Settings', component: SettingsPage, icon: 'settings', hide: false},
			{title: 'Signup', component: FacebookPage, icon: 'person-add', hide: true}
		];

		// decide which menu items should be hidden by current login status stored in local storage
		this.userData.hasLoggedIn().then((hasLoggedIn) => {
			this.updateSideMenuItems(hasLoggedIn);

			this.root = hasLoggedIn ? NewslettersPage : FacebookPage;
		});

		this.listenToLoginEvents();
	}

	openPage(page) {
		if (page.title === 'Logout') {
			this.userData.logout();
		}

		// find the nav component and set what the root page should be
		// reset the nav to remove previous pages and only have this page
		// we wouldn't want the back button to show in this scenario
		let nav = this.app.getComponent('nav');
		nav.setRoot(page.component);
	}

	listenToLoginEvents() {
		this.events.subscribe('user:login', () => {
			this.updateSideMenuItems(true);
		});

		this.events.subscribe('user:signup', () => {
			this.updateSideMenuItems(true);
		});

		this.events.subscribe('user:logout', () => {
			this.updateSideMenuItems(false);
		});
	}

	updateSideMenuItems(hasLoggedIn) {
		if (hasLoggedIn) {
			this.findMenuItemByTitle('Signup').hide = true;
		} else {
			this.findMenuItemByTitle('Signup').hide = false;
		}
	}

	findMenuItemByTitle(title) {
		return this.pages.find((menuItem) => {
			return menuItem.title === title
		})
	}
}
