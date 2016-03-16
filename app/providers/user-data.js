import {Injectable} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';

@Injectable()
export class UserData {
	static get parameters() {
		return [[Events]];
	}
	constructor(events) {
		this._favorites    = [];
		this.storage       = new Storage(LocalStorage);
		this.events        = events;
		this.HAS_LOGGED_IN = 'hasLoggedIn';
		this.USER_ID       = 'user_id';
		this.username      = '';
		this.password      = '';
		this.firebaseUrl   = "https://weeklynewsletter.firebaseio.com";
		this.authHandler   = '';
	}

	hasFavorite(sessionName) {
		return (this._favorites.indexOf(sessionName) > -1);
	}

	addFavorite(sessionName) {
		this._favorites.push(sessionName);
	}

	removeFavorite(sessionName) {
		let index = this._favorites.indexOf(sessionName);
		if (index > -1) {
			this._favorites.splice(index, 1);
		}
	}

	login(username, password) {
		console.log('user-data login here');
		this.storage.set(this.HAS_LOGGED_IN, true);
		this.storage.set(this.username, username);
		this.storage.set(this.password, password);
		this.events.publish('user:login');
	}

	signup(username, password) {
		this.storage.set(this.HAS_LOGGED_IN, true);
		this.events.publish('user:signup');
	}

	logout() {
		this.storage.remove(this.HAS_LOGGED_IN);
		this.events.publish('user:logout');
	}

	// return a promise
	setLoggedIn() {
		this.storage.set(this.HAS_LOGGED_IN, true);
	}

	// return a promise
	hasLoggedIn() {
		return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
			return value;
		});
	}

	getUserId() {
		return this.storage.get(this.USER_ID).then((value) => {
			return value;
		});
	}

	// Firebase
	firebaseRef(url = '') {
		return new Firebase(this.firebaseUrl + url);
	}

}