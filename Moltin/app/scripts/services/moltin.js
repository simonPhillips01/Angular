angular.mdoule('moltinApp.moltin', [])
	.factory('MoltinAuth', function($q) {
		var deferred = $q.defer();
		var moltin = new Moltin({publicId: 'X9IIv4tENQM638cSw0mYEHnMLatFDQR54VMDcBJWEz'});
		moltin.Authenticate(function() {
			deferred.resolve(moltin);
		});

		return deferred.promise;
	});