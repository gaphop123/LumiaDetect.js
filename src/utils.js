"use strict";

/**
 * Safe environment helpers. Never throw when browser APIs are missing.
 */

/**
 * Safely obtain navigator object or null.
 * @returns {object|null}
 */
function getNavigator() {
  if (typeof navigator !== "undefined" && navigator != null) {
    return navigator;
  }
  return null;
}

/**
 * Safely get userAgent string.
 * @returns {string}
 */
function getUserAgent() {
  var nav = getNavigator();
  if (nav && typeof nav.userAgent === "string") {
    return nav.userAgent;
  }
  return "";
}

/**
 * Safely get platform string.
 * @returns {string}
 */
function getPlatform() {
  var nav = getNavigator();
  if (nav && typeof nav.platform === "string") {
    return nav.platform;
  }
  return "";
}

/**
 * Safely get userAgentData if available (modern Chromium).
 * Returns null when unsupported.
 * @returns {object|null}
 */
function getUserAgentData() {
  var nav = getNavigator();
  if (nav && nav.userAgentData != null) {
    return nav.userAgentData;
  }
  return null;
}

/**
 * Create a shallow frozen copy of a result object to protect internal state.
 * Falls back to plain copy if Object.freeze is unavailable.
 * @param {object} obj
 * @returns {object}
 */
function freezeResult(obj) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  var copy = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = obj[key];
    }
  }
  if (typeof Object.freeze === "function") {
    try {
      return Object.freeze(copy);
    } catch (e) {
      return copy;
    }
  }
  return copy;
}

/**
 * Simple array indexOf polyfill-friendly helper.
 * @param {Array} arr
 * @param {*} item
 * @returns {number}
 */
function indexOf(arr, item) {
  if (!arr || !arr.length) {
    return -1;
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      return i;
    }
  }
  return -1;
}

module.exports = {
  getNavigator: getNavigator,
  getUserAgent: getUserAgent,
  getPlatform: getPlatform,
  getUserAgentData: getUserAgentData,
  freezeResult: freezeResult,
  indexOf: indexOf
};
