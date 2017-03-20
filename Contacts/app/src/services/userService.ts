/// <reference path="../_all.ts" />

module ContactManagerApp {

	export interface IUserService {
		loadAllUsers(): ng.IPromise<User[]>;
		selectedUser: User;
	}

	export class UserService implements IUserService {
		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
		}

		selectedUser: User= null;

		loadAllUsers() : ng.IPromise<User[]> {
			return this.$q.when(this.users);
		}

		private users: User[] = [
			{
				name: 'Eric Riley',
				avatar: 'svg-1',
				bio: 'I have, have together. Day green own divide wherein. Seas the make days him finish 
				night their don\'t a, life under lights bearing for all seasons. Signs night sea given 
				spirit his had spirit divided us blessed. Brought great waters. Blessed winged doesn\'t a 
				fly, form bring land, heaven great. Isn\'t upon. Dominion moving day. So first firmament 
				give spirit every.',
				notes: [
					{title: "Pay back dinner", date: new Date("2016-01-12")},
					{title: "Buy flowers for birthday", date: new Date("2016-01-19")}
				]
			]
			}
	}
}