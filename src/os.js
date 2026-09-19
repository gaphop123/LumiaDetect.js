"use strict";

/**
 * OS detection helpers for Windows Phone / Windows 10 Mobile.
 */

/**
 * Detect Windows Phone / Windows 10 Mobile OS and version from UA.
 * @param {string} ua - raw user agent
 * @returns {{ os: string|null, osVersion: string|null }}
 */
function detectOS(ua) {
  if (!ua || typeof ua !== "string") {
    return { os: null, osVersion: null };
  }

  var lower = ua.toLowerCase();

  // Windows 10 Mobile (often reported as Windows Phone 10.0)
  if (lower.indexOf("windows phone 10") !== -1 || lower.indexOf("windows phone 10.0") !== -1) {
    var v10 = extractVersion(ua, /windows\s+phone\s+(10(?:\.\d+)?)/i);
    return {
      os: "Windows 10 Mobile",
      osVersion: v10 || "10.0"
    };
  }

  // Windows Phone 8.1
  if (lower.indexOf("windows phone 8.1") !== -1) {
    return {
      os: "Windows Phone 8.1",
      osVersion: "8.1"
    };
  }

  // Windows Phone 8
  if (lower.indexOf("windows phone 8") !== -1 || lower.indexOf("windows phone os 8") !== -1) {
    var v8 = extractVersion(ua, /windows\s+phone(?:\s+os)?\s+(8(?:\.\d+)?)/i);
    return {
      os: "Windows Phone 8",
      osVersion: v8 || "8.0"
    };
  }

  // Windows Phone 7.8
  if (lower.indexOf("windows phone 7.8") !== -1 || lower.indexOf("windows phone os 7.8") !== -1) {
    return {
      os: "Windows Phone 7.8",
      osVersion: "7.8"
    };
  }

  // Windows Phone 7.5 (Mango)
  if (lower.indexOf("windows phone 7.5") !== -1 || lower.indexOf("windows phone os 7.5") !== -1) {
    return {
      os: "Windows Phone 7.5",
      osVersion: "7.5"
    };
  }

  // Windows Phone 7
  if (lower.indexOf("windows phone 7") !== -1 || lower.indexOf("windows phone os 7") !== -1) {
    var v7 = extractVersion(ua, /windows\s+phone(?:\s+os)?\s+(7(?:\.\d+)?)/i);
    return {
      os: "Windows Phone 7",
      osVersion: v7 || "7.0"
    };
  }

  // Generic Windows Phone / Windows Mobile / IEMobile signals
  if (
    lower.indexOf("windows phone") !== -1 ||
    lower.indexOf("windows mobile") !== -1 ||
    lower.indexOf("iemobile") !== -1 ||
    lower.indexOf("wpdesktop") !== -1
  ) {
    return {
      os: "Windows Phone",
      osVersion: null
    };
  }

  return { os: null, osVersion: null };
}

/**
 * Extract a version string using a regex.
 * @param {string} str
 * @param {RegExp} re
 * @returns {string|null}
 */
function extractVersion(str, re) {
  var m = str.match(re);
  if (m && m[1]) {
    return m[1];
  }
  return null;
}

/**
 * Check whether UA contains strong Windows Phone signals.
 * Does NOT treat plain "Windows", "Microsoft", or "Win32" as WP.
 * @param {string} ua
 * @returns {boolean}
 */
function hasWindowsPhoneSignal(ua) {
  if (!ua || typeof ua !== "string") {
    return false;
  }
  var lower = ua.toLowerCase();

  if (
    lower.indexOf("windows phone") !== -1 ||
    lower.indexOf("windows phone os") !== -1 ||
    lower.indexOf("windows mobile") !== -1 ||
    lower.indexOf("iemobile") !== -1 ||
    lower.indexOf("wpdesktop") !== -1
  ) {
    return true;
  }
  return false;
}

module.exports = {
  detectOS: detectOS,
  hasWindowsPhoneSignal: hasWindowsPhoneSignal
};
