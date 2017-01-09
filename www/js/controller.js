var resultData = [];//result of flights coming from Sabre api
var destinationName = []; //destination name coming from solude.amxti server
var destinationIATA = []; //IATA name coming from solude.amxti server
var result; //Response result of Airports from solude amxti
var selectedFlight;

app.controller('MenuController', function($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    })


app.controller('Controller', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('ChatController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('ChatSingleController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('DrinkController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('TabOneController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('TabTwoController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('TabThreeController', function($scope, $ionicSideMenuDelegate) {
    })


//First Tab Controller
app.controller('FirstController', function($scope, $ionicSideMenuDelegate, $state) {
        $scope.login = function(){
            $state.go('login');
        }
        $scope.register = function(){
            $state.go('registration');
        }
    })


//Login Page Controller
app.controller('LoginController', function($scope, $ionicSideMenuDelegate, $state) {
        $scope.success = function(){
            $state.go('menu.round');
        }
    })


// Flights Controller RoundTrip
.controller('RoundController', function($scope, $http, $state,$ionicSideMenuDelegate) {
    $scope.flightDetails = function(){
      var from = document.getElementById("from").value;
      var to = document.getElementById("to").value;
      var departDate = document.getElementById('departDate').value;
      var arrDate = document.getElementById('arrDate').value;

      var fromIATA;
      var toIATA;
      for (var i = 0; i < result.length; i++) {
        if(from == result[i].label)
          {
            fromIATA = result[i].id;
            console.log(fromIATA);
          }
      }
      for (var i = 0; i < result.length; i++) {
        if(to == result[i].label)
          {
            toIATA = result[i].id;
            console.log(toIATA);
          }
      }
       $state.go('menu.flightdetails');
  }
          // Flight Data from server
    $http({
      method : "GET",
      url: "https://api.test.sabre.com/v1/shop/flights?origin=JFK&destination=LAX&departuredate=2017-04-07&returndate=2017-04-08&onlineitinerariesonly=N&limit=10&offset=1&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc",
      headers:{
        "Authorization" : "Bearer T1RLAQISKb9hc+IJZDlJhlOlCpyRDOkXVRAz52ObOnadusBsxAV1l8SUAADAzrVV511n8QWVAGRstHN82c3fgP5RS/uLVVAxL8jaXvihrV8Ha592XIDoe6o9vip6Cf+9mbfK0ngr6mzbtGW9la9JWxxkqgxjq4X8b5SO78QkQufMcWaBEnW7+4uXGYkNkaskm+GKuFBXmJG8y8KyyjGaOb7SmV7ot7srFkzSSY1f2SOb/94qS6u/7jZb1qevPty0Z0w/uEqW1uZEfbXL6TjSb+5U870Ogjv4ajs3jwbjRnj+4p78ACsJ7AACMn1y",
        "Content-Type" : "application/x-www-form-urlencoded"
      }
      }).then(function(response){
      $scope.dataset = response.data;
      
      var pricedItineraries = $scope.dataset.PricedItineraries;
      
      

      for (var i = 0; i < pricedItineraries.length; i++) {
            var totalFare = pricedItineraries[i].AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount;
            // console.log(totalFare + "  Total Fare");
            var currencyCode = pricedItineraries[i].AirItineraryPricingInfo.ItinTotalFare.TotalFare.CurrencyCode;
            // console.log(currencyCode + "  Currency Code");
            var originDestinationOption = pricedItineraries[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption;
            var tempArray = [];
            for (var j = 0; j < originDestinationOption.length; j++) {
                
                var flightSegment = originDestinationOption[j].FlightSegment;


                for (var k = 0; k < flightSegment.length; k++) {
                  
                  var departureAirport = flightSegment[k].DepartureAirport.LocationCode;
                  var departureDateTime = flightSegment[k].DepartureDateTime;
                  var arrivalAirport = flightSegment[k].ArrivalAirport.LocationCode;
                  var arrivalDateTime = flightSegment[k].ArrivalDateTime;
                  var elapsedTime = flightSegment[k].ElapsedTime;
                  var flightCode = flightSegment[k].OperatingAirline.Code;
                  var flightNumber = flightSegment[k].OperatingAirline.FlightNumber;
                  
                  var res1 = departureDateTime.split("T");
                  var departureDate = res1[0];
                  var departureTime = res1[1];
                  var res2 = arrivalDateTime.split("T");
                  var arrivalDate = res2[0];
                  var arrivalTime = res2[1];


                  
                  var resultObj = {totalFare, currencyCode, departureAirport, departureDate, departureTime, arrivalAirport, arrivalDate, arrivalTime, elapsedTime, flightCode, flightNumber, totalFare, currencyCode};
                  tempArray.push(resultObj);
                }
                
                
            }
              
            resultData.push(tempArray);
        }
        
     });
    // Flight Data from server
 

        // Getting list of Airlines
    
      $http({
        method: "GET",
        url: "js/airlines.json",
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded"
        }
      }).then(function(response){

      $scope.airlineInfo = response.data.AirlineInfo;
      var airlineInfo = $scope.airlineInfo;
      
      var airlineName = [];

      for (var i = 0; i < airlineInfo.length; i++) {
        airlineName.push(airlineInfo[i].AirlineName);
      }
      $scope.airlineName = airlineName; 
    });
    // Getting list of Airports
    $http({
      method: "GET",
      url: "js/airports.json",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      result = response.data;
      for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
      $("#from").autocomplete({
        source: destinationName
      })
      $("#to").autocomplete({
        source: destinationName
      })
    });
})
// Flights Controller End


// Single Trip Controller
.controller('SingleController', function($scope, $http, $state,$ionicSideMenuDelegate) {
    $scope.flightDetails = function(){
      var from = document.getElementById("from").value;
      var to = document.getElementById("to").value;
      var departDate = document.getElementById('departDate').value;

      console.log(from);
      console.log(to);
      var fromIATA;
      var toIATA;
      for (var i = 0; i < result.length; i++) {
        if(from == result[i].label)
          {
            fromIATA = result[i].id;
            console.log(fromIATA);
          }
      }
      for (var i = 0; i < result.length; i++) {
        if(to == result[i].label)
          {
            toIATA = result[i].id;
            console.log(toIATA);
          }
      }
       $state.go('menu.flightdetails');
  }
          // Flight Data from server
    $http({
      method : "GET",
      url: "https://api.test.sabre.com/v1/shop/flights?origin=JFK&destination=LAX&departuredate=2017-04-07&returndate=2017-04-08&onlineitinerariesonly=N&limit=10&offset=1&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc",
      headers:{
        "Authorization" : "Bearer T1RLAQISKb9hc+IJZDlJhlOlCpyRDOkXVRAz52ObOnadusBsxAV1l8SUAADAzrVV511n8QWVAGRstHN82c3fgP5RS/uLVVAxL8jaXvihrV8Ha592XIDoe6o9vip6Cf+9mbfK0ngr6mzbtGW9la9JWxxkqgxjq4X8b5SO78QkQufMcWaBEnW7+4uXGYkNkaskm+GKuFBXmJG8y8KyyjGaOb7SmV7ot7srFkzSSY1f2SOb/94qS6u/7jZb1qevPty0Z0w/uEqW1uZEfbXL6TjSb+5U870Ogjv4ajs3jwbjRnj+4p78ACsJ7AACMn1y",
        "Content-Type" : "application/x-www-form-urlencoded"
      }
      }).then(function(response){
      $scope.dataset = response.data;
      
      var pricedItineraries = $scope.dataset.PricedItineraries;
      
      

      for (var i = 0; i < pricedItineraries.length; i++) {
            var totalFare = pricedItineraries[i].AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount;
            // console.log(totalFare + "  Total Fare");
            var currencyCode = pricedItineraries[i].AirItineraryPricingInfo.ItinTotalFare.TotalFare.CurrencyCode;
            // console.log(currencyCode + "  Currency Code");
            var originDestinationOption = pricedItineraries[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption;
            var tempArray = [];
            for (var j = 0; j < originDestinationOption.length; j++) {
                
                var flightSegment = originDestinationOption[j].FlightSegment;


                for (var k = 0; k < flightSegment.length; k++) {
                  
                  var departureAirport = flightSegment[k].DepartureAirport.LocationCode;
                  var departureDateTime = flightSegment[k].DepartureDateTime;
                  var arrivalAirport = flightSegment[k].ArrivalAirport.LocationCode;
                  var arrivalDateTime = flightSegment[k].ArrivalDateTime;
                  var elapsedTime = flightSegment[k].ElapsedTime;
                  var flightCode = flightSegment[k].OperatingAirline.Code;
                  var flightNumber = flightSegment[k].OperatingAirline.FlightNumber;
                  
                  var res1 = departureDateTime.split("T");
                  var departureDate = res1[0];
                  var departureTime = res1[1];
                  var res2 = arrivalDateTime.split("T");
                  var arrivalDate = res2[0];
                  var arrivalTime = res2[1];


                  
                  var resultObj = {totalFare, currencyCode, departureAirport, departureDate, departureTime, arrivalAirport, arrivalDate, arrivalTime, elapsedTime, flightCode, flightNumber, totalFare, currencyCode};
                  tempArray.push(resultObj);
                }
                
                
            }
              
            resultData.push(tempArray);
        }
        
     });
    // Flight Data from server
 

        // Getting list of Airlines

      $http({
        method: "GET",
        url: "js/airlines.json",
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded"
        }
      }).then(function(response){

      $scope.airlineInfo = response.data.AirlineInfo;
      var airlineInfo = $scope.airlineInfo;
      
      var airlineName = [];

      for (var i = 0; i < airlineInfo.length; i++) {
        airlineName.push(airlineInfo[i].AirlineName);
      }
      $scope.airlineName = airlineName; 
    });
    // Getting list of Airports
    $http({
      method: "GET",
      url: "js/airports.json",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      result = response.data;
      for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
      $("#from").autocomplete({
        source: destinationName
      })
      $("#to").autocomplete({
        source: destinationName
      })
    });
})
//Single Flights Controller End

//Flight Detail Controller
app.controller('FlightDetailController', function($scope, $ionicSideMenuDelegate, $state) {
        $scope.finalData = resultData;
        $scope.toConfirm = function($index){
          selectedFlight = $scope.finalData[$index];
          $state.go('menu.flightconfirmation');
        }
        $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
    })
//FLight Detail Controller End

//Flight COnfrimation Controller
app.controller('FlightConfirmationController', function($scope, $ionicSideMenuDelegate, $state) {
      $scope.selectedFlight = selectedFlight;
      $scope.toUserDetails = function(){
        $state.go('menu.userdetails');
      }
    })
//Flight Confirmation Controller End

//User Details Controller
app.controller('UserDetailsController', function($scope, $ionicSideMenuDelegate, $state) {
      $scope.toPayment = function(){
        $state.go('menu.paymentmethod');
      }
    })
//User Details Controller End

//Payment Method Controller
app.controller('PaymentMethodController', function($scope, $ionicSideMenuDelegate, $state) {
      
    })
//Payment Method Controller End