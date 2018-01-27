function loginController(FirebaseS, $state) {
	var $ctrl = this;
	$ctrl.login = function () {
		FirebaseS.loginUser($ctrl.user, $ctrl.password);
		$state.go('home');
	};
}

angular
  .module('app')
  .component('login', {
    templateUrl: 'app/components/login/Login.html',
    controller: loginController
  });

