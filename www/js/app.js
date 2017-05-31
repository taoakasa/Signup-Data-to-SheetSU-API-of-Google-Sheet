// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','gesture-pdf', 'starter.services',  'ngCordova'])

/*.run(function($ionicPlatform, $ionicPopup, $cordovaNetwork, $rootScope, $state, LS, LocalStore) {*/
.run(function($ionicPlatform, signUpServiceNew,$ionicPopup,$cordovaNetwork,   $state, LocalStore, $cordovaGeolocation, $ionicLoading, $cordovaLocalNotification, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }	
		
	LicenseAgrS = LocalStore.getData('LicenseAgrStatus');
	if (LicenseAgrS !== "Accepted"){
			$state.go('licenseAPage', {}, {reload: true}); 			
	}else{
		// START    START    START     if already signedup go to Compendium page
		SignedupSts = LocalStore.getData('SignedupStatus');
		//if (SignedupSts === "TempSignedup") { //AlreadySignedup			 
			//$state.go('inputexpectedscore', {}, {reload: true});   
			
		//}else{
			//var isOnline = 'onLine' in navigator && navigator.onLine;
			var isOnline = $cordovaNetwork.isOnline()
			if(isOnline){		  
				$state.go('signup', {}, {reload: true});  		
				//$state.go('odRoute', {}, {reload: true});  	
			}else{
				var alertPopup = $ionicPopup.alert({
						title: 'You are not connected to internet',  
						subTitle: 'Please connnect to internet to sign up',  
						 //<!--scope: $scope,-->
					buttons: [
					{
						text: '<b>Ok</b>',
						type: 'button-positive',
						onTap: function(e) {ionic.Platform.exitApp()}
					}// end buttons
					]// end ok button
				});	// end alertPopup					
			} // end Else if (isOnline)		
		//}// end else if (SignedupSts
		
	} //end if LicenseAgr		
  });
  })
  


.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  
  /*
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
*/
  // Each tab has its own nav history stack:

 
  .state('tab.engineering', {
      url: '/engineering',
      views: {
        'tab-engineering': {
          templateUrl: 'templates/tab-engineering.html',
          controller: 'EngineeringCtrl'
        }
      }
    })
  .state('tab.researchSciences', {
      url: '/researchSciences',
      views: {
        'tab-researchSciences': {
          templateUrl: 'templates/tab-researchSciences.html',
          controller: 'ResearchSciencesCtrl'
        }
      }
    })
	 
	
	.state('odRoute', {
    url: '/odRoute',	
	templateUrl: 'templates/odRoute.html',
	controller: 'ODRouteCtrl'		  
	})
	
	/*
	.state('tripsurvey', {
      url: '/tripsurvey',      
	  templateUrl: 'templates/tripsurvey.html',
	  controller: 'TripSurveyCtrl'        
    })
*/	
	.state('about', {
    url: '/about',	
	templateUrl: 'templates/about.html',
	controller: 'AboutCtrl'		  
	})
		
		.state('IIT Branch Output', {
    url: '/IIT Branch Output',	
	templateUrl: 'templates/IIT Branch Output.html',
	controller: 'IITBranchOutputCtrl'		  
	})
	
	.state('inputexpectedscore', {
    url: '/inputexpectedscore',	
	templateUrl: 'templates/inputexpectedscore.html',
	controller: 'InputexpectedscoreCtrl'		  
	})

	
	.state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })
 
    .state('tab.researchSciences-detail', {
      url: '/researchSciences/:topicId',
      views: {
        'tab-researchSciences': {
          templateUrl: 'templates/researchSciences-detail.html',
          controller: 'ResearchSciencesDetailCtrl'
        }
      }
    })
	
.state('tab.engineering-detail', {
      url: '/engineering/:topicId',
      views: {
        'tab-engineering': {
          templateUrl: 'templates/engineering-detail.html',
          controller: 'EngineeringDetailCtrl'
        }
      }
    })
	
	
  
  /*
  
   .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })  
  
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  */
  
  

 

  .state('licenseAPage', {
    url: '/licenseAPage',
    templateUrl: 'templates/licenseAPage.html',
    controller: 'licenseACtrl'
  });
  // if none of the above states are matched, use this as the fallback

 /*LS.setData(1);*/
   /*console.log($localstorage.get(1));*/
   /*
   if (true) {
         $urlRouterProvider.otherwise('/tab/chats');
        
  }
  else {
         $urlRouterProvider.otherwise('/tab/dash');
    }
*/
   
  
	
 /* $urlRouterProvider.otherwise('signup');*/
/*$urlRouterProvider.otherwise('/tab.researchSciences');*/
});
