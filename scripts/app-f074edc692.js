function ProgramService(){var e="programs",n="FitPersoExercises",s=[],t=[];this.getPrograms=function(){if(null!==localStorage.getItem(e)){s=angular.fromJson(localStorage.getItem(e));var n=new Date((-36e5));angular.forEach(s,function(e){angular.forEach(e.exercises,function(e){e.exeUnitTime=null===e.exeUnitTime?n:new Date(e.exeUnitTime),e.exeUnitRest=null===e.exeUnitRest?n:new Date(e.exeUnitRest),e.exeObjTime=null===e.exeObjTime?n:new Date(e.exeObjTime),e.exeObjTimeInc=null===e.exeObjTimeInc?n:new Date(e.exeObjTimeInc),e.time=null===e.time?n:new Date(e.time)})})}return s},this.savePrograms=function(n){localStorage.setItem(e,angular.toJson(n))},this.saveProgramById=function(e,n){s=this.getPrograms(),s[n]=e,this.savePrograms(s)},this.getOwnExercises=function(){return null!==angular.fromJson(localStorage.getItem(n))&&(t=angular.fromJson(localStorage.getItem(n))),t},this.saveOwnExercises=function(e){localStorage.setItem(n,angular.toJson(e))}}function programController(e,n,s,t){var l=this,a=[];l.$onInit=function(){l.program=e.getPrograms()[n.id],l.resumeClass=[],l.showObjectiveTxt=[],l.resume=!1},l.nextSet=function(s,i){var o=new Date((-36e5));if(i.time=null===i.time?o:new Date(i.time),a.push(i),1===l.program.exercises[s].nbSets?(l.program.exercises.splice(s,1),0!==l.program.exercises.length&&(angular.element("#exercise"+s).addClass("bounce"),t(function(){angular.element("#exercise"+s).removeClass("bounce")},650))):l.program.exercises[s].nbSets-=1,0===l.program.exercises.length){l.resume=!0;var r=e.getPrograms()[n.id];angular.forEach(r.exercises,function(e,n){angular.isDefined(e.reps)&&(a[n].diffrepsOldNew=e.reps-a[n].reps,e.reps>a[n].reps?l.resumeClass[n]="worse":e.reps===a[n].reps?l.resumeClass[n]="same":l.resumeClass[n]="better"),angular.isDefined(e.time)&&angular.isDefined(e.exeObjTimeType)&&("plus"===e.exeObjTimeType?e.time>a[n].time?l.resumeClass[n]="worse":e.time.getTime()===a[n].time.getTime()?l.resumeClass[n]="same":l.resumeClass[n]="better":"minus"===e.exeObjTimeType&&(e.time>a[n].time?l.resumeClass[n]="better":e.time.getTime()===a[n].time.getTime()?l.resumeClass[n]="same":l.resumeClass[n]="worse")),angular.isDefined(e.exeObjRep)&&null!==e.exeObjRep&&a[n].reps>=e.exeObjRep&&(a[n].exeUnitWeight+=a[n].exeObjWeightInc,l.resumeClass[n]="better objective",l.showObjectiveTxt[n]=!0),angular.isDefined(e.exeObjTime)&&e.exeObjTime!==-36e5&&("plus"===e.exeObjTimeType?a[n].time>=e.exeObjTime&&(a[n].exeObjTime.setTime(a[n].exeObjTime.getTime()+(e.exeObjTimeInc-new Date((-36e5)))),l.resumeClass[n]="better objective",l.showObjectiveTxt[n]=!0):"minus"===e.exeObjTimeType&&a[n].time<=e.exeObjTime&&(a[n].exeObjTime.setTime(a[n].exeObjTime.getTime()-(e.exeObjTimeInc-new Date((-36e5)))),l.resumeClass[n]="better objective",l.showObjectiveTxt[n]=!0))}),l.program.exercises=a}},l.saveCompletedProg=function(){e.saveProgramById(l.program,n.id),s.go("programs")}}function programsController(e,n){var s=this;s.programs=e.getPrograms(),s.deleteProgram=function(t){n.confirm("Are you sure to delete this workout ?")&&(s.programs.splice(t,1),e.savePrograms(s.programs))}}function navbarController(){}function exeNewController(e,n){var s=this;s.$onInit=function(){s.exercise={}},s.close=function(){angular.element("#popNewExe").attr("style","display:none;"),angular.element("#newExeName").attr("style","border:border 1px;"),angular.element("#newExeName").next().html(""),s.exercise={name:""},s.exercise={description:""},s.overBody()},s.savePersoExe=function(){if(angular.isDefined(s.exercise.name)&&""!==s.exercise.name){var t=e.getOwnExercises();s.exercise.category="Own Exercise",s.exercise.id=angular.isUndefined(t[0])?0:t[t.length-1].id+1,t.push(s.exercise),e.saveOwnExercises(t),s.close(),n(s.onSave).then(s.overBody)}else angular.element("#newExeName").attr("style","border:solid 2px red;"),angular.element("#newExeName").after('<strong style="color:red;">Missing Title</strong>')}}function exeDetailController(e,n,s){var t=this;t.close=function(){angular.element("#popDetailExe").attr("style","display:none;"),t.overBody()},t.$onChanges=function(){if(angular.isDefined(t.exeDetailId))if("0"===t.ownExe){var l=s.getOwnExercises();t.exercise=n("filter")(l,{id:t.exeDetailId})[0],t.category={name:"Own Exercise"},angular.isDefined(t.exercise.description)&&angular.element("#descExe").html(t.exercise.description)}else e.get("https://wger.de/api/v2/exercise/"+t.exeDetailId+"/?language=2&format=json").then(function(n){t.exercise=angular.fromJson(n.data),e.get("https://wger.de/api/v2/exercisecategory/"+t.exercise.category+"/?language=2&format=json").then(function(e){t.category=angular.fromJson(e.data)}),angular.element("#descExe").html(t.exercise.description)}),e.get("https://wger.de/api/v2/exerciseimage/?exercise="+t.exeDetailId+"&format=json").then(function(e){if(0===e.data.count)t.image1=null,t.image2=null;else{var n=angular.fromJson(e.data.results);t.image1=n[0].image,t.image2=n[1].image}})}}function createProgramController(e,n,s,t,l,a,i){var o=this;o.$onInit=function(){o.exercisesNew=[],e.get("https://wger.de/api/v2/exercise/?language=2&format=json").then(function(e){o.data=angular.fromJson(e.data),o.exercises=angular.fromJson(e.data.results)}),e.get("https://wger.de/api/v2/exercisecategory/?format=json").then(function(e){o.categories=angular.fromJson(e.data.results)}),angular.isDefined(a.id)&&(o.oldProgram=s.getPrograms()[a.id],o.programTitle=o.oldProgram.title,o.exercisesNew=o.oldProgram.exercises,angular.forEach(o.exercisesNew,function(e){e.showObjectives=!1})),o.activeDelete=!0,o.overBody=!1,o.ishideDbList=!1,o.RadioObj="Reps"},o.selectExercise=function(e,n){var s=angular.element("#DbItem"+n).offset().top;o.exercisesNew.push(angular.copy(e[n])),i(function(){t.outerWidth<768&&(angular.element("#orderId"+(o.exercisesNew.length-1)).removeClass("hide"),s=angular.element("#DbItem"+n).offset().top-s,angular.element("body").scrollTop(t.scrollY+s))}),e[n].showObjectives=!1,angular.element("#DbItem"+n).addClass("fadeOutLeft"),i(function(){angular.element("#DbItem"+n).removeClass("fadeOutLeft"),angular.element("#DbItem"+n).addClass("fadeIn")},600)},o.removeExercise=function(e){o.exercisesNew.splice(e,1)},o.HighlowChange=function(e,n,s){o.exercisesNew.splice(e,1),s?o.exercisesNew.splice(e+1,0,n):o.exercisesNew.splice(e-1,0,n)},o.saveProgram=function(){var e=s.getPrograms(),t={title:o.programTitle,exercises:o.exercisesNew};angular.isDefined(o.oldProgram)?e[a.id]=t:e.push(t),s.savePrograms(e),n.go("programs")},o.getDetail=function(e){o.exeDetailId=e,angular.element("#popDetailExe").css("display","block"),o.showHideOverBody()},o.createExe=function(){angular.element("#popNewExe").css("display","block"),o.showHideOverBody()},o.afficherPlus=function(){o.query=o.data.next,e.get(o.query+"&format=json").then(function(e){o.data=angular.fromJson(e.data),Array.prototype.push.apply(o.exercises,angular.fromJson(e.data.results)),null===o.data.next&&angular.element("#affPlusBtn").css("display","none")})},o.changeCat=function(){0===parseInt(o.selectedCat,10)||angular.isUndefined(o.selectedCat)?(angular.element("#affPlusBtn").css("display","none"),o.exercises=s.getOwnExercises(),o.activeDelete=!1):e.get("https://wger.de/api/v2/exercise/?category="+o.selectedCat+"&language=2&format=json").then(function(e){o.data=angular.fromJson(e.data),o.exercises=angular.fromJson(e.data.results),angular.element("#affPlusBtn").css("display","inline"),o.activeDelete=!0})},o.deleteExe=function(e){t.confirm("Are you sure to delete this exercise ?")&&(o.exercises.splice(e,1),s.saveOwnExercises(o.exercises))},o.showObjectives=function(e){o.exercisesNew[e].showObjectives=!o.exercisesNew[e].showObjectives,o.exercisesNew[e].showObjectives&&(angular.element("#Objective"+e).addClass("animated"),angular.element("#Objective"+e).addClass("fadeIn"),i(function(){angular.element("#Objective"+e).removeClass("animated")},500))},o.showHideOverBody=function(){o.overBody=!o.overBody},o.hideDbList=function(){o.ishideDbList=!o.ishideDbList,o.ishideDbList?(angular.element("#dataList").addClass("fadeOutRight"),angular.element("#myWOlist").removeClass("col-sm-offset-1"),angular.element("#myWOlist").addClass("col-sm-offset-3"),angular.element("#myWOlist").removeClass("col-sm-5"),angular.element("#myWOlist").addClass("col-sm-6"),angular.element("#hideDbList").removeClass("glyphicon-arrow-right"),angular.element("#hideDbList").addClass("glyphicon-arrow-left"),angular.element("#dataList").removeClass("fadeInRight")):(angular.element("#dataList").removeClass("fadeOutRight"),angular.element("#myWOlist").removeClass("col-sm-offset-3"),angular.element("#myWOlist").addClass("col-sm-offset-1"),angular.element("#myWOlist").removeClass("col-sm-6"),angular.element("#myWOlist").addClass("col-sm-5"),angular.element("#dataList").addClass("fadeInRight"),angular.element("#hideDbList").removeClass("glyphicon-arrow-left"),angular.element("#hideDbList").addClass("glyphicon-arrow-right"))}}function homeController(){}function routesConfig(e,n,s){s.html5Mode(!0).hashPrefix("!"),n.otherwise("/"),e.state("home",{url:"/",component:"home"}).state("programs",{url:"/programs",component:"programs"}).state("program",{url:"/program/:id",component:"program"}).state("createProgram",{url:"/createProgram?id",component:"createProgram"})}routesConfig.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],programController.$inject=["ProgramService","$stateParams","$state","$timeout"],programsController.$inject=["ProgramService","$window"],exeNewController.$inject=["ProgramService","$q"],exeDetailController.$inject=["$http","$filter","ProgramService"],createProgramController.$inject=["$http","$state","ProgramService","$window","$location","$stateParams","$timeout"],angular.module("app",["ui.router","ngSanitize"]),angular.module("app").service("ProgramService",ProgramService),angular.module("app").component("program",{templateUrl:"app/components/program/program.html",controller:programController}),angular.module("app").component("programs",{templateUrl:"app/components/programs/programs.html",controller:programsController}),angular.module("app").component("navbar",{templateUrl:"app/components/navbar/navbar.html",controller:navbarController}),angular.module("app").component("exeNew",{templateUrl:"app/components/exeNew/exeNew.html",controller:exeNewController,bindings:{onSave:"&",overBody:"&"}}),angular.module("app").component("exeDetail",{templateUrl:"app/components/exeDetail/exeDetail.html",controller:exeDetailController,bindings:{exeDetailId:"<",ownExe:"<",overBody:"&"}}),angular.module("app").component("createProgram",{templateUrl:"app/components/createProgram/createProgram.html",controller:createProgramController}),angular.module("app").component("home",{templateUrl:"app/home.html",controller:homeController}),angular.module("app").run(["$templateCache",function(e){e.put("app/home.html",'<div class="component">\n  <div class="row title text-center animated fadeInDown">\n    <h1>Welcome!</h1>\n  </div>\n  <div class="row">\n    <div class="col-xs-6 col-xs-offset-3 text-center">      \n      <button ui-sref="programs" class="btn btn-default homeBtn animated fadeInUp"><label>Get started!</label></button>\n    </div>\n  </div>\n</div>\n\n\n\n\n\n\n'),e.put("app/components/createProgram/createProgram.html",'<div class="component">\n  <div class="row text-center title animated fadeInDown"><h1>Create Your Workout</h1></div> \n  <div class="row lowerBody animated">\n    <form name="formCtrl" ng-submit="$ctrl.saveProgram()">\n    <div class="col-sm-5 col-sm-offset-1 listExercise text-center animated fadeInLeft" id="myWOlist">     \n      <div class="row">\n      \t<div class="col-xs-12 text-center">\n          <h3><label>Title</label></h3> \n        </div>\n        <div class="col-xs-6 col-xs-offset-3">\n          <input id="progTitle" ng-model="$ctrl.programTitle" type="text" name="title" class="form-control" required> \n        </div>        \n      </div>\n      <ul ui-sortable="sortableOptions" ng-model="$ctrl.exercisesNew" class="list-group">\n        <li ng-repeat="item in $ctrl.exercisesNew track by $index" class="item list-group-item hide" id="orderId{{$index}}">\n          <div class="row">\n            <div class="row">              \n              <h4 class="itemName text-center col-xs-6">{{item.name}}</h4> \n              <div class="col-xs-6">    \n                <div class="btn-group YWBtn" role="group">\n                  <div title="Move up" class="btn btn-default glyphicon glyphicon-menu-up" ng-click="$ctrl.HighlowChange($index, item, false)"></div> \n                  <div title="Move down" class="btn btn-default glyphicon glyphicon-menu-down" ng-click="$ctrl.HighlowChange($index, item, true)"></div>  \n                  <div title="Remove" class="btn btn-default glyphicon glyphicon-minus" ng-click="$ctrl.removeExercise($index)"></div>   \n                </div>\n              </div> \n            </div> \n            <div class="row">\n              <div class="col-md-5 col-xs-offset-1">\n                <label class="col-xs-4">Sets</label>\n                <div class="col-xs-3 col-xs-offset-2"><input type="number" step="1" min="1" class="exeInput form-control" name="nbSets" ng-model="$ctrl.exercisesNew[$index].nbSets" required></div>  \n              </div>              \n              <div class="col-md-5 col-md-offset-0 col-xs-offset-1">\n                <label class="col-xs-4">Weight</label>\n                <div class="col-xs-3 col-xs-offset-2"><input type="number" step="any" min="0" name="exeUnitWeight" class="exeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeUnitWeight">   </div>\n              </div>                                                                                    \n            </div> \n            <div class="row">\n              <div class="col-lg-5 col-xs-offset-1">\n                <label class="col-xs-4">Time</label>\n                <div class="col-xs-3 col-xs-offset-2"><input type="time" step="1" name="exeUnitTime" class="exeInput timeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeUnitTime"></div>                            \n              </div> \n              <div class="col-lg-5 col-lg-offset-0 col-xs-offset-1">\n                <label class="col-xs-4">Rest period</label>\n                <div class="col-xs-3 col-xs-offset-2"><input type="time" step="1" name="exeUnitRest" class="exeInput timeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeUnitRest"></div>                            \n              </div>\n            </div> \n            <div class="row">\n              <div class="col-xs-1 col-xs-offset-9">\n                <span title="Show Objectives" ng-click="$ctrl.showObjectives($index)" class="btn btn-default glyphicon" ng-class="item.showObjectives ? \'glyphicon-triangle-top\' : \'glyphicon-triangle-bottom\'"></span>  \n              </div> \n            </div>                                                                                            \n            <div class="row animated" id="Objective{{$index}}" ng-hide="!$ctrl.exercisesNew[$index].showObjectives">\n              <div class="col-xs-10 col-xs-offset-1"></div>\n              <div class="row text-center">              \n                <form>                                                    \n                  <div class="col-xs-3 col-xs-offset-3">\n                    <label class="radio-inline">\n                      <input type="radio" name="obj" id="inlineRadio1" value="Reps" ng-model="$ctrl.RadioObj"> Reps\n                    </label>\n                  </div>\n                  <div class="col-xs-3">\n                    <label class="radio-inline">\n                      <input type="radio" name="obj" id="inlineRadio1" value="Time" ng-model="$ctrl.RadioObj"> Time\n                    </label>\n                  </div>\n                </form> \n              </div>              \n              <div class="row" ng-hide="$ctrl.RadioObj === \'Time\'">            \n                <div class="col-xs-6">\n                  <h4>Objective</h4>\n                  <div class="col-xs-5 col-xs-offset-1">\n                    <label>Reps</label>\n                  </div>\n                  <div class="col-xs-4">\n                    <input type="number" step="1" min="0" name="exeObjRep" class="exeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeObjRep">  \n                  </div>                  \n                </div> \n                <div class="col-xs-6">\n                  <h4>Increment</h4>\n                  <div class="col-xs-5">\n                    <label>Weight</label>\n                  </div>\n                  <div class="col-xs-4">\n                    <input type="number" step="any" min="0" name="exeObjRep" class="exeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeObjWeightInc" ng-required="$ctrl.exercisesNew[$index].exeObjRep">\n                  </div>                                     \n                </div>                           \n              </div>\n              <div class="row" ng-hide="$ctrl.RadioObj === \'Reps\'"> \n                <div class="col-lg-6">\n                  <div class="col-xs-12">\n                    <h4>Objective</h4>  \n                  </div>                  \n                  <div class="col-xs-3 col-xs-offset-2">\n                    <label>Time</label>\n                  </div>\n                  <div class="col-xs-6 col-xs-offset-1">                                                              \n                      <select class="pull-left" name="exeObjTimeType" ng-model="$ctrl.exercisesNew[$index].exeObjTimeType" ng-required="$ctrl.exercisesNew[$index].exeObjTime" id="SelectPlusMinus">\n                        <option value="plus">\n                          +\n                        </option>\n                        <option value="minus">\n                          -\n                        </option>\n                      </select>\n                      <input type="time" step="1" name="exeObjTime" class="exeInput timeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeObjTime" ng-required="$ctrl.exercisesNew[$index].exeObjTimeType">                     \n                  </div>                  \n                </div> \n                <div class="col-lg-6">\n                  <div class="col-xs-12">\n                    <h4>Increment</h4>\n                  </div>\n                  <div class="col-xs-3 col-lg-offset-0 col-xs-offset-2">\n                    <label>Time Increment</label>\n                  </div>\n                  <div class="col-xs-5 col-xs-offset-1">\n                     <input type="time" step="1" name="exeObjTimeInc" class="exeInput timeInput form-control" ng-model="$ctrl.exercisesNew[$index].exeObjTimeInc" ng-required="$ctrl.exercisesNew[$index].exeObjTimeType">\n                  </div>                                     \n                </div>                           \n              </div>                        \n            </div>\n          </div>          \n        </li>\n      </ul>      \n      <input type="submit" class="saveBtn btn btn-default" value="Save Workout">\n    </div>\n    </form>    \n    <div class="col-sm-1 animated fadeInDown">\n    \t<button title="Toggle Database Exercises" id="hideDbList" ng-click="$ctrl.hideDbList()" class="btn btn-default glyphicon glyphicon-arrow-right"></button>\t    \t\n    </div>\n    <div class="col-sm-4 listExercise text-center animated fadeInRight" id="dataList">           \n      <div class="row">      \n        <div class="col-xs-12"><h2>Database Exercises</h2></div>\n        <div class="col-xs-12"><button class="saveBtn btn btn-default" ng-click="$ctrl.createExe()">Create New Exercise</button></div>\n        <div class="col-xs-12">          \n          <div class="col-lg-6">\n            <label>Search<input class="form-control" type="textbox" name="Search" ng-model="$ctrl.searchText"></label>\n          </div>\n          <div class="col-lg-6">\n            <label>Categories\n              <select id="catList" class="form-control" name="categories" ng-model="$ctrl.selectedCat" ng-change="$ctrl.changeCat()">\n                <option ng-repeat="cat in $ctrl.categories track by $index" value="{{cat.id}}">\n                  {{cat.name}}\n                </option>\n                <option value="0">\n                  Own Exercises\n                </option>\n             </select>  \n           </label>\n          </div>                  \n        </div>\n      </div>    \n      <div class="row">\n        <ul ui-sortable="sortableOptions" ng-model="$ctrl.exercises" class="list-group">\n          <li ng-repeat="item in $ctrl.exercises | filter:$ctrl.searchText track by $index" class="item list-group-item row animated" id="DbItem{{$index}}">\n            <div class="row">\n\t            <div class="col-xs-5 col-sm-7 col-md-6">\n\t            \t<div class="btn-group" role="group">\n\t\t                <span title="Add to workout" class="btn btn-default glyphicon glyphicon-plus" ng-click="$ctrl.selectExercise($ctrl.exercises | filter:$ctrl.searchText, $index)"></span>\n\t\t                <span title="Detail" class="btn btn-default glyphicon glyphicon-fullscreen" ng-click="$ctrl.getDetail(item.id)"></span>\n\t\t                <span title="Delete" class="btn btn-default glyphicon glyphicon-trash" ng-click="$ctrl.deleteExe($index)" ng-hide="$ctrl.activeDelete"></span>\n\t\t            </div>\n\t            </div>\t              \n              <div class="itemName col-xs-6 col-sm-5 col-md-6">{{item.name}}</div>\n            </div>                \n          </li>\n        </ul>\n        <button id="affPlusBtn" class="btn btn-default" ng-click="$ctrl.afficherPlus()" ng-hide="$ctrl.selectedCat == 0">Afficher plus</button> \n      </div>      \n           \n    </div>    \n  </div>\n<div id="overBody" class="row" ng-show="$ctrl.overBody"></div>\n<exe-detail exe-detail-id="$ctrl.exeDetailId" own-exe="$ctrl.selectedCat" over-body="$ctrl.showHideOverBody()"></exe-detail>\n<exe-new on-save="$ctrl.changeCat()" over-body="$ctrl.showHideOverBody()"></exe-new>\n</div>'),e.put("app/components/exeNew/exeNew.html",'<div class="component">\n  <div class="row">\n    <div id="popNewExe" class="popNewExe col-sm-6 col-sm-offset-3 col-xs-12 animated fadeIn">        \n    <div class="popScroll">\n      <div class="row">\n        <div class="col-xs-12 title text-center">      \n          <h2>New Exercise</h2>\n          <button title="Close" ng-click="$ctrl.close()" class="popCross btn btn-default glyphicon glyphicon-remove"></button>\n        </div>\n      </div>      \n      <div class="row poplgn">         \n          <div class="col-sm-4 col-sm-offset-1"><label>Exercise Name</label> </div> \n          <div class="col-sm-5 col-sm-offset-1"><input id="newExeName" type="textbox" class="form-control" ng-model="$ctrl.exercise.name" name="exeName" required="required"></div>\n      </div>\n      <div class="row poplgn">\n        <div class="col-sm-4 col-sm-offset-1"><label>Category</label></div> \n        <div class="col-sm-6 col-sm-offset-1">Own Exercise</div>\n      </div>\n      <div class="row poplgn">\n         <div class="col-xs-11 col-sm-offset-1"><label>Description</label></div> \n         <div class="col-xs-10"><textarea class="col-xs-11 col-sm-offset-1 form-control" rows="5" ng-model="$ctrl.exercise.description"></textarea></div>\n      </div>\n      <div class="row">\n        <div class="col-xs-4 col-sm-offset-4">\n          <button class="saveBtn btn btn-default col-xs-12" ng-click="$ctrl.savePersoExe()">Save new exercise</button>\n        </div>  \n      </div>            \n    </div>\n  </div>\n  </div>\n  \n</div>'),e.put("app/components/exeDetail/exeDetail.html",'<div class="component">\n  <div class="row">\n    <div id="popDetailExe" class="popDetailExe col-sm-6 col-sm-offset-3 col-xs-12 animated fadeIn">        \n      <div class="popScroll">\n        <div class="row">\n          <div class="col-xs-12 title text-center">      \n            <h2>Detail</h2>\n            <button title="Close" ng-click="$ctrl.close()" class="popCross btn btn-default glyphicon glyphicon-remove"></button>\n          </div>\n        </div>        \n        <div class="row poplgn">\n          <img class="popImg" src="{{$ctrl.image1}}" ng-show="$ctrl.image1">\n          <img class="popImg" src="{{$ctrl.image2}}" ng-show="$ctrl.image2">\n        </div>\n        <div class="row poplgn">\n          <div class="col-sm-4 col-sm-offset-1"><strong>Exercise Name</strong></div> \n          <div class="col-sm-6 col-sm-offset-1">{{$ctrl.exercise.name}}</div>\n        </div>\n        <div class="row poplgn">\n          <div class="col-sm-4 col-sm-offset-1"><strong>Category</strong></div> \n          <div class="col-sm-6 col-sm-offset-1">{{$ctrl.category.name}}</div>\n        </div>\n        <div class="row poplgn">\n          <div class="col-xs-3 col-sm-offset-1"><strong>Description</strong></div> \n          <div id="descExe" class="poplgn col-xs-10 col-xs-offset-1"></div>\n        </div>                    \n      </div>\n    </div>\n  </div>\n</div>'),e.put("app/components/navbar/navbar.html",'<div class="component">\n  <div class="row">\n    <nav class="navbar navbar-default col-xs-12 animated fadeInUp">\n      <div class="container-fluid">\n        <div class="navbar-header">\n          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\n            <span class="sr-only">Toggle navigation</span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>\n        </div>\n        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n          <ul class="nav navbar-nav">\n            <li><a ui-sref="home">Home <span class="sr-only">(Home)</span></a></li>\n            <li><a ui-sref="programs">Routines</a></li>\n            <li><a ui-sref="createProgram">Create Routine</a></li>            \n          </ul>\n        </div>\n      </div>\n    </nav>\n  </div>\n</div>'),e.put("app/components/program/program.html",'<div class="component">\n  <div class="row text-center title animated fadeInDown"><h1>{{$ctrl.program.title}}</h1></div>  \n  <div class="row">\n    <div class="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">    \n      <ul class="list-group">\n        <li ng-repeat="item in $ctrl.program.exercises track by $index" class="list-group-item col-xs-12 itemProgram animated {{$ctrl.resumeClass[$index]}}" id="exercise{{$index}}">\n          <form ng-submit="$ctrl.nextSet($index, item)">\n            <div class="row">\n              <h4 class="itemName text-center col-xs-12">{{item.name}}</h4>              \n              <div class="col-xs-12 text-center" ng-hide="item.nbSets === 1"><label>Sets left</label> {{item.nbSets}}</div>\n              <div class="col-xs-6 col-sm-5 col-sm-offset-1">\n                <div class="col-xs-6">\n                  <label>Weight</label>   \n                </div>\n                <div class="col-xs-6">\n                  {{item.exeUnitWeight}}  \n                </div>                \n              </div>\n              <div class="col-xs-4 col-md-offset-1">\n                <div class="col-xs-6">\n                  <label>Time</label>   \n                </div>\n                <div class="col-xs-6">\n                  {{item.exeUnitTime | date : \'HH:mm:ss\'}}  \n                </div>                              \n              </div>\n              <div class="col-xs-6 col-sm-5 col-sm-offset-1" ng-hide="$index != 0 || $ctrl.resume">\n                <div class="col-xs-6">\n                  <label>Reps</label>  \n                </div>                \n                <div class="col-xs-4">\n                  <input type="number" step="any" class="exeInput form-control" min="0" ng-model="$ctrl.program.exercises[$index].reps" name="Reps">  \n                </div>                \n              </div>\n              <div class="col-xs-6 col-sm-5 col-sm-offset-1" ng-hide="!$ctrl.resume">\n                <div class="col-xs-6">\n                  <label>Reps</label>\n                </div>\n                <div class="col-xs-6">\n                  <label class="exeInput">{{item.reps}}</label>  \n                </div>                              \n              </div>\n              <div class="col-xs-4 col-md-offset-1" ng-hide="$index !== 0 || $ctrl.resume">\n                <div class="col-xs-6">\n                  <label>Time</label>\n                </div>\n                <div class="col-xs-6">\n                  <input type="time" step="1" class="exeInput timeInput form-control" ng-model="$ctrl.program.exercises[$index].time" name="Time">\n                </div>                              \n              </div>\n              <div class="col-xs-4 col-md-offset-1" ng-hide="!$ctrl.resume">\n                <div class="col-xs-6">\n                  <label>Time</label>\n                </div>\n                <div class="col-xs-6">\n                  <label class="exeInput">{{item.time | date : \'HH:mm:ss\'}}</label>  \n                </div>                \n              </div>\n              <div class="col-xs-12 text-center" ng-hide="item.exeUnitRest.getTime() === -3600000 || $ctrl.resume">\n                <div class="col-xs-4 col-xs-offset-4">\n                  <label>Rest period</label>\n                  {{item.exeUnitRest | date : \'HH:mm:ss\'}} \n                </div>                              \n              </div>\n              <div class="col-xs-12" ng-hide="$ctrl.resume || $index !== 0">\n                <button class="btn btn-default glyphicon glyphicon-ok pull-right"></button>\n              </div>\n              <div class="col-xs-12 animated flash text-center" ng-show="$ctrl.showObjectiveTxt[$index]">\n                <span class="objectiveTxt">Objective exceeded</span>\n              </div>\n            </div>\n          </form>\n        </li>\n      </ul>\n    </div>\n  </div>  \n  <div class="row">          \n    <div class="col-xs-12 text-center">\n      <button class="btn btn-default" ng-hide="!$ctrl.resume" ng-click="$ctrl.saveCompletedProg()">Complete Workout</button>\n    </div>  \n  </div>  \n</div>'),e.put("app/components/programs/programs.html",'<div class="component">\n  <div class="row title text-center animated fadeInDown"><h1>Workout Routines</h1></div>     \n  \n  <div class="row">\n    <div class="col-sm-6 col-sm-offset-3 text-center animated fadeInUp">\n      <ul ui-sortable="$ctrl.sortableOptions" ng-model="$ctrl.programs" class="list-group">\n        <li ng-repeat="e in $ctrl.programs track by $index" class="item list-group-item text-center">    \n        <div class="row">\n          <div class="itemName col-md-6">{{ e.title }}</div>      \n          <div class="btn-group col-md-6 col-lg-5 col-lg-offset-1" role="group">\n            <button ui-sref="program({id:$index})" class="programsBtn btn btn-default">Start</button>\n            <button ui-sref="createProgram({id:$index})" class="programsBtn btn btn-default">Change</button>  \n            <button ng-click="$ctrl.deleteProgram($index)" class="programsBtn btn btn-default">Delete</button>  \n          </div>\n        </div>                             \n        </li>\n      </ul>  \n    </div>\n  </div> \n  <div class="row text-center animated fadeInUp">\n    <button ui-sref="createProgram" class="btn btn-default">Create new program</button>  \n  </div>     \n</div>')}]),angular.module("app").config(routesConfig);
//# sourceMappingURL=../maps/scripts/app-f074edc692.js.map
