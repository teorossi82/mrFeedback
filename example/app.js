(function(){
    'use strict';
    angular.module('mrFeedbackApp',['mrFeedbackMdl'])
    .config(config)
    .controller('appCtrl', ['$scope','$uiMrFeedback', appCtrl]);

    function config(mrFeedbackConfigProvider,$provide) {
        mrFeedbackConfigProvider.defaultAnimation = "zoom"; 
    };
    
    function appCtrl($scope,$uiMrFeedback){
        var vm = this;
        vm.simpleFeedback = function(){
            var feedback = {
                title:"My box title",
                msg:"This component is cool!!!",
                close: true
            };
            $uiMrFeedback.open(feedback);  
        };
        
        vm.simpleFeedbackWithButtons = function(){
            var functionClose = function(param){
                console.log("Instance dismissed with the param: " + param);  
            };
            var functionConnected = function(param1,param2){
                console.log(param1 + "! You have pressed the button " + param2);
            };
            var feedback = {
                title:"My box title",
                msg:"You can add buttons connected to functions that will be triggered on click of the button (see console log)!!",
                theme:"notification",
                close: true,
                closeText:"Chiudi",
                fnClose:{
                    func:functionClose,
                    params:["Ok!"]
                },
                btnAction:[
                    {
                        text:"Button Yeah",
                        func: functionConnected,
                        params:["Excellent","Yeah"]
                    },
                    {
                        text:"Button Noooo",
                        func: functionConnected,
                        params:["Damn","Noooo"]
                    }
                ]
            };
            $uiMrFeedback.open(feedback);
        };
        
        vm.instances = [];
        vm.title = "Title of the box";
        vm.msg = "Modify me to see the result in real time";
        vm.theme = "mac";
        vm.animation = "zoom";
        vm.closeType = "btnClose";
        vm.btnClose = true;
        vm.autoClose = false;
        vm.btnAction = false;
        var btnFunction = function(param1,param2){
            console.log(param1 + "! You have pressed tha button " + param2);
        };
        var arBtnAction = [
            {
                text:"Button Yeah",
                func: btnFunction,
                params:["Excellent","Yeah"]
            },
            {
                text:"Button Noooo",
                func: btnFunction,
                params:["Damn","Noooo"]
            }
        ]
        vm.createFeedback = function(){
            var feedback = {
                title:vm.title,
                msg:vm.msg,
                close: vm.btnClose,
                animation:vm.animation,
                theme:vm.theme,
                autoClose: vm.autoClose,
                btnAction: vm.btnAction ? arBtnAction : null
            };
            var inst = $uiMrFeedback.open(feedback);
            vm.instances.push(inst);
        };
        vm.removeFeedback = function(inst,index){
            inst.remove();
            vm.instances.splice(index,1);
        };
    }
})();
