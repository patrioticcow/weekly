import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UserData} from './user-data';

@Injectable()
export class NewsletterData {
	constructor(http:Http, user:UserData) {
		this.http     = http;
		this.user     = user;
		this.useArray = true;
	}

	setFirebaseRef(url = '/newsletters') {
		this.fbNewsletters = this.user.firebaseRef(url);
	}

	load() {
		if (this.data) {
			// already loaded data
			return Promise.resolve(this.data);
		}

		return new Promise(resolve => {
			this.fbNewsletters.on('value', function (resp) {
				this.data = resp.val();

				resolve(this.data);
			});
		});
	}

	getNewsletters() {
		this.setFirebaseRef();

		return this.load().then(data => {
			let array = Object.keys(data).map(key => data[key]);

			return array;
		});
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

}
