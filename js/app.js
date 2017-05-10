'use strict';

angular.module('app',[
    'ngTouch',
    'ngRoute',
    'ngAnimate'
]).
config(['$routeProvider', function ($routeProvider){
    var genericRT = {
      templateUrl: 'views/container.html', 
      controller: 'EmployeeCtrl'
    };
  $routeProvider.when('/employees', genericRT);
  $routeProvider.when('/employees/:employeeId', genericRT);
  $routeProvider.when('/employees/:employeeId/:reports', genericRT);
  $routeProvider.otherwise({redirectTo: '/employees'});
}]);

angular.module('app')
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slider = '';
        $rootScope.back = function()
        {
          $scope.slider = 'slider-right';
          $window.history.back();
        }
        $rootScope.go = function(path)
        {
          $scope.slider = 'slider-left';
          $location.url(path);
        }
    }])
    .controller('EmployeeCtrl', ['$scope', '$routeParams', 'Employee', 'Report', function ($scope, $routeParams, Employee, Report) {
            
        if ($routeParams.employeeId === undefined) {
          console.info('Visited list of employees');
          $scope.view = 'list';
          $scope.employees = Employee.query();
        } else if ($routeParams.employeeId !== undefined && $routeParams.reports === undefined) {
          console.info('Visited details of employeeId: ' + $routeParams.employeeId);
          $scope.view = 'details';
          $scope.employee = Employee.get({employeeId: $routeParams.employeeId});
          
        } else {
          console.info('Visited reports of employeeId: ' + $routeParams.employeeId);
          $scope.view = 'reports';
          $scope.employees = Report.query({employeeId: $routeParams.employeeId});          
        }
    }])
  
  


    var employees = [
            {"id": 1, "firstName": "Charles Montgomery", "lastName": "Burns", "managerId": 0, "managerName": "", "reports": 4, "title": "President and CEO", "department": "Engineering", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "burns@sample.com", "city": "Test", "picture": "mr_burns.png", "twitterId": "@burns", "blog": "www.sample.com"},
            {"id": 2, "firstName": "Bart", "lastName": "Simpson", "managerId": 1, "managerName": "Charles Montgomery Burns", "reports": 2, "title": "VP of Marketing", "department": "Marketing", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "bart@sample.com", "city": "Test", "picture": "bart.png", "twitterId": "@bart", "blog": "www.sample.com"},
            {"id": 3, "firstName": "Marge", "lastName": "Simpson", "managerId": 1, "managerName": "Charles Montgomery Burns", "reports": 0, "title": "CFO", "department": "Accounting", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "marge@sample.com", "city": "Test", "picture": "marge.png", "twitterId": "@marge", "blog": "www.sample.com"},
            {"id": 4, "firstName": "Lisa", "lastName": "Simpson", "managerId": 1, "managerName": "Charles Montgomery Burns", "reports": 3, "title": "VP of Engineering", "department": "Engineering", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "lisa@sample.com", "city": "Test", "picture": "lisa.png", "twitterId": "@lisa", "blog": "www.sample.com"},
            {"id": 5, "firstName": "Maggie", "lastName": "Simpson", "managerId": 1, "managerName": "Charles Montgomery Burns", "reports": 2, "title": "VP of Sales", "department": "Sales", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "maggie@sample.com", "city": "Test", "picture": "maggie.png", "twitterId": "@maggie", "blog": "www.sample.com"},
            {"id": 6, "firstName": "Homer", "lastName": "Simpson", "managerId": 4, "managerName": "Lisa Simpson", "reports": 0, "title": "QA Manager", "department": "Corporate", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "homer@sample.com", "city": "Test", "picture": "homer.png", "twitterId": "@homer", "blog": "www.sample.com"},
            {"id": 7, "firstName": "Ned", "lastName": "Flanders", "managerId": 4, "managerName": "Lisa Simpson", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "ned@sample.com", "city": "Test", "picture": "ned_flanders.png", "twitterId": "@ned", "blog": "www.sample.com"},
            {"id": 8, "firstName": "Krusty", "lastName": "The Clown", "managerId": 2, "managerName": "Bart Simpson", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "krusty@sample.com", "city": "Test", "picture": "krusty.png", "twitterId": "@krusty", "blog": "www.sample.com"},
            {"id": 9, "firstName": "Waylon", "lastName": "Smithers", "managerId": 2, "managerName": "Bart Simpson", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "smithers@sample.com", "city": "Test", "picture": "smithers.png", "twitterId": "@smithers", "blog": "www.sample.com"},
            {"id": 10, "firstName": "Ralph", "lastName": "Wiggum", "managerId": 5, "managerName": "Maggie Simpson", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "ralph@sample.com", "city": "Test", "picture": "ralph.png", "twitterId": "@ralph", "blog": "www.sample.com"},
            {"id": 11, "firstName": "Itchy", "lastName": "", "managerId": 5, "managerName": "Maggie Simpson", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "itchy@sample.com", "city": "Test", "picture": "itchy.png", "twitterId": "@itchy", "blog": "www.sample.com"},
            {"id": 12, "firstName": "Comic Book Guy", "lastName": "", "managerId": 4, "managerName": "Lisa Simpson", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "XX XX XX", "officePhone": "XX XX XX", "email": "comicguy@sample.com", "city": "Test", "picture": "comic.png", "twitterId": "@comicguy", "blog": "www.sample.com"}
        ],

        findById = function (id) {
            var employee = null, l = employees.length, i;
            for (i = 0; i < l; i = i + 1) 
            {
                if (employees[i].id === id) { employee = employees[i]; break;}
            }
            return employee;
        },

        findByManager = function (managerId) {
            var results = employees.filter(function (element) {
                return managerId === element.managerId;
            });
            return results;
        };


angular.module('app')
    .factory('Employee', [
      function () {
          return {
              query: function () {
                  return employees;
              },
              get: function (employee) {
                  return findById(parseInt(employee.employeeId));
              }
          }

      }])
    .factory('Report', [
        function () {
            return {
                query: function (employee) {
                    return findByManager(parseInt(employee.employeeId));
                }
            }

        }]);

