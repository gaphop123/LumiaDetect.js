"use strict";

var detector = require("./detector");

/**
 * LumiaDetect – Public API
 * Zero-dependency library for detecting Microsoft/Nokia Lumia devices
 * and Windows Phone / Windows 10 Mobile from browser User-Agent signals.
 */
var LumiaDetect = {
  /**
   * Returns true if a known Lumia model or Lumia+WP signal is present.
   * @returns {boolean}
   */
  isLumia: function () {
    return detector.isLumia();
  },

  /**
   * Returns true if Windows Phone / Windows 10 Mobile signals are present.
   * @returns {boolean}
   */
  isWindowsPhone: function () {
    return detector.isWindowsPhone();
  },

  /**
   * Returns the matched Lumia model name or null.
   * @returns {string|null}
   */
  getModel: function () {
    return detector.getModel();
  },

  /**
   * Returns the series string (e.g. "900") or null.
   * @returns {string|null}
   */
  getSeries: function () {
    return detector.getSeries();
  },

  /**
   * Returns the detected OS name or null.
   * @returns {string|null}
   */
  getOS: function () {
    return detector.getOS();
  },

  /**
   * Returns the current User-Agent string or null.
   * @returns {string|null}
   */
  getUserAgent: function () {
    return detector.getUserAgent();
  },

  /**
   * Returns the current platform string or null.
   * @returns {string|null}
   */
  getPlatform: function () {
    return detector.getPlatform();
  },

  /**
   * Full detection result object (immutable snapshot).
   * @returns {object}
   */
  getInfo: function () {
    return detector.getInfo();
  },

  /**
   * Detect with optional success/error callbacks.
   * If no callback is provided, returns a Promise (when available).
   * @param {function} [successCallback]
   * @param {function} [errorCallback]
   * @returns {Promise|undefined}
   */
  detect: function (successCallback, errorCallback) {
    return detector.detect(successCallback, errorCallback);
  },

  /**
   * Register an onDetect listener.
   * @param {function} callback
   */
  onDetect: function (callback) {
    detector.onDetect(callback);
  },

  /**
   * Unregister an onDetect listener.
   * @param {function} callback
   */
  offDetect: function (callback) {
    detector.offDetect(callback);
  },

  /**
   * Force a new detection and notify all listeners.
   * @returns {object}
   */
  run: function () {
    return detector.run();
  },

  /**
   * List of all known Lumia model names in the database.
   * @returns {string[]}
   */
  getModels: function () {
    return detector.getModels();
  },

  /**
   * Check whether a model name (or alias) exists in the database.
   * Case-insensitive.
   * @param {string} model
   * @returns {boolean}
   */
  hasModel: function (model) {
    return detector.hasModel(model);
  },

  /**
   * Version of the library.
   */
  version: "1.0.0"
};

// CommonJS
if (typeof module !== "undefined" && module.exports) {
  module.exports = LumiaDetect;
}

// Browser global
if (typeof window !== "undefined") {
  window.LumiaDetect = LumiaDetect;
}

// AMD (optional, non-breaking)
if (typeof define === "function" && define.amd) {
  define(function () {
    return LumiaDetect;
  });
}

module.exports = LumiaDetect;
