(function () {
    var app=angular.module("CommentApp");
    app.controller("CommentController",['$scope','$http','commentAPI',function($scope,$http,commentAPI){
        //准备基础数据
        $scope.BaseDate={
            name:'',
            comment:'',
            email:'',
            agent:'FF'
        };
        $scope.submitDate=function(){
            $http({
                method:'POST',
                url:commentAPI,
                data:$scope.BaseDate
            }).then(function successCallback(response){
                if(response.status===201){
                    GetComment(1,10);
                    $scope.BaseDate.name='';
                    $scope.BaseDate.email='';
                    $scope.BaseDate.comment='';
                    //以下2句是表单状态初始化
                    $scope.CommentForm.$setPristine();
                    $scope.CommentForm.$setUntouched();
                }else{
                    console.log(response);
                }
            },function errorCallback(response){
                console.log(response);
            })
        };
        //获取首页
        $scope.toppage=function(){
            GetComment(1,10);
        };
        //获取下一页
        $scope.nextpage=function(ev){
            if($scope.objects && $scope.objects.next){
                GetComment($scope.objects.current_page+1,10);
            }else{
                angular.element(ev.target).parent().addClass('disabled');
            }
        };
        //获取上一页
        $scope.prevpage=function(ev){
            if($scope.objects && $scope.objects.previous){
                GetComment($scope.objects.current_page-1,10);
            }else{
                angular.element(ev.target).parent().addClass('disabled');
            }
        };
        //获取末页
        $scope.endpage=function(){
            GetComment($scope.objects.page_count,10);
        };
        //一开始，刷新页面默认获取第一页
        GetComment(1,10);
        function GetComment(page,page_size){
            $http({
                method:'GET',
                url:commentAPI+'?page='+page+'&page_size'+page_size
            }).then(function successCallback(response){
                if(response.status===200){
                    $scope.objects=response.data;
                }else{
                    console.log(response);
                }
            },function  errorCallback(response){
                console.log(response);
            })
        }
    }]);
})();
