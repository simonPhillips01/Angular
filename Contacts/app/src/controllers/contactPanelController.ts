</// <reference path="../_all.ts" />

module ContactManagerApp {

	export class ContactPanelController {
		static $inject = ['userService', '$mdbottomSheet'];

		constructor(
			private userService: IUserService,
			private $mdBottomSheet) {
			this.user = userService.seletedUser;
		}

		user: User;

		actions = [
			{ name: 'Phone'      , icon: 'phone' },
			{ name: 'Twitter'    , icon: 'twitter' },
			{ name: 'Google+'    , icon: 'google_plus' },
			{ name: 'Hangouts'   , icon: 'hangouts' }
		];

		submitContact(action): void {
			this.$mdBottomSheet.hide(action);
		}
	}
}