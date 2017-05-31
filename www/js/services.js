angular.module('starter.services', [])

.service('signUpServiceNew', ['$q', '$http', function($q, $http) {
    var api_url = 'https://sheetsu.com/apis/v1.0/38949d3b49bf' //tanveer.oakasa@gmail.com     |||| https://docs.google.com/spreadsheets/d/1ng_2Ogtlk5eYPvXyoprqgZR0rmK1KrkwAeG0obsqh2Y/edit#gid=0
	 
	var currentID = 1; 
    var ret = {
        all: function() {
			 var deferred = $q.defer(); //New
            //return $http.get(api_url).then(function(resp) {
			$http.get(api_url).then(function(resp) { //New
				if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].User_id);				
                //return resp.data;
				deferred.resolve(resp.data); //New
            });
		 return deferred.promise;// New
        },
        add: function(data) {
			 var deferred = $q.defer();
			currentID++;
				data.User_id = currentID;
            //return $http.post(api_url, data).then(function(resp) {
				$http.post(api_url, data).then(function(resp) {// New
               // return resp.data;
			    deferred.resolve(resp.data); //New
            });
			return deferred.promise;//New
        },
        getFeedbacksByEventId: function(params) {
            var actual_params = [];
            for (var k in params) {
                if (params[k]) {
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?' + actual_params.join('&');
            return $http.get(api_url + '/search/' + actual_params).then(function(resp) {
                return resp.data;
            }, function(resp) {
                return {};
            });
        }
    };
	 ret.all();
    return ret;

}])
  
  .service('SurveyServiceNew', ['$q', '$http', function($q, $http) {
   

}])



.factory('EngineeringTopics', function() {
  
})


.factory('researchSciencesTopics', function() {
  
})

.factory('MathsTopics', function() {
  
})






  /* the following code from https://www.undefinednull.com/2014/02/25/angularjs-real-time-model-persistence-using-local-storage/*/
  .factory('LS', function($window, $rootScope) {
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('my-storage', val);
      return this;
    },
    getData: function() {
      return $window.localStorage && $window.localStorage.getItem('my-storage');
    }
  };
})

 .factory('LocalStore', function($window, $rootScope) {
  return {
    setData: function(keyy, val) {
      $window.localStorage && $window.localStorage.setItem(keyy, val);
      return this;
    },
    getData: function(keyy) {
      return $window.localStorage && $window.localStorage.getItem(keyy);
    }
  };
})

.service('signUpServiceOLD', ['$q', '$http', function($q, $http) {  
}])



.factory('GenOpenCloseRanksRanges', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var GenOpenCloseRanksRanges = [{
			id: 0,
		name: 'Gen',
		UnivName: 'IIT Bombay',
		Program: 'Computer Science and Engineering (4 Years, Bachelor of Technology)',
		UnivRank: 1,
		OpenRank: 1,
		CloseRank: 60,
		

  }];

  return {
    all: function() {
      return GenOpenCloseRanksRanges;
    },
    remove: function(GenOpenCloseRanksRange) {
      GenOpenCloseRanksRanges.splice(GenOpenCloseRanksRanges.indexOf(GenOpenCloseRanksRange), 1);
    },
    get: function(GenOpenCloseRanksRangeId) {
      for (var i = 0; i < GenOpenCloseRanksRanges.length; i++) {
        if (GenOpenCloseRanksRanges[i].id === parseInt(GenOpenCloseRanksRangeId)) {
          return GenOpenCloseRanksRanges[i];
        }
      }
      return null;
    }
  };
})  
  
  
.factory('OBCOpenCloseRanksRanges', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var OBCOpenCloseRanksRanges = [{
			id: 0,
		name: 'OBC',
		UnivName: 'IIT Bombay',
		Program: 'Computer Science and Engineering (4 Years, Bachelor of Technology)',
		UnivRank: 1,
		OpenRank: 1,
		CloseRank: 60,
		

  }];

  return {
    all: function() {
      return STOpenCloseRanksRanges;
    },
    remove: function(OBCOpenCloseRanksRange) {
      OBCOpenCloseRanksRanges.splice(OBCOpenCloseRanksRanges.indexOf(OBCOpenCloseRanksRange), 1);
    },
    get: function(OBCOpenCloseRanksRangeId) {
      for (var i = 0; i < OBCOpenCloseRanksRanges.length; i++) {
        if (OBCOpenCloseRanksRanges[i].id === parseInt(OBCOpenCloseRanksRangeId)) {
          return OBCOpenCloseRanksRanges[i];
        }
      }
      return null;
    }
  };
})  



.factory('SCOpenCloseRanksRanges', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var SCOpenCloseRanksRanges = [{
			id: 0,
		name: 'SC',
		UnivName: 'IIT Bombay',
		Program: 'Computer Science and Engineering (4 Years, Bachelor of Technology)',
		UnivRank: 1,
		OpenRank: 1,
		CloseRank: 60,
		

  }];

  return {
    all: function() {
      return STOpenCloseRanksRanges;
    },
    remove: function(SCOpenCloseRanksRange) {
      SCOpenCloseRanksRanges.splice(SCOpenCloseRanksRanges.indexOf(SCOpenCloseRanksRange), 1);
    },
    get: function(SCOpenCloseRanksRangeId) {
      for (var i = 0; i < SCOpenCloseRanksRanges.length; i++) {
        if (SCOpenCloseRanksRanges[i].id === parseInt(SCOpenCloseRanksRangeId)) {
          return SCOpenCloseRanksRanges[i];
        }
      }
      return null;
    }
  };
})  


.factory('STOpenCloseRanksRanges', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var STOpenCloseRanksRanges = [{
			id: 0,
		name: 'ST',
		UnivName: 'IIT Bombay',
		Program: 'Computer Science and Engineering (4 Years, Bachelor of Technology)',
		UnivRank: 1,
		OpenRank: 1,
		CloseRank: 60,
		

  }];

  return {
    all: function() {
      return STOpenCloseRanksRanges;
    },
    remove: function(STOpenCloseRanksRange) {
      STOpenCloseRanksRanges.splice(STOpenCloseRanksRanges.indexOf(STOpenCloseRanksRange), 1);
    },
    get: function(STOpenCloseRanksRangeId) {
      for (var i = 0; i < STOpenCloseRanksRanges.length; i++) {
        if (STOpenCloseRanksRanges[i].id === parseInt(STOpenCloseRanksRangeId)) {
          return STOpenCloseRanksRanges[i];
        }
      }
      return null;
    }
  };
})  
  
.factory('Gen2016RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var Gen2016RankIntervals = [{
		id: 0,
name: '2016 Gen',
LowLimitPercent: 0.225,
UpLimitPercent: 0.2625,
LowLimitRank: 21000,
UpLimitRank: 36000,

	  }];

  return {
    all: function() {
      return Gen2016RankIntervals;
    },
    remove: function(Gen2016RankInterval) {
      Gen2016RankIntervals.splice(Gen2016RankIntervals.indexOf(Gen2016RankInterval), 1);
    },
    get: function(Gen2016RankIntervalId) {
      for (var i = 0; i < Gen2016RankIntervals.length; i++) {
        if (Gen2016RankIntervals[i].id === parseInt(Gen2016RankIntervalId)) {
          return Gen2016RankIntervals[i];
        }
      }
      return null;
    }
  };
})
	  
.factory('OBC2016RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var OBC2016RankIntervals = [{
		id: 0,
name: '2016 OBC',
LowLimitPercent: 0.201612903225806,
UpLimitPercent: 0.23,
LowLimitRank: 5000,
UpLimitRank: 7700,

	  }];

  return {
    all: function() {
      return OBC2016RankIntervals;
    },
    remove: function(OBC2016RankInterval) {
      OBC2016RankIntervals.splice(OBC2016RankIntervals.indexOf(OBC2016RankInterval), 1);
    },
    get: function(OBC2016RankIntervalId) {
      for (var i = 0; i < OBC2016RankIntervals.length; i++) {
        if (OBC2016RankIntervals[i].id === parseInt(OBC2016RankIntervalId)) {
          return OBC2016RankIntervals[i];
        }
      }
      return null;
    }
  };
})	  

.factory('SC2016RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var SC2016RankIntervals = [{
	id: 0,
name: '2016 SC',
LowLimitPercent: 0.12,
UpLimitPercent: 0.201612903225806,
LowLimitRank: 900,
UpLimitRank: 2550,

	  }];

  return {
    all: function() {
      return SC2016RankIntervals;
    },
    remove: function(SC2016RankInterval) {
      SC2016RankIntervals.splice(SC2016RankIntervals.indexOf(SC2016RankInterval), 1);
    },
    get: function(SC2016RankIntervalId) {
      for (var i = 0; i < SC2016RankIntervals.length; i++) {
        if (SC2016RankIntervals[i].id === parseInt(SC2016RankIntervalId)) {
          return SC2016RankIntervals[i];
        }
      }
      return null;
    }
  };
})	 	
 
.factory('ST2016RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var ST2016RankIntervals = [{
		id: 0,
name: '2016 ST',
LowLimitPercent: 0.12,
UpLimitPercent: 0.201612903225806,
LowLimitRank: 240,
UpLimitRank: 760,

	  }];

  return {
    all: function() {
      return ST2016RankIntervals;
    },
    remove: function(ST2016RankInterval) {
      ST2016RankIntervals.splice(ST2016RankIntervals.indexOf(ST2016RankInterval), 1);
    },
    get: function(ST2016RankIntervalId) {
      for (var i = 0; i < ST2016RankIntervals.length; i++) {
        if (ST2016RankIntervals[i].id === parseInt(ST2016RankIntervalId)) {
          return ST2016RankIntervals[i];
        }
      }
      return null;
    }
  };
})	 	 

.factory('Gen2015RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var Gen2015RankIntervals = [{
		
	  }];

  return {
    all: function() {
      return Gen2015RankIntervals;
    },
    remove: function(Gen2015RankInterval) {
      Gen2015RankIntervals.splice(Gen2015RankIntervals.indexOf(Gen2015RankInterval), 1);
    },
    get: function(Gen2015RankIntervalId) {
      for (var i = 0; i < Gen2015RankIntervals.length; i++) {
        if (Gen2015RankIntervals[i].id === parseInt(Gen2015RankIntervalId)) {
          return Gen2015RankIntervals[i];
        }
      }
      return null;
    }
  };
})	 	
 
.factory('OBC2015RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var OBC2015RankIntervals = [{
	id: 0,
name: '2015 OBC',
LowLimitPercent: 0.22,
UpLimitPercent: 0.23,
LowLimitRank: 6000,
UpLimitRank: 6350,

	  }];

  return {
    all: function() {
      return OBC2015RankIntervals;
    },
    remove: function(OBC2015RankInterval) {
      OBC2015RankIntervals.splice(OBC2015RankIntervals.indexOf(OBC2015RankInterval), 1);
    },
    get: function(OBC2015RankIntervalId) {
      for (var i = 0; i < OBC2015RankIntervals.length; i++) {
        if (OBC2015RankIntervals[i].id === parseInt(OBC2015RankIntervalId)) {
          return OBC2015RankIntervals[i];
        }
      }
      return null;
    }
  };
})	 	

.factory('SC2015RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var SC2015RankIntervals = [{
		id: 0,
name: '2015 SC',
LowLimitPercent: 0.12,
UpLimitPercent: 0.124,
LowLimitRank: 2500,
UpLimitRank: 2575,

	  }];

  return {
    all: function() {
      return SC2015RankIntervals;
    },
    remove: function(SC2015RankInterval) {
      SC2015RankIntervals.splice(SC2015RankIntervals.indexOf(SC2015RankInterval), 1);
    },
    get: function(SC2015RankIntervalId) {
      for (var i = 0; i < SC2015RankIntervals.length; i++) {
        if (SC2015RankIntervals[i].id === parseInt(SC2015RankIntervalId)) {
          return SC2015RankIntervals[i];
        }
      }
      return null;
    }
  };
})	 	

.factory('ST2015RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var ST2015RankIntervals = [{
	id: 0,
name: '2015 ST',
LowLimitPercent: 0.125,
UpLimitPercent: 0.13,
LowLimitRank: 700,
UpLimitRank: 800,

	  }];

  return {
    all: function() {
      return ST2015RankIntervals;
    },
    remove: function(ST2015RankInterval) {
      ST2015RankIntervals.splice(ST2015RankIntervals.indexOf(ST2015RankInterval), 1);
    },
    get: function(ST2015RankIntervalId) {
      for (var i = 0; i < ST2015RankIntervals.length; i++) {
        if (ST2015RankIntervals[i].id === parseInt(ST2015RankIntervalId)) {
          return ST2015RankIntervals[i];
        }
      }
      return null;
    }
  };
})	 	


.factory('Gen2014RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var Gen2014RankIntervals = [{
	id: 0,
name: '2014 Gen',
LowLimitPercent: 0.35,
UpLimitPercent: 0.352777777777778,
LowLimitRank: 18900,
UpLimitRank: 19401,
	  }];

  return {
    all: function() {
      return Gen2014RankIntervals;
    },
    remove: function(Gen2014RankInterval) {
      Gen2014RankIntervals.splice(Gen2014RankIntervals.indexOf(Gen2014RankInterval), 1);
    },
    get: function(Gen2014RankIntervalId) {
      for (var i = 0; i < Gen2014RankIntervals.length; i++) {
        if (Gen2014RankIntervals[i].id === parseInt(Gen2014RankIntervalId)) {
          return Gen2014RankIntervals[i];
        }
      }
      return null;
    }
  };
})	 	
 
.factory('OBC2014RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var OBC2014RankIntervals = [{
		id: 0,
name: '2014 OBC',
LowLimitPercent: 0.313888888888889,
UpLimitPercent: 0.316666666666667,
LowLimitRank: 5801,
UpLimitRank: 6001,

	  }];

  return {
    all: function() {
      return SC2014RankIntervals;
    },
    remove: function(SC2014RankInterval) {
      SC2014RankIntervals.splice(SC2014RankIntervals.indexOf(SC2014RankInterval), 1);
    },
    get: function(SC2014RankIntervalId) {
      for (var i = 0; i < SC2014RankIntervals.length; i++) {
        if (SC2014RankIntervals[i].id === parseInt(SC2014RankIntervalId)) {
          return SC2014RankIntervals[i];
        }
      }
      return null;
    }
  };
})	 	

.factory('ST2014RankIntervals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var ST2014RankIntervals = [{
	id: 0,
name: '2014 ST',
LowLimitPercent: 0.177777777777778,
UpLimitPercent: 0.183333333333333,
LowLimitRank: 1101,
UpLimitRank: 1201,
	  }];

  return {
    all: function() {
      return ST2014RankIntervals;
    },
    remove: function(ST2014RankInterval) {
      ST2014RankIntervals.splice(ST2014RankIntervals.indexOf(ST2014RankInterval), 1);
    },
    get: function(ST2014RankIntervalId) {
      for (var i = 0; i < ST2014RankIntervals.length; i++) {
        if (ST2014RankIntervals[i].id === parseInt(ST2014RankIntervalId)) {
          return ST2014RankIntervals[i];
        }
      }
      return null;
    }
  };
})

.factory('AlertNotfs', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var AlertNotfs = [{
	id: 0,
name: '',
AlertExamName: 'IISC Bangalore',
AlertStatetoGo: 'tab.researchSciences-detail',
AlertStateID: 1,
EventTime: '01 February 2017 09:00:00',
EventDate: '01 February 2017',
AlertMessage: 'Online Application Starts',
  }];

  return {
    all: function() {
      return AlertNotfs;
    },
    remove: function(AlertNotf) {
      AlertNotfs.splice(AlertNotfs.indexOf(AlertNotf), 1);
    },
    get: function(AlertNotfId) {
      for (var i = 0; i < AlertNotfs.length; i++) {
        if (AlertNotfs[i].id === parseInt(AlertNotfId)) {
          return AlertNotfs[i];
        }
      }
      return null;
    }
  };
});
  