/*
 mrFeedback v0.2.8
 (c) 2010-2016 Matteo Rossi, https://it.linkedin.com/in/matteorossi2, 
 License: MIT
*/
(function() {
    'use strict';

    angular
        .module('mrFeedbackMdl',['ngSanitize'])
        .provider('mrFeedbackConfig', function () {
        var userAgent = [
            {"os":"Windows","theme":"windows10"},
            {"os":"Mac;","theme":"mac"},
            {"os":"iPad;","theme":"ios"},
            {"os":"iPhone;","theme":"ios"},
            {"os":"Android","theme":"android"}
        ];
        var checkDefaultTheme = function(){
            var theme = "mac";
            for(var i=0;i<userAgent.length;i++){
                if(navigator.userAgent.indexOf(userAgent[i].os) > -1){
                    theme = userAgent[i].theme;
                    return theme;
                }
            }
            return theme;
        };
        this.defaultTheme = checkDefaultTheme();
        this.defaultAnimation = "fade";
        this.$get = function () {
            return this;
        };
    })
    .provider('$uiMrFeedback', function() {
        this.$get = ['$compile', '$log', '$timeout', '$document','$rootScope', function($compile, $log, $timeout, $document,$rootScope) {
            var providedScope = $rootScope;
            var mrFeedbackScope = providedScope.$new();
            var index = 0;
            this.open = function(options) {
                if(!options)
                    return $log.error("mrFeedback: An object with title and msg field is mandatory to create the box");
                if(options.theme && options.theme==="notification"){
                    var notContainer = $("body").find("#mrFeedback-notContainer");
                    if(!notContainer.length)
                        $("body").append("<div id='mrFeedback-notContainer'></div>");
                    options.appendTo = "#mrFeedback-notContainer";
                }
                var container = (options.appendTo && $(options.appendTo).length>0) ? options.appendTo : "body";
                $(container).append("<mr-feedback-content-" + index + " class='mrFeedbackContent'></mr-feedback-content>");
                mrFeedbackScope["instancesFeedback_" + index] = options;
                var instance = mrFeedbackScope["instancesFeedback_" + index];
                instance.remove = function(){
                    this.delete = true;
                };
                var template =
                '<mr-feedback feedback="instancesFeedback_' + index + '"></mr-feedback>';
                var ele = $("mr-feedback-content-" + index).append(template);
                $compile(ele)(mrFeedbackScope);
                index++;
                return instance;
            };
            return this;
        }];
    })
    .directive('mrFeedback',mrFeedback);
    
    /** @ngInject */
    function mrFeedback($document,$compile) {
        var directive = {
            restrict: 'E',
            link:function(scope,elem,attrs){
                var template =  '<div ng-if="mrFeedback.feedback.modal" class="mrFeedbackLayout"></div>' +
                                '<div class="mrFeedback" ng-class="mrFeedback.theme">' +
                                    '<div class="box-feedback {{mrFeedback.notificationType}}">' +
                                        '<div class="box-left">' +
                                            '<i class="fa fa-exclamation-triangle"></i>' +
                                        '</div>' +
                                        '<div class="box-content">' +
                                            '<div class="box-header" ng-if="mrFeedback.showHeader">' +
                                                '<div class="title">' +
                                                    '{{mrFeedback.feedback.title}}' +
                                                '</div>' +
                                                '<div class="button-close" ng-if="mrFeedback.feedback.close" ng-click="mrFeedback.close()">' +
                                                    '<i class="fa fa-times"></i>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="box-body">' +
                                                '<div class="box-header-body">{{mrFeedback.feedback.title}}</div>' +
                                                '<div class="box-msg-body" ng-bind-html="mrFeedback.feedback.msg"></div>' +
                                            '</div>' +
                                            '<div class="buttons-feedback">' +
                                                '<div class="box-btnAction" ng-if="mrFeedback.feedback.btnAction">' +
                                                    '<div ng-repeat="button in mrFeedback.feedback.btnAction" class="button-feedback" style="{{button.btnStyle}}" ng-click="mrFeedback.action($index)">' +
                                                        '<i ng-if="button.icon" class="fa {{button.icon}}"></i>' +
                                                        '{{button.text}}' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="button-feedback button-close" ng-if="mrFeedback.feedback.close" ng-click="mrFeedback.close()">' +
                                                    '{{mrFeedback.feedback.closeText || "Close"}}' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                
                var initFeedback = function(){
                    var tpl = (scope.mrFeedback.feedback && scope.mrFeedback.feedback.template) ? scope.mrFeedback.feedback.template : template;
                    elem.html(tpl).show();
                    $compile(elem.contents())(scope);
                    initDraggable();
                };
                var initDraggable = function(){
                    var startX, startY, x = 0, y = 0,
                        start, stop, drag, container;

                    var width  = elem[0].offsetWidth,
                        height = elem[0].offsetHeight;

                    if (scope.dragOptions) {
                        start  = scope.dragOptions.start;
                        drag   = scope.dragOptions.drag;
                        stop   = scope.dragOptions.stop;
                        var id = scope.dragOptions.container;
                        if (id) {
                            container = document.getElementById(id).getBoundingClientRect();
                        }
                    }
                    
                    var box = elem.find(".mrFeedback");
                    var header = elem.find(".box-content .box-header");
                    header.on('mousedown', function(e) {
                        e.preventDefault();
                        startX = e.clientX - box[0].offsetLeft;
                        startY = e.clientY - box[0].offsetTop;
                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);
                        if (start) start(e);
                    });

                    function mousemove(e) {
                        y = e.clientY - startY;
                        x = e.clientX - startX;
                        setPosition();
                        if (drag) drag(e);
                    }

                    function mouseup(e) {
                        $document.unbind('mousemove', mousemove);
                        $document.unbind('mouseup', mouseup);
                        if (stop) stop(e);
                    }

                    function setPosition() {
                        if (container) {
                            if (x < container.left) {
                                x = container.left;
                            } else if (x > container.right - width) {
                                x = container.right - width;
                            }
                            if (y < container.top) {
                                y = container.top;
                            } else if (y > container.bottom - height) {
                                y = container.bottom - height;
                            }
                        }

                        box.css({
                            top: y + 'px',
                            left:  x + 'px'
                        });
                    }
                };
                initFeedback();
            },
            scope: {
                feedback:"="
            },
            replace:true,
            controller: mrFeedbackController,
            controllerAs: 'mrFeedback',
            bindToController: true
        };
        return directive;
    }

    /** @ngInject */
    function mrFeedbackController($scope,$element,mrFeedbackConfig,$timeout) {
        var vm = this;
        var render = function(){
            var notDelay = vm.feedback && vm.feedback.theme === "notification" ? vm.feedback.notificationDelay : null;
            if(notDelay){
                setTimeout(function(){
                   vm.close(); 
                },notDelay)
            }
        };
        var animation = vm.feedback && vm.feedback.animation ? "animation-" + vm.feedback.animation : "animation-fade";
        vm.notificationType = vm.feedback && vm.feedback.theme === "notification" ? vm.feedback.notificationType || "" : "";
        var detectShowHeader = function(){
            var show = vm.feedback && vm.feedback.theme === "notification" ? vm.feedback.close ? true : false : true;
            return show;
        };
        vm.showHeader = detectShowHeader();
        vm.close = function(){
            if(vm.feedback.fnClose){
                var params = vm.feedback.fnClose.params;
                vm.feedback.fnClose.func.apply(this,params);  
            }
            removeAnimation(); 
        };
        vm.action = function(index){
            var params = vm.feedback.btnAction[index].params;
            vm.feedback.btnAction[index].func.apply(this,params);
            if(vm.feedback.autoClose)
                removeAnimation(); 
        };
        var animation = mrFeedbackConfig.defaultAnimation;
        var setAnimation = function(){
            animation = vm.feedback && vm.feedback.animation ? "animation-" + vm.feedback.animation : "animation-" + animation;
            $element.find(".mrFeedback").addClass("mrFeedback-show " + animation);
            $timeout(function(){
                $element.find(".mrFeedback").addClass(animation + "-show");
            },50);
        };
        var setModal = function(){
            animation = "animation-none";
            $element.find(".mrFeedback").addClass("mrFeedback-show " + animation);
            $timeout(function(){
                $element.find(".mrFeedback").addClass(animation + "-show");
                centerBox();
            },50);
        };
        var removeAnimation = function(){
            $element.find(".mrFeedback").removeClass(animation + "-show");
            $timeout(function(){
                $element.find(".mrFeedback").removeClass("mrFeedback-show " + animation);
                animation = mrFeedbackConfig.defaultAnimation;
                $element.parent()[0].remove();
            },350);
        };
        var centerBox = function(){
            var box = $element.find(".mrFeedback");
            var boxHeight = angular.element(box).height();
            var boxTop = (window.innerHeight-boxHeight)/2;
            angular.element(box).css("top",boxTop+"px");
        };
        $scope.$watch("mrFeedback.feedback",function(newVal,oldVal){
            //if(newVal !== oldVal){
                if(newVal){
                    vm.theme = vm.feedback && vm.feedback.theme ? vm.feedback.theme : mrFeedbackConfig.defaultTheme;
                    if(vm.feedback.modal)
                        setModal();
                    else
                        setAnimation();
                }
                else{
                    removeAnimation();
                }
            //}
        });
        $scope.$watch("mrFeedback.feedback.delete",function(newVal,oldVal){
            //if(newVal !== oldVal){
                if(newVal && newVal===true){
                    removeAnimation();
                }
            //}
        });
        $scope.$watch("mrFeedback.feedback.close",function(newVal,oldVal){
            if(newVal!== oldVal){
                vm.showHeader = detectShowHeader();
            }
        });
        render();
    }
})();
