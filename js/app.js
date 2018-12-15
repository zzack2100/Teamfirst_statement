(function(){
    //新建模块
    var app=angular.module("CommentApp",[]);
    //定义常量
    app.constant("commentAPI","http://127.0.0.1:32768/api/comments/");
})();