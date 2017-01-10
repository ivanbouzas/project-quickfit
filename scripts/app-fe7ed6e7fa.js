function ProgramService(){var e="programs",n="FitPersoExercises",t=[],s=[];this.getPrograms=function(){return null!==localStorage.getItem(e)&&(t=angular.fromJson(localStorage.getItem(e))),t},this.savePrograms=function(n){localStorage.setItem(e,angular.toJson(n))},this.saveProgramById=function(e,n){t=this.getPrograms(),t[n]=e,this.savePrograms(t)},this.getOwnExercises=function(){return null!==angular.fromJson(localStorage.getItem(n))&&(s=angular.fromJson(localStorage.getItem(n))),s},this.saveOwnExercises=function(e){localStorage.setItem(n,angular.toJson(e))}}function searchexoController(e){}function programsController(e,n){var t=this;t.programs=e.getPrograms(),t.sortableOptions={stop:function(){e.savePrograms(t.programs)}},t.deleteProgram=function(s){n.confirm("Are you sure to delete this workout ?")&&(t.programs.splice(s,1),e.savePrograms(t.programs))}}function programController(e,n,t){var s=this;s.program=e.getPrograms()[n.id];var r=[];s.resumeClass=[],s.resume=!1,s.nextSet=function(t,o){if(r.push(o),1===s.program.exercises[t].nbSets?s.program.exercises.splice(t,1):s.program.exercises[t].nbSets-=1,0===s.program.exercises.length){s.resume=!0;var l=e.getPrograms()[n.id];angular.forEach(l.exercises,function(e,n){angular.isDefined(e.reps)&&(r[n].diffrepsOldNew=e.reps-r[n].reps,e.reps>r[n].reps?s.resumeClass[n]="worse":e.reps===r[n].reps?s.resumeClass[n]="same":s.resumeClass[n]="better"),angular.isDefined(e.time)&&(r[n].difftimeOldNew=e.time-r[n].time,angular.isDefined(e.exeObjTimeType)&&("plus"===e.exeObjTimeType?e.time>r[n].time?s.resumeClass[n]="worse":e.time===r[n].time?s.resumeClass[n]="same":s.resumeClass[n]="better":"minus"===e.exeObjTimeType&&(e.time>r[n].time?s.resumeClass[n]="better":e.time===r[n].time?s.resumeClass[n]="same":s.resumeClass[n]="worse"))),angular.isDefined(e.exeObjRep)&&r[n].reps>=e.exeObjRep&&(r[n].exeUnitWeight+=r[n].exeObjWeightInc,s.resumeClass[n]="better objective"),angular.isDefined(e.exeObjTime)&&("plus"===e.exeObjTimeType?r[n].time>=e.exeObjTime&&(r[n].exeObjTime+=r[n].exeObjTimeInc,s.resumeClass[n]="better objective"):"minus"===e.exeObjTimeType&&r[n].time<=e.exeObjTime&&(r[n].exeObjTime+=r[n].exeObjTimeInc,s.resumeClass[n]="better objective"))}),s.program.exercises=r}},s.saveCompletedProg=function(){e.saveProgramById(s.program,n.id),t.go("programs")}}function navbarController(){var e=this;e.text="navbar"}function exeNewController(e,n){var t=this;t.$onInit=function(){t.exercise={}},t.close=function(){angular.element("#popNewExe").attr("style","display:none;"),angular.element("#newExeName").attr("style","border:border 1px;"),angular.element("#newExeName").next().html(""),t.exercise={name:""},t.exercise={description:""},t.overBody()},t.savePersoExe=function(){if(angular.isDefined(t.exercise.name)&&""!==t.exercise.name){var s=e.getOwnExercises();t.exercise.category="Own Exercise",t.exercise.id=angular.isUndefined(s[0])?0:s[s.length-1].id+1,s.push(t.exercise),e.saveOwnExercises(s),t.close(),n(t.onSave).then(t.overBody)}else angular.element("#newExeName").attr("style","border:solid 2px red;"),angular.element("#newExeName").after('<strong style="color:red;">Missing Title</strong>')}}function excerciceController(){this.text="My brand new component!"}function createProgramController(e,n,t,s,r,o,l){var a=this;a.exercisesNew=[],a.$onInit=function(){e.get("https://wger.de/api/v2/exercise/?language=2&format=json").then(function(e){a.data=angular.fromJson(e.data),a.exercises=angular.fromJson(e.data.results)}),e.get("https://wger.de/api/v2/exercisecategory/?format=json").then(function(e){a.categories=angular.fromJson(e.data.results)}),angular.isDefined(l.id)&&(a.oldProgram=t.getPrograms()[l.id],a.programTitle=a.oldProgram.title,a.exercisesNew=a.oldProgram.exercises),a.activeDelete=!0,a.overBody=!1},a.selectExercise=function(e){e.showObjectives=!1,a.exercisesNew.push(angular.copy(e))},a.removeExercise=function(e){a.exercisesNew.splice(e,1)},a.HighlowChange=function(e,n,t){a.exercisesNew.splice(e,1),t?a.exercisesNew.splice(e+1,0,n):a.exercisesNew.splice(e-1,0,n)},a.saveProgram=function(){if(angular.isDefined(a.programTitle)&&""!==a.programTitle){var e=t.getPrograms(),s={title:a.programTitle,exercises:a.exercisesNew};angular.isDefined(a.oldProgram)?e[l.id]=s:e.push(s),t.savePrograms(e),n.go("programs")}else angular.isUndefined(a.missingTitle)&&(angular.element("#progTitle").css("border","solid 3px red"),angular.element("#progTitle").after('<span style="color:red;"> Missing Title</span>'),a.missingTitle=!0),o.hash("progTitle"),r()},a.getDetail=function(e){a.exeDetailId=e,angular.element("#popDetailExe").css("display","block"),a.showHideOverBody()},a.createExe=function(){angular.element("#popNewExe").css("display","block"),a.showHideOverBody()},a.afficherPlus=function(){a.query=a.data.next,e.get(a.query+"&format=json").then(function(e){a.data=angular.fromJson(e.data),Array.prototype.push.apply(a.exercises,angular.fromJson(e.data.results)),null===a.data.next&&angular.element("#affPlusBtn").css("display","none")})},a.changeCat=function(){0===parseInt(a.selectedCat,10)||angular.isUndefined(a.selectedCat)?(angular.element("#affPlusBtn").css("display","none"),a.exercises=t.getOwnExercises(),a.activeDelete=!1):e.get("https://wger.de/api/v2/exercise/?category="+a.selectedCat+"&language=2&format=json").then(function(e){a.data=angular.fromJson(e.data),a.exercises=angular.fromJson(e.data.results),angular.element("#affPlusBtn").css("display","inline"),a.activeDelete=!0})},a.deleteExe=function(e){s.confirm("Are you sure to delete this exercise ?")&&(a.exercises.splice(e,1),t.saveOwnExercises(a.exercises))},a.showObjectives=function(e){a.exercisesNew[e].showObjectives=!a.exercisesNew[e].showObjectives},a.showHideOverBody=function(){a.overBody=!a.overBody}}function exeDetailController(e,n,t){var s=this;s.close=function(){angular.element("#popDetailExe").attr("style","display:none;"),s.overBody()},s.$onChanges=function(){if(angular.isDefined(s.exeDetailId))if(0===s.ownExe){var r=t.getOwnExercises();s.exercise=n("filter")(r,{id:s.exeDetailId})[0],s.category={name:"Own Exercise"},angular.isDefined(s.exercise.description)&&angular.element("#descExe").html("<strong>Description </strong>"+s.exercise.description)}else e.get("https://wger.de/api/v2/exercise/"+s.exeDetailId+"/?language=2&format=json").then(function(n){s.exercise=angular.fromJson(n.data),e.get("https://wger.de/api/v2/exercisecategory/"+s.exercise.category+"/?language=2&format=json").then(function(e){s.category=angular.fromJson(e.data)}),angular.element("#descExe").html(s.exercise.description)}),e.get("https://wger.de/api/v2/exerciseimage/?exercise="+s.exeDetailId+"&format=json").then(function(e){if(0===e.data.count)s.image1=null,s.image2=null;else{var n=angular.fromJson(e.data.results);s.image1=n[0].image,s.image2=n[1].image}})}}function chronometreController(){this.text="My brand new component!"}function calendarmainController(){this.text="My brand new component!"}function calendarDayController(){this.text="My brand new component!"}function clendarController(){this.text="My brand new component!"}function calendarController(){this.text="My brand new component!"}function routesConfig(e,n,t){t.html5Mode(!0).hashPrefix("!"),n.otherwise("/"),e.state("home",{url:"/",component:"home"}).state("programs",{url:"/programs",component:"programs"}).state("program",{url:"/program/:id",component:"program"}).state("createProgram",{url:"/createProgram?id",component:"createProgram"}).state("calendarmain",{url:"/calendarmain",component:"calendarmain"})}routesConfig.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],searchexoController.$inject=["$http"],programsController.$inject=["ProgramService","$window"],programController.$inject=["ProgramService","$stateParams","$state"],exeNewController.$inject=["ProgramService","$q"],createProgramController.$inject=["$http","$state","ProgramService","$window","$anchorScroll","$location","$stateParams"],exeDetailController.$inject=["$http","$filter","ProgramService"],angular.module("app",["ui.router","as.sortable","ui.sortable","ngSanitize"]),angular.module("app").service("ProgramService",ProgramService),angular.module("app").component("searchexo",{templateUrl:"app/components/searchexo/searchexo.html",controller:searchexoController}),angular.module("app").component("programs",{templateUrl:"app/components/programs/programs.html",controller:programsController}),angular.module("app").component("program",{templateUrl:"app/components/program/program.html",controller:programController}),angular.module("app").component("navbar",{templateUrl:"app/components/navbar/navbar.html",controller:navbarController}),angular.module("app").component("exeNew",{templateUrl:"app/components/exeNew/exeNew.html",controller:exeNewController,bindings:{onSave:"&",overBody:"&"}}),angular.module("app").component("excercice",{templateUrl:"app/components/exercice/excercice.html",controller:excerciceController}),angular.module("app").component("createProgram",{templateUrl:"app/components/createProgram/createProgram.html",controller:createProgramController}),angular.module("app").component("exeDetail",{templateUrl:"app/components/exeDetail/exeDetail.html",controller:exeDetailController,bindings:{exeDetailId:"<",ownExe:"<",overBody:"&"}}),angular.module("app").component("chronometre",{templateUrl:"app/components/chronometre/chronometre.html",controller:chronometreController}),angular.module("app").component("calendarmain",{templateUrl:"app/components/calendarmain/calendarmain.html",controller:calendarmainController}),angular.module("app").component("calendarDay",{templateUrl:"app/components/calendarDay/calendarDay.html",controller:calendarDayController}),angular.module("app").component("calendar",{templateUrl:"app/components/calendar/calendar.html",controller:clendarController}),angular.module("app").component("calendar",{templateUrl:"app/components/calendar/calendar.html",controller:calendarController}),angular.module("app").component("home",{templateUrl:"app/home.html",controller:function(){}}),angular.module("app").component("app",{templateUrl:"app/hello.html",controller:function(){this.hello="Start training TODAY!"}}),angular.module("app").run(["$templateCache",function(e){e.put("app/home.html",'<button ui-sref="programs" class="btn btn-default col-sm-4 col-sm-offset-4">Programs</button>\n'),e.put("app/components/calendarDay/calendarDay.html",'<div class="component">\n  <h2>{{$ctrl.text}}</h2>\n</div>'),e.put("app/components/calendarmain/calendarmain.html",'<div class="component">\n  <h2>{{$ctrl.text}}</h2>\n</div>'),e.put("app/components/chronometre/chronometre.html",'<div class="component">\n  <h2>{{$ctrl.text}}</h2>\n</div>'),e.put("app/components/createProgram/createProgram.html",'<div class="component">\n\n  <div class="col-xs-12"> \n    <div class="col-xs-12 text-center"><h1>Create Your Workout</h1></div>\n    <div class="col-xs-12 text-center">   \n        <h2>\n          Title\n          <input id="progTitle" ng-model="$ctrl.programTitle" type="text" name="title" required>\n        </h2>          \n    </div>  \n  </div>\n  <div class="col-xs-12">     \n    <form name="formCtrl" ng-submit="$ctrl.saveProgram()">\n\n    <div class="col-sm-5 col-sm-offset-1 listExercise text-center">\n      <hr>\n      <div class="col-xs-12"><h2>Your Workout</h2></div>\n      <ul ui-sortable="sortableOptions" ng-model="$ctrl.exercisesNew" class="list-group col-xs-12">\n        <li ng-repeat="item in $ctrl.exercisesNew track by $index" class="item list-group-item col-xs-12" ng-class="\'orderId\'+$index">\n          <div class="col-xs-5">\n            <div class="itemName">{{item.name}}</div>\n          </div>              \n          <div class="YWBtn col-xs-4 col-xs-offset-3 btn-group">\n            <span title="Move up" class="btn btn-default glyphicon glyphicon-menu-up col-xs-3" ng-click="$ctrl.HighlowChange($index, item, false)"></span> \n            <span title="Move down" class="btn btn-default glyphicon glyphicon-menu-down col-xs-3" ng-click="$ctrl.HighlowChange($index, item, true)"></span>  \n            <span title="Remove" class="btn btn-default glyphicon glyphicon-minus col-xs-6" ng-click="$ctrl.removeExercise($index)"></span>                 \n          </div>\n          <div class="col-xs-12 text-left">\n            <div class="col-xs-3">\n              Sets\n              <input type="number" min="1" class="exeInput" name="nbSets" ng-model="$ctrl.exercisesNew[$index].nbSets" required>\n            </div>\n            <div class="col-xs-3">\n              Weight\n              <input type="number" min="0" name="exeUnitWeight" class="exeInput" ng-model="$ctrl.exercisesNew[$index].exeUnitWeight">   \n            </div>                                    \n          </div>  \n          <div class="col-xs-12 text-left">\n            <div class="col-sm-6">\n              Time\n              <input type="time" step="1" name="exeUnitTime" class="exeInput timeInput" ng-model="$ctrl.exercisesNew[$index].exeUnitTime">\n            </div>\n            <div class="col-sm-5">\n              Rest period\n              <input type="time" step="1" name="exeUnitRest" class="exeInput timeInput" ng-model="$ctrl.exercisesNew[$index].exeUnitRest">\n            </div>  \n            <div class="col-sm-1">\n              <span ng-click="$ctrl.showObjectives($index)" class="btn btn-default glyphicon" ng-class="item.showObjectives ? \'glyphicon-triangle-top\' : \'glyphicon-triangle-bottom\'"></span>  \n            </div>                    \n          </div>\n          <div class="col-xs-12" ng-hide="!$ctrl.exercisesNew[$index].showObjectives">\n            <hr>\n            <div class="col-xs-12 text-center"><strong>Objectives</strong></div>\n            <div class="col-xs-12">            \n              <div class="col-sm-6">\n                Reps\n                <input type="number" min="0" name="exeObjRep" class="exeInput" ng-model="$ctrl.exercisesNew[$index].exeObjRep">\n              </div> \n              <div class="col-sm-6">              \n                Time\n                <select name="exeObjTimeType" ng-model="$ctrl.exercisesNew[$index].exeObjTimeType" ng-required="$ctrl.exercisesNew[$index].exeObjTime">\n                  <option value="plus">\n                    +\n                  </option>\n                  <option value="minus">\n                    -\n                  </option>\n                </select>\n                <input type="time" step="1" name="exeObjTime" class="exeInput timeInput" ng-model="$ctrl.exercisesNew[$index].exeObjTime" ng-required="$ctrl.exercisesNew[$index].exeObjTimeType">\n              </div>              \n            </div>\n            <div class="col-xs-12"> \n              <div class="col-xs-12 text-center"><strong>Increments</strong></div>           \n              <div class="col-sm-6">\n                Weight\n                <input type="number" min="0" name="exeObjRep" class="exeInput" ng-model="$ctrl.exercisesNew[$index].exeObjWeightInc" ng-required="$ctrl.exercisesNew[$index].exeObjRep">\n              </div> \n              <div class="col-sm-6">\n                Time                \n                <input type="time" step="1" name="exeObjTime" class="exeInput timeInput" ng-model="$ctrl.exercisesNew[$index].exeObjTimeInc" ng-required="$ctrl.exercisesNew[$index].exeObjTimeType">\n              </div>              \n            </div>                        \n          </div>\n        </li>\n      </ul>\n      <input type="submit" class="saveBtn btn btn-default" value="Save Workout">\n    </div>\n    </form>\n    <div class="col-sm-5 listExercise text-center"> \n      <hr>\n      <div class="col-xs-12">        \n        <h2>Database Exercises</h2>\n        <button class="saveBtn btn btn-default" ng-click="$ctrl.createExe()">Create New Exercise</button>\n        <div>          \n          <label>Search <input type="textbox" name="Search" ng-model="$ctrl.searchText"></label>\n          <strong>Categories</strong>\n          <select id="catList" name="categories" ng-model="$ctrl.selectedCat" ng-change="$ctrl.changeCat()">\n            <option ng-repeat="cat in $ctrl.categories track by $index" value="{{cat.id}}">\n              {{cat.name}}\n            </option>\n            <option value="0">\n              Own Exercises\n            </option>\n         </select>\n        </div>\n      </div>          \n      <ul ui-sortable="sortableOptions" ng-model="$ctrl.exercises" class="list-group">\n        <li ng-repeat="item in $ctrl.exercises | filter:$ctrl.searchText track by $index" class="item list-group-item col-xs-12">\n          <div class="DbBtn col-xs-4">\n            <span title="Add to workout" class="btn btn-default glyphicon glyphicon-plus" ng-click="$ctrl.selectExercise($ctrl.exercises[$index])"></span>\n            <span title="Detail" class="btn btn-default glyphicon glyphicon-fullscreen" ng-click="$ctrl.getDetail(item.id)"></span>\n            <span title="Delete" class="btn btn-default glyphicon glyphicon-trash" ng-click="$ctrl.deleteExe($index)" ng-hide="$ctrl.activeDelete"></span>\n          </div>\n          <div class="itemName col-xs-7 col-xs-offset-1">{{item.name}}</div>    \n        </li>\n      </ul>\n      <button id="affPlusBtn" class="btn btn-default" ng-click="$ctrl.afficherPlus()" ng-hide="$ctrl.selectedCat == 0">Afficher plus</button>\n    </div>\n  </div>\n<div id="overBody" class="col-xs-12" ng-show="$ctrl.overBody"></div>\n<exe-detail exe-detail-id="$ctrl.exeDetailId" own-exe="$ctrl.selectedCat" over-body="$ctrl.showHideOverBody()"></exe-detail>\n<exe-new on-save="$ctrl.changeCat()" over-body="$ctrl.showHideOverBody()"></exe-new>\n\n</div> \n'),e.put("app/components/exeDetail/exeDetail.html",'<div class="component">\n  <div id="popDetailExe" class="popDetailExe col-sm-4 col-sm-offset-4">  \n    <div class="col-xs-1 col-xs-offset-11">\n      <button title="Close" ng-click="$ctrl.close()" class="popCross btn btn-default glyphicon glyphicon-remove"></button>\n    </div>\n    <div class="popScroll">\n      <div class="col-xs-12">\n        <img class="popImg" src="{{$ctrl.image1}}" ng-show="$ctrl.image1">\n        <img class="popImg" src="{{$ctrl.image2}}" ng-show="$ctrl.image2">\n      </div>\n      <div class="poplgn col-xs-12">\n        <div class="col-sm-3"><strong>Exercise Name</strong></div> \n        <div class="col-sm-8 col-sm-offset-1">{{$ctrl.exercise.name}}</div>\n      </div>\n      <div class="poplgn col-xs-12">\n        <div class="col-sm-3"><strong>Category</strong></div> \n        <div class="col-sm-8 col-sm-offset-1">{{$ctrl.category.name}}</div>\n      </div>\n      <div class="poplgn col-xs-12">\n        <div class="col-xs-3"><strong>Description</strong></div> \n        <div id="descExe" class="poplgn col-xs-12"></div>\n      </div>\n                    \n    </div>\n  </div>\n</div>'),e.put("app/components/exeNew/exeNew.html",'<div class="component">\n  <div id="popNewExe" class="popNewExe col-sm-4 col-sm-offset-4 col-xs-12">\n    <button title="Close" ng-click="$ctrl.close()" class="popCross btn btn-default glyphicon glyphicon-remove col-xs-12"></button>\n  <div class="popScroll col-xs-12">\n    \n    <div class="poplgn col-xs-12">\n    \t<strong>Exercise Name</strong> \n    \t<input id="newExeName" type="textbox" ng-model="$ctrl.exercise.name" name="exeName" required="required">\n    </div>\n    <div class="poplgn col-xs-12"><strong>Category</strong> Own Exercise</div>\n    <div class="poplgn col-xs-12">\n        <div class="col-xs-12"><strong>Description<br></strong></div>\n        <textarea class="col-xs-10" rows="10" ng-model="$ctrl.exercise.description"></textarea>\n    </div> \n    <button class="saveBtn btn btn-default col-xs-12" ng-click="$ctrl.savePersoExe()">Save new exercise</button>         \n  </div>\n  </div>\n</div>'),e.put("app/components/exercice/excercice.html",'<div class="component">\n  <h2>{{$ctrl.text}}</h2>\n</div>'),e.put("app/components/navbar/navbar.html",'<div class="component">\n  <h2>{{$ctrl.text}}</h2>\n</div>'),e.put("app/components/program/program.html",'<div class="component">\n  <div class="col-xs-12">\n    <div class="col-xs-12 text-center"><h2>{{$ctrl.program.title}}</h2></div>\n    <div class="col-sm-8 col-sm-offset-2">    \n      <ul class="list-group">\n        <li ng-repeat="item in $ctrl.program.exercises track by $index" class="item list-group-item col-xs-12" ng-class="$ctrl.resumeClass[$index]" id="exe{{$index}}">\n          <form ng-submit="$ctrl.nextSet($index, item)">\n            <div class="col-xs-12">\n              <div class="itemName col-sm-2"><strong>{{item.name}}</strong></div>\n              <div class="col-sm-1" ng-hide="item.nbSets === 1">Sets left {{item.nbSets}}</div>\n              <div class="col-sm-1">Weight {{item.exeUnitWeight}}</div>\n              <div class="col-sm-1">Time {{item.exeUnitTime | date : \'HH:mm:ss\'}}</div>\n              <div class="col-sm-1" ng-hide="$index != 0 || $ctrl.resume">\n                Reps\n                <input type="number" class="exeInput" min="0" ng-model="$ctrl.program.exercises[$index].reps" name="Reps">\n              </div>\n              <div class="col-sm-1" ng-hide="!$ctrl.resume">\n                Reps\n                <label class="exeInput">{{item.reps}}</label>\n              </div>\n              <div class="col-sm-2" ng-hide="$index != 0 || $ctrl.resume">\n                Time\n                <input type="time" step="1" class="exeInput timeInput" ng-model="$ctrl.program.exercises[$index].time" name="Time">\n              </div>\n              <div class="col-sm-1" ng-hide="!$ctrl.resume">\n                Time\n                <label class="exeInput">{{item.time | date : \'HH:mm:ss\'}}</label>\n              </div>\n              <div class="col-sm-2">\n                Rest period {{item.exeUnitRest | date : \'HH:mm:ss\'}}\n              </div>\n              <div class="col-sm-2" ng-hide="$ctrl.resume || $index != 0">\n                <button class="btn btn-default glyphicon glyphicon-ok"></button>\n              </div>\n              <div class="col-sm-2" ng-hide="!angular.element(\'#exe\' + $index).hasClass(\'objective\')">\n                <span class="objectiveTxt">Objective exceeded</span>\n              </div>\n            </div></form>\n        </li>\n      </ul>\n    </div>  \n    <div class="col-xs-12 text-center">\n      <button class="btn btn-default" ng-hide="!$ctrl.resume" ng-click="$ctrl.saveCompletedProg()">Complete Workout</button>\n    </div>  \n  </div>  \n</div>'),e.put("app/components/programs/programs.html",'<div class="component">\n  <div class="col-sm-12">\n    <div class="col-sm-12 text-center">\n      <button ui-sref="createProgram" class="btn btn-default">Create new program</button>  \n    </div>\n    <div class="col-sm-4 col-sm-offset-3 text-center">\n      <ul ui-sortable="$ctrl.sortableOptions" ng-model="$ctrl.programs" class="list-group">\n        <li ng-repeat="e in $ctrl.programs track by $index" class="item list-group-item col-sm-12 col-sm-offset-3 text-center">\n          <div class="workoutTitle col-sm-6">{{ e.title }}</div>\n          <button ui-sref="program({id:$index})" class="btn btn-default col-sm-2">Start</button>\n          <button ui-sref="createProgram({id:$index})" class="btn btn-default col-sm-2">Change</button>  \n          <button ng-click="$ctrl.deleteProgram($index)" class="btn btn-default col-sm-2">Delete</button>     \n        </li>\n      </ul>  \n    </div>     \n  </div>   \n</div>')}]),angular.module("app").config(routesConfig),window.mobilecheck=function(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))};
//# sourceMappingURL=../maps/scripts/app-fe7ed6e7fa.js.map
