'use strict';

var remote = require('remote');
var fileUtil = remote.require('./lib/fileUtil');
var baseDir = process.cwd();

var ngModule = angular.module('read', []);

ngModule.controller('MainController', function($scope) {
    var main = this;
    main.getFile = function(file) {
        main.fileText = fileUtil.getAsText(file.filepath);
    };
    fileUtil.fetchReadmeList(baseDir, function(err, fileList) {
        if(err) console.error(error);
        $scope.$apply(function() {
            main.fileList = fileList;
        });
    });
});

ngModule.directive('mdPreview', function() {
    return function($scope, $elem, $attrs) {
        $scope.$watch($attrs.mdPreview, function(source) {
            $elem.html(marked(source));
        });
    };
});
