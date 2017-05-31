﻿angular.module('gesture-pdf', [])

// Directive to manipulate pdfs with gestures
.directive('pdfGesture', function ($window, $ionicGesture) {
    var renderTask = [];
    var pdfLoaderTask = null;
    var debug = false;

    var backingScale = function (canvas) {
        var ctx = canvas.getContext('2d');
        var dpr = window.devicePixelRatio || 1;
        var bsr = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1;

        return dpr / bsr;
    };

    var setCanvasDimensions = function (canvas, w, h) {
        var ratio = backingScale(canvas);
        canvas.width = Math.floor(w * ratio);
        canvas.height = Math.floor(h * ratio);
        canvas.style.width = Math.floor(w) + 'px';
        canvas.style.height = Math.floor(h) + 'px';
        canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
        return canvas;
    };

    return {
        restrict: 'E',
        scope: {
            ngPdfOptions: '='
            //ngPdfOptions.pdfUrl: Url to the pdf
            //ngPdfOptions.onLoad: method to call after loading a pdf. (numPages) is the argument passed stating the number of pages in the pdf
            //ngPdfOptions.onProgress: method to call to evaluate the loading progress
            //ngPdfOptions.onError: method to call if an error occurs
            //ngPdfOptions.onPageRender: method to call if a pages finishes to render
            //ngPdfOptions.httpHeaders: http headers to download pdf
        },
        link: function (scope, element, attrs) {
            var container = angular.element('<div class="pdf-container"></container>');
            var buttonContainer = angular.element('<div class="button-container"></div>')
            container.append(buttonContainer);
            var button = angular.element('<div class="button"><i class="icon ion-share"></i></div>');
            buttonContainer.append(button);
            button = angular.element('<div class="button"><i class="icon ion-arrow-shrink"></i></div>');
            var count = 0;
            button.bind('click', function (e) {
                if (count == 0) {
                    scope.pageFit();
                    count++;
                    setTimeout(function () {
                        count = 0;
                    }, 500);
                }
            });
            buttonContainer.append(button);
            button = angular.element('<div class="button"><i class="icon ion-plus-round"></i></div>');
            button.bind('click', function (e) {
                if (count == 0) {
                    scope.zoomIn();
                    count++;
                    setTimeout(function () {
                        count = 0;
                    }, 500);
                }
            });
            buttonContainer.append(button);
            button = angular.element('<div class="button"><i class="icon ion-minus-round"></i></div>');
            button.bind('click', function (e) {
                if (count == 0) {
                    scope.zoomOut();
                    count++;
                    setTimeout(function () {
                        count = 0;
                    }, 500);
                }
            });

            buttonContainer.append(button);

            element.append(container);
            var timer = null;
            var pageFit = true;
            var pinch = 0;
            var scale = 1;
            var canvas = [];
            var ctx = [];
            var windowEl = angular.element($window);
            var pdfDoc = null;
            var options = scope.ngPdfOptions;
            var left = 0;
            var windowWidth = $window.innerWidth;
            var canvasWidth = 0;
            container.css('width', windowWidth + 'px');
            container.css('height', $window.innerHeight + 'px');

            PDFJS.disableWorker = true;

            scope.pageFit = function () {
                if (pdfDoc) {
                    pageFit = true;
                    scope.$apply(function () {
                        for (i = 1; i <= pdfDoc.numPages; i++) {
                            renderPage(i);
                        }
                    });
                }
            };
            scope.zoomIn = function () {
                if (pdfDoc) {
                    pageFit = false;
                    scale += .2;
                    scope.$apply(function () {
                        for (i = 1; i <= pdfDoc.numPages; i++) {
                            renderPage(i);
                        }
                    });
                }
            };

            scope.zoomOut = function () {
                if (pdfDoc) {
                    pageFit = false;
                    scale -= .2;
                    scope.$apply(function () {
                        for (i = 1; i <= pdfDoc.numPages; i++) {
                            renderPage(i);
                        }
                    });
                }
            };

            renderPage = function (num) {
                if (renderTask[num - 1]) {
                    renderTask[num - 1].internalRenderTask.cancel();
                }

                pdfDoc.getPage(num).then(function (page) {
                    var viewport;
                    var pageWidthScale;
                    var renderContext;

                    if (pageFit) {
                        viewport = page.getViewport(1);
                        var clientRect = element[0].getBoundingClientRect();
                        pageWidthScale = clientRect.width / viewport.width;
                        scale = pageWidthScale;
                    }
                    viewport = page.getViewport(scale);
                    canvasWidth = viewport.width;
                    setCanvasDimensions(canvas[num - 1], viewport.width, viewport.height);

                    renderContext = {
                        canvasContext: ctx[num - 1],
                        viewport: viewport
                    };

                    renderTask[num - 1] = page.render(renderContext);
                    renderTask[num - 1].promise.then(function () {
                        if (typeof options.onPageRender === 'function') {
                            options.onPageRender(num);
                        }
                    }).catch(function (reason) {
                        if (typeof options.onError === 'function') {
                            options.onError(reason);
                        }
                    });
                });
            };

            clearCanvas = function (num) {
                if (ctx && ctx[num]) {
                    ctx[num].clearRect(0, 0, canvas[num].width, canvas[num].height);
                }
            };

            renderPDF = function () {
                if (ctx) {
                    for (i = 0; i < ctx.length; i++) {
                        clearCanvas(i);
                    }
                }
                var params = {
                    'url': options.pdfUrl,
                    'withCredentials': (options.httpHeaders == undefined)
                };

                if (params.withCredentials) {
                    params.httpHeaders = options.httpHeaders;
                }

                if (options.pdfUrl && options.pdfUrl.length) {
                    pdfLoaderTask = PDFJS.getDocument(params, null, null, options.onProgress);
                    pdfLoaderTask.then(
                        function (_pdfDoc) {
                            if (typeof options.onLoad === 'function') {
                                options.onLoad(_pdfDoc.numPages);
                            }
                            pdfDoc = _pdfDoc;
                            for (i = 1; i <= _pdfDoc.numPages; i++) {
                                if (!canvas[i - 1]) {
                                    var cnv = angular.element('<canvas></canvas>');
                                    canvas[i - 1] = cnv[0];
                                    container.append(cnv);
                                    ctx[i - 1] = canvas[i - 1].getContext('2d');
                                }
                                renderPage(i);
                            }
                        }, function (error) {
                            if (error) {
                                if (typeof options.onError === 'function') {
                                    options.onError(error);
                                }
                            }
                        }
                    );
                }
            };

            scope.$watch('ngPdfOptions.pdfUrl', function (newVal) {
                if (newVal !== '') {
                    if (debug) {
                        console.log('pdfUrl value change detected: ', newVal);
                    }
                     if (pdfLoaderTask && (typeof pdfLoaderTask.destroy === 'function')) {
                        pdfLoaderTask.destroy().then(function () {
                            renderPDF();
                        });
                    } else {
                        renderPDF();
                    }
                }
            });

            zoom = function () {
                if (pdfDoc) {
                    pageFit = false;
                    scope.$apply(function () {
                        for (i = 1; i <= pdfDoc.numPages; i++) {
                            renderPage(i);
                        }
                    });

                }
            };

            $ionicGesture.on('touch', function (e) {
                if (buttonContainer.hasClass('active')) {
                    clearTimeout(timer);
                } else {
                    buttonContainer.addClass('active');
                }
                timer = setTimeout(function () {
                    buttonContainer.removeClass('active');
                }, 5000);
            }, element);
            $ionicGesture.on('release', function (e) {
                pinch = 0;
            }, element);

            $ionicGesture.on('pinchin', function (e) {
                if (pinch) {
                    if (scale > .4) {
                        scale -= ((pinch - e.gesture.scale) / 2);
                        console.log('scale: ' + scale);
                        console.log('offset: ' + ((pinch - e.gesture.scale) / 4));
                        zoom();
                        pinch = e.gesture.scale;
                    } else {
                        scale = .4;
                        return;
                    }
                } else
                    pinch = e.gesture.scale;
            }, element);
            $ionicGesture.on('pinchout', function (e) {
                if (pinch) {
                    if (scale < 1.5) {
                        scale += ((e.gesture.scale - pinch) / 2);
                        console.log('scale: ' + scale);
                        console.log('offset: ' + ((e.gesture.scale - pinch) / 4));
                        zoom();
                        pinch = e.gesture.scale;
                    } else {
                        scale = 1.5;
                        return;
                    }
                } else
                    pinch = e.gesture.scale;
            }, element);

            $ionicGesture.on('dragend', function (e) {
                if ((left + e.gesture.deltaX) < (windowWidth - canvasWidth)) {
                    left = windowWidth - canvasWidth;
                } else if ((left + e.gesture.deltaX) > 0) {
                    left = 0;
                } else
                    left += e.gesture.deltaX;
            }, element);

            $ionicGesture.on('dragleft', function (e) {
                if (!pdfDoc || ((left + e.gesture.deltaX) < (windowWidth - canvasWidth)))
                    return;
                pageFit = false;
                scope.$apply(function () {
                    container.css('margin-left', (left + e.gesture.deltaX) + 'px');
                })
            }, element);

            $ionicGesture.on('dragright', function (e) {
                if (!pdfDoc || (left + e.gesture.deltaX) > 0)
                    return;
                pageFit = false;
                scope.$apply(function () {
                    container.css('margin-left', (left + e.gesture.deltaX) + 'px');
                })
            }, element);
        }
    }
});