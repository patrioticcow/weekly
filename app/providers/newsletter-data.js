import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UserData} from './user-data';

@Injectable()
export class NewsletterData {
	constructor(http:Http, user:UserData) {
		this.http = http;
		this.user = user;

		this.fbNewsletters = user.firebaseRef('/newsletters');
	}

	load() {
		if (this.data) {
			// already loaded data
			return Promise.resolve(this.data);
		}

		return new Promise(resolve => {
			this.fbNewsletters.on('value', function(resp){
				this.data = resp.val();

				resolve(this.data);
			});
		});
	}

	getNewsletters() {
		return this.load().then(data => {
			let array = Object.keys(data).map(key => data[key]);
			
			return array;
		});
	}

}
