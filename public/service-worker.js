/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["C:/Users/Devrim/Documents/GitHub/blog/public/2020/Month-1-Planning-and-Making/index.html","e7d6eb5ce5922faa63e8e12caa504010"],["C:/Users/Devrim/Documents/GitHub/blog/public/2020/Technology-and-Social-Media/index.html","69e5f61a698eeab5e8fee7fb64be1350"],["C:/Users/Devrim/Documents/GitHub/blog/public/archives/2020/05/index.html","48ef85a349d9182e3d4989af2b14236c"],["C:/Users/Devrim/Documents/GitHub/blog/public/archives/2020/07/index.html","88c0bcf326c493fc608021b42c273a46"],["C:/Users/Devrim/Documents/GitHub/blog/public/archives/2020/index.html","0213ac1454f1aa3910f3036dc89377c6"],["C:/Users/Devrim/Documents/GitHub/blog/public/archives/index.html","f03f77cbb2e865e68c28cf91c2b30ccc"],["C:/Users/Devrim/Documents/GitHub/blog/public/categories/index.html","b24f166bd855e47565cf550c5c8b48cc"],["C:/Users/Devrim/Documents/GitHub/blog/public/css/spoiler.css","3cdf467ed08d3ab0058133e4077db1c6"],["C:/Users/Devrim/Documents/GitHub/blog/public/hexo-github/badge.js","637f979eccbabca612463ae120dfe8b1"],["C:/Users/Devrim/Documents/GitHub/blog/public/hexo-github/octicons/octicons.css","78034780d6e0af0c98e6d1cb5fcf29fb"],["C:/Users/Devrim/Documents/GitHub/blog/public/hexo-github/octicons/octicons.eot","9f0a2ff14cf82ade5b0d5d09fc77a484"],["C:/Users/Devrim/Documents/GitHub/blog/public/hexo-github/octicons/octicons.svg","9f8c3b9241463c98d71c57ee3aadc4d6"],["C:/Users/Devrim/Documents/GitHub/blog/public/hexo-github/octicons/octicons.ttf","8cc473483ca11c160a7d021b9773e81f"],["C:/Users/Devrim/Documents/GitHub/blog/public/hexo-github/octicons/octicons.woff","5c2faa6e48106b82a0a22652110ba9d5"],["C:/Users/Devrim/Documents/GitHub/blog/public/hexo-github/style.css","7f383dba12902fea08ccf953f24d47cd"],["C:/Users/Devrim/Documents/GitHub/blog/public/images/check.svg","ae5b7ff0dcf1aeca92b038088eda1bcc"],["C:/Users/Devrim/Documents/GitHub/blog/public/images/exclamation.svg","8e43adddd99a2fa38795d7c1e9b5d296"],["C:/Users/Devrim/Documents/GitHub/blog/public/images/info.svg","c59c2be7e0f9778e06342429b3d2784a"],["C:/Users/Devrim/Documents/GitHub/blog/public/images/logo.png","5ac7cad6a405a1b6a2886d827ae23662"],["C:/Users/Devrim/Documents/GitHub/blog/public/images/question.svg","db7a042289593ea6f34d262193753189"],["C:/Users/Devrim/Documents/GitHub/blog/public/images/quote-left.svg","a2015d7d8325ae4924bdfea582bef687"],["C:/Users/Devrim/Documents/GitHub/blog/public/index.html","6bc83495e9d7e891db576acfc2d90465"],["C:/Users/Devrim/Documents/GitHub/blog/public/js/insight.js","5a4e1086200c332069b9ec6ed480d99d"],["C:/Users/Devrim/Documents/GitHub/blog/public/js/script.js","e70402b4695d5af39cd6320013835ffc"],["C:/Users/Devrim/Documents/GitHub/blog/public/js/spoiler.js","22ec9d6f44f936f8daa6eedad7e29199"],["C:/Users/Devrim/Documents/GitHub/blog/public/tags/index.html","36a1189f7099f9a45234b5de4bef41bd"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







