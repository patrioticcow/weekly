import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UserData} from './user-data';

@Injectable()
export class NewsletterData {
	static get parameters(){
		return [[Http], [UserData]];
	}
	constructor(http, user) {
		this.http     = http;
		this.user     = user;
		this.useArray = true;
	}

	setFirebaseRef(url = '/newsletters') {
		this.fbNewsletters = this.user.firebaseRef(url);
	}

	load() {
		return new Promise(resolve => {
			this.fbNewsletters.on('value', function (resp) {
				resolve(resp.val());
			});
		});
	}

	getNewsletters(user_id) {
		this.setFirebaseRef();

		return this.load().then(data => {
			let array = Object.keys(data).map(key => data[key]);

			return array.filter(data => {
				if (data[user_id].checked === true) return data;
			});
		});
	}

	getSettingsNewsletters() {
		this.setFirebaseRef();

		return this.load().then(data => {
			let array = Object.keys(data).map(key => data[key]);

			return array;
		});
	}

	getUserDefaultNewsletters(url) {
		this.setFirebaseRef(url);

		return this.load().then(data => {
			if (!data) return null;
			//let array = Object.keys(data).map(key => data[key]);
			//return array;
			return data;
		});
	}

	setUserDefaultNewsletters(url, data) {
		this.setFirebaseRef(url);

		this.fbNewsletters.update(data);
	}

	getSubNewsletter(key) {
		this.setFirebaseRef('/' + key + '-newsletter');

		return this.load().then(data => {
			let array = Object.keys(data).map(key => data[key]);

			return array;
		});
	}

	getNewsletterDetails(url, array = true) {
		this.useArray = array;

		this.setFirebaseRef(url);

		return this.load().then(data => {
			let array = Object.keys(data).map(key => data[key]);

			return this.useArray ? array : data;
		});
	}

	getNewsletterSingle(url, array = true) {
		this.useArray = array;

		this.setFirebaseRef(url);

		return this.load().then(data => {
			let array = Object.keys(data).map(key => data[key]);

			return this.useArray ? array : data;
		});
	}

	getColorCode(key) {
		if (key === "php-articles") return '#323232';
	}

	ucfirst(str) {
		str += '';
		var f = str.charAt(0).toUpperCase();

		return f + str.substr(1);
	}

	getFavorites() {
		this.setFirebaseRef('/favorites');

		return this.load().then(data => {
			var arr = [];
			for (var key in data) {
				let title = key.split('-');
				let name  = '';
				for (var i = 0; i < title.length; i++) {
					name += this.ucfirst(title[i]) + ' ';
				}

				let array = Object.keys(data[key]).map(k => data[key][k]);

				arr.push({
					key    : key,
					name   : name.trim(),
					content: array
				});
			}

			return arr;
		});
	}

	addAsFavorite(url, title, fav) {
		// set favorite
		this.setFirebaseRef(url);
		this.fbNewsletters.update({favorite: fav});

		// update favorite table
		this.setFirebaseRef('/favorites' + url);

		if (fav) {
			this.fbNewsletters.update({url: url, title: title});
		} else {
			this.fbNewsletters.remove();
		}
	}

}
