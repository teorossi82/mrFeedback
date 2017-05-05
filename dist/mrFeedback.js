!function(){"use strict";function e(e,t){return{restrict:"E",link:function(n,a,o){var c=function(){function t(e){k=e.clientY-d,m=e.clientX-i,c(),b&&b(e)}function o(n){e.unbind("mousemove",t),e.unbind("mouseup",o),f&&f(n)}function c(){r&&(m<r.left?m=r.left:m>r.right-l&&(m=r.right-l),k<r.top?k=r.top:k>r.bottom-u&&(k=r.bottom-u)),v.css({top:k+"px",left:m+"px"})}var i,d,s,f,b,r,m=0,k=0,l=a[0].offsetWidth,u=a[0].offsetHeight;if(n.dragOptions){s=n.dragOptions.start,b=n.dragOptions.drag,f=n.dragOptions.stop;var h=n.dragOptions.container;h&&(r=document.getElementById(h).getBoundingClientRect())}var v=a.find(".mrFeedback");a.find(".box-content .box-header").on("mousedown",function(n){n.preventDefault(),i=n.clientX-v[0].offsetLeft,d=n.clientY-v[0].offsetTop,e.on("mousemove",t),e.on("mouseup",o),s&&s(n)})};!function(){var e=n.mrFeedback.feedback&&n.mrFeedback.feedback.template?n.mrFeedback.feedback.template:'<div ng-if="mrFeedback.feedback.modal" class="mrFeedbackLayout"></div><div class="mrFeedback" ng-class="mrFeedback.theme"><div class="box-feedback {{mrFeedback.notificationType}} {{mrFeedback.feedback.customClass}}"><div class="box-left" ng-if="mrFeedback.showLeft"><i class="fa fa-exclamation-triangle" ng-if="mrFeedback.showPostItIcon"></i></div><div class="box-content" ng-class="{\'with-left-icon\':mrFeedback.showLeft}"><div class="box-header" ng-if="mrFeedback.showHeader"><div class="title">{{mrFeedback.feedback.title}}</div><div class="button-close" ng-if="mrFeedback.feedback.close" ng-click="mrFeedback.close()"><i class="fa fa-times"></i></div></div><div class="box-body"><div class="box-body-left" ng-if="mrFeedback.showBodyLeftIcon"><img ng-src="{{mrFeedback.feedback.icon.src}}" ng-if="mrFeedback.showBodyLeftIconImg"/><i class="body-icon {{mrFeedback.feedback.icon.class}}" ng-if="mrFeedback.showBodyLeftIconClass"></i></div><div class="box-body-right" ng-class="{\'with-left-icon\':mrFeedback.showBodyLeftIcon}"><div class="box-header-body">{{mrFeedback.feedback.title}}</div><div class="box-msg-body" ng-bind-html="mrFeedback.feedback.msg"></div></div></div><div class="buttons-feedback"><div class="box-btnAction" ng-if="mrFeedback.feedback.btnAction"><div ng-repeat="button in mrFeedback.feedback.btnAction" class="button-feedback" style="{{button.btnStyle}}" ng-click="mrFeedback.action($index)"><i ng-if="button.icon" class="fa {{button.icon}}"></i>{{button.text}}</div></div><div class="button-feedback button-close" ng-if="mrFeedback.feedback.close" ng-click="mrFeedback.close()">{{mrFeedback.feedback.closeText || "Close"}}</div></div></div></div></div>';a.html(e).show(),t(a.contents())(n),c()}()},scope:{feedback:"="},replace:!0,controller:n,controllerAs:"mrFeedback",bindToController:!0}}function n(e,n,t,a){var o=this,c=function(){var e=o.feedback&&"notification"===o.feedback.theme?o.feedback.notificationDelay:null;e&&setTimeout(function(){o.close()},e),o.showLeft=!(!o.feedback||"post-it-alert"!==o.feedback.theme),o.showPostItIcon="post-it-alert"===o.feedback.theme,o.showBodyLeftIcon=o.feedback&&o.feedback.icon,o.showBodyLeftIconImg=o.showBodyLeftIcon&&"img"===o.feedback.icon.type,o.showBodyLeftIconClass=o.showBodyLeftIcon&&"class"===o.feedback.icon.type},i=o.feedback&&o.feedback.animation?"animation-"+o.feedback.animation:"animation-fade";o.notificationType=o.feedback&&"notification"===o.feedback.theme?o.feedback.notificationType||"":"";var d=function(){return!o.feedback||"notification"!==o.feedback.theme||!!o.feedback.close};o.showHeader=d(),o.close=function(){if(o.feedback.fnClose){var e=o.feedback.fnClose.params;o.feedback.fnClose.func.apply(this,e)}b()},o.action=function(e){var n=o.feedback.btnAction[e].params;o.feedback.btnAction[e].func.apply(this,n),o.feedback.autoClose&&b()};var i=t.defaultAnimation,s=function(){i=o.feedback&&o.feedback.animation?"animation-"+o.feedback.animation:"animation-"+i,n.find(".mrFeedback").addClass("mrFeedback-show "+i),a(function(){n.find(".mrFeedback").addClass(i+"-show")},50)},f=function(){i="animation-none",n.find(".mrFeedback").addClass("mrFeedback-show "+i),a(function(){n.find(".mrFeedback").addClass(i+"-show"),m()},50)},b=function(){n.find(".mrFeedback").removeClass(i+"-show"),a(function(){n.find(".mrFeedback").removeClass("mrFeedback-show "+i),i=t.defaultAnimation,n.parent()[0].remove(),r()},350)},r=function(){var e=$("body").find("#mrFeedback-notContainer");e.html()||e.remove()},m=function(){var e=n.find(".mrFeedback"),t=angular.element(e).height(),a=(window.innerHeight-t)/2;angular.element(e).css("top",a+"px")};e.$watch("mrFeedback.feedback",function(e,n){e?(o.theme=o.feedback&&o.feedback.theme?o.feedback.theme:t.defaultTheme,o.feedback.modal?f():s()):b()}),e.$watch("mrFeedback.feedback.delete",function(e,n){e&&e===!0&&b()}),e.$watch("mrFeedback.feedback.close",function(e,n){e!==n&&(o.showHeader=d())}),c()}e.$inject=["$document","$compile"],n.$inject=["$scope","$element","mrFeedbackConfig","$timeout"],angular.module("mrFeedbackMdl",["ngSanitize"]).provider("mrFeedbackConfig",function(){var e=[{os:"Windows",theme:"windows10"},{os:"Mac;",theme:"mac"},{os:"iPad;",theme:"ios"},{os:"iPhone;",theme:"ios"},{os:"Android",theme:"android"}],n=function(){for(var n="mac",t=0;t<e.length;t++)if(navigator.userAgent.indexOf(e[t].os)>-1)return n=e[t].theme;return n};this.defaultTheme=n(),this.defaultAnimation="fade",this.$get=function(){return this}}).provider("$uiMrFeedback",function(){this.$get=["$compile","$log","$timeout","$document","$rootScope",function(e,n,t,a,o){var c=o,i=c.$new(),d=0;return this.open=function(t){if(!t)return n.error("mrFeedback: An object with title and msg field is mandatory to create the box");if(t.theme&&"notification"===t.theme){$("body").find("#mrFeedback-notContainer").length||$("body").append("<div id='mrFeedback-notContainer'></div>"),t.appendTo="#mrFeedback-notContainer"}var a=t.appendTo&&$(t.appendTo).length>0?t.appendTo:"body";$(a).append("<mr-feedback-content-"+d+" class='mrFeedbackContent'></mr-feedback-content>"),i["instancesFeedback_"+d]=t;var o=i["instancesFeedback_"+d];o.remove=function(){this.delete=!0};var c='<mr-feedback feedback="instancesFeedback_'+d+'"></mr-feedback>';return e($("mr-feedback-content-"+d).append(c))(i),d++,o},this}]}).directive("mrFeedback",e)}();