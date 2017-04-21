!function(){"use strict";function e(e,t){return{restrict:"E",link:function(n,a,c){var i=function(){function t(e){l=e.clientY-d,m=e.clientX-o,i(),r&&r(e)}function c(n){e.unbind("mousemove",t),e.unbind("mouseup",c),s&&s(n)}function i(){b&&(m<b.left?m=b.left:m>b.right-k&&(m=b.right-k),l<b.top?l=b.top:l>b.bottom-u&&(l=b.bottom-u)),h.css({top:l+"px",left:m+"px"})}var o,d,f,s,r,b,m=0,l=0,k=a[0].offsetWidth,u=a[0].offsetHeight;if(n.dragOptions){f=n.dragOptions.start,r=n.dragOptions.drag,s=n.dragOptions.stop;var v=n.dragOptions.container;v&&(b=document.getElementById(v).getBoundingClientRect())}var h=a.find(".mrFeedback");a.find(".box-content .box-header").on("mousedown",function(n){n.preventDefault(),o=n.clientX-h[0].offsetLeft,d=n.clientY-h[0].offsetTop,e.on("mousemove",t),e.on("mouseup",c),f&&f(n)})};!function(){var e=n.mrFeedback.feedback&&n.mrFeedback.feedback.template?n.mrFeedback.feedback.template:'<div ng-if="mrFeedback.feedback.modal" class="mrFeedbackLayout"></div><div class="mrFeedback" ng-class="mrFeedback.theme"><div class="box-feedback {{mrFeedback.notificationType}}"><div class="box-left"><i class="fa fa-exclamation-triangle"></i></div><div class="box-content"><div class="box-header" ng-if="mrFeedback.showHeader"><div class="title">{{mrFeedback.feedback.title}}</div><div class="button-close" ng-if="mrFeedback.feedback.close" ng-click="mrFeedback.close()"><i class="fa fa-times"></i></div></div><div class="box-body"><div class="box-header-body">{{mrFeedback.feedback.title}}</div><div class="box-msg-body" ng-bind-html="mrFeedback.feedback.msg"></div></div><div class="buttons-feedback"><div class="box-btnAction" ng-if="mrFeedback.feedback.btnAction"><div ng-repeat="button in mrFeedback.feedback.btnAction" class="button-feedback" style="{{button.btnStyle}}" ng-click="mrFeedback.action($index)"><i ng-if="button.icon" class="fa {{button.icon}}"></i>{{button.text}}</div></div><div class="button-feedback button-close" ng-if="mrFeedback.feedback.close" ng-click="mrFeedback.close()">{{mrFeedback.feedback.closeText || "Close"}}</div></div></div></div></div>';a.html(e).show(),t(a.contents())(n),i()}()},scope:{feedback:"="},replace:!0,controller:n,controllerAs:"mrFeedback",bindToController:!0}}function n(e,n,t,a){var c=this,i=function(){var e=c.feedback&&"notification"===c.feedback.theme?c.feedback.notificationDelay:null;e&&setTimeout(function(){c.close()},e)},o=c.feedback&&c.feedback.animation?"animation-"+c.feedback.animation:"animation-fade";c.notificationType=c.feedback&&"notification"===c.feedback.theme?c.feedback.notificationType||"":"";var d=function(){return!c.feedback||"notification"!==c.feedback.theme||!!c.feedback.close};c.showHeader=d(),c.close=function(){if(c.feedback.fnClose){var e=c.feedback.fnClose.params;c.feedback.fnClose.func.apply(this,e)}r()},c.action=function(e){var n=c.feedback.btnAction[e].params;c.feedback.btnAction[e].func.apply(this,n),c.feedback.autoClose&&r()};var o=t.defaultAnimation,f=function(){o=c.feedback&&c.feedback.animation?"animation-"+c.feedback.animation:"animation-"+o,n.find(".mrFeedback").addClass("mrFeedback-show "+o),a(function(){n.find(".mrFeedback").addClass(o+"-show")},50)},s=function(){o="animation-none",n.find(".mrFeedback").addClass("mrFeedback-show "+o),a(function(){n.find(".mrFeedback").addClass(o+"-show"),b()},50)},r=function(){n.find(".mrFeedback").removeClass(o+"-show"),a(function(){n.find(".mrFeedback").removeClass("mrFeedback-show "+o),o=t.defaultAnimation,n.parent()[0].remove()},350)},b=function(){var e=n.find(".mrFeedback"),t=angular.element(e).height(),a=(window.innerHeight-t)/2;angular.element(e).css("top",a+"px")};e.$watch("mrFeedback.feedback",function(e,n){e?(c.theme=c.feedback&&c.feedback.theme?c.feedback.theme:t.defaultTheme,c.feedback.modal?s():f()):r()}),e.$watch("mrFeedback.feedback.delete",function(e,n){e&&e===!0&&r()}),e.$watch("mrFeedback.feedback.close",function(e,n){e!==n&&(c.showHeader=d())}),i()}e.$inject=["$document","$compile"],n.$inject=["$scope","$element","mrFeedbackConfig","$timeout"],angular.module("mrFeedbackMdl",["ngSanitize"]).provider("mrFeedbackConfig",function(){var e=[{os:"Windows",theme:"windows10"},{os:"Mac;",theme:"mac"},{os:"iPad;",theme:"ios"},{os:"iPhone;",theme:"ios"},{os:"Android",theme:"android"}],n=function(){for(var n="mac",t=0;t<e.length;t++)if(navigator.userAgent.indexOf(e[t].os)>-1)return n=e[t].theme;return n};this.defaultTheme=n(),this.defaultAnimation="fade",this.$get=function(){return this}}).provider("$uiMrFeedback",function(){this.$get=["$compile","$log","$timeout","$document","$rootScope",function(e,n,t,a,c){var i=c,o=i.$new(),d=0;return this.open=function(t){if(!t)return n.error("mrFeedback: An object with title and msg field is mandatory to create the box");var a=t.appendTo&&$(t.appendTo).length>0?t.appendTo:"body";$(a).append("<mr-feedback-content-"+d+" class='mrFeedbackContent'></mr-feedback-content>"),o["instancesFeedback_"+d]=t;var c=o["instancesFeedback_"+d];c.remove=function(){this.delete=!0};var i='<mr-feedback feedback="instancesFeedback_'+d+'"></mr-feedback>';return e($("mr-feedback-content-"+d).append(i))(o),d++,c},this}]}).directive("mrFeedback",e)}();