function ProgramService(){var e="programs",n="FitPersoExercises",t=[],s=[];this.getPrograms=function(){if(null!==localStorage.getItem(e)){t=angular.fromJson(localStorage.getItem(e));var n=new Date((-36e5));angular.forEach(t,function(e){angular.forEach(e.exercises,function(e){e.exeUnitTime=null===e.exeUnitTime?n:new Date(e.exeUnitTime),e.exeUnitRest=null===e.exeUnitRest?n:new Date(e.exeUnitRest),e.exeObjTime=null===e.exeObjTime?n:new Date(e.exeObjTime),e.exeObjTimeInc=null===e.exeObjTimeInc?n:new Date(e.exeObjTimeInc),e.time=null===e.time?n:new Date(e.time)}),angular.isDefined(e.notDone)&&angular.forEach(e.doneExercises,function(e){e.exeUnitTime=null===e.exeUnitTime?n:new Date(e.exeUnitTime),e.exeUnitRest=null===e.exeUnitRest?n:new Date(e.exeUnitRest),e.exeObjTime=null===e.exeObjTime?n:new Date(e.exeObjTime),e.exeObjTimeInc=null===e.exeObjTimeInc?n:new Date(e.exeObjTimeInc),e.time=null===e.time?n:new Date(e.time)})})}return t},this.getProgram=function(e){},this.savePrograms=function(n){localStorage.setItem(e,angular.toJson(n))},this.saveProgramById=function(e,n){t=this.getPrograms(),t[n]=e,this.savePrograms(t)},this.getOwnExercises=function(){return null!==angular.fromJson(localStorage.getItem(n))&&(s=angular.fromJson(localStorage.getItem(n))),s},this.saveOwnExercises=function(e){localStorage.setItem(n,angular.toJson(e))},this.saveCurrentProgram=function(e){t=this.getPrograms(),angular.isDefined(t[0].notDone)&&t.shift(),t.unshift(e),this.savePrograms(t)},this.removeNotDoneProgram=function(){t=this.getPrograms(),angular.isDefined(t[0].notDone)&&t.shift(),this.savePrograms(t)}}function FirebaseS(e){var n=null,t=this;t.getUser=function(){return n},t.setUser=function(){n=firebase.auth().currentUser},t.createUser=function(e,n){firebase.auth().createUserWithEmailAndPassword(e,n)["catch"](function(e){})},t.loginUser=function(n,s){for(firebase.auth().signInWithEmailAndPassword(n,s)["catch"](function(l){400===l.code&&e(function(){t.createUser(n,s)}).then(function(){t.loginUser(n,s)})});null===t.getUser();)t.setUser()}}function timerController(e){var n=this;n.sec0=0,n.sec00=0,n.min0=0,n.min00=0,n.now=0,n.$onChanges=function(){0!==n.restPeriod&&n.start()},n.start=function(){angular.isUndefined(n.timer)&&(angular.element("#timer").removeClass("flash"),angular.element("#timer").addClass("pulse"),n.timer=e(function(){0!==n.now&&Math.floor((n.now+1e3)/1e3)!==Math.floor(Date.now()/1e3)?n.diff=Math.floor((Date.now()-n.now)/1e3):n.diff=1,n.now=Date.now(),n.sec0+=n.diff,n.sec0>=10&&(n.sec00+=Math.floor(n.sec0/10),n.sec0-=10*Math.floor(n.sec0/10),n.sec00>=6&&(n.min0+=Math.floor(n.sec00/6),n.sec00-=6*Math.floor(n.sec00/6),n.min0>=10&&(n.min00+=Math.floor(n.min0/10),n.min0-=10*Math.floor(n.min0/10)))),0!==n.restPeriod&&(n.totaltimesec=n.sec0+10*n.sec00+60*n.min0+600*n.min00,n.totaltimesec>=n.restPeriod&&(n.reset(),angular.element("#timer").css("color","green"),angular.element("#timer").css("font-weight","bold")))},1e3))},n.stop=function(){angular.element("#timer").removeClass("pulse"),angular.element("#timer").addClass("flash"),e.cancel(n.timer),n.timer=void 0,n.now=0},n.reset=function(){n.stop(),n.sec0=0,n.sec00=0,n.min0=0,n.min00=0,n.restPeriod=0},n.close=function(){angular.element("#timer").attr("style","display:none;")}}function programsController(e,n){var t=this;t.programs=e.getPrograms(),t.deleteProgram=function(s){n.confirm("Do you really want to delete this workout ?")&&(t.programs.splice(s,1),e.savePrograms(t.programs))}}function programController(e,n,t,s){var l=this,i=[],a=n.id;l.$onInit=function(){l.program=e.getPrograms()[a],angular.isDefined(l.program.notDone)&&(i=angular.copy(l.program.doneExercises),l.program.doneExercises=void 0,l.program.notDone=void 0,angular.forEach(e.getPrograms(),function(e,n){e.title===l.program.title&&angular.isUndefined(e.notDone)&&(a=n)})),l.resumeClass=[],l.showObjectiveTxt=[],l.resume=!1,l.restPeriod=0},l.nextSet=function(n,t){var o=new Date((-36e5));if(t.time=null===t.time?o:new Date(t.time),i.push(t),1===l.program.exercises[n].nbSets?(l.program.exercises.shift(),0!==l.program.exercises.length&&(angular.element("#exercise"+n).addClass("bounce"),s(function(){angular.element("#exercise"+n).removeClass("bounce")},650))):l.program.exercises[n].nbSets-=1,l.restPeriod=0,s(function(){l.restPeriod=Math.round((t.exeUnitRest-o.getTime())/1e3),0!==l.restPeriod&&(l.showTimer(),angular.element("body").scrollTop(150))}),0===l.program.exercises.length){l.resume=!0;var r=e.getPrograms()[a];angular.forEach(r.exercises,function(e,n){angular.isDefined(e.reps)&&(i[n].diffrepsOldNew=e.reps-i[n].reps,e.reps>i[n].reps?l.resumeClass[n]="worse":e.reps===i[n].reps?l.resumeClass[n]="same":l.resumeClass[n]="better"),angular.isDefined(e.time)&&angular.isDefined(e.exeObjTimeType)&&("plus"===e.exeObjTimeType?e.time>i[n].time?l.resumeClass[n]="worse":e.time.getTime()===i[n].time.getTime()?l.resumeClass[n]="same":l.resumeClass[n]="better":"minus"===e.exeObjTimeType&&(e.time>i[n].time?l.resumeClass[n]="better":e.time.getTime()===i[n].time.getTime()?l.resumeClass[n]="same":l.resumeClass[n]="worse")),angular.isDefined(e.exeObjRep)&&null!==e.exeObjRep&&i[n].reps>=e.exeObjRep&&(i[n].exeUnitWeight+=i[n].exeObjWeightInc,l.resumeClass[n]="better objective",l.showObjectiveTxt[n]=!0),angular.isDefined(e.exeObjTime)&&e.exeObjTime!==-36e5&&("plus"===e.exeObjTimeType?i[n].time>=e.exeObjTime&&(i[n].exeObjTime.setTime(i[n].exeObjTime.getTime()+(e.exeObjTimeInc-new Date((-36e5)))),l.resumeClass[n]="better objective",l.showObjectiveTxt[n]=!0):"minus"===e.exeObjTimeType&&i[n].time<=e.exeObjTime&&(i[n].exeObjTime.setTime(i[n].exeObjTime.getTime()-(e.exeObjTimeInc-new Date((-36e5)))),l.resumeClass[n]="better objective",l.showObjectiveTxt[n]=!0))}),l.program.exercises=i}else{angular.isUndefined(e.getPrograms()[0].notDone)&&(a=parseInt(a,10)+1);var c={notDone:!0};c.title=l.program.title,c.doneExercises=angular.copy(i),c.exercises=angular.copy(l.program.exercises),e.saveCurrentProgram(c)}},l.saveCompletedProg=function(){e.saveProgramById(l.program,a),e.removeNotDoneProgram(),t.go("programs")},l.showTimer=function(){angular.element("#timer").css("display","block")}}function plansController(){this.text="My brand new component!"}function navbarController(){}function exeDetailController(e,n,t){var s=this;s.close=function(){angular.element("#popDetailExe").attr("style","display:none;"),s.overBody()},s.$onChanges=function(){if(angular.isDefined(s.exeDetailId))if("0"===s.ownExe){var l=t.getOwnExercises();s.exercise=n("filter")(l,{id:s.exeDetailId})[0],s.category={name:"Own Exercise"},angular.isDefined(s.exercise.description)&&angular.element("#descExe").html(s.exercise.description)}else e.get("https://wger.de/api/v2/exercise/"+s.exeDetailId+"/?language=2&format=json").then(function(n){s.exercise=angular.fromJson(n.data),e.get("https://wger.de/api/v2/exercisecategory/"+s.exercise.category+"/?language=2&format=json").then(function(e){s.category=angular.fromJson(e.data)}),angular.element("#descExe").html(s.exercise.description)}),e.get("https://wger.de/api/v2/exerciseimage/?exercise="+s.exeDetailId+"&format=json").then(function(e){if(0===e.data.count)s.image1=null,s.image2=null;else{var n=angular.fromJson(e.data.results);s.image1=n[0].image,s.image2=n[1].image}})}}function loginController(e,n){var t=this;t.login=function(){e.loginUser(t.user,t.password),n.go("home")}}function exeNewController(e,n){var t=this;t.$onInit=function(){t.exercise={}},t.close=function(){angular.element("#popNewExe").attr("style","display:none;"),angular.element("#newExeName").attr("style","border:border 1px;"),angular.element("#newExeName").next().html(""),t.exercise={name:""},t.exercise={description:""},t.overBody()},t.savePersoExe=function(){if(angular.isDefined(t.exercise.name)&&""!==t.exercise.name){var s=e.getOwnExercises();t.exercise.category="Own Exercise",t.exercise.id=angular.isUndefined(s[0])?0:s[s.length-1].id+1,s.push(t.exercise),e.saveOwnExercises(s),t.close(),n(t.onSave).then(t.overBody)}else angular.element("#newExeName").attr("style","border:solid 2px red;"),angular.element("#newExeName").after('<strong style="color:red;">Missing Title</strong>')}}function createProgramController(e,n,t,s,l,i,a){var o=this;o.$onInit=function(){o.exercisesNew=[],e.get("https://wger.de/api/v2/exercise/?language=2&format=json").then(function(e){o.data=angular.fromJson(e.data),o.exercises=angular.fromJson(e.data.results)}),e.get("https://wger.de/api/v2/exercisecategory/?format=json").then(function(e){o.categories=angular.fromJson(e.data.results)}),angular.isDefined(i.id)&&(o.oldProgram=t.getPrograms()[i.id],o.programTitle=o.oldProgram.title,o.exercisesNew=o.oldProgram.exercises,a(function(){angular.forEach(o.exercisesNew,function(e,n){e.showObjectives=!1,angular.element("#orderId"+n).removeClass("hide")})})),o.activeDelete=!0,o.overBody=!1,o.ishideDbList=!1,o.RadioObj="Reps"},o.selectExercise=function(e,n){var t=angular.element("#DbItem"+n).offset().top;o.exercisesNew.push(angular.copy(e[n])),a(function(){s.outerWidth<768?(angular.element("#orderId"+(o.exercisesNew.length-1)).removeClass("hide"),t=angular.element("#DbItem"+n).offset().top-t,angular.element("body").scrollTop(s.scrollY+t)):(angular.element("#orderId"+(o.exercisesNew.length-1)).removeClass("hide"),angular.element("#orderId"+(o.exercisesNew.length-1)).addClass("fadeInDown"))}),e[n].showObjectives=!1,angular.element("#DbItem"+n).addClass("fadeOutLeft"),a(function(){angular.element("#DbItem"+n).removeClass("fadeOutLeft"),angular.element("#DbItem"+n).addClass("fadeIn")},600)},o.removeExercise=function(e){o.exercisesNew.splice(e,1)},o.HighlowChange=function(e,n,t){o.exercisesNew.splice(e,1),t?o.exercisesNew.splice(e+1,0,n):o.exercisesNew.splice(e-1,0,n)},o.saveProgram=function(){var e=t.getPrograms(),s={title:o.programTitle,exercises:o.exercisesNew};angular.isDefined(o.oldProgram)?e[i.id]=s:e.push(s),t.savePrograms(e),n.go("programs")},o.getDetail=function(e){o.exeDetailId=e,angular.element("#popDetailExe").css("display","block"),o.showHideOverBody()},o.createExe=function(){angular.element("#popNewExe").css("display","block"),o.showHideOverBody()},o.afficherPlus=function(){o.query=o.data.next,e.get(o.query+"&format=json").then(function(e){o.data=angular.fromJson(e.data),Array.prototype.push.apply(o.exercises,angular.fromJson(e.data.results)),null===o.data.next&&angular.element("#affPlusBtn").css("display","none")})},o.changeCat=function(){0===parseInt(o.selectedCat,10)||angular.isUndefined(o.selectedCat)?(angular.element("#affPlusBtn").css("display","none"),o.exercises=t.getOwnExercises(),o.activeDelete=!1):e.get("https://wger.de/api/v2/exercise/?category="+o.selectedCat+"&language=2&format=json").then(function(e){o.data=angular.fromJson(e.data),o.exercises=angular.fromJson(e.data.results),angular.element("#affPlusBtn").css("display","inline"),o.activeDelete=!0})},o.deleteExe=function(e){s.confirm("Are you sure to delete this exercise ?")&&(o.exercises.splice(e,1),t.saveOwnExercises(o.exercises))},o.showObjectives=function(e){o.exercisesNew[e].showObjectives=!o.exercisesNew[e].showObjectives,o.exercisesNew[e].showObjectives&&(angular.element("#Objective"+e).addClass("animated"),angular.element("#Objective"+e).addClass("fadeIn"),a(function(){angular.element("#Objective"+e).removeClass("animated")},500))},o.showHideOverBody=function(){o.overBody=!o.overBody},o.hideDbList=function(){o.ishideDbList=!o.ishideDbList,o.ishideDbList?(angular.element("#dataList").addClass("fadeOutRight"),angular.element("#myWOlist").removeClass("col-sm-offset-1"),angular.element("#myWOlist").addClass("col-sm-offset-3"),angular.element("#myWOlist").removeClass("col-sm-5"),angular.element("#myWOlist").addClass("col-sm-6"),angular.element("#hideDbList").removeClass("glyphicon-arrow-right"),angular.element("#hideDbList").addClass("glyphicon-arrow-left"),angular.element("#dataList").removeClass("fadeInRight")):(angular.element("#dataList").removeClass("fadeOutRight"),angular.element("#myWOlist").removeClass("col-sm-offset-3"),angular.element("#myWOlist").addClass("col-sm-offset-1"),angular.element("#myWOlist").removeClass("col-sm-6"),angular.element("#myWOlist").addClass("col-sm-5"),angular.element("#dataList").addClass("fadeInRight"),angular.element("#hideDbList").removeClass("glyphicon-arrow-left"),angular.element("#hideDbList").addClass("glyphicon-arrow-right"))}}function createPlanController(){this.text="My brand new component!"}function homeController(){}function routesConfig(e,n,t){t.html5Mode(!1).hashPrefix("!"),n.otherwise("/"),e.state("home",{url:"/",component:"home"}).state("programs",{url:"/programs",component:"programs"}).state("program",{url:"/program/:id",component:"program"}).state("timer",{url:"/timer",component:"timer"}).state("createProgram",{url:"/createProgram?id",component:"createProgram"}).state("login",{url:"/login",component:"login"})}routesConfig.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],FirebaseS.$inject=["$q"],timerController.$inject=["$interval"],programsController.$inject=["ProgramService","$window"],programController.$inject=["ProgramService","$stateParams","$state","$timeout"],exeDetailController.$inject=["$http","$filter","ProgramService"],loginController.$inject=["FirebaseS","$state"],exeNewController.$inject=["ProgramService","$q"],createProgramController.$inject=["$http","$state","ProgramService","$window","$location","$stateParams","$timeout"],angular.module("app",["ui.router","ngSanitize"]),angular.module("app").service("ProgramService",ProgramService),angular.module("app").service("FirebaseS",FirebaseS),angular.module("app").component("timer",{templateUrl:"app/components/timer/timer.html",controller:timerController,bindings:{restPeriod:"<"}}),angular.module("app").component("programs",{templateUrl:"app/components/programs/programs.html",controller:programsController}),angular.module("app").component("program",{templateUrl:"app/components/program/program.html",controller:programController}),angular.module("app").component("plans",{templateUrl:"app/components/Plans/Plans.html",controller:plansController}),angular.module("app").component("navbar",{templateUrl:"app/components/navbar/navbar.html",controller:navbarController}),angular.module("app").component("exeDetail",{templateUrl:"app/components/exeDetail/exeDetail.html",controller:exeDetailController,bindings:{exeDetailId:"<",ownExe:"<",overBody:"&"}}),angular.module("app").component("login",{templateUrl:"app/components/login/Login.html",controller:loginController}),angular.module("app").component("exeNew",{templateUrl:"app/components/exeNew/exeNew.html",controller:exeNewController,bindings:{onSave:"&",overBody:"&"}}),angular.module("app").component("createProgram",{templateUrl:"app/components/createProgram/createProgram.html",controller:createProgramController}),angular.module("app").component("createPlan",{templateUrl:"app/components/createPlan/createPlan.html",controller:createPlanController}),angular.module("app").component("home",{templateUrl:"app/home.html",controller:homeController}),angular.module("app").run(["$templateCache",function(e){e.put("app/home.html",'<div class="component">\n  <div class="row title text-center animated fadeInDown">\n    <h1>Welcome!</h1>\n  </div>\n  <div class="row">\n    <div class="col-xs-6 col-xs-offset-3 text-center">      \n      <button ui-sref="programs" class="btn btn-default homeBtn animated fadeInUp"><label>Get started!</label></button>\n    </div>\n  </div>\n</div>\n\n\n\n\n\n\n'),e.put("app/components/createProgram/createProgram.html",'<div class="component">\n  <div class="row text-center title animated fadeInDown"><h1>Create Your Workout</h1></div> \n  <div class="row lowerBody animated">\n    <form name="formCtrl" ng-submit="$ctrl.saveProgram()">\n    <div class="col-sm-5 col-sm-offset-1 listExercise text-center animated fadeInLeft" id="myWOlist">     \n      <div class="row">\n      \t<div class="col-xs-12 text-center">\n          <h3><label>Title</label></h3> \n        </div>\n        <div class="col-xs-6 col-xs-offset-3">\n          <input id="progTitle" ng-model="$ctrl.programTitle" type="text" name="title" class="form-control" required> \n        </div>        \n      </div>\n      <ul ui-sortable="sortableOptions" ng-model="$ctrl.exercisesNew" class="list-group">\n        <li ng-repeat="item in $ctrl.exercisesNew track by $index" class="item list-group-item hide animated" id="orderId{{$index}}">\n          <div class="row">\n            <div class="row">              \n              <h4 class="itemName text-center col-xs-6">{{item.name}}</h4> \n              <div class="col-xs-6">    \n                <div class="btn-group YWBtn" role="group">\n                  <div title="Move up" class="btn btn-default glyphicon glyphicon-menu-up" ng-click="$ctrl.HighlowChange($index, item, false)"></div> \n                  <div title="Move down" class="btn btn-default glyphicon glyphicon-menu-down" ng-click="$ctrl.HighlowChange($index, item, true)"></div>  \n                  <div title="Remove" class="btn btn-default glyphicon glyphicon-minus" ng-click="$ctrl.removeExercise($index)"></div>   \n                </div>\n              </div> \n            </div> \n            <div class="row">\n              <div class="col-md-5 col-xs-offset-1">\n                <label class="col-xs-4">Sets</label>\n                <div class="col-xs-3 col-xs-offset-2"><input type="number" step="1" min="1" class="exeInput form-control" name="nbSets" ng-model="$ctrl.exercisesNew[$index].nbSets" required></div>  \n              </div>              \n              <div class="col-md-5 col-md-offset-0 col-xs-offset-1">\n                <label class="col-xs-4">Weight</label>\n                <div class="col-xs-3 col-xs-offset-2"><input type="number" step="any" min="0" name="exeUnitWeight" class="exeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeUnitWeight">   </div>\n              </div>                                                                                    \n            </div> \n            <div class="row">\n              <div class="col-lg-5 col-xs-offset-1">\n                <label class="col-xs-4">Time</label>\n                <div class="col-xs-3 col-xs-offset-2"><input type="time" step="1" name="exeUnitTime" class="exeInput timeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeUnitTime"></div>                            \n              </div> \n              <div class="col-lg-5 col-lg-offset-0 col-xs-offset-1">\n                <label class="col-xs-4">Rest period</label>\n                <div class="col-xs-3 col-xs-offset-2"><input type="time" step="1" name="exeUnitRest" class="exeInput timeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeUnitRest"></div>                            \n              </div>\n            </div> \n            <div class="row">\n              <div class="col-xs-1 col-xs-offset-9">\n                <span title="Show Objectives" ng-click="$ctrl.showObjectives($index)" class="btn btn-default glyphicon" ng-class="item.showObjectives ? \'glyphicon-triangle-top\' : \'glyphicon-triangle-bottom\'"></span>  \n              </div> \n            </div>                                                                                            \n            <div class="row animated" id="Objective{{$index}}" ng-hide="!$ctrl.exercisesNew[$index].showObjectives">\n              <div class="col-xs-10 col-xs-offset-1"></div>\n              <div class="row text-center">              \n                <form>                                                    \n                  <div class="col-xs-3 col-xs-offset-3">\n                    <label class="radio-inline">\n                      <input type="radio" name="obj" id="inlineRadio1" value="Reps" ng-model="$ctrl.RadioObj"> Reps\n                    </label>\n                  </div>\n                  <div class="col-xs-3">\n                    <label class="radio-inline">\n                      <input type="radio" name="obj" id="inlineRadio1" value="Time" ng-model="$ctrl.RadioObj"> Time\n                    </label>\n                  </div>\n                </form> \n              </div>              \n              <div class="row" ng-hide="$ctrl.RadioObj === \'Time\'">            \n                <div class="col-xs-6">\n                  <h4>Objective</h4>\n                  <div class="col-xs-5 col-xs-offset-1">\n                    <label>Reps</label>\n                  </div>\n                  <div class="col-xs-4">\n                    <input type="number" step="1" min="0" name="exeObjRep" class="exeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeObjRep">  \n                  </div>                  \n                </div> \n                <div class="col-xs-6">\n                  <h4>Increment</h4>\n                  <div class="col-xs-5">\n                    <label>Weight</label>\n                  </div>\n                  <div class="col-xs-4">\n                    <input type="number" step="any" min="0" name="exeObjRep" class="exeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeObjWeightInc" ng-required="$ctrl.exercisesNew[$index].exeObjRep">\n                  </div>                                     \n                </div>                           \n              </div>\n              <div class="row" ng-hide="$ctrl.RadioObj === \'Reps\'"> \n                <div class="col-lg-6">\n                  <div class="col-xs-12">\n                    <h4>Objective</h4>  \n                  </div>                  \n                  <div class="col-xs-3 col-xs-offset-2">\n                    <label>Time</label>\n                  </div>\n                  <div class="col-xs-6 col-xs-offset-1">                                                              \n                      <select class="pull-left" name="exeObjTimeType" ng-model="$ctrl.exercisesNew[$index].exeObjTimeType" ng-required="$ctrl.exercisesNew[$index].exeObjTime" id="SelectPlusMinus">\n                        <option value="plus">\n                          +\n                        </option>\n                        <option value="minus">\n                          -\n                        </option>\n                      </select>\n                      <input type="time" step="1" name="exeObjTime" class="exeInput timeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeObjTime" ng-required="$ctrl.exercisesNew[$index].exeObjTimeType">                     \n                  </div>                  \n                </div> \n                <div class="col-lg-6">\n                  <div class="col-xs-12">\n                    <h4>Increment</h4>\n                  </div>\n                  <div class="col-xs-3 col-lg-offset-0 col-xs-offset-2">\n                    <label>Time Increment</label>\n                  </div>\n                  <div class="col-xs-5 col-xs-offset-1">\n                     <input type="time" step="1" name="exeObjTimeInc" class="exeInput timeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeObjTimeInc" ng-required="$ctrl.exercisesNew[$index].exeObjTimeType">\n                  </div>                                     \n                </div>                           \n              </div>                        \n            </div>\n          </div>          \n        </li>\n      </ul>      \n      <input type="submit" class="saveBtn btn btn-default" value="Save Workout">\n    </div>\n    </form>    \n    <div class="col-sm-1 animated fadeInDown">\n    \t<button title="Toggle Database Exercises" id="hideDbList" ng-click="$ctrl.hideDbList()" class="btn btn-default glyphicon glyphicon-arrow-right"></button>\t    \t\n    </div>\n    <div class="col-sm-4 listExercise text-center animated fadeInRight" id="dataList">           \n      <div class="row">      \n        <div class="col-xs-12"><h2>Database Exercises</h2></div>\n        <div class="col-xs-12"><button class="saveBtn btn btn-default" ng-click="$ctrl.createExe()">Create New Exercise</button></div>\n        <div class="col-xs-12">          \n          <div class="col-lg-6">\n            <label>Search<input class="form-control" type="textbox" name="Search" ng-model="$ctrl.searchText"></label>\n          </div>\n          <div class="col-lg-6">\n            <label>Categories\n              <select id="catList" class="form-control" name="categories" ng-model="$ctrl.selectedCat" ng-change="$ctrl.changeCat()">\n                <option ng-repeat="cat in $ctrl.categories track by $index" value="{{cat.id}}">\n                  {{cat.name}}\n                </option>\n                <option value="0">\n                  Own Exercises\n                </option>\n             </select>  \n           </label>\n          </div>                  \n        </div>\n      </div>    \n      <div class="row">\n        <ul ui-sortable="sortableOptions" ng-model="$ctrl.exercises" class="list-group">\n          <li ng-repeat="item in $ctrl.exercises | filter:$ctrl.searchText track by $index" class="item list-group-item row animated" id="DbItem{{$index}}">\n            <div class="row">\n\t            <div class="col-xs-5 col-sm-7 col-md-6">\n\t            \t<div class="btn-group" role="group">\n\t\t                <span title="Add to workout" class="btn btn-default glyphicon glyphicon-plus" ng-click="$ctrl.selectExercise($ctrl.exercises | filter:$ctrl.searchText, $index)"></span>\n\t\t                <span title="Detail" class="btn btn-default glyphicon glyphicon-fullscreen" ng-click="$ctrl.getDetail(item.id)"></span>\n\t\t                <span title="Delete" class="btn btn-default glyphicon glyphicon-trash" ng-click="$ctrl.deleteExe($index)" ng-hide="$ctrl.activeDelete"></span>\n\t\t            </div>\n\t            </div>\t              \n              <div class="itemName col-xs-6 col-sm-5 col-md-6">{{item.name}}</div>\n            </div>                \n          </li>\n        </ul>\n        <button id="affPlusBtn" class="btn btn-default" ng-click="$ctrl.afficherPlus()" ng-hide="$ctrl.selectedCat == 0">Afficher plus</button> \n      </div>          \n    </div>    \n  </div>\n<div id="overBody" class="row" ng-show="$ctrl.overBody"></div>\n<exe-detail exe-detail-id="$ctrl.exeDetailId" own-exe="$ctrl.selectedCat" over-body="$ctrl.showHideOverBody()"></exe-detail>\n<exe-new on-save="$ctrl.changeCat()" over-body="$ctrl.showHideOverBody()"></exe-new>\n</div>'),e.put("app/components/exeNew/exeNew.html",'<div class="component">\n  <div class="row">\n    <div id="popNewExe" class="popNewExe col-sm-6 col-sm-offset-3 col-xs-12 animated fadeIn">   \n    <button title="Close" ng-click="$ctrl.close()" class="popCross btn btn-default glyphicon glyphicon-remove"></button>     \n    <div class="popScroll">\n      <div class="row">\n        <div class="col-xs-12 title text-center">      \n          <h2>New Exercise</h2>          \n        </div>\n      </div>      \n      <div class="row poplgn">         \n          <div class="col-sm-4 col-xs-offset-1"><label>Exercise Name</label> </div> \n          <div class="col-sm-5 col-xs-offset-1"><input id="newExeName" type="textbox" class="form-control" ng-model="$ctrl.exercise.name" name="exeName" required="required"></div>\n      </div>\n      <div class="row poplgn">\n        <div class="col-sm-4 col-xs-offset-1"><label>Category</label></div> \n        <div class="col-sm-6 col-xs-offset-1">Own Exercise</div>\n      </div>\n      <div class="row poplgn">\n         <div class="col-xs-11 col-xs-offset-1"><label>Description</label></div> \n         <div class="col-xs-11"><textarea class="col-xs-11 col-xs-offset-1 form-control" rows="5" ng-model="$ctrl.exercise.description"></textarea></div>\n      </div>\n      <div class="row">\n        <div class="col-xs-4 col-xs-offset-4">\n          <button class="saveBtn btn btn-default col-xs-12" ng-click="$ctrl.savePersoExe()">Save new exercise</button>\n        </div>  \n      </div>            \n    </div>\n  </div>\n  </div>\n  \n</div>'),e.put("app/components/login/Login.html",'<div class="component">\n  <div class="row text-center title animated fadeInDown"><h1>Login</h1></div>\n  <div class="row">\n  \t<div class="col-sm-4 col-sm-offset-4 col-xs-10 col-xs-offset-1 animated fadeInUp">\n  \t\t<form name="formCtrl" ng-submit="$ctrl.login()">\n  \t\t\t<div class="row">\n  \t\t\t\t<div class="col-xs-4">\n  \t\t\t\t\tEmail\n  \t\t\t\t</div>\n  \t\t\t\t<div class="col-xs-8">\n  \t\t\t\t\t<input class="form-control" type="email" name="user" ng-model="$ctrl.user" required>\t\t\n  \t\t\t\t</div>\n  \t\t\t</div>\n\t  \t\t<div class="row">\n  \t\t\t\t<div class="col-xs-4">\n  \t\t\t\t\tPassword\n  \t\t\t\t</div>\n  \t\t\t\t<div class="col-xs-8">\n  \t\t\t\t\t<input class="form-control" type="password" name="psw" ng-model="$ctrl.password" required>\t\t\n  \t\t\t\t</div>\n  \t\t\t</div>\t \n        <div class="row">\n          <div class="col-xs-3 col-xs-offset-4">\n            <button class="saveBtn btn btn-default center">Connexion</button>\n          </div>\n        </div> \t\t\t  \t\t\n\t  \t</form>\n  \t</div>    \t\t\n  </div>\n</div>'),e.put("app/components/exeDetail/exeDetail.html",'<div class="component">\n  <div class="row">\n    <div id="popDetailExe" class="popDetailExe col-sm-6 col-sm-offset-3 col-xs-12 animated fadeIn"> \n    <button title="Close" ng-click="$ctrl.close()" class="popCross btn btn-default glyphicon glyphicon-remove"></button>       \n      <div class="popScroll">\n        <div class="row">\n          <div class="col-xs-12 title text-center">      \n            <h2>Detail</h2>            \n          </div>\n        </div>        \n        <div class="row poplgn">\n          <img class="col-xs-4 col-xs-offset-1 popImg" src="{{$ctrl.image1}}" ng-show="$ctrl.image1">\n          <img class="col-xs-4 popImg" src="{{$ctrl.image2}}" ng-show="$ctrl.image2">\n        </div>\n        <div class="row poplgn">\n          <div class="col-xs-4 col-xs-offset-1"><strong>Exercise Name</strong></div> \n          <div class="col-xs-6 col-xs-offset-1">{{$ctrl.exercise.name}}</div>\n        </div>\n        <div class="row poplgn">\n          <div class="col-xs-4 col-xs-offset-1"><strong>Category</strong></div> \n          <div class="col-xs-6 col-xs-offset-1">{{$ctrl.category.name}}</div>\n        </div>\n        <div class="row poplgn">\n          <div class="col-xs-3 col-xs-offset-1"><strong>Description</strong></div> \n          <div id="descExe" class="poplgn col-xs-10 col-xs-offset-1"></div>\n        </div>                    \n      </div>\n    </div>\n  </div>\n</div>'),e.put("app/components/navbar/navbar.html",'<div class="component">\n  <div class="row">\n    <nav class="navbar navbar-default col-xs-12 animated fadeInUp">\n      <div class="container-fluid">\n        <div class="navbar-header">\n          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\n            <span class="sr-only">Toggle navigation</span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>          \n        </div>\n        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n          <ul class="nav navbar-nav">\n              <li><a ui-sref="home">Home <span class="sr-only">(Home)</span></a></li>\n              <li><a ui-sref="programs">Routines</a></li>\n              <li><a ui-sref="createProgram">Create Routine</a></li>  \n              <li><a ui-sref="login">Login</a></li>             \n          </ul>\n        </div>\n      </div>   \n    </nav>\n    \n  </div>\n</div>'),e.put("app/components/program/program.html",'<div class="component">\n  <div class="row text-center title animated fadeInDown">\n    <div class="col-xs-6 col-xs-offset-3">\n      <h1>{{$ctrl.program.title}}</h1>\n    </div>   \n  </div>  \n  <div class="row">\n    <div class="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">    \n      <ul class="list-group">\n        <li ng-repeat="item in $ctrl.program.exercises track by $index" class="list-group-item col-xs-12 itemProgram animated {{$ctrl.resumeClass[$index]}}" id="exercise{{$index}}">\n          <form ng-submit="$ctrl.nextSet($index, item)">\n            <div class="row">\n              <h4 class="itemName text-center col-xs-12">{{item.name}}</h4>              \n              <div class="col-xs-12 text-center" ng-hide="item.nbSets === 1"><label>Sets left</label> {{item.nbSets}}</div>\n              <div class="col-xs-6 col-sm-5 col-sm-offset-1">\n                <div class="col-xs-6">\n                  <label>Weight</label>   \n                </div>\n                <div class="col-xs-6">\n                  {{item.exeUnitWeight}}  \n                </div>                \n              </div>\n              <div class="col-xs-4 col-md-offset-1">\n                <div class="col-xs-6">\n                  <label>Time</label>   \n                </div>\n                <div class="col-xs-6">\n                  {{item.exeUnitTime | date : \'HH:mm:ss\'}}  \n                </div>                              \n              </div>\n              <div class="col-xs-6 col-sm-5 col-sm-offset-1" ng-hide="$index != 0 || $ctrl.resume">\n                <div class="col-xs-6">\n                  <label>Reps</label>  \n                </div>                \n                <div class="col-xs-4">\n                  <input type="number" step="any" class="exeInput form-control" min="0" ng-model="$ctrl.program.exercises[$index].reps" name="Reps">  \n                </div>                \n              </div>\n              <div class="col-xs-6 col-sm-5 col-sm-offset-1" ng-hide="!$ctrl.resume">\n                <div class="col-xs-6">\n                  <label>Reps</label>\n                </div>\n                <div class="col-xs-6">\n                  <label class="exeInput">{{item.reps}}</label>  \n                </div>                              \n              </div>\n              <div class="col-xs-4 col-md-offset-1" ng-hide="$index !== 0 || $ctrl.resume">\n                <div class="col-xs-6">\n                  <label>Time</label>\n                </div>\n                <div class="col-xs-6">\n                  <input type="time" step="1" class="exeInput timeInput form-control" ng-model="$ctrl.program.exercises[$index].time" name="Time">\n                </div>                              \n              </div>\n              <div class="col-xs-4 col-md-offset-1" ng-hide="!$ctrl.resume">\n                <div class="col-xs-6">\n                  <label>Time</label>\n                </div>\n                <div class="col-xs-6">\n                  <label class="exeInput">{{item.time | date : \'HH:mm:ss\'}}</label>  \n                </div>                \n              </div>\n              <div class="col-xs-12" ng-hide="$ctrl.resume || $index !== 0">    \n                <span class="glyphicon glyphicon-time pull-left btn btn-default" ng-click="$ctrl.showTimer()"></span>            \n                <button class="btn btn-default glyphicon glyphicon-ok pull-right"></button>                \n              </div>\n              <div class="col-xs-12 animated flash text-center" ng-show="$ctrl.showObjectiveTxt[$index]">\n                <span class="objectiveTxt">Objective exceeded</span>\n              </div>\n            </div>\n          </form>\n        </li>\n      </ul>\n    </div>\n  </div>  \n  <div class="row">          \n    <div class="col-xs-12 text-center">\n      <button class="btn btn-default" ng-hide="!$ctrl.resume" ng-click="$ctrl.saveCompletedProg()">Complete Workout</button>\n    </div>  \n  </div>  \n  <div class="row">\n    <timer rest-period="$ctrl.restPeriod"></timer>\n  </div>  \n</div>'),
e.put("app/components/timer/timer.html",'<div class="component">\n<div class="row">\n  <div id="timer" class="timer col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3 col-xs-12 animated fadeIn">   \n    <button title="Close" ng-click="$ctrl.close()" class="popCross btn btn-default glyphicon glyphicon-remove"></button>  \n    <div class="popScroll">  \n      <div class="row">\n        <div class="col-xs-12 title text-center">      \n          <h2>Timer</h2>                 \n        </div>\n      </div>\n      <div class="row"> \n        <div class="col-xs-5">\n          <div class="text-center animated pull-right">\n            <span ng-bind="$ctrl.min00 | number:0"></span>\n            <span ng-bind="$ctrl.min0 | number:0"></span>\n            <span>:</span>\n            <span ng-bind="$ctrl.sec00 | number:0"></span>\n            <span ng-bind="$ctrl.sec0 | number:0"></span>\n          </div>\n        </div>\n        <div class="col-xs-7 btn-group text-center">\n          <button class="btn btn-default" ng-click="$ctrl.start()">Start</button>\n          <button class="btn btn-default" ng-click="$ctrl.stop()">Stop</button>\n          <button class="btn btn-default" ng-click="$ctrl.reset()">Reset</button>\n        </div>\n      </div>        \n    </div>        \n  </div>\n</div>\n</div>'),e.put("app/components/programs/programs.html",'<div class="component">\n  <div class="row title text-center animated fadeInDown"><h1>Workout Routines</h1></div>       \n  <div class="row">\n    <div class="col-sm-6 col-sm-offset-3 text-center animated fadeInUp">\n      <ul ui-sortable="$ctrl.sortableOptions" ng-model="$ctrl.programs" class="list-group">\n        <li ng-repeat="e in $ctrl.programs track by $index" class="item list-group-item text-center">    \n        <div class="row">\n          <div class="itemName col-md-6"><div ng-show="e.notDone" style="color:#D32F2F">Resume Routine</div>{{ e.title }}</div>      \n          <div class="btn-group col-md-6 col-lg-5 col-lg-offset-1" role="group">\n            <button ui-sref="program({id:$index})" class="programsBtn btn btn-default">Start</button>\n            <button ui-sref="createProgram({id:$index})" class="programsBtn btn btn-default">Change</button>  \n            <button ng-click="$ctrl.deleteProgram($index)" class="programsBtn btn btn-default">Delete</button>  \n          </div>\n        </div>                             \n        </li>\n      </ul>  \n    </div>\n  </div> \n  <div class="row text-center animated fadeInUp">\n    <button ui-sref="createProgram" class="btn btn-default">Create new program</button>  \n  </div>     \n</div>')}]),angular.module("app").config(routesConfig);
//# sourceMappingURL=../maps/scripts/app-c3be6aa382.js.map