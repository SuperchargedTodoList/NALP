(function() {
  angular.module('NALP')
  .controller('createCtrl', createCtrl)

  // createCtrl.$inject = ['$scope', function($scope) {
  //   $scope.create = {
  //     text: '',
  //     location: ''
  //   }
  // }];

  createCtrl.$inject = ['plan_fac', '$http', '$state', 'store'];

  function createCtrl(plan_fac, $http, $state, store) {

    document.body.background = "";
    
    var vm = this;
    vm.title = 'create plan view title'
    vm.some_user_id = store.get('current_user_id');

    vm.newEventInfo = {};
    vm.newPlanInfo = {};
    vm.newPlanInfo.total_cost = 0;
    vm.addedEvents = [];
    vm.cityLoc = {};

    var err_callback = function(err) {
      console.log('err >>', err);
    }

    vm.showAutoSuggestions = function() {
      console.log(vm.newPlanInfo.city, '<< city')
        plan_fac
          .auto_suggest({ search_term: vm.newEventInfo.address, search_location: vm.newPlanInfo.city })
          .then(function(res) {
            console.log(res.data.results, '<< success from yelp api test')
            vm.allPlaceSuggestions = res.data.results.businesses;
          }, err_callback)
        // $http.get('https://api.yelp.com/v3/businesses/search?term=' + vm.newEventInfo.address + '&location=' + vm.newPlanInfo.city, {headers: {"Authorization": "Bearer 3AzZB1KiGE5YLQPGCNBu6kW6JmSAwRVF6YzmYBiXbDnAG6by-I2Zhg5Jdq5av1ugKKkssNPsasUGS9Ja9k0oly8FTK9yvWru6tHqubcryaW1bpGoQdlJRxH01vlKWXYx"}})
        //   .then(function(res) {
        //     console.log(res, '<< success from yelp api')  
        //   }, err_callback)
    }

    

    // timepicker for start time input
    $('#start_time_input').timepicker();
    // $('#start_time_input').timepicker('setTime', new Date());

   $('#google-address-input').css('width', '350px')
  //  $('#added-events-address-p').css('width', '350px')


    
    vm.userDidClickAddEvent = function() {
      console.log(vm.newEventInfo);
      var event = {};
      for (var key in vm.newEventInfo) {
        event[key] = vm.newEventInfo[key];
        console.log('what is this: ', event[key], key);

      };
      console.log('cost ', event.cost, Number(event.cost));
      vm.newPlanInfo.total_cost += Number(event.cost);
      console.log('newPlanInfo Object: ', vm.newPlanInfo, 'newPlanInfo total cost', vm.newPlanInfo.total_cost);
      event['address'] = $('#google-address-input').val();
      plan_fac
          .auto_suggest({ search_term: event.address, search_location: vm.newPlanInfo.city })
          .then(function(res) {
            console.log(res.data.results, '<< success from yelp api test')
            vm.current_place_img = res.data.results.businesses[0].image_url;
            console.log('>> place address from yelp', res.data.results.businesses[0].location.display_address.join(' '))
            event.photo = vm.current_place_img;
            event.address = res.data.results.businesses[0].location.display_address.join(' ');
            vm.addedEvents.push(event);
            vm.newEventInfo = {};
            vm.current_place_img = '';
          }, err_callback)
      
    };
    vm.userDidClickMakePlan = function() {
      console.log('how much is this gonna break me?', vm.newPlanInfo);
      var plan = {
        title: vm.newPlanInfo.title,
        city: vm.newPlanInfo.city,
        total_cost: vm.newPlanInfo.total_cost,
        events: vm.addedEvents
      }
      console.log(plan)
      plan_fac
        .createPlan(vm.some_user_id, plan)
        .then(make_plan_res, err_callback)
    }

    function make_plan_res(res) {
      console.log(res, 'success');
      vm.addedEvents = [];
      vm.newPlanInfo = {};
      $state.go('plan', {plan_id: res.data.plan._id})
      // Materialize.toast('Saved!! Plan successfully created!!', 50000000, 'alert-complete');
    }

    vm.userDidClickRemoveFromAddedEvents = function(event) {
      vm.newPlanInfo.total_cost -= Number(event.cost);
      vm.addedEvents.splice(vm.addedEvents.indexOf(event), 1);
    }
  }
})()



// function($scope) {
//     $scope.create = {
//       text: 'some title',
//       location: 'some place'
//     };
//   }