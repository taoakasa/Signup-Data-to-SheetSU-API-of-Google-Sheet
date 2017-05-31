angular.module('starter.controllers', ['ngCordova'])



.controller('TripSurveyCtrl', function($scope, EngineeringTopics, LocalStore) {  
    
  

})


.controller('EngineeringCtrl', function($scope, EngineeringTopics, LocalStore) {
  
 
    
  $scope.EngineeringTopics = EngineeringTopics.all();

})

.controller('ResearchSciencesCtrl', function($scope, researchSciencesTopics, LocalStore) {
      
  

})



.controller('EngineeringDetailCtrl', function($scope, $stateParams, EngineeringTopics) {
 

})


.controller('ResearchSciencesDetailCtrl', function($scope, $stateParams, researchSciencesTopics) {
  
})





.controller('AboutCtrl', function($scope,  LocalStore) {
  $scope.end = function(){
	  ionic.Platform.exitApp()
  }
})

.controller('IITBranchOutputCtrl', function($scope,   $ionicLoading, LocalStore, $state, GenOpenCloseRanksRanges, OBCOpenCloseRanksRanges, SCOpenCloseRanksRanges, STOpenCloseRanksRanges ) {
  $scope.end = function(){
	  $state.go('about', {}, {reload: true});
  }
})


.controller('InputexpectedscoreCtrl', function($scope, $ionicLoading, LocalStore, $state, $ionicPopup) {
	  $scope.predictRankBranch = function(){
		  $state.go('IIT Branch Output', {}, {reload: true});
	  } 
})


.controller('signupCtrl', ['$scope', 'signUpServiceNew','$state','$stateParams','LS', 'LocalStore','$ionicPopup','$ionicLoading','$cordovaGeolocation','$cordovaLocalNotification','AlertNotfs','$cordovaNetwork',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,signUpServiceNew, $state, $stateParams, LS, LocalStore, $ionicPopup, $ionicLoading, $cordovaGeolocation, $cordovaLocalNotification, AlertNotfs, $cordovaNetwork) {
		
	$scope.data = {       
        User_id: 1,
        /*name: '',*/
		city:'', 
        mobileno: '',
		email:'',
            
		/*lat:'',
		longt:'',*/
		todate:''
    };
	 $scope.submitting = false;    
      
    $scope.submit = function(){
		$ionicLoading.show();
		SignedupSts = LocalStore.getData('SignedupStatus');
					 
			/*LocalStore.setData('name', $scope.data.name);*/
			LocalStore.setData('city', $scope.data.city);
			LocalStore.setData('mobileno', $scope.data.mobileno);
			LocalStore.setData('email', $scope.data.email);
			var todate = new Date()
			$scope.data.todate = todate		
			EnterSignUpData() 			
		
	
		function EnterSignUpData(){						
				//submitting data
				
				
				var isOnline = $cordovaNetwork.isOnline()
				if(isOnline){
					$scope.submitting = true;
									
					signUpServiceNew.add($scope.data).then(function(){					
						$scope.data = {       
							User_id: 1,
							city:'',
							mobileno: '',
							email:'',
							todate:'',							
						}        
						$scope.submitting = false;
						$ionicLoading.hide();		
						LocalStore.setData('SignedupStatus',"TempSignedup");
						var alertPopup = $ionicPopup.alert({
							title: 'Thank you!',
							template: 'You have successfully signed up.'
						}); 	
						$state.go('inputexpectedscore');
					});// end  signUpServiceNew.add
				} else {//  if (isOnline)
					$ionicLoading.hide();
					alert('Please Connect to Internet for Signing up');
				} 	// end if (isOnline)
				//$state.go('tab.engineering');  
				//END submitting data	 
	}	// End EnterSignUpData(){	
   
	} // end   $scope.surveysubmit = function()
	
}])



.controller('licenseACtrl', ['$scope' ,'$state' ,'LocalStore','$cordovaNetwork','$ionicPopup', '$ionicLoading',function($scope, $state, LocalStore, $cordovaNetwork, $ionicPopup,$ionicLoading) {
		
		$scope.LicenseAccept = function(){
			$ionicLoading.show();
			SignedupSts = LocalStore.getData('SignedupStatus');
			if (SignedupSts === "TempSignedup") { //TempSignedup 
				$state.go('inputexpectedscore', {}, {reload: true});
			} else {
				LocalStore.setData('LicenseAgrStatus',"Accepted");
				var isOnline = 'onLine' in navigator && navigator.onLine;
				var CordovaisOnline = $cordovaNetwork.isOnline()
				if(isOnline){		  
					$state.go('signup', {}, {reload: true});  			
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
			} // End else if (SignedupSts === "TempSignedup") 
				$ionicLoading.hide();
		}// end $scope.LicenseAccept
		
		$scope.LicenseDecline = function(){
		//LocalStore.setData('LicenseAgrStatus',"Declined");
		ionic.Platform.exitApp();	
		} //End $scope.LicenseDecline
}]) // ENd .controller('licenseACtrl'


// the following controller is not used here
.controller('GeoCtrl', function($cordovaGeolocation) {

	var posOptions = {timeout: 100, enableHighAccuracy: false};
	$cordovaGeolocation
		.getCurrentPosition(posOptions)
		.then(function (position) {
				var lat  = position.coords.latitude
				var longt = position.coords.longitude
				}, function(err) {
						// error
								  });   // end function (position)


	var watchOptions = {
		timeout : 3000,
		enableHighAccuracy: false // may cause errors if true
		};

	var watch = $cordovaGeolocation.watchPosition(watchOptions);
		watch.then(
			null,
			function(err) {
						// error
						   }, // END function(err)
			function(position) {
				var lat  = position.coords.latitude
				var longt = position.coords.longitude
				}); // end watch.then


			watch.clearWatch();
			// OR
			$cordovaGeolocation.clearWatch(watch)
				.then(function(result) {
						// success
						}, function (error) {
								// error
						}); //END function(result)
}); // ENd .controller('GeoCtrl',


