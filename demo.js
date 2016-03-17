/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inputVerify = __webpack_require__(1);
	var selectRegWay = __webpack_require__(3);
	var verifyArrow = __webpack_require__(4);

	// ʹ��script-loaderȫ������һ��jQuery throttle/debounce����
	__webpack_require__(7);

	$(document).ready(inputVerify);
	$(document).ready(selectRegWay);
	$(document).ready(verifyArrow);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var accountVerify = __webpack_require__(2);

	// 输入框失焦后进行验证
	module.exports = function () {
	    $(':input').on('blur', accountVerify);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    // 手机号和邮箱的正则表达式匹配规则
	    var phoneReg = /^(1(3|4|5|7|8)[0-9])[0-9]{8}$/;
	    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
	    var $input = $(':input:visible');
	    var id = $input.attr('id');
	    var $parent = $input.parent();
	    var errMsg = '';

	    // 隐藏错误信息
	    $parent.find('.errMsg').remove();
	    $input.removeClass('err');

	    if (id === 'phone-num') {
	        // 验证手机号
	        if ($input.val() === '') {
	            errMsg = '请输入你的手机号码';
	        } else if (!phoneReg.test($input.val())) {
	            errMsg = '手机号码格式不正确，请重新输入';
	        }
	    } else if (id === 'email') {
	        // 验证邮箱
	        if ($input.val() === '') {
	            errMsg = '请输入你的邮箱';
	        } else if (!emailReg.test($input.val())) {
	            errMsg = '邮箱格式不正确，请重新输入';
	        }
	    }

	    if (errMsg !== '') {
	        // 输出错误信息
	        $input.addClass('err');
	        $parent.append('<span class="errMsg"> <span class="iconfont">&#xe605;</span>' + errMsg + '</span>');
	        return false;
	    }
	    return true;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    // 设置点击'需要邮箱注册'链接之后的行为
	    var $selectReg = $('div.mail-reg').find('a');
	    var $stepAreaLi = $('div.step-area').find('li:eq(2)');
	    var $stepArea = $stepAreaLi.parent();

	    $selectReg.on('click', function () {
	        if ($stepArea.hasClass('in-mail-reg')) {
	            $('.phone').show();
	            $('.email').hide();
	            $stepAreaLi.show();
	            $stepArea.removeClass('in-mail-reg');
	            $selectReg.text('需要通过邮箱注册');
	            $selectReg.attr('href', 'mailReg.html');
	        } else {
	            $('.phone').hide();
	            $('.email').show();
	            $stepAreaLi.hide();
	            $stepArea.addClass('in-mail-reg');
	            $selectReg.text('个人用户可以使用手机号注册>');
	            $selectReg.attr('href', 'index.html');
	        }
	        return false;
	    });
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var captcha = __webpack_require__(5);

	module.exports = function () {
	    // 设置验证滑块的行为
	    // 箭头
	    var $verifyArea = $('div.verify-area');
	    var $arrow = $verifyArea.find('span.arrow');
	    // 箭头向右拖动后露出的背景
	    var $bg = $verifyArea.find('div.bg');
	    // 鼠标在滑块上按下键才可以拖动，dragging为是否可以拖动的标志变量
	    var dragging = false;
	    // 标志滑块是否到达最右端的变量
	    var reached = false;
	    var iX,
	        oX;

	    $arrow.on('mousedown', function (e) {
	        dragging = true;
	        iX = e.clientX - this.offsetLeft;

	        // 在箭头上按下鼠标才为document绑定mousemove
	        // mousemove，mouseup要绑定在document上，适应快速移动
	        // $.throttle为jQuery throttle/debounce插件提供的函数，用来控制函数连续执行的时间间隔
	        $(document).on('mousemove', $.throttle(45, function (evt) {
	            if (dragging && !reached) {
	                if ($arrow.position().left > -5) {
	                    if ($arrow.position().left < 260) {
	                        oX = evt.clientX - iX;
	                        $arrow.css('left', oX + 'px');
	                        $bg.css('width', oX + 1 + 'px');
	                    } else {
	                        reached = true;
	                    }
	                }
	            }
	        }));

	        return false;
	    });

	    $(document).on('mouseup', function () {
	        dragging = false;
	        if (!reached) {
	            $arrow.animate({left: '0'}, 400);
	            $bg.animate({width: '0'}, 400);
	            // 即使没有到达，鼠标按键抬起后也解绑mousemove
	            $(document).off('mousemove');
	        } else {
	            // 生成验证码
	            captcha.generate($('.verify'));
	            captcha.addEve(captcha.getImgNum());
	            // 滑块到达指定位置后解绑鼠标事件，以免多次触发showCaptcha()
	            $(document).off();
	            $arrow.off();
	        }
	    });
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var verifyResult = __webpack_require__(6);

	module.exports = {
	    generate: function ($container) {
	        // 验证码区域html
	        var captchaHTML = '<div id="captcha-area"><span class="captcha-text"></span>' +
	            '<a href="" class="captcha-refesh">看不清？换一张</a><div class="captcha-img">' +
	            '<img src="dist/images/captcha1.png" alt="captcha"/></div></div>';

	        // 生成验证码图片
	        // 确保只出现一张验证码图片
	        if ($container.find('#captcha-area').length < 1) {
	            $container.find('span.verify-area-text').text('');
	            $container.find('div.bg').text('请点击图中的「前学僧」字样');
	            $container.find('div.verify-area').append(captchaHTML);
	        }
	    },

	    getImgNum: function () {
	        var $img = $('div.captcha-img').find('img');

	        // 去掉图片路径中非数字字符，得到图片序号
	        return parseInt($img.attr('src').replace(/\D*/g, ''), 10);
	    },
	    addEve: function (num) {
	        var $img = $('div.captcha-img').find('img');
	        var imgNum = num;
	        // 预定义的正确点击位置 x1，x2分别为x坐标的上下限，y坐标同理
	        var correctSite = [{x1: 36, x2: 145, y1: 60, y2: 92}, {x1: 120, x2: 226, y1: 186, y2: 220}];

	        // 给图片绑定鼠标点击事件
	        // 点击到指定的位置验证通过
	        $img.on('mouseup', function (e) {
	            // 获取鼠标点击位置相对于图片左上方的坐标
	            var iX = e.clientX - $(this).offset().left;
	            var iY = e.clientY - $(this).offset().top;

	            if (iX > correctSite[imgNum - 1].x1 && iX < correctSite[imgNum - 1].x2 &&
	                iY > correctSite[imgNum - 1].y1 && iY < correctSite[imgNum - 1].y2) {
	                verifyResult.success($('.verify'));
	            } else {
	                verifyResult.fail($('.verify'));
	            }
	        });

	        // 给「看不清？换一张」绑定点击事件：刷新验证码
	        $('a.captcha-refesh').on('click', function () {
	            var newImgNum = 1;

	            if (imgNum === 1) {
	                newImgNum = 2;
	            }
	            imgNum = newImgNum;
	            $img.attr('src', 'dist/images/captcha' + newImgNum + '.png');
	            return false;
	        });
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var accountVerify = __webpack_require__(2);

	module.exports = {
	    success: function ($container) {
	        var $next = $('div.next');
	        // 显示通过提示，「下一步」按钮添加样式，绑定点击事件
	        $container.find('div.bg').text('验证通过！');
	        // 原箭头滑块替换成表示完成的对勾
	        $container.find('.arrow').addClass('iconfont icon-duihao').css('background', 'none');
	        $container.find('#captcha-area').remove();
	        $next.addClass('succeed')
	            .on('click', function () {
	                if (accountVerify()) {
	                    $next.find('a').text('并没有下一步...');
	                }
	            });
	    },

	    fail: function($container) {
	        $container.find('span.captcha-text').text('验证码点击错误，请重试');
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8)(__webpack_require__(9))

/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript === "function")
			execScript(src);
		else
			eval.call(null, src);
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "/*\n * jQuery throttle / debounce - v1.1 - 3/7/2010\n * http://benalman.com/projects/jquery-throttle-debounce-plugin/\n * \n * Copyright (c) 2010 \"Cowboy\" Ben Alman\n * Dual licensed under the MIT and GPL licenses.\n * http://benalman.com/about/license/\n */\n/* eslint-disable */\n(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!==\"boolean\"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);"

/***/ }
/******/ ]);