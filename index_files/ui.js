/**
 * PowerReviews, Copyright 2019
 * HEAD | 17ba9c488 | 1/15/2019
 */
!function(e){var r={};function i(s){if(r[s])return r[s].exports;var o=r[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=r,i.d=function(e,r,s){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,r){if(1&r&&(e=i(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)i.d(s,o,function(r){return e[r]}.bind(null,o));return s},i.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="",i(i.s=537)}({128:function(e,r,i){"use strict";r.__esModule=!0,r.getReadServicesEnvironment=r.getWriteServicesEnvironment=r.getUILibraryEnvironment=void 0;var s=i(64),o=function(e){return e&&e.__esModule?e:{default:e}}(i(194));var n={local:o.default.local,develop:o.default.develop,release:o.default.release,stable:o.default.stable},a=function(e,r){if(n[r])return n[r];var i=(0,s.getQueryStringParams)()[e];return n[i]},t=r.getUILibraryEnvironment=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return a("pr_ui_library_base_url",e)},l=r.getWriteServicesEnvironment=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return a("pr_write_services_base_url",e)},d=r.getReadServicesEnvironment=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return a("pr_read_services_base_url",e)};r.default={getUILibraryEnvironment:t,getWriteServicesEnvironment:l,getReadServicesEnvironment:d}},172:function(e,r,i){"use strict";r.__esModule=!0;var s=r.loadVersionFile=function(e,r,i,s){var n=new XMLHttpRequest,a={v:""};window.POWERREVIEWS=window.POWERREVIEWS||{},window.POWERREVIEWS.display=window.POWERREVIEWS.display||{},window.POWERREVIEWS.display.render=function(e){window.POWERREVIEWS.display.renderQueue=e};var t=e;n.onreadystatechange=function(){4===n.readyState&&200===n.status&&(window.POWERREVIEWS.display.fastUnpublishedReviews=[],n.getAllResponseHeaders().indexOf("x-amz-meta-unpublished-reviews")>-1&&(window.POWERREVIEWS.display.fastUnpublishedReviews=n.getResponseHeader("x-amz-meta-unpublished-reviews").split(",").map(function(e){return Number(e)})),a=s&&!isNaN(s)?{v:s}:JSON.parse(n.responseText),window.POWERREVIEWS.display.build=a.v,o(a,r,i))},n.open("GET",t,!0),n.send()},o=function(e,r,i){var s=(i||"//ui.powerreviews.com/tag-builds")+"/"+(e.v?e.v:"")+"/"+r,o=document.createElement("script");o.type="text/javascript",o.src=s,document.body.appendChild(o)};r.default={loadVersionFile:s}},194:function(e,r,i){"use strict";e.exports={cloudinaryUploadBase:"//api.cloudinary.com/v1_1/powerreviews/auto/upload",cloudinaryDownloadBase:"//res.cloudinary.com/powerreviews/image",local:{akamaiUIBase:"//localhost:3001",awsUIBase:"//localhost:3001",writeBase:"//devwriteservices.powerreviews.com",b2cReadBase:"//dev-origin-readservices-b2c-api.powerreviews.com",b2cReadOrigin:"//dev-origin-readservices-b2c-api.powerreviews.com",cloudinaryImagePreset:"dev_preset",cloudinaryVideoPreset:"dev_video_preset",trackingBase:"//ui.powerreviews.com",servicesBase:"//qaservices.powerreviews.com/JSController.do",uiPRBase:"//localhost:3001",versionFullJS:"local-fulljs-version.json",versionFile3:"local-3.0-version.json",versionFile4:"local-4.0-version.json",buildBase:""},develop:{akamaiUIBase:"//akaui.powerreviews.com",awsUIBase:"//ui.powerreviews.com",writeBase:"//devwriteservices.powerreviews.com",b2cReadBase:"//dev-origin-readservices-b2c-api.powerreviews.com",b2cReadOrigin:"//dev-origin-readservices-b2c-api.powerreviews.com",cloudinaryImagePreset:"dev_preset",cloudinaryVideoPreset:"dev_video_preset",trackingBase:"//ui.powerreviews.com",servicesBase:"//qaservices.powerreviews.com/JSController.do",uiPRBase:"//ui.powerreviews.com/develop",versionFullJS:"develop-fulljs-version.json",versionFile3:"develop-3.0-version.json",versionFile4:"develop-4.0-version.json",buildBase:"develop-builds"},release:{akamaiUIBase:"//akaui.powerreviews.com",awsUIBase:"//ui.powerreviews.com",writeBase:"//qawriteservices.powerreviews.com",b2cReadBase:"//qa-origin-readservices-b2c-api.powerreviews.com",b2cReadOrigin:"//qa-origin-readservices-b2c-api.powerreviews.com",cloudinaryImagePreset:"qa_preset",cloudinaryVideoPreset:"qa_video_preset",trackingBase:"//t-staging.powerreviews.com",servicesBase:"//qaservices.powerreviews.com/JSController.do",uiPRBase:"//ui.powerreviews.com/release",versionFullJS:"release-fulljs-version.json",versionFile3:"release-3.0-version.json",versionFile4:"release-4.0-version.json",buildBase:"release-builds"},stable:{akamaiUIBase:"//akaui.powerreviews.com",awsUIBase:"//ui.powerreviews.com",writeBase:"//writeservices.powerreviews.com",b2cReadBase:"//readservices-b2c.powerreviews.com",b2cReadOrigin:"//origin-readservices-b2c-api.powerreviews.com",cloudinaryImagePreset:"prod_preset",cloudinaryVideoPreset:"prod_video_preset",trackingBase:"//t.powerreviews.com",servicesBase:"//services.powerreviews.com/JSController.do",uiPRBase:"//ui.powerreviews.com/stable",versionFullJS:"stable-fulljs-version.json",versionFile3:"stable-3.0-version.json",versionFile4:"stable-4.0-version.json",buildBase:"tag-builds"}}},537:function(e,r,i){"use strict";var s=i(172),o=(0,i(128).getUILibraryEnvironment)();if(o&&"//ui.powerreviews.com/stable"!==o.uiPRBase){window.POWERREVIEWS=window.POWERREVIEWS||{},window.POWERREVIEWS.display=window.POWERREVIEWS.display||{},window.POWERREVIEWS.display.render=function(e){window.POWERREVIEWS.display.renderQueue=e};var n=o.uiPRBase+"/4.0/ui.js",a=document.createElement("script");a.type="text/javascript",a.src=n,document.body.appendChild(a)}else{(0,s.loadVersionFile)("//ui.powerreviews.com/stable-4.0-version.json","4.0/ui.engine.js",null)}},64:function(e,r,i){"use strict";r.__esModule=!0;var s=r.getQueryStringParams=function(){var e={};if(window&&window.location&&window.location.search)for(var r=window.location.search.substring(1).split("&"),i=0,s=r.length;i<s;++i){var o=r[i].split("=");e[o[0]]=o[1]}return e};r.default={getQueryStringParams:s}}});