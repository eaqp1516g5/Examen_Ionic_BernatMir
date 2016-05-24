app.controller('ComponentsCtrl', function ($scope, $stateParams, ionicMaterialInk,$http) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
$scope.NewUser={};

    var base_url="http://localhost:8080/";
    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    $scope.registrar= function () {
        $http.post(base_url+'subject/'+$scope.NewUser.asignatura,{
            name:$scope.NewUser.name,
            address:$scope.NewUser.calle,
            place:$scope.NewUser.tlfPlace,
            tlf:$scope.NewUser.tlfNumber
        }).success(function () {
            $scope.NewUser=null;
        })
    }
    function getsubjects(){
        $http.get(base_url+'subject').success(function (data) {
            $scope.subs=data;
            console.log($scope.subs);
        })
    }
    getsubjects();
    $scope.detalle= function (name) {
        $http.get(base_url+'subject/'+name).success(function (data) {
            $scope.detalle=data;
            $scope.detalles=data.students;
            console.log($scope.detalles);

        })
    }
    $scope.mostrarUser= function (name) {
        $http.get(base_url+'student/'+name).success(function (data) {
            $scope.user=data;
        })
    }
});