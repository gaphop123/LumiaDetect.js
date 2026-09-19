"use strict";

var database = require("./database");
var normalize = require("./normalize");
var osHelper = require("./os");
var utils = require("./utils");

/**
 * Internal cache for the last detection result.
 * Reset on every run() / detect() call that forces re-evaluation.
 */
var _cachedResult = null;
var _listeners = [];

/**
 * Build a full detection result from a given User-Agent string.
 * This is the core synchronous detection engine.
 * @param {string} [uaOverride] - optional UA for testing
 * @returns {object}
 */
function performDetection(uaOverride) {
  var ua = typeof uaOverride === "string" ? uaOverride : utils.getUserAgent();
  var platform = utils.getPlatform();
  var searchUA = normalize.prepareSearchUA(ua);
  var normUA = normalize.normalizeUserAgent(ua);

  var result = {
    isLumia: false,
    isWindowsPhone: false,
    model: null,
    series: null,
    manufacturer: null,
    os: null,
    osVersion: null,
    userAgent: ua || null,
    platform: platform || null,
    confidence: null,
    matchedPattern: null
  };

  // 1. Detect Windows Phone signal
  var hasWP = osHelper.hasWindowsPhoneSignal(ua);
  result.isWindowsPhone = hasWP;

  // OS details
  var osInfo = osHelper.detectOS(ua);
  result.os = osInfo.os;
  result.osVersion = osInfo.osVersion;

  // 2. Try exact / alias model match (highest priority)
  var matchedModel = null;
  var matchedPattern = null;
  var bestLen = 0;
  var models = database.MODELS;

  // Prefer longest match so "Lumia 950 XL" wins over "Lumia 950"
  for (var i = 0; i < models.length; i++) {
    var m = models[i];
    var nameNorm = normalize.normalizeModelName(m.name);
    if (nameNorm && searchUA.indexOf(nameNorm) !== -1 && nameNorm.length > bestLen) {
      matchedModel = m;
      matchedPattern = m.name;
      bestLen = nameNorm.length;
    }
    for (var j = 0; j < m.aliases.length; j++) {
      var aliasNorm = normalize.normalizeModelName(m.aliases[j]);
      if (aliasNorm && searchUA.indexOf(aliasNorm) !== -1 && aliasNorm.length > bestLen) {
        matchedModel = m;
        matchedPattern = m.aliases[j];
        bestLen = aliasNorm.length;
      }
    }
  }

  // Also try a more flexible search that keeps spaces for multi-word models
  if (!matchedModel) {
    for (var k = 0; k < models.length; k++) {
      var mod = models[k];
      var lowerName = mod.name.toLowerCase();
      if (searchUA.indexOf(lowerName) !== -1 && lowerName.length > bestLen) {
        matchedModel = mod;
        matchedPattern = mod.name;
        bestLen = lowerName.length;
      }
      for (var a = 0; a < mod.aliases.length; a++) {
        var lowerAlias = mod.aliases[a].toLowerCase();
        if (searchUA.indexOf(lowerAlias) !== -1 && lowerAlias.length > bestLen) {
          matchedModel = mod;
          matchedPattern = mod.aliases[a];
          bestLen = lowerAlias.length;
        }
      }
    }
  }

  if (matchedModel) {
    result.isLumia = true;
    result.isWindowsPhone = true; // Lumia implies WP/W10M
    result.model = matchedModel.name;
    result.series = matchedModel.series;
    result.manufacturer = matchedModel.manufacturer;
    result.confidence = "high";
    result.matchedPattern = matchedPattern;

    // Prefer OS from detection; if missing, fall back to model generation
    if (!result.os && matchedModel.osGeneration) {
      result.os = matchedModel.osGeneration;
    }
    return utils.freezeResult(result);
  }

  // 3. Lumia keyword + Windows Phone signal → medium confidence
  var hasLumiaKeyword =
    normUA.indexOf("lumia") !== -1 ||
    searchUA.indexOf("lumia") !== -1;

  if (hasLumiaKeyword && hasWP) {
    result.isLumia = true;
    result.isWindowsPhone = true;
    result.confidence = "medium";
    result.matchedPattern = "Lumia + Windows Phone";
    return utils.freezeResult(result);
  }

  // 4. Generic Windows Phone signal only → low confidence, NOT Lumia
  if (hasWP) {
    result.isWindowsPhone = true;
    result.isLumia = false;
    result.confidence = "low";
    result.matchedPattern = "Windows Phone generic";
    return utils.freezeResult(result);
  }

  // 5. Unknown / non-WP
  result.confidence = null;
  result.matchedPattern = null;
  return utils.freezeResult(result);
}

/**
 * Get current detection result (cached).
 * Always returns a fresh frozen object.
 */
function getInfo(uaOverride) {
  if (typeof uaOverride === "string") {
    return performDetection(uaOverride);
  }
  if (_cachedResult === null) {
    _cachedResult = performDetection();
  }
  // Return a new frozen copy so callers cannot mutate internal cache
  return utils.freezeResult({
    isLumia: _cachedResult.isLumia,
    isWindowsPhone: _cachedResult.isWindowsPhone,
    model: _cachedResult.model,
    series: _cachedResult.series,
    manufacturer: _cachedResult.manufacturer,
    os: _cachedResult.os,
    osVersion: _cachedResult.osVersion,
    userAgent: _cachedResult.userAgent,
    platform: _cachedResult.platform,
    confidence: _cachedResult.confidence,
    matchedPattern: _cachedResult.matchedPattern
  });
}

/**
 * Force re-detection and update cache.
 */
function run(uaOverride) {
  _cachedResult = performDetection(uaOverride);
  // Notify listeners
  var info = getInfo();
  for (var i = 0; i < _listeners.length; i++) {
    try {
      _listeners[i](info);
    } catch (e) {
      // Swallow listener errors to avoid breaking other listeners
    }
  }
  return info;
}

/**
 * Register a detection listener.
 * @param {function} callback
 */
function onDetect(callback) {
  if (typeof callback === "function") {
    if (utils.indexOf(_listeners, callback) === -1) {
      _listeners.push(callback);
    }
  }
}

/**
 * Remove a detection listener.
 * @param {function} callback
 */
function offDetect(callback) {
  var idx = utils.indexOf(_listeners, callback);
  if (idx !== -1) {
    _listeners.splice(idx, 1);
  }
}

/**
 * Main detect API – supports callback and Promise styles.
 * @param {function} [successCb]
 * @param {function} [errorCb]
 * @returns {Promise|undefined}
 */
function detect(successCb, errorCb) {
  var hasCallback = typeof successCb === "function";

  function doDetect() {
    try {
      var info = run();
      return info;
    } catch (err) {
      if (typeof errorCb === "function") {
        errorCb(err);
      }
      throw err;
    }
  }

  if (hasCallback) {
    try {
      var result = doDetect();
      successCb(result);
    } catch (err) {
      if (typeof errorCb === "function") {
        errorCb(err);
      }
    }
    return;
  }

  // Promise style
  if (typeof Promise !== "undefined") {
    return new Promise(function (resolve, reject) {
      try {
        resolve(doDetect());
      } catch (err) {
        reject(err);
      }
    });
  }

  // Fallback for very old environments without Promise
  return doDetect();
}

// Public synchronous helpers
function isLumia() {
  return getInfo().isLumia === true;
}

function isWindowsPhone() {
  return getInfo().isWindowsPhone === true;
}

function getModel() {
  return getInfo().model;
}

function getSeries() {
  return getInfo().series;
}

function getOS() {
  return getInfo().os;
}

function getUserAgent() {
  return getInfo().userAgent;
}

function getPlatform() {
  return getInfo().platform;
}

function getModels() {
  return database.getModelNames();
}

function hasModel(model) {
  if (!model || typeof model !== "string") {
    return false;
  }
  return database.findModel(model) !== null;
}

module.exports = {
  performDetection: performDetection,
  getInfo: getInfo,
  run: run,
  detect: detect,
  onDetect: onDetect,
  offDetect: offDetect,
  isLumia: isLumia,
  isWindowsPhone: isWindowsPhone,
  getModel: getModel,
  getSeries: getSeries,
  getOS: getOS,
  getUserAgent: getUserAgent,
  getPlatform: getPlatform,
  getModels: getModels,
  hasModel: hasModel
};
