
/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 *
 */
var App;

if (typeof $ === 'undefined') {
  throw new Error('This application\'s JavaScript requires jQuery');
}

App = angular.module('angle', ['smart-table', 'ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ngSanitize', 'ngResource', 'ui.utils', 'toaster', 'jsonFormatter']).run([
  'mojioGlobal', '$rootScope', '$state', '$stateParams', '$window', '$templateCache', function(mojioGlobal, $rootScope, $state, $stateParams, $window, $templateCache) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $window.localStorage;

    /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (typeof(toState) !== 'undefined'){
          $templateCache.remove(toState.templateUrl);
        }
    });
     */
    $rootScope.basepath = "app/views/";
    $rootScope.app = {
      name: 'Mojio Admin',
      description: 'Mojio Admin Dashboard',
      year: (new Date).getFullYear(),
      layout: {
        isFixed: true,
        isCollapsed: false,
        isBoxed: false,
        isRTL: false,
        horizontal: false,
        isFloat: false,
        asideHover: false
      },
      useFullLayout: false,
      hiddenFooter: false,
      viewAnimation: 'ng-fadeInUp'
    };
    $rootScope.user = {
      name: '',
      job: 'Admin',
      picture: 'app/img/user/02.jpg'
    };
    mojioGlobal.checkAccess();
  }
]);


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================
 */
App.config([
  '$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider', function($stateProvider, $locationProvider, $urlRouterProvider, helper) {
    'use strict';
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/app/dashboard');
    $stateProvider.state('app', {
      url: '/app',
      abstract: true,
      templateUrl: helper.basepath('app.html'),
      controller: 'AppController',
      resolve: helper.resolveFor('modernizr', 'icons')
    }).state('app.dashboard', {
      url: '/dashboard',
      title: 'Dashboard',
      templateUrl: helper.basepath('dashboard.html')
    }).state('app.devicelist', {
      url: '/devicelist/:search',
      title: 'Device List',
      templateUrl: helper.basepath('devicelist.html')
    }).state('app.devicedetail', {
      url: '/devicedetail/:id',
      title: 'Device Management',
      templateUrl: helper.basepath('devicedetail.html')
    }).state('app.configlist', {
      url: '/configlist',
      title: 'Config List',
      templateUrl: helper.basepath('configlist.html')
    }).state('app.configdetail', {
      url: '/configdetail/:id',
      title: 'Config Detail',
      templateUrl: helper.basepath('configdetail.html')
    }).state('app.firmwarelist', {
      url: '/firmwarelist',
      title: 'Firmware List',
      templateUrl: helper.basepath('firmwarelist.html')
    }).state('app.firmwaredetail', {
      url: '/firmwaredetail/:id',
      title: 'Firmware Detail',
      templateUrl: helper.basepath('firmwaredetail.html')
    }).state('app.simcardlist', {
      url: '/simcardlist',
      title: 'SIM Card List',
      templateUrl: helper.basepath('simcard.html')
    }).state('app.adminsearch', {
      url: '/adminsearch/:key',
      title: 'Admin Search',
      templateUrl: helper.basepath('adminsearch.html')
    }).state('app.operations', {
      url: '/operations',
      title: 'Operation List',
      templateUrl: helper.basepath('operations_list.html')
    }).state('app.importdevices', {
      url: '/importdevices',
      title: 'Import Mojio Devices',
      templateUrl: helper.basepath('import_devices.html')
    }).state('app.importsims', {
      url: '/importsims',
      title: 'Import SIMs',
      templateUrl: helper.basepath('import_sims.html')
    }).state('app.observe', {
      url: '/observe',
      title: 'observe',
      templateUrl: helper.basepath('observe.html')
    }).state('app.portal', {
      url: '/portal/:pid',
      title: 'Portal',
      templateUrl: helper.basepath('portal.html')
    });
  }
]).config([
  '$ocLazyLoadProvider', 'APP_REQUIRES', function($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });
  }
]).config([
  '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function($controllerProvider, $compileProvider, $filterProvider, $provide) {
    'use strict';
    App.controller = $controllerProvider.register;
    App.directive = $compileProvider.directive;
    App.filter = $filterProvider.register;
    App.factory = $provide.factory;
    App.service = $provide.service;
    App.constant = $provide.constant;
    App.value = $provide.value;
  }
]).config([
  '$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'app/i18n/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);
  }
]).config([
  'cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
  }
]);


/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================
 */
App.constant('APP_COLORS', {
  'primary': '#5d9cec',
  'success': '#27c24c',
  'info': '#23b7e5',
  'warning': '#ff902b',
  'danger': '#f05050',
  'inverse': '#131e26',
  'green': '#37bc9b',
  'pink': '#f532e5',
  'purple': '#7266ba',
  'dark': '#3a3f51',
  'yellow': '#fad732',
  'gray-darker': '#232735',
  'gray-dark': '#3a3f51',
  'gray': '#dde6e9',
  'gray-light': '#e4eaec',
  'gray-lighter': '#edf1f2'
}).constant('APP_MEDIAQUERY', {
  'desktopLG': 1200,
  'desktop': 992,
  'tablet': 768,
  'mobile': 480
}).constant('APP_REQUIRES', {
  scripts: {
    'modernizr': ['vendor/modernizr/modernizr.js'],
    'icons': []
  },
  modules: []
});


/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================
 */
App.controller('AppController', [
  '$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'cfpLoadingBar', 'mojioGlobal', function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, cfpLoadingBar, mojioGlobal) {
    'use strict';
    var thBar;
    $rootScope.app.layout.horizontal = $rootScope.$stateParams.layout === 'app-h';
    thBar = void 0;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if ($('.wrapper > section').length) {
        thBar = $timeout((function() {
          cfpLoadingBar.start();
        }), 0);
      }
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      event.targetScope.$watch('$viewContentLoaded', function() {
        $timeout.cancel(thBar);
        cfpLoadingBar.complete();
      });
    });
    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
      console.log(unfoundState.to);
      console.log(unfoundState.toParams);
      console.log(unfoundState.options);
    });
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      console.log(error);
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $window.scrollTo(0, 0);
      $rootScope.currTitle = $state.current.title;
    });
    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
      var title;
      title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
      document.title = title;
      return title;
    };
    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
      if (newValue === false) {
        $rootScope.$broadcast('closeSidebarMenu');
      }
    });
    if (angular.isDefined($localStorage.layout)) {
      $scope.app.layout = $localStorage.layout;
    } else {
      $localStorage.layout = $scope.app.layout;
    }
    $rootScope.$watch('app.layout', (function() {
      $localStorage.layout = $scope.app.layout;
    }), true);
    $scope.toggleUserBlock = (function() {
      console.log('user click');
      return $scope.$broadcast('toggleUserBlock');
    });
    $scope.userLogout = (function() {
      console.log('user Logout');
      return mojioGlobal.logout();
    });
    $scope.colorByName = colors.byName;
    $scope.language = {
      listIsOpen: false,
      available: {
        'en': 'English',
        'es_AR': 'Español'
      },
      init: function() {
        var preferredLanguage, proposedLanguage;
        proposedLanguage = $translate.proposedLanguage() || $translate.use();
        preferredLanguage = $translate.preferredLanguage();
        $scope.language.selected = $scope.language.available[proposedLanguage || preferredLanguage];
      },
      set: function(localeId, ev) {
        $translate.use(localeId);
        $scope.language.selected = $scope.language.available[localeId];
        $scope.language.listIsOpen = !$scope.language.listIsOpen;
      }
    };
    $scope.language.init();
    toggle.restoreState($(document.body));
    $rootScope.cancel = function($event) {
      $event.stopPropagation();
    };
  }
]);


/**
 * Created by pooyaparidel on 15-03-05.
 */
(function(module) {
  var mojioGridController;
  mojioGridController = function($stateParams, $state, $rootScope, $location, $scope, $element, localStorage, $q, $filter, $timeout, $http, mojioGlobal) {
    var CachedItems, DefaultSetting, DefaultSettingKey, allData, controllerName, ctrl, fieldsTags, getPage, isPageReady, mojioApi, mojioCriteria, mojioModel, mojioModelNo, numberOfPages, show, sid, td;
    controllerName = $element[0].getAttribute('data-alias');
    DefaultSettingKey = 'DefaultSettingKey_' + location.hash.substr(1) + "_" + controllerName;
    ctrl = this;
    isPageReady = function(start, number) {
      var page;
      page = start / number;
      if (typeof CachedItems[page] !== 'undefined') {
        return true;
      } else {
        return false;
      }
    };
    getPage = function(mojioModel, mojioCriteria, start, number, params, auto) {
      var config, deferred, page, url;
      page = start / number;
      if (typeof CachedItems[page] !== 'undefined') {
        if (!auto && page + 1 < numberOfPages && typeof CachedItems[page + 1] === 'undefined') {
          getPage(mojioModel, mojioCriteria, start + number, number, params, true);
        }
        return {
          data: CachedItems[page],
          numberOfPages: numberOfPages
        };
      }
      config = {
        headers: {
          'Content-Type': ' application/json',
          'MojioAPIToken': mojioGlobal.data.access_token
        }
      };
      deferred = $q.defer();
      url = mojioGlobal.apiUrl() + mojioModel + '?limit=' + number + '&offset=' + page * number;
      if (mojioCriteria.length !== 0) {
        url += '&criteria=' + escape(mojioCriteria);
      }
      $http.get(url, config).success(function(response) {
        var numberOfPages, result;
        result = response.Data;
        CachedItems[page] = result;
        numberOfPages = Math.ceil(response.TotalRows / number);
        if (!auto) {
          deferred.resolve({
            data: result,
            numberOfPages: numberOfPages
          });
          if (page + 1 < numberOfPages && typeof CachedItems[page + 1] === 'undefined') {
            getPage(mojioModel, mojioCriteria, start + number, number, params, true);
          }
        }
      });
      return deferred.promise;
    };
    allData = function() {
      var data, ipos, key;
      data = [];
      for (key in CachedItems) {
        ipos = 0;
        while (ipos < CachedItems[key].length) {
          data.push(CachedItems[key][ipos]);
          ipos++;
        }
      }
      return data;
    };
    $scope.EXPORT_CURRENT_PAGE = 1;
    $scope.EXPORT_VISITED_PAGES = 2;
    $scope.EXPORT_CSV = 1;
    mojioModelNo = 0;
    mojioApi = JSON.parse($element[0].getAttribute('data-mojioApi'));
    sid = $scope.$parent.selectedId;

    /*
    ipos = 0
    while ipos < mojioApi.length
    
      mojioApi[ipos].MojioModel = mojioApi[ipos].MojioModel.replace(':id', sid)
    
      if mojioApi[ipos].defaultCriteria
        mojioApi[ipos].defaultCriteria = mojioApi[ipos].defaultCriteria.replace(':id', sid)
    
      if mojioApi[ipos].criteria
        mojioApi[ipos].criteria = mojioApi[ipos].criteria.replace(':id', sid)
    
      ipos++
     */
    mojioModel = mojioApi[0].MojioModel;
    if (mojioApi[0].defaultCriteria) {
      mojioCriteria = mojioApi[0].defaultCriteria;
    } else {
      mojioCriteria = '';
    }
    if (mojioCriteria[0] === ':') {
      mojioCriteria = $stateParams[mojioCriteria.substr(1)];
    }
    $scope.displayed = [];
    $scope.isLoading = false;
    $scope.selectedRow = null;
    $scope.subGrid = null;
    $scope.subGridType = '';
    $scope.s = {
      f: [],
      itemsPerPage: 10
    };
    DefaultSetting = JSON.parse(localStorage.get(DefaultSettingKey));
    if (DefaultSetting === null) {
      DefaultSetting = $scope.s;
    } else {
      $scope.s.itemsPerPage = DefaultSetting.itemsPerPage;
      $scope.itemsPerPage = DefaultSetting.itemsPerPage;
    }
    fieldsTags = $element[0].getElementsByClassName('fieldHeader');
    td = 0;
    while (td < fieldsTags.length) {
      show = fieldsTags[td].getAttribute('data-show') === 'true';
      if (typeof DefaultSetting.f[td] !== 'undefined') {
        show = DefaultSetting.f[td].show;
      }
      $scope.s.f.push({
        name: fieldsTags[td].innerText,
        show: show
      });
      td++;
    }
    CachedItems = {};
    numberOfPages = 0;
    ctrl.clearCachedPage = function() {
      CachedItems = {};
      numberOfPages = 0;
    };
    $scope.ShowHide = function(field) {
      var row;
      for (row in $scope.s.f) {
        if ($scope.s.f[row].name === field) {
          $scope.s.f[row].show = !this.s.f[row].show;
        }
      }
      localStorage.add(DefaultSettingKey, JSON.stringify($scope.s));
    };
    $scope.changeItemsPerPage = function(itemsPerPage) {
      $scope.s.itemsPerPage = itemsPerPage;
      localStorage.add(DefaultSettingKey, JSON.stringify($scope.s));
      ctrl.tableState.pagination.number = itemsPerPage;
      ctrl.tableState.pagination.start = 0;
      ctrl.clearCachedPage();
      $scope.callServer(ctrl.tableState);
    };
    $scope.exportData = function(page, type) {
      var data, fileName;
      data = null;
      fileName = '';
      if (page === $scope.EXPORT_CURRENT_PAGE) {
        data = $scope.displayed;
      } else {
        data = allData();
      }
      if (type = $scope.EXPORT_CSV) {
        fileName = 'export.csv';
        saveAs(ctrl.prepareCsv(data), fileName);
      } else {
        fileName = 'export.csv';
      }
    };
    this.prepareCsv = function(data) {
      var cols, csv_data, ipos, itm, rows;
      rows = [];
      ipos = 0;
      while (ipos < data.length) {
        cols = void 0;
        if (ipos === 0) {
          cols = [];
          for (itm in data[ipos]) {
            if (data[ipos].hasOwnProperty(itm)) {
              cols.push(itm);
            }
          }
          rows.push(cols.join(','));
        }
        cols = [];
        for (itm in data[ipos]) {
          if (data[ipos].hasOwnProperty(itm)) {
            cols.push(data[ipos][itm]);
          }
        }
        rows.push(cols.join(','));
        ipos++;
      }
      csv_data = rows.join('\r\n');
      return new Blob([csv_data], {
        type: 'application/csv'
      });
    };
    $scope.oldSearch = function(searchID) {
      var fieldName, ipos, value;
      mojioModel = mojioApi[searchID].MojioModel;
      mojioCriteria = mojioApi[searchID].criteria.split(',');
      ipos = 0;
      while (ipos < mojioCriteria.length) {
        fieldName = mojioCriteria[ipos].split('=')[1];
        value = $element[0].querySelectorAll('[name="' + fieldName + '"]')[0].value;
        if (value.length !== 0) {
          mojioCriteria[ipos] = mojioCriteria[ipos].replace(fieldName, value);
        } else {
          mojioCriteria[ipos] = '';
        }
        ipos++;
      }
      mojioCriteria = mojioCriteria.join(',');
      ctrl.clearCachedPage();
      $scope.displayed = [];
      $scope.selectedRow = null;
      $scope.callServer(ctrl.tableState);
    };
    $scope.newSearch = function(searchID) {
      var block, blocks, ipos, value, word;
      mojioModel = mojioApi[searchID].MojioModel;
      mojioCriteria = mojioApi[searchID].criteria;
      blocks = mojioCriteria.match(/[^[\]]+(?=])/g);
      ipos = 0;
      while (blocks !== null && ipos < blocks.length) {
        word = blocks[ipos].match(/[^{\}]+(?=})/g);
        value = $element[0].querySelectorAll('[name="' + word + '"]')[0].value;
        if (value.length === 0) {
          mojioCriteria = mojioCriteria.replace("[" + blocks[ipos] + "]", "");
        } else {
          block = blocks[ipos].replace("{" + word + "}", value);
          mojioCriteria = mojioCriteria.replace("[" + blocks[ipos] + "]", block);
        }
        ipos++;
      }
      console.log(mojioCriteria);
      ctrl.clearCachedPage();
      $scope.displayed = [];
      $scope.selectedRow = null;
      $scope.callServer(ctrl.tableState);
    };
    $rootScope.$on('MojioObjectSelected', function(event, data) {
      var ipos, modelId;
      modelId = -1;
      if (data === null && mojioModelNo !== 0) {
        modelId = 0;
      } else {
        ipos = 0;
        while (modelId === -1 && ipos < mojioApi.length) {
          if (mojioApi[ipos].Parent === data.Type) {
            modelId = ipos;
          }
          ipos++;
        }
        if (modelId === -1) {
          return;
        }
      }
      mojioModelNo = modelId;
      mojioModel = mojioApi[modelId].MojioModel;
      if (mojioApi[modelId].defaultCriteria) {
        mojioCriteria = mojioApi[modelId].defaultCriteria;
      } else {
        mojioCriteria = "";
      }
      sid = data._id;
      ctrl.clearCachedPage();
      $scope.displayed = [];
      $scope.selectedRow = null;
      $scope.callServer(ctrl.tableState);
    });
    $scope.detailRow = function(row, type) {
      console.log(type);
      if (typeof type === "undefined") {
        type = "";
      } else if (type === "broadcast") {
        $rootScope.$broadcast('MojioObjectSelected', row);
        return;
      }
      $scope.selectedRow = row;
      $scope.selectedType = type;
    };
    $scope.showSubGrid = function(row, type) {
      $scope.subGrid = row;
      $scope.subGridType = type;
      $scope.selectedId = row._id;
    };
    $scope.showDetailView = function(view, storeName, row) {
      $rootScope[storeName] = row;
      $state.go(view, {
        id: row._id
      });
    };
    $scope.callServer = function(tableState) {
      var number, pagination, result, start;
      if (typeof tableState === 'undefined') {
        if (typeof ctrl.tableState === 'undefined') {
          return;
        } else {
          tableState = ctrl.tableState;
        }
      }
      if (typeof ctrl.firstLoad === 'undefined' && typeof tableState.pagination.number !== 'undefined') {
        ctrl.firstLoad = false;
        return;
      }
      ctrl.tableState = tableState;
      pagination = tableState.pagination;
      start = pagination.start || 0;
      number = pagination.number || 10;
      mojioModel = mojioModel.replace(':id', sid);
      mojioCriteria = mojioCriteria.replace(':id', sid);
      if (isPageReady(start, number)) {
        result = getPage(mojioModel, mojioCriteria, start, number, tableState, false);
        $scope.displayed = result.data;
      } else {
        $scope.isLoading = true;
        getPage(mojioModel, mojioCriteria, start, number, tableState, false).then(function(result) {
          $scope.displayed = result.data;
          tableState.pagination.numberOfPages = result.numberOfPages;
          $scope.isLoading = false;
        });
      }
    };
  };
  module.controller('mojioGridController', ['$stateParams', '$state', '$rootScope', '$location', '$scope', '$element', 'localStorage', '$q', '$filter', '$timeout', '$http', 'mojioGlobal', mojioGridController]);
})(angular.module('angle'));


/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================
 */
App.controller('SidebarController', [
  '$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils', function($rootScope, $scope, $state, $http, $timeout, Utils) {
    var closeAllBut, collapseList, isActive, isChild, sidebarMenuData, today, todayString, yesterday, yesterdayString;
    today = new Date();
    yesterday = new Date();
    yesterday.setDate((new Date()).getDate() - 1);
    todayString = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();
    yesterdayString = yesterday.getFullYear() + "." + (yesterday.getMonth() + 1) + "." + yesterday.getDate();
    sidebarMenuData = [
      {
        'text': 'Dashboard',
        'sref': 'app.dashboard',
        'icon': 'fa fa-dashboard'
      }, {
        'text': 'My Space',
        'sref': '#',
        'icon': 'fa fa-qrcode',
        'submenu': [
          {
            'text': 'Space 1',
            'sref': 'app.portal',
            'icon': 'fa fa-qrcode',
            'params': {
              pid: "1"
            }
          }, {
            'text': 'Space 2',
            'sref': 'app.portal',
            'icon': 'fa fa-qrcode',
            'params': {
              pid: "2"
            }
          }
        ]
      }, {
        'text': 'Device',
        'sref': '#',
        'icon': 'fa fa-cubes',
        'submenu': [
          {
            'text': 'Device List',
            'sref': 'app.devicelist',
            'icon': 'fa fa-hdd-o'
          }, {
            'text': 'Configuration List',
            'sref': 'app.configlist',
            'icon': 'fa fa-sliders'
          }, {
            'text': 'Firmware List',
            'sref': 'app.firmwarelist',
            'icon': 'fa fa-plug'
          }, {
            'text': 'Sim Card List',
            'sref': 'app.simcardlist',
            'icon': 'fa fa-mobile'
          }
        ]
      }, {
        'text': 'Reports',
        'sref': '#',
        'icon': 'fa fa-file-text',
        'submenu': [
          {
            'text': 'Device in Operation',
            'sref': 'app.devicelist',
            'icon': 'fa fa-hdd-o',
            'params': {
              search: "LastContactTime=" + yesterdayString + "-" + todayString
            }
          }
        ]
      }, {
        'text': 'Inventory',
        'sref': '#',
        'icon': 'fa fa-upload',
        'submenu': [
          {
            'text': 'Import Mojio Devices',
            'sref': 'app.importdevices',
            'icon': 'fa fa-upload'
          }, {
            'text': 'Import Mojio SIMs',
            'sref': 'app.importsims',
            'icon': 'fa fa-mobile'
          }
        ]
      }, {
        'text': 'Utility',
        'sref': '#',
        'icon': 'fa fa-gears',
        'submenu': [
          {
            'text': 'Operation List',
            'sref': 'app.operations',
            'icon': 'fa fa-tasks'
          }
        ]
      }
    ];
    collapseList = [];
    closeAllBut = function(index) {
      var i;
      index += '';
      for (i in collapseList) {
        if (index < 0 || index.indexOf(i) < 0) {
          collapseList[i] = true;
        }
      }
    };
    isChild = function($index) {
      return typeof $index === 'string' && !($index.indexOf('-') < 0);
    };
    $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal) {
      if (newVal === false && oldVal === true) {
        closeAllBut(-1);
      }
    });
    isActive = function(item) {
      var foundActive;
      if (!item) {
        return;
      }
      if (!item.sref || item.sref === '#') {
        foundActive = false;
        angular.forEach(item.submenu, function(value, key) {
          if (isActive(value)) {
            foundActive = true;
          }
        });
        return foundActive;
      } else {
        return $state.is(item.sref) || $state.includes(item.sref);
      }
    };
    $scope.getMenuItemPropClasses = function(item) {
      return (item.heading ? 'nav-heading' : '') + (isActive(item) ? ' active' : '');
    };
    $rootScope.menuItems = sidebarMenuData;
    $scope.addCollapse = function($index, item) {
      collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    };
    $scope.isCollapse = function($index) {
      return collapseList[$index];
    };
    $scope.toggleCollapse = function($index, isParentItem) {
      if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) {
        return true;
      }
      if (angular.isDefined(collapseList[$index])) {
        if (!$scope.lastEventFromChild) {
          collapseList[$index] = !collapseList[$index];
          closeAllBut($index);
        }
      } else if (isParentItem) {
        closeAllBut(-1);
      }
      $scope.lastEventFromChild = isChild($index);
      return true;
    };
  }
]);

App.controller('UserBlockController', [
  '$scope', function($scope) {
    $scope.userBlockVisible = true;
    $scope.$on('toggleUserBlock', function(event, args) {
      $scope.userBlockVisible = !$scope.userBlockVisible;
    });
  }
]);

(function(module) {
  var areYouSure;
  areYouSure = function($modal) {
    return {
      restrict: 'A',
      scope: {
        areYouSure: '&',
        item: '='
      },
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          var message, modalHtml, modalInstance;
          message = attrs.message || 'Are you sure ?';
          modalHtml = '<div class="modal-body">' + message + '</div>';
          modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>';
          modalInstance = $modal.open({
            template: modalHtml,
            controller: function($scope, $modalInstance) {
              $scope.ok = function() {
                $modalInstance.close();
              };
              $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
              };
            }
          });
          modalInstance.result.then((function() {
            scope.areYouSure({
              item: scope.item
            });
          }), function() {});
        });
      }
    };
  };
  return module.directive('areYouSure', areYouSure);
})(angular.module('angle'));

(function(module) {
  var dynamic;
  dynamic = function($compile) {
    return {
      restrict: 'AE',
      replace: false,
      link: function(scope, ele, attrs) {
        return scope.$watch(attrs.dynamic, function(html) {
          ele.html(html);
          $compile(ele.contents())(scope);
        });
      }
    };
  };
  return module.directive('dynamic', dynamic);
})(angular.module('angle'));

(function(module) {
  var mojioLocation;
  mojioLocation = function($modal, $templateCache, $compile) {
    return {
      restrict: 'EA',
      scope: {
        geoloc: '=',
        address: '='
      },
      controller: function($scope) {},
      link: function(scope, element) {
        var adr, mtitle, text;
        if (scope.geoloc !== null) {
          $templateCache.put('mojioLocationTemplate.html', '<div class="modal-header"> <h3 class="modal-title">{{mtitle}}</h3> </div> <div class="modal-body" style="height: 300px" mojio-simple-map geoloc="geoloc"></div>');
          text = '';
          mtitle = '';
          if (typeof scope.address !== 'undefined' && scope.address !== null) {
            adr = scope.address;
            mtitle = adr.Address1;
            if (adr.Address2 !== null) {
              mtitle += ", " + adr.Address2;
            }
            mtitle += ", " + adr.City + ", " + adr.State + ", " + adr.Zip + " " + adr.Country;
            text = adr.Address1 + ", " + adr.City;
          } else {
            mtitle = scope.geoloc.Lat.toFixed(2) + " , " + scope.geoloc.Lng.toFixed(2);
            text = scope.geoloc.Lat.toFixed(2) + " , " + scope.geoloc.Lng.toFixed(2);
          }
          element[0].innerHTML = "<a href='#'><li class='fa fa-crosshairs '> " + text + "</a>";
          return element.on('click', function() {
            return scope.modalInstance = $modal.open({
              size: 'lg',
              templateUrl: 'mojioLocationTemplate.html',
              controller: function($scope, geoloc, mtitle) {
                $scope.geoloc = geoloc;
                return $scope.mtitle = mtitle;
              },
              resolve: {
                geoloc: function() {
                  return scope.geoloc;
                },
                mtitle: function() {
                  return mtitle;
                }
              }
            });
          });
        }
      }
    };
  };
  return module.directive('mojioLocation', mojioLocation);
})(angular.module('angle'));

(function(module) {
  var mojioSimpleMap;
  mojioSimpleMap = function() {
    return {
      restrict: 'EA',
      scope: {
        geoloc: '='
      },
      link: function(scope, element) {
        var map, marker, myLatlng, myOptions;
        myLatlng = new google.maps.LatLng(scope.geoloc.Lat, scope.geoloc.Lng);
        myOptions = {
          zoom: 12,
          disableDefaultUI: true,
          navigationControl: true,
          navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
          },
          center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(element[0], myOptions);
        marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: "Marker"
        });
        return window.setTimeout(function() {
          return google.maps.event.trigger(map, "resize");
        }, 100);
      }
    };
  };
  return module.directive('mojioSimpleMap', mojioSimpleMap);
})(angular.module('angle'));

(function(module) {
  var morrisChart;
  morrisChart = function() {
    return {
      restrict: 'EA',
      template: '<div></div>',
      replace: true,
      link: function($scope, element, attrs) {
        var data, labels, lineColors, xLabelFormat, xkey, ykeys;
        data = $scope[attrs.data];
        xkey = $scope[attrs.xkey];
        ykeys = $scope[attrs.ykeys];
        labels = $scope[attrs.labels];
        xLabelFormat = $scope[attrs.xLabelFormat];
        lineColors = $scope[attrs.lineColors];
        Morris.Line({
          element: element,
          data: data,
          xkey: xkey,
          ykeys: ykeys,
          labels: labels,
          xLabelFormat: xLabelFormat,
          lineColors: lineColors
        });
      }
    };
  };
  return module.directive('morrisChart', morrisChart);
})(angular.module('angle'));


/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================
 */
App.directive('searchOpen', [
  'navSearch', function(navSearch) {
    'use strict';
    return {
      restrict: 'A',
      controller: ["$scope", "$element", function($scope, $element) {
        $element.on('click', function(e) {
          e.stopPropagation();
        }).on('click', navSearch.toggle);
      }]
    };
  }
]).directive('searchDismiss', [
  'navSearch', '$state', function(navSearch, $state) {
    'use strict';
    var inputSelector;
    inputSelector = '.navbar-form input[type="text"]';
    return {
      restrict: 'A',
      controller: ["$scope", "$element", "$document", function($scope, $element, $document) {
        $(inputSelector).on('click', function(e) {
          e.stopPropagation();
        }).on('keyup', function(e) {
          if (e.keyCode === 27) {
            navSearch.dismiss();
          }
        }).on('keypress', function(e) {
          var param;
          if (e.keyCode === 13) {
            param = this.value;
            navSearch.dismiss();
            $state.go('app.adminsearch', {
              key: param
            });
          }
        });
        $(document).on('click', navSearch.dismiss);
        $document.bind('keypress', function(e) {
          var nodeName;
          if (e.which === 47 || e.which === 63) {
            nodeName = e.target.nodeName;
            if (nodeName !== "INPUT" && nodeName !== "TEXTAREA") {
              navSearch.toggle();
              return false;
            }
          }
        });
        $element.on('click', function(e) {
          e.stopPropagation();
        }).on('click', navSearch.dismiss);
      }]
    };
  }
]);


/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================
 */
App.directive('sidebar', [
  '$rootScope', '$window', 'Utils', function($rootScope, $window, Utils) {
    var $body, $scope, $sidebar, $win, currentState, removeFloatingNav, sidebarAddBackdrop, toggleMenuItem, toggleTouchItem;
    $win = $($window);
    $body = $('body');
    $scope = void 0;
    $sidebar = void 0;
    currentState = $rootScope.$state.current.name;
    sidebarAddBackdrop = function() {
      var $backdrop;
      $backdrop = $('<div/>', {
        'class': 'dropdown-backdrop'
      });
      $backdrop.insertAfter('.aside-inner').on('click mouseenter', function() {
        removeFloatingNav();
      });
    };
    toggleTouchItem = function($element) {
      $element.siblings('li').removeClass('open').end().toggleClass('open');
    };
    toggleMenuItem = function($listItem) {
      var $aside, $asideInner, itemTop, mar, subNav, ul, vwHeight;
      removeFloatingNav();
      ul = $listItem.children('ul');
      if (!ul.length) {
        return $();
      }
      if ($listItem.hasClass('open')) {
        toggleTouchItem($listItem);
        return $();
      }
      $aside = $('.aside');
      $asideInner = $('.aside-inner');
      mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
      subNav = ul.clone().appendTo($aside);
      toggleTouchItem($listItem);
      itemTop = $listItem.position().top + mar - $sidebar.scrollTop();
      vwHeight = $win.height();
      subNav.addClass('nav-floating').css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top: itemTop,
        bottom: subNav.outerHeight(true) + itemTop > vwHeight ? 0 : 'auto'
      });
      subNav.on('mouseleave', function() {
        toggleTouchItem($listItem);
        subNav.remove();
      });
      return subNav;
    };
    removeFloatingNav = function() {
      $('.dropdown-backdrop').remove();
      $('.sidebar-subnav.nav-floating').remove();
      $('.sidebar li.open').removeClass('open');
    };
    return {
      restrict: 'EA',
      template: '<nav class="sidebar" ng-transclude></nav>',
      transclude: true,
      replace: true,
      link: function(scope, element, attrs) {
        var eventName, subNav;
        $scope = scope;
        $sidebar = element;
        eventName = Utils.isTouch() ? 'click' : 'mouseenter';
        subNav = $();
        $sidebar.on(eventName, '.nav > li', function() {
          if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) {
            subNav.trigger('mouseleave');
            subNav = toggleMenuItem($(this));
            sidebarAddBackdrop();
          }
        });
        scope.$on('closeSidebarMenu', function() {
          removeFloatingNav();
        });
        $win.on('resize', function() {
          if (!Utils.isMobile()) {
            $body.removeClass('aside-toggled');
          }
        });
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          currentState = toState.name;
          $('body.aside-toggled').removeClass('aside-toggled');
          $rootScope.$broadcast('closeSidebarMenu');
        });
      }
    };
  }
]);

(function(module) {
  var slowUpdate;
  slowUpdate = function() {
    return {
      restrict: 'EA',
      scope: {
        real: '=',
        typ: '='
      },
      link: function(scope, element) {
        var changeNum, changeStr;
        changeStr = function() {
          var change, code, curr, diff, ipos, real;
          if (typeof scope.real === "undefined") {
            window.setTimeout(changeStr, 500);
          }
          real = scope.real;
          curr = element[0].innerHTML;
          if (curr === real) {
            window.setTimeout(changeStr, 500);
          }
          while (curr.length !== real.length) {
            if (curr.length > real.length) {
              real += " ";
            } else {
              curr += " ";
            }
          }
          ipos = 0;
          change = 0;
          while (ipos < curr.length) {
            if (curr[ipos] !== real[ipos]) {
              diff = real.charCodeAt(ipos) - curr.charCodeAt(ipos);
              if (Math.abs(diff) >= 2) {
                diff = parseInt(diff / 2);
              }
              code = curr.charCodeAt(ipos) + diff;
              curr = curr.substr(0, ipos) + String.fromCharCode(code) + curr.substr(ipos + 1);
              change++;
              if (change === 3) {
                break;
              }
            }
            ipos++;
          }
          element[0].innerHTML = curr;
          window.setTimeout(changeStr, 10);
        };
        changeNum = function() {
          var add, curr;
          curr = parseInt(element[0].innerHTML);
          if (isNaN(curr)) {
            curr = 0;
          }
          add = parseInt(scope.real) - curr;
          if (Math.abs(add) >= 2) {
            add = parseInt(add / 2);
          }
          if (add !== 0) {
            element[0].innerHTML = curr + add;
            window.setTimeout(changeNum, 50);
          } else {

          }
        };
        if (scope.typ === 'number') {
          changeNum();
        } else {
          changeStr();
        }
      }
    };
  };
  return module.directive('slowUpdate', slowUpdate);
})(angular.module('angle'));


/**=========================================================
 * Module: toggle-state.js
 * Toggle a classname from the BODY Useful to change a state that
 * affects globally the entire layout or more than one item
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 =========================================================
 */
App.directive('toggleState', [
  'toggleStateService', function(toggle) {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var $body;
        $body = $('body');
        $(element).on('click', function(e) {
          var classname;
          e.preventDefault();
          classname = attrs.toggleState;
          if (classname) {
            if ($body.hasClass(classname)) {
              $body.removeClass(classname);
              if (!attrs.noPersist) {
                toggle.removeState(classname);
              }
            } else {
              $body.addClass(classname);
              if (!attrs.noPersist) {
                toggle.addState(classname);
              }
            }
          }
        });
      }
    };
  }
]);


/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================
 */
App.factory('colors', [
  'APP_COLORS', function(colors) {
    return {
      byName: function(name) {
        return colors[name] || '#fff';
      }
    };
  }
]);

(function(module) {
  var localStorage;
  localStorage = function($window) {
    var add, get, remove, store;
    store = $window.localStorage;
    add = function(key, value) {
      value = angular.toJson(value);
      store.setItem(key, value);
    };
    get = function(key) {
      var value;
      value = store.getItem(key);
      if (value) {
        value = angular.fromJson(value);
      }
      return value;
    };
    remove = function(key) {
      store.removeItem(key);
    };
    return {
      add: add,
      get: get,
      remove: remove
    };
  };
  module.factory('localStorage', localStorage);
})(angular.module('angle'));

(function(common) {
  var mojioGlobal;
  mojioGlobal = function($http, localStorage) {
    var GoToOAuth, TOKENKEY, apiUrl, changeProducationMode, checkAccess, createMojioForSignal, data, logout;
    TOKENKEY = 'ACCESS_TOKEN_KEY';
    data = {
      mojio_client: null,
      mojio_observer: null,
      mojio_observedEntity: null,
      application: 'cb154fcc-4ec1-4ebb-a703-3a8c6e8a9525',
      redirect_uri: window.location.href.split('#')[0],
      access_token: '',
      user_data: {
        id: '',
        title: ''
      },
      producationMode: 1,
      settings: [
        {
          hostname: 'develope.api.moj.io',
          url: 'https://develop.api.moj.io/v1/',
          login: 'https://develop.api.moj.io/OAuth2/authorize',
          logout: 'https://develop.api.moj.io/account/logout'
        }, {
          hostname: 'api.moj.io',
          url: 'https://api.moj.io/v1/',
          login: 'https://api.moj.io/OAuth2/authorize',
          logout: 'https://api.moj.io/account/logout'
        }
      ],
      accessChecked: false
    };
    createMojioForSignal = function() {
      var config;
      config = {
        application: data.application,
        secret: data.application,
        hostname: data.settings.hostname,
        port: "443",
        scheme: "https",
        version: 'v1',
        tokenRequester: function() {
          return data.access_token;
        }
      };
      data.mojio_client = "";
      data.mojio_client = new MojioClient(config);
      return data.mojio_client.token(function(error, result) {
        return console.log("Mojio Client is Ready");
      });
    };
    changeProducationMode = function() {
      data.producationMode = 1 - data.producationMode;
    };
    apiUrl = function() {
      return data.settings[data.producationMode].url;
    };
    GoToOAuth = function() {
      var m;
      m = data.producationMode;
      window.location = data.settings[m].login + '?response_type=token&client_id=' + data.application + '&redirect_uri=' + data.redirect_uri + '&scope=full';
    };
    logout = function() {
      var m, oldToken;
      m = data.producationMode;
      localStorage.remove(TOKENKEY);
      oldToken = data.access_token;
      data.access_token = '';
      window.location = data.settings[m].logout + '?Guid=' + oldToken + '&client_id=' + data.application + '&redirect_uri=' + data.redirect_uri;
    };
    checkAccess = function() {
      var access_token;
      var access_token, config, e, param;
      if (data.access_token.length == 0) {
        param = window.location.toString().split('#')[1];
        if (typeof param != 'undefined' && param.indexOf('/access_token=') == 0) {
          try {
            access_token = window.location.toString().split('#')[1].split('&')[0].split('=')[1];
            if (access_token) {
              data.access_token = access_token;
            }
          } catch (_error) {
            e = _error;
          }
        } else {
          access_token = localStorage.get(TOKENKEY);
          if (access_token != null && access_token.length != 0) {
            data.access_token = access_token;
          }
        }
      }
      if (data.access_token.length == 0) {
        GoToOAuth();
      } else {
        createMojioForSignal();
        config = {
          headers: {
            'Content-Type': ' application/json',
            'MojioAPIToken': data.access_token
          }
        };
        $http.get(apiUrl() + 'Login/' + data.access_token, config).success(function(response) {
          data.user_data.id = response.UserId;
          $http.get(apiUrl() + 'Users/' + data.user_data.id, config).success(function(response) {
            data.user_data.title = response.FirstName + ' ' + response.LastName;
          });
          localStorage.add(TOKENKEY, data.access_token);
        }).error(function(response) {
          GoToOAuth();
        });
      }
    };
    return {
      data: data,
      GoToOAuth: GoToOAuth,
      checkAccess: checkAccess,
      logout: logout,
      apiUrl: apiUrl,
      changeProducationMode: changeProducationMode
    };
  };
  common.factory('mojioGlobal', mojioGlobal);
})(angular.module('angle'));

(function(common) {
  var mojioLocal;
  mojioLocal = function($rootScope, $http, localStorage, mojioGlobal) {
    var makeDataAvalible, staticData;
    staticData = {
      DeviceType: {
        Xirgo: 'Xirgo',
        Mdi: 'Mdi'
      },
      LoggingDuration: {
        di: 'Disabled',
        w1: '1 Week',
        w2: '2 Weeks',
        w4: '4 Weeks',
        m2: '2 Months',
        m4: '4 Months'
      }
    };
    makeDataAvalible = function(mojioModel, localName, callback) {
      var config, url;
      if (typeof $rootScope.data == 'undefined') {
        $rootScope.data = {};
      }
      if (typeof $rootScope.data[localName] == 'undefined') {
        config = {
          headers: {
            'Content-Type': ' application/json',
            'MojioAPIToken': mojioGlobal.data.access_token
          }
        };
        url = mojioGlobal.apiUrl() + mojioModel + '?limit=1000&offset=0';
        $http.get(url, config).success(function(response) {
          $rootScope.data[localName] = response.Data;
          callback(response.Data);
        });
      } else {
        callback($rootScope.data[localName]);
      }
    };
    return {
      staticData: staticData,
      makeDataAvalible: makeDataAvalible
    };
  };
  common.factory('mojioLocal', mojioLocal);
})(angular.module('angle'));

(function(common) {
  var mojioRemote;
  mojioRemote = function($rootScope, $http, localStorage, mojioGlobal) {
    var GET, POST, PUT;
    GET = function(mojioModel, limit, offset, criteria, option, onSuccess, onError) {
      var headers, lastsep, url;
      headers = {
        'Content-Type': ' application/json',
        'MojioAPIToken': mojioGlobal.data.access_token
      };
      url = mojioGlobal.apiUrl() + mojioModel;
      lastsep = '?';
      if (typeof limit !== "undefined" && limit !== null) {
        url += lastsep + 'limit=' + limit + '&offset=' + offset;
        lastsep = "&";
      }
      if (typeof criteria !== "undefined" && criteria !== null && criteria.length !== 0) {
        url += lastsep + 'criteria=' + escape(criteria);
        lastsep = "&";
      }
      if (option !== null) {
        url += lastsep + option;
      }
      $http({
        method: 'GET',
        url: url,
        headers: headers
      }).success(function(response) {
        onSuccess(response);
      }).error(function(response) {
        onError(response);
      });
    };
    POST = function(mojioModel, data, onSuccess, onError) {
      var headers, url;
      headers = {
        'Content-Type': ' application/json',
        'MojioAPIToken': mojioGlobal.data.access_token
      };
      url = mojioGlobal.apiUrl() + mojioModel;
      $http({
        method: 'POST',
        url: url,
        data: data,
        headers: headers
      }).success(function(response) {
        onSuccess(response);
      }).error(function(response) {
        onError(response);
      });
    };
    PUT = function(mojioModel, data, onSuccess, onError) {
      var headers, url;
      headers = {
        'Content-Type': ' application/json',
        'MojioAPIToken': mojioGlobal.data.access_token
      };
      url = mojioGlobal.apiUrl() + mojioModel;
      $http({
        method: 'PUT',
        url: url,
        data: data,
        headers: headers
      }).success(function(response) {
        onSuccess(response);
      }).error(function(response) {
        onError(response);
      });
    };
    return {
      POST: POST,
      PUT: PUT,
      GET: GET
    };
  };
  common.factory('mojioRemote', mojioRemote);
})(angular.module('angle'));


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================
 */
App.service('navSearch', function() {
  var navbarFormSelector;
  navbarFormSelector = 'form.navbar-form';
  return {
    toggle: function() {
      var isOpen, navbarForm;
      navbarForm = $(navbarFormSelector);
      navbarForm.toggleClass('open');
      isOpen = navbarForm.hasClass('open');
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
    },
    dismiss: function() {
      $(navbarFormSelector).removeClass('open').find('input[type="text"]').blur().val('');
    }
  };
});


/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================
 */
App.provider('RouteHelpers', [
  'APP_REQUIRES', function(appRequires) {
    'use strict';
    this.basepath = function(uri) {
      return 'app/views/' + uri;
    };
    this.resolveFor = function() {
      var _args;
      _args = arguments;
      return {
        deps: [
          '$ocLazyLoad', '$q', function($ocLL, $q) {
            var andThen, getRequired, i, len, promise;
            promise = $q.when(1);
            andThen = function(_arg) {
              if (typeof _arg === 'function') {
                return promise.then(_arg);
              } else {
                return promise.then(function() {
                  var whatToLoad;
                  whatToLoad = getRequired(_arg);
                  if (!whatToLoad) {
                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
                  }
                  return $ocLL.load(whatToLoad);
                });
              }
            };
            getRequired = function(name) {
              var m;
              if (appRequires.modules) {
                for (m in appRequires.modules) {
                  if (appRequires.modules[m].name && appRequires.modules[m].name === name) {
                    return appRequires.modules[m];
                  }
                }
              }
              return appRequires.scripts && appRequires.scripts[name];
            };
            i = 0;
            len = _args.length;
            while (i < len) {
              promise = andThen(_args[i]);
              i++;
            }
            return promise;
          }
        ]
      };
    };
    this.$get = function() {};
  }
]);


/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================
 */
App.service('toggleStateService', [
  '$rootScope', function($rootScope) {
    var WordChecker, storageKeyName;
    storageKeyName = 'toggleState';
    WordChecker = {
      hasWord: function(phrase, word) {
        return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
      },
      addWord: function(phrase, word) {
        if (!this.hasWord(phrase, word)) {
          return phrase + (phrase ? ' ' : '') + word;
        }
      },
      removeWord: function(phrase, word) {
        if (this.hasWord(phrase, word)) {
          return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
        }
      }
    };
    return {
      addState: function(classname) {
        var data;
        data = angular.fromJson($rootScope.$storage[storageKeyName]);
        if (!data) {
          data = classname;
        } else {
          data = WordChecker.addWord(data, classname);
        }
        $rootScope.$storage[storageKeyName] = angular.toJson(data);
      },
      removeState: function(classname) {
        var data;
        data = $rootScope.$storage[storageKeyName];
        if (!data) {
          return;
        }
        data = WordChecker.removeWord(data, classname);
        $rootScope.$storage[storageKeyName] = angular.toJson(data);
      },
      restoreState: function($elem) {
        var data;
        data = angular.fromJson($rootScope.$storage[storageKeyName]);
        if (!data) {
          return;
        }
        $elem.addClass(data);
      }
    };
  }
]);


/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================
 */
var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

App.service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
  'use strict';
  var $body, $html, $win;
  $html = angular.element('html');
  $win = angular.element($window);
  $body = angular.element('body');
  return {
    support: {
      transition: (function() {
        var transitionEnd;
        transitionEnd = (function() {
          var element, name, transEndEventNames;
          element = document.body || document.documentElement;
          transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
          };
          name = void 0;
          for (name in transEndEventNames) {
            name = name;
            if (element.style[name] !== void 0) {
              return transEndEventNames[name];
            }
          }
        })();
        return transitionEnd && {
          end: transitionEnd
        };
      })(),
      animation: (function() {
        var animationEnd;
        animationEnd = (function() {
          var animEndEventNames, element, name;
          element = document.body || document.documentElement;
          animEndEventNames = {
            WebkitAnimation: 'webkitAnimationEnd',
            MozAnimation: 'animationend',
            OAnimation: 'oAnimationEnd oanimationend',
            animation: 'animationend'
          };
          name = void 0;
          for (name in animEndEventNames) {
            name = name;
            if (element.style[name] !== void 0) {
              return animEndEventNames[name];
            }
          }
        })();
        return animationEnd && {
          end: animationEnd
        };
      })(),
      requestAnimationFrame: window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
      },
      touch: indexOf.call(window, 'ontouchstart') >= 0 && navigator.userAgent.toLowerCase().match(/mobile|tablet/) || window.DocumentTouch && document instanceof window.DocumentTouch || window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0 || window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0 || false,
      mutationobserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null
    },
    isInView: function(element, options) {
      var $element, left, offset, top, window_left, window_top;
      $element = $(element);
      if (!$element.is(':visible')) {
        return false;
      }
      window_left = $win.scrollLeft();
      window_top = $win.scrollTop();
      offset = $element.offset();
      left = offset.left;
      top = offset.top;
      options = $.extend({
        topoffset: 0,
        leftoffset: 0
      }, options);
      if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() && left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
        return true;
      } else {
        return false;
      }
    },
    langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',
    isTouch: function() {
      return $html.hasClass('touch');
    },
    isSidebarCollapsed: function() {
      return $body.hasClass('aside-collapsed');
    },
    isSidebarToggled: function() {
      return $body.hasClass('aside-toggled');
    },
    isMobile: function() {
      return $win.width() < APP_MEDIAQUERY.tablet;
    }
  };
}]);

(function(module) {
  var configDetailController;
  configDetailController = function($rootScope, $stateParams) {
    this.configRow = $rootScope.configRow;
    this.showArray = function(arr) {
      var eg;
      eg = arr.join('<br/>');
      return arr.join('\n\r');
    };
    this.changeMode = function() {
      mojioGlobal.changeProducationMode();
    };
    this.UserData = function() {
      return mojioGlobal.data.user_data;
    };
    this.logout = function() {
      mojioGlobal.logout();
    };
  };
  module.controller('configDetailController', configDetailController);
})(angular.module('angle'));

(function(module) {
  var dashboardController;
  dashboardController = function($rootScope, $stateParams, $scope, mojioRemote) {
    var today;
    $scope.mojiosTotal = "";
    mojioRemote.GET('mojios', 0, 0, "", null, function(result) {
      return $scope.mojiosTotal = result.TotalRows;
    }, function(result) {
      return $scope.mojiosTotal = "?";
    });
    $scope.carsTotal = "";
    mojioRemote.GET('vehicles', 0, 0, "", null, function(result) {
      return $scope.carsTotal = result.TotalRows;
    }, function(result) {
      return $scope.carsTotal = "?";
    });
    $scope.usersTotal = "";
    mojioRemote.GET('users', 0, 0, "", null, function(result) {
      return $scope.usersTotal = result.TotalRows;
    }, function(result) {
      return $scope.usersTotal = "?";
    });
    $scope.tripsTotal = "";
    mojioRemote.GET('trips', 0, 0, "", null, function(result) {
      return $scope.tripsTotal = result.TotalRows;
    }, function(result) {
      return $scope.tripsTotal = "?";
    });
    $scope.carsDriving = "";
    mojioRemote.GET('vehicles', 0, 0, "IgnitionOn=true", null, function(result) {
      return $scope.carsDriving = result.TotalRows;
    }, function(result) {
      return $scope.carsDriving = "?";
    });
    today = new Date();
    $scope.carsConnected = "";
    return mojioRemote.GET('vehicles', 0, 0, "LastContactTime=0000.00.00-" + today.toString("yyyy.mm.dd"), null, function(result) {
      return $scope.carsConnected = result.TotalRows;
    }, function(result) {
      return $scope.carsConnected = "?";
    });
  };
  module.controller('dashboardController', dashboardController);
})(angular.module('angle'));

(function(module) {
  var deviceDetailController;
  deviceDetailController = function($scope, $rootScope, $stateParams, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    var loadConfigurations, loadDeviceStats, loadMojio, loadOther, loadSIMData, loadUser, loadVehicle, modifyLoggingDuration, modifyProxyServer, setProxyServerJson2String;
    loadMojio = function() {
      if (typeof $rootScope["deviceRow"] === "undefined" || $rootScope["deviceRow"]._id !== $scope._id) {
        return mojioRemote.GET('mojios/' + $scope._id, null, null, null, null, function(result) {
          $scope.device = result;
          return loadOther();
        }, function(result) {
          return console.log("Error");
        });
      } else {
        $scope.device = $rootScope["deviceRow"];
        return loadOther();
      }
    };
    loadOther = function() {
      setProxyServerJson2String();
      loadDeviceStats();
      loadSIMData();
      loadUser();
      return loadVehicle();
    };
    loadDeviceStats = function() {
      mojioRemote.GET('DeviceStats/', 6, 0, "MojioId = " + $scope._id, null, function(result) {
        console.log(result);
        $scope.xkey = 'y';
        $scope.ykeys = ['a', 'b'];
        $scope.labels = ['a', 'b'];
        return $scope.myModel = [
          {
            y: '2006',
            a: 100,
            b: 90
          }, {
            y: '2007',
            a: 75,
            b: 65
          }, {
            y: '2008',
            a: 50,
            b: 40
          }, {
            y: '2009',
            a: 75,
            b: 65
          }, {
            y: '2010',
            a: 50,
            b: 40
          }, {
            y: '2011',
            a: 75,
            b: 65
          }, {
            y: '2012',
            a: 100,
            b: 90
          }
        ];
      }, function(result) {
        return console.log("Error");
      });
    };
    loadSIMData = function() {
      if ($scope.device.DevicePrivate.SimCardId === null) {
        return;
      }
      return mojioRemote.GET('SimCards/' + $scope.device.DevicePrivate.SimCardId, null, null, null, null, function(result) {
        $scope.simCard = result;
        return $scope.editDevice.Iccid = $scope.simCard.Iccid;
      }, function(result) {
        return console.log("Error");
      });
    };
    loadUser = function() {
      if ($scope.device.OwnerId === null) {
        return;
      }
      return mojioRemote.GET('Users/' + $scope.device.OwnerId, null, null, null, null, function(result) {
        $scope.User = result;
        return $scope.editUser = angular.copy($scope.User);
      }, function(result) {
        return console.log("Error");
      });
    };
    loadVehicle = function() {
      if ($scope.device.VehicleId === null) {
        return;
      }
      return mojioRemote.GET('Vehicles/' + $scope.device.VehicleId, null, null, null, null, function(result) {
        $scope.Vehicle = result;
        return $scope.editVehicle = angular.copy($scope.Vehicle);
      }, function(result) {
        return console.log("Error");
      });
    };
    loadConfigurations = function() {
      if ($scope.device.mojioPrivate.Firmware === null || $scope.device.mojioPrivate.Configuration === null) {
        return;
      }
      mojioRemote.GET('Configurations', null, null, 'Firmware=' + $scope.device.mojioPrivate.Firmware, null, function(result) {
        return $scope.compatibleCfg = result;
      }, function(result) {
        return console.log("Error");
      });
      return mojioRemote.GET('Firmwares', null, null, 'Xirgo', null, function(result) {
        return $scope.compatibleFw = result;
      }, function(result) {
        return console.log("Error");
      });
    };
    modifyLoggingDuration = function() {
      var d, data, ld, x;
      ld = $scope.editDevice.LoggingDuration;
      data = {
        Type: "MojioPrivate"
      };
      if (ld !== "di") {
        d = new Date();
        x = parseInt(ld[1]);
        if (ld[0] === 'w') {
          d.setDate(d.getDate() + x * 7);
        } else {
          d = new Date(d.setMonth(d.getMonth() + x));
        }
        data = {
          Type: "MojioPrivate",
          LoggerDate: d.toISOString()
        };
      }
      mojioRemote.PUT("mojios/" + $scope._id + "/private", data, function() {
        return toaster.success({
          title: "Logging Duration",
          body: "Logging Duration Set Successfully"
        });
      }, function() {
        return toaster.error({
          title: "Logging Duration",
          body: "Error Setting Logging Duration"
        });
      });
    };
    modifyProxyServer = function() {
      var i, len, one, part, proxyJson, ref;
      proxyJson = [];
      ref = $scope.editDevice.ProxyServer.split(/\n/);
      for (i = 0, len = ref.length; i < len; i++) {
        one = ref[i];
        if (one.length !== 0) {
          part = one.split(',');
          proxyJson.push({
            Address: part[0],
            Port: part[1]
          });
        }
      }
      mojioRemote.POST("mojios/" + $scope._id + "/proxy", proxyJson, function() {
        toaster.success({
          title: "Proxy Server",
          body: "Proxy Server Set Successfully"
        });
        return $scope.device.DevicePrivate.ProxyServers = angular.copy(proxyJson);
      }, function() {
        return toaster.error({
          title: "Proxy Server",
          body: "Error Setting Proxy Server"
        });
      });
    };
    setProxyServerJson2String = function() {
      var i, len, one, proxyStr, ref;
      if ($scope.device.DevicePrivate.ProxyServers === null) {
        $scope.editDevice.ProxyServer = "";
        return;
      }
      proxyStr = [];
      ref = $scope.device.DevicePrivate.ProxyServers;
      for (i = 0, len = ref.length; i < len; i++) {
        one = ref[i];
        proxyStr.push(one.Address + "," + one.Port);
      }
      return $scope.editDevice.ProxyServer = proxyStr.join(/\n/);
    };
    $scope._id = $stateParams.id;
    $scope.device = {};
    $scope.editDevice = {
      LoggingDuration: 'di',
      ProxyServer: '',
      Iccid: ''
    };
    $scope.editUser = {};
    $scope.editVehicle = {};
    $scope.watchStatus = 0;
    $scope.diagStream = [];
    $scope.ServerConfiguration = {
      MojioId: '',
      Address: '',
      Port: '',
      ServerProtocol: '3',
      MessageType: 'Server'
    };
    $scope.ApnConfiguration = {
      MojioId: '',
      Apn: '',
      Username: '',
      Password: '',
      MessageType: 'Apn'
    };
    $scope.SmsConfiguration = {
      MojioId: '',
      Msisdn: '',
      MessageType: 'Sms'
    };
    $scope.auditTrailShowUpdatePanel = false;
    $scope.DeployUpdate = {
      Type: 'cfg',
      Update1: '',
      Update2: '',
      Name: '',
      Description: ''
    };
    $scope.LoggingDuration = mojioLocal.staticData.LoggingDuration;
    $scope.watchDevice = function() {
      var EventModel, Mojio, mojio;
      $scope.watchStatus = 1 - $scope.watchStatus;
      EventModel = mojioGlobal.data.mojio_client.model("Event");
      Mojio = mojioGlobal.data.mojio_client.model("Mojio");
      mojio = new Mojio($scope.device);
      if ($scope.watchStatus === 1) {
        mojioGlobal.data.mojio_client.observe(EventModel, new Mojio($scope.device), function(entity) {
          return console.log("Observed change seen.");
        }, function(error, result) {
          if (error) {
            console.log("Observe error: " + error);
            return;
          }
          console.log("Observer started");
          return mojioGlobal.data.mojio_observer = result;
        });
      } else {
        console.log(mojioGlobal.data.mojio_observer);
        console.log(mojioGlobal.data.mojio_observedEntity);
        mojioGlobal.data.mojio_client.unobserve(mojioGlobal.data.mojio_observer, mojioGlobal.data.mojio_observedEntity, $scope.device, function(error, result) {
          if (error) {
            return console.log('Unobserve error: ' + error);
          } else {
            return console.log('Unobserved the entity');
          }
        });
      }
    };
    $scope.ModifyDevice = function() {
      modifyLoggingDuration();
      modifyProxyServer();
    };
    $scope.unclaimSimCard = function() {
      mojioRemote.PUT("simcards/" + $scope._id + "/unclaim", $scope.simCard, function() {
        toaster.success({
          title: "Unclaim SIM Card",
          body: "Unclaim SIM Card Successfully"
        });
        $scope.simCard = null;
        $scope.editDevice.Iccid = "";
        return $scope.edit = "";
      }, function() {
        return toaster.error({
          title: "Unclaim SIM Card",
          body: "Error Unclaiming SIM Card"
        });
      });
    };
    $scope.claimSimCard = function() {
      var data;
      data = {
        Type: "SimCard",
        Iccid: $scope.editDevice.Iccid,
        MojioId: $scope._id
      };
      mojioRemote.PUT("simcards/" + $scope._id + "/claim", data, function() {
        toaster.success({
          title: "Claim SIM Card",
          body: "Claim SIM Card Successfully"
        });
        $rootScope["deviceRow"] = void 0;
        return loadMojio();
      }, function() {
        return toaster.error({
          title: "Claim SIM Card",
          body: "Error Claiming SIM Card"
        });
      });
    };
    $scope.updateUser = function() {
      mojioRemote.PUT("users/" + $scope.editUser._id, $scope.editUser, function() {
        toaster.success({
          title: "Update User",
          body: "Update User Successfully"
        });
        return $scope.User = angular.copy($scope.editUser);
      }, function() {
        return toaster.error({
          title: "Update User",
          body: "Error Updating User"
        });
      });
    };
    $scope.updateVehicle = function() {
      mojioRemote.PUT("vehicles/" + $scope.editVehicle._id, $scope.editVehicle, function() {
        toaster.success({
          title: "Update Vehicle",
          body: "Update Vehicle Successfully"
        });
        return $scope.Vehicle = angular.copy($scope.editVehicle);
      }, function() {
        return toaster.error({
          title: "Update Vehicle",
          body: "Error Updating Vehicle"
        });
      });
    };
    $scope.diagServerCommunicationSettings = function() {
      var cmd;
      cmd = 'mojioCommand/' + $scope._id + '/Comm?GET&_';
      return $scope.sendGETCommand(cmd);
    };
    $scope.diagVehicleStatus = function() {
      var cmd;
      cmd = 'mojioCommand/' + $scope._id + '/VehicleStatus?GET&_';
      return $scope.sendGETCommand(cmd);
    };
    $scope.diagDeviceDiagnostics = function() {
      var cmd;
      cmd = 'mojioCommand/' + $scope._id + '/DeviceDiagnostics?GET&_';
      return $scope.sendGETCommand(cmd);
    };
    $scope.diagDeviceProfile = function() {
      var cmd;
      cmd = 'mojioCommand/' + $scope._id + '/profile?GET&_';
      return $scope.sendGETCommand(cmd);
    };
    $scope.diagSetServerConfiguration = function() {
      var cmd;
      cmd = 'mojioCommand/' + $scope._id + '/Server?POST&_';
      $scope.ServerConfiguration.MojioId = $scope._id;
      return $scope.sendPOSTCommand(cmd, $scope.ServerConfiguration);
    };
    $scope.diagSetApnConfiguration = function() {
      var cmd;
      cmd = 'mojioCommand/' + $scope._id + '/Apn?POST&_';
      $scope.ApnConfiguration.MojioId = $scope._id;
      return $scope.sendPOSTCommand(cmd, $scope.ApnConfiguration);
    };
    $scope.diagSetSmsNumber = function() {
      var cmd;
      cmd = 'mojioCommand/' + $scope._id + '/Sms?POST&_';
      $scope.SmsConfiguration.MojioId = $scope._id;
      return $scope.sendPOSTCommand(cmd, $scope.SmsConfiguration);
    };
    $scope.sendPOSTCommand = function(cmd, data) {
      return mojioRemote.POST(cmd, data, function(result) {
        var obj;
        obj = result;
        obj.type = 'server';
        obj.time = new Date();
        return $scope.diagStream.push(obj);
      }, function(result) {
        var obj;
        obj = result;
        obj.type = 'error';
        obj.time = new Date();
        return $scope.diagStream.push(obj);
      });
    };
    $scope.sendGETCommand = function(cmd) {
      return mojioRemote.GET(cmd, null, null, null, null, function(result) {
        var obj;
        obj = result;
        obj.type = 'server';
        obj.time = new Date();
        return $scope.diagStream.push(obj);
      }, function(result) {
        var obj;
        obj = result;
        obj.type = 'error';
        obj.time = new Date();
        return $scope.diagStream.push(obj);
      });
    };
    $scope.auditTrailSubmitUpdate = function() {
      var cmd, data, target;
      cmd = '';
      target = '';
      if ($scope.DeployUpdate.Type === 'cfg') {
        cmd = 'configurations/deploy';
        ({
          target: $scope.DeployUpdate.Update1
        });
      } else {
        cmd = 'firmwares/deploy';
        ({
          target: $scope.DeployUpdate.Update2
        });
      }
      data = {
        Description: $scope.DeployUpdate.Description,
        Name: $scope.DeployUpdate.Name,
        RequestData: [$scope.device.Imei],
        TargetDataId: target,
        Type: 'Operation'
      };
      if ($scope.DeployUpdate.Launch) {
        data.DeployOptions = "DeployAndLaunch";
      }
      return mojioRemote.POST(cmd, data, function(result) {
        return toaster.success({
          title: "Deploy Update",
          body: "Deploy Update Successfully"
        });
      }, function() {
        return toaster.error({
          title: "Deploy Update",
          body: "Error Deploying Update"
        });
      });
    };
    loadMojio();
  };
  module.controller('deviceDetailController', deviceDetailController);
})(angular.module('angle'));

(function(module) {
  var firmwareDetailController;
  firmwareDetailController = function($scope, $rootScope, $stateParams) {
    $scope.firmwareRow = $rootScope.firmwareRow;
    $scope.deploy = function() {
      alert("deploy");
    };
    $scope["delete"] = function() {
      alert("delete");
    };
    $scope.modify = function() {
      alert("modify");
    };
  };
  module.controller('firmwareDetailController', firmwareDetailController);
})(angular.module('angle'));

(function(module) {
  var importDevicesController;
  importDevicesController = function($scope, $rootScope, $stateParams, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    $scope.data = {
      Description: '',
      Name: '',
      deviceList: ''
    };
    $scope.importData = function() {
      var data;
      data = {
        Description: $scope.data,
        Name: $scope.data.Name,
        RequestData: $scope.data.deviceList.split('\r'),
        Type: 'Operation'
      };
      return mojioRemote.POST("mojios/mojioinventory", data, function(result) {
        return toaster.success({
          title: "Import Device",
          body: "Import Device Successfully"
        });
      }, function() {
        return toaster.error({
          title: "Import Device",
          body: "Error Importing Device"
        });
      });
    };
  };
  module.controller('importDevicesController', importDevicesController);
})(angular.module('angle'));

(function(module) {
  var importSimsController;
  importSimsController = function($scope, $rootScope, $stateParams, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    $scope.data = {
      Description: '',
      Name: ''
    };
    $scope.importData = function() {
      var action, fileInput, formdata, i, xhr;
      action = mojioGlobal.apiUrl() + '/SimCards/InventoryAsync?desc=' + $scope.data.Description + '&name=' + $scope.data.Name;
      formdata = new FormData;
      fileInput = document.getElementById('csvFile');
      i = 0;
      while (i < fileInput.files.length) {
        formdata.append('csvFile', fileInput.files[0], fileInput.files[0].name);
        i++;
      }
      xhr = new XMLHttpRequest;
      xhr.open('POST', action);
      xhr.send(formdata);
      return xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 202) {
            toaster.success({
              title: "Import SIMs",
              body: "Import SIMs Successfully"
            });
          } else {
            toaster.error({
              title: "Import SIMs",
              body: "Error Importing SIMs"
            });
          }
        }
      };
    };
  };
  module.controller('importSimsController', importSimsController);
})(angular.module('angle'));

(function(module) {
  var observeController;
  observeController = function($rootScope, $stateParams, mojioGlobal, $scope) {
    var EventModel, data, mojio;
    console.log(mojioGlobal.data.mojio_client);
    EventModel = mojioGlobal.data.mojio_client.model("Event");
    data = {
      "Type": "App",
      "Name": "Default",
      "Description": "Automatically created upon registration.\r\n111 - ha 333333",
      "CreationDate": "2014-04-17T00:38:34.27Z",
      "Downloads": null,
      "RedirectUris": ["http://www.google.ca"],
      "ApplicationType": "web",
      "_id": "87ca4a35-d1da-4a46-9b91-13df20c49fd4",
      "_deleted": false
    };
    mojio = new EventModel();
    $scope.mojioObserve = mojioGlobal.data.mojio_client.observe(mojio, data, function(entity) {
      console.log("Observed change seen.");
      return mojioGlobal.data.mojio_client.unobserve($scope.mojioObserve, mojio, data, function(error, result) {
        if (error) {
          return console.log("unobserve error");
        } else {
          return console.log("unobserve");
        }
      });
    }, function(error, result) {
      return console.log("changing app...");
    });
  };
  module.controller('observeController', observeController);
})(angular.module('angle'));

(function(module) {
  var portalController;
  portalController = function($modal, $templateCache, $sce, $compile, $rootScope, $stateParams, $scope, mojioRemote, localStorage) {
    $scope.showAddPortlet = false;
    $scope.portal = [];
    $scope.styles = [
      {
        Style: 'panel-primary',
        Title: 'Primary'
      }, {
        Style: 'panel-danger',
        Title: 'Danger'
      }, {
        Style: 'panel-info',
        Title: 'Info'
      }, {
        Style: 'panel-success',
        Title: 'Success'
      }, {
        Style: 'panel-warning',
        Title: 'Warning'
      }, {
        Style: 'panel-default',
        Title: 'Default'
      }, {
        Style: 'panel-inverse',
        Title: 'Inverse'
      }, {
        Style: 'panel-purple',
        Title: 'Purple'
      }, {
        Style: 'panel-green',
        Title: 'Green'
      }
    ];
    $scope.portlets = [
      {
        Portlet: 'widget-vehicle-list',
        Title: 'Vehicles List',
        Desc: 'View All Vehicles ',
        Icon: 'fa-car',
        Col: 6,
        Row: 12,
        Footer: '',
        Style: 'panel-primary',
        Resizable: {
          overall: true,
          col: true,
          row: true,
          minRow: 3,
          maxRow: 10,
          minCol: 3,
          maxCol: 12
        },
        Edit: false
      }, {
        Portlet: 'widget-vehicles-on-map',
        Title: 'Vehicles On Map',
        Desc: 'View All Vehicles on Google Map',
        Icon: 'fa-globe',
        Col: 6,
        Row: 6,
        Footer: '',
        Style: 'panel-primary',
        Resizable: {
          overall: true,
          col: true,
          row: true,
          minRow: 3,
          maxRow: 10,
          minCol: 3,
          maxCol: 12
        },
        Edit: false
      }, {
        Portlet: 'widget-trip-list',
        Title: 'Trips List',
        Desc: 'View List of Trips',
        Icon: 'fa-openid',
        Col: 6,
        Row: 6,
        Footer: '',
        Style: 'panel-primary',
        Resizable: {
          overall: true,
          col: true,
          row: true,
          minRow: 3,
          maxRow: 10,
          minCol: 3,
          maxCol: 12
        },
        Edit: false
      }, {
        Portlet: 'widget-mojio-list',
        Title: 'Mojios List',
        Desc: 'View List of Mojios',
        Icon: 'fa-hdd-o',
        Col: 6,
        Row: 6,
        Footer: '',
        Style: 'panel-primary',
        Resizable: {
          overall: true,
          col: true,
          row: true,
          minRow: 3,
          maxRow: 10,
          minCol: 3,
          maxCol: 12
        },
        Edit: false
      }, {
        Portlet: 'widget-user-list',
        Title: 'Friends List',
        Desc: 'View List of Users that you have access to their data',
        Icon: 'fa-user',
        Col: 6,
        Row: 6,
        Footer: '',
        Style: 'panel-primary',
        Resizable: {
          overall: true,
          col: true,
          row: true,
          minRow: 3,
          maxRow: 10,
          minCol: 3,
          maxCol: 12
        },
        Edit: false
      }, {
        Portlet: 'widget-detail-info',
        Title: 'Detail Info',
        Desc: 'Detail Info can show detail about anything you select!',
        Icon: 'fa-info',
        Col: 6,
        Row: 6,
        Footer: '',
        Style: 'panel-primary',
        Resizable: {
          overall: true,
          col: true,
          row: true,
          minRow: 3,
          maxRow: 10,
          minCol: 3,
          maxCol: 12
        },
        Edit: false
      }, {
        Portlet: 'widget-json',
        Title: 'JSON View',
        Desc: 'View Information as Prettify JSON!',
        Icon: 'fa-code',
        Col: 6,
        Row: 6,
        Footer: '',
        Style: 'panel-primary',
        Resizable: {
          overall: true,
          col: true,
          row: true,
          minRow: 3,
          maxRow: 10,
          minCol: 3,
          maxCol: 12
        },
        Edit: false
      }, {
        Portlet: 'widget-timeline',
        Title: 'Timeline',
        Desc: 'View Events in Timeline',
        Icon: 'fa-code',
        Col: 12,
        Row: 6,
        Footer: '',
        Style: 'panel-primary',
        Resizable: {
          overall: true,
          col: true,
          row: true,
          minRow: 3,
          maxRow: 10,
          minCol: 3,
          maxCol: 12
        },
        Edit: false
      }
    ];
    $scope.portal = localStorage.get(window.location.href);
    if (typeof $scope.portal === "undefined" || $scope.portal === null) {
      $scope.portal = [];
    }
    $scope.showAddPortletWindow = function() {
      $templateCache.put('portalAddPortletTemplate.html', '<div class="modal-header"> <h3 class="modal-title">Select Portlet</h3> </div> <div class="modal-body"> <div class="row"> <div ng-repeat="portlet in portlets" class="col-sm-3"> <div class="panel panel-default"> <div class="panel-heading"> <li class="fa {{portlet.Icon}} fa-4x"></li> <a href="" ng-click="addPortlet(portlet)">{{portlet.Title}}</a> </div> <div class="panel-body" style="height:100px;"> {{portlet.Desc}} </div> </div> </div> </div> </div>');
      $modal.open({
        size: 'lg',
        templateUrl: 'portalAddPortletTemplate.html',
        scope: $scope,
        controller: function($scope) {}
      });
    };
    $scope.addPortlet = function(portlet) {
      $scope.portal.push(angular.copy(portlet));
    };
    $scope.removePortlet = function(v) {
      $scope.portal.splice(v, 1);
    };
    $scope.editPortlet = function(v) {
      $scope.portal[v].Edit = !$scope.portal[v].Edit;
    };
    $scope.resizeIncCol = function(v) {
      return $scope.portal[v].Col++;
    };
    $scope.resizeDecCol = function(v) {
      return $scope.portal[v].Col--;
    };
    $scope.resizeIncRow = function(v) {
      return $scope.portal[v].Row++;
    };
    $scope.resizeDecRow = function(v) {
      return $scope.portal[v].Row--;
    };
    $scope.portletCol = function(col) {
      return "col-sm-" + col;
    };
    $scope.portletRow = function(row) {
      return "height:" + (50 * row) + "px;";
    };
    $scope.portletDirective = function(portlet, pid) {
      var el;
      el = $sce.trustAsHtml("'<div " + portlet + " portlet=\"" + pid + "\"></div>'");
      return el;
    };
    $scope.savePortalState = function() {
      localStorage.add(window.location.href, $scope.portal);
      console.log("saved");
      return console.log(localStorage.get(window.href));
    };
    return $scope.fullScreen = function(event) {
      console.log(event.currentTarget.parentNode.parentNode);
      if (screenfull.enabled) {
        return screenfull.request(event.currentTarget.parentNode.parentNode);
      }
    };
  };
  module.controller('portalController', portalController);
})(angular.module('angle'));

angular.module('angle').filter('timeago', function() {
  return function(idate) {
    var ago;
    ago = function(val) {
      var datelength, key, result, value;
      val = 0 | (Date.now() - val) / 1000;
      datelength = {
        second: 60,
        minute: 60,
        hour: 24,
        day: 7,
        week: 4.35,
        month: 12,
        year: 10000
      };
      result = void 0;
      for (key in datelength) {
        value = datelength[key];
        result = val % value;
        if (!(val = 0 | val / value)) {
          return result + ' ' + (result - 1 ? key + 's' : key);
        }
      }
    };
    return ago(new Date(idate));
  };
});

(function(module) {
  var widgetDetailInfo;
  widgetDetailInfo = function($rootScope, $window, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    return {
      restrict: 'EA',
      templateUrl: 'app/views/widget_detail_info.html',
      controller: function($rootScope, $scope) {
        $scope.data = null;
        $scope.deselct = function() {
          $rootScope.$broadcast('MojioObjectSelected', {
            Type: ''
          });
        };
        $rootScope.$on('MojioObjectSelected', function(event, data) {
          return $scope.data = data;
        });
      },
      link: function($rootScope, scope, element, attrs) {}
    };
  };
  return module.directive('widgetDetailInfo', [widgetDetailInfo]);
})(angular.module('angle'));

(function(module) {
  var widgetDetailUser;
  widgetDetailUser = function($scope, $rootScope, $window, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    return {
      restrict: 'EA',
      templateUrl: 'app/views/widget_detail_user.html',
      controller: function($rootScope, $scope, mojioRemote) {
        $scope.rel = {};
        $scope.broadcast = function(data) {
          $rootScope.$broadcast('MojioObjectSelected', data);
        };
        $scope.showMyself = function() {
          mojioRemote.GET("Users/Me", null, null, null, null, function(result) {
            $scope.rel = {};
            return $rootScope.$broadcast('MojioObjectSelected', result);
          });
        };
        $scope.showMojios = function() {
          mojioRemote.GET("Users/" + $scope.data._id + "/Mojios", 1000, 0, null, null, function(result) {
            return $scope.rel.mojios = result.Data;
          });
        };
        $scope.showVehicles = function() {
          mojioRemote.GET("Users/" + $scope.data._id + "/Vehicles", 1000, 0, null, null, function(result) {
            return $scope.rel.vehicles = result.Data;
          });
        };
        $scope.showRecentTrips = function() {
          mojioRemote.GET("Users/" + $scope.data._id + "/Trips", 10, 0, null, null, function(result) {
            return $scope.rel.trips = result.Data;
          });
        };
        $scope.showRecentEvents = function() {
          mojioRemote.GET("Users/" + $scope.data._id + "/Events", 10, 0, null, null, function(result) {
            return $scope.rel.events = result.Data;
          });
        };
      },
      link: function($rootScope, $scope, element, attrs) {
        $scope.data = attrs.data;
      }
    };
  };
  return module.directive('widgetDetailUser', [widgetDetailUser]);
})(angular.module('angle'));

(function(module) {
  var widgetJson;
  widgetJson = function($rootScope, $window, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    return {
      restrict: 'EA',
      templateUrl: 'app/views/widget_json.html',
      controller: function($rootScope, $scope) {
        $scope.data = null;
        $rootScope.$on('MojioObjectSelected', function(event, data) {
          return $scope.data = data;
        });
      },
      link: function($rootScope, scope, element, attrs) {}
    };
  };
  return module.directive('widgetJson', [widgetJson]);
})(angular.module('angle'));

(function(module) {
  var widgetMojioList;
  widgetMojioList = function($rootScope, $window, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    return {
      restrict: 'EA',
      templateUrl: 'app/views/widget_mojio_list.html',
      controller: function($scope) {},
      link: function($rootScope, scope, element, attrs) {}
    };
  };
  return module.directive('widgetMojioList', [widgetMojioList]);
})(angular.module('angle'));

(function(module) {
  var widgetTripList;
  widgetTripList = function($rootScope, $window, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    return {
      restrict: 'EA',
      templateUrl: 'app/views/widget_trip_list.html',
      controller: function($scope) {},
      link: function($rootScope, scope, element, attrs) {}
    };
  };
  return module.directive('widgetTripList', [widgetTripList]);
})(angular.module('angle'));

(function(module) {
  var widgetUserList;
  widgetUserList = function($rootScope, $window, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    return {
      restrict: 'EA',
      templateUrl: 'app/views/widget_user_list.html',
      controller: function($scope) {},
      link: function($rootScope, scope, element, attrs) {}
    };
  };
  return module.directive('widgetUserList', [widgetUserList]);
})(angular.module('angle'));

(function(module) {
  var widgetVehicleList;
  widgetVehicleList = function($rootScope, $window, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    return {
      restrict: 'EA',
      templateUrl: 'app/views/widget_vehicle_list.html',
      controller: function($scope) {},
      link: function($rootScope, scope, element, attrs) {}
    };
  };
  return module.directive('widgetVehicleList', [widgetVehicleList]);
})(angular.module('angle'));

(function(module) {
  var widgetVehiclesOnMap;
  widgetVehiclesOnMap = function($window, mojioRemote, mojioLocal, mojioGlobal, toaster) {
    var showDirection, showLocation, state;
    showDirection = function(model) {
      mojioRemote.GET(model, 10000, 0, "", "sortBy=Time", function(result) {
        var AllCoordinates, bounds, d, data, i, len, maker, marker, myOptions, tripPath;
        data = result.Data;
        myOptions = {
          navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
          },
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        maker = null;
        state.map = new google.maps.Map(state.element, myOptions);
        bounds = new google.maps.LatLngBounds();
        AllCoordinates = [];
        for (i = 0, len = data.length; i < len; i++) {
          d = data[i];
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(d.Location.Lat, d.Location.Lng),
            map: state.map,
            title: d.Name
          });
          AllCoordinates.push(new google.maps.LatLng(d.Location.Lat, d.Location.Lng));
          bounds.extend(marker.getPosition());
        }
        state.map.fitBounds(bounds);
        tripPath = new google.maps.Polyline({
          path: AllCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        return tripPath.setMap(state.map);
      }, function(result) {
        return elm.innerHTML = "?";
      });
    };
    showLocation = function(model) {
      mojioRemote.GET(model, 100, 0, "", "sortBy=LastContactTime&desc=true", function(result) {
        var bounds, d, data, extendPoint1, extendPoint2, i, len, maker, marker, myOptions;
        data = result.Data;
        myOptions = {
          navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
          },
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        maker = null;
        state.map = new google.maps.Map(state.element, myOptions);
        bounds = new google.maps.LatLngBounds();
        for (i = 0, len = data.length; i < len; i++) {
          d = data[i];
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(d.LastLocation.Lat, d.LastLocation.Lng),
            map: state.map,
            title: d.Name
          });
          bounds.extend(marker.getPosition());
        }
        if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
          extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.003, bounds.getNorthEast().lng() + 0.003);
          extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.003, bounds.getNorthEast().lng() - 0.003);
          bounds.extend(extendPoint1);
          bounds.extend(extendPoint2);
        }
        return state.map.fitBounds(bounds);
      }, function(result) {
        return elm.innerHTML = "?";
      });
    };
    state = {
      map: null,
      element: null,
      attrs: null
    };
    return {
      restrict: 'EA',
      controller: function($rootScope, $scope) {
        return $rootScope.$on('MojioObjectSelected', function(event, data) {
          if (data.Type === "User") {
            showLocation("Users/" + data._id + "/Vehicles");
            return;
          }
          if (data.Type === "Trip") {
            showDirection("Trips/" + data._id + "/Events");
            return;
          }
        });
      },
      link: function(scope, element, attrs) {
        var notFullScreenHeight, oldRow;
        state.element = element[0];
        state.attrs = attrs;
        notFullScreenHeight = state.element.parentNode.style.height;
        state.element.style.height = state.element.parentNode.style.height;
        oldRow = scope.$parent.v.Row;
        window.setInterval(function() {
          if (screenfull.isFullscreen && oldRow !== -1) {
            state.element.parentNode.style.height = window.innerHeight + "px";
            state.element.style.height = state.element.parentNode.style.height;
            google.maps.event.trigger(state.map, "resize");
            oldRow = -1;
          }
          if (!screenfull.isFullscreen && oldRow === -1) {
            state.element.parentNode.style.height = notFullScreenHeight;
            state.element.style.height = state.element.parentNode.style.height;
            google.maps.event.trigger(state.map, "resize");
            oldRow = scope.$parent.v.Row;
          }
          if (oldRow !== scope.$parent.v.Row && oldRow !== -1) {
            oldRow = scope.$parent.v.Row;
            state.element.style.height = state.element.parentNode.style.height;
            return google.maps.event.trigger(state.map, "resize");
          }
        }, 1000);
        showLocation('vehicles');
      }
    };
  };
  return module.directive('widgetVehiclesOnMap', widgetVehiclesOnMap);
})(angular.module('angle'));
