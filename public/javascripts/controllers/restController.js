function restController($scope)
{
    $scope.customers = [{name:"Tanya" , city:"Kochi"},
                       {name:"Sheryl" , city:"Cherthala"},
                       {name:"pereira" , city:"Mathilakam"}
                       ];
}
module.controller('restController',restController);
