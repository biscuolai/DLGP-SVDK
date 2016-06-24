//(function () {
//    'use strict';

//    angular.module('app')
//        .controller("FileUploder", ['$scope', '$http', '$timeout', '$window',
//            function ($scope, $http, $location, $timeout, $window) {
//                $scope.AttachStatus = "";

//                $scope.fnUpload = function () {
//                    var fd = new FormData()
//                    for (var i in $scope.files) {
//                        fd.append("uploadedFile", $scope.files[i])
//                    }
//                    var xhr = new XMLHttpRequest();
//                    xhr.addEventListener("load", uploadComplete, false);
//                    xhr.open("POST", "http://localhost:53154/api/FileUploader/AttachFile", true);
//                    $scope.progressVisible = true;
//                    xhr.send(fd);
//                }

//                function uploadComplete(evt) {
//                    $scope.progressVisible = false;
//                    if (evt.target.status == 201) {
//                        $scope.FilePath = evt.target.responseText;
//                        $scope.AttachStatus = "Upload Done";
//                        alert($scope.FilePath);
//                    }
//                    else {
//                        $scope.AttachStatus = evt.target.responseText;
//                    }
//                }

//                $scope.fnDownLoad = function () {
//                    debugger;
//                    $scope.FileExt = $scope.files[0].name.substr($scope.files[0].name.length - 4);
//                    $scope.GenerateFileType($scope.FileExt);
//                    $scope.RenderFile();
//                }

//                $scope.RenderFile = function () {
//                    var s = "http://localhost:53154/api/FileUploader/DownLoadFile?"
//                       + "FileName=" + $scope.files[0].name
//                       + "&fileType=" + $scope.FileType;
//                    $window.open(s);
//                }

//                $scope.GenerateFileType = function (fileExtension) {
//                    switch (fileExtension.toLowerCase()) {
//                        case "doc":
//                        case "docx":
//                            $scope.FileType = "application/msword";
//                            break;
//                        case "xls":
//                        case "xlsx":
//                            $scope.FileType = "application/vnd.ms-excel";
//                            break;
//                        case "pps":
//                        case "ppt":
//                            $scope.FileType = "application/vnd.ms-powerpoint";
//                            break;
//                        case "txt":
//                            $scope.FileType = "text/plain";
//                            break;
//                        case "rtf":
//                            $scope.FileType = "application/rtf";
//                            break;
//                        case "pdf":
//                            $scope.FileType = "application/pdf";
//                            break;
//                        case "msg":
//                        case "eml":
//                            $scope.FileType = "application/vnd.ms-outlook";
//                            break;
//                        case "gif":
//                        case "bmp":
//                        case "png":
//                        case "jpg":
//                            $scope.FileType = "image/JPEG";
//                            break;
//                        case "dwg":
//                            $scope.FileType = "application/acad";
//                            break;
//                        case "zip":
//                            $scope.FileType = "application/x-zip-compressed";
//                            break;
//                        case "rar":
//                            $scope.FileType = "application/x-rar-compressed";
//                            break;
//                    }
//                }

//                $scope.setFiles = function (element) {
//                    $scope.$apply(function (scope) {
//                        $scope.AttachStatus = "";
//                        $scope.files = []
//                        for (var i = 0; i < element.files.length; i++) {
//                            $scope.files.push(element.files[i])
//                        }
//                        $scope.progressVisible = false
//                    });
//                }

//            }
//        ]);
//})();
