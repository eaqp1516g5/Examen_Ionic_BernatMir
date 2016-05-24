app.controller('ExtensionsCtrl', function ($scope,$http, $stateParams,$ionicFilterBar, $ionicActionSheet, $timeout, $ionicLoading, $ionicModal, $ionicPopup, ionicMaterialInk) {

    var base_url="http://localhost:8080";
    var filterBarInstance;

    function getItems () {
        var items = [];
        $http.get(base_url + '/subject').success(function (data) {
            for (var x = 0; x < data.length; x++) {
                items.push({text:data[x].name});
            }
            $scope.items = items;
            console.log($scope.items);
        })
    }

    getItems();
    $scope.showFilterBar = function () {
        var filterBarInstance = $ionicFilterBar.show({
            cancelText: "<i class='ion-ios-close-outline'></i>",
            items: $scope.items,
            update: function (filteredItems, filterText) {
                $scope.items = filteredItems;
            }
        });
    };
    $scope.refreshItems = function () {
        if (filterBarInstance) {
            filterBarInstance();
            filterBarInstance = null;
        }
    };
    $timeout(function () {
        getItems();
        $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
});
