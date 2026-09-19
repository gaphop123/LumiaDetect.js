"use strict";

/**
 * Normalization utilities for User-Agent and model names.
 * Preserves important tokens while enabling reliable matching.
 */

/**
 * Normalize a User-Agent string for matching.
 * Lowercases, collapses whitespace, keeps alphanumeric and key separators.
 * @param {string} ua
 * @returns {string}
 */
function normalizeUserAgent(ua) {
  if (ua == null || typeof ua !== "string") {
    return "";
  }
  return ua
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalize a model name for comparison.
 * Removes spaces, hyphens, underscores and lowercases.
 * @param {string} name
 * @returns {string}
 */
function normalizeModelName(name) {
  if (name == null || typeof name !== "string") {
    return "";
  }
  return name
    .toLowerCase()
    .replace(/[\s\-_]+/g, "")
    .trim();
}

/**
 * Create a searchable version of UA that keeps model-relevant tokens.
 * @param {string} ua
 * @returns {string}
 */
function prepareSearchUA(ua) {
  if (ua == null || typeof ua !== "string") {
    return "";
  }
  return ua
    .toLowerCase()
    .replace(/[\s\-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = {
  normalizeUserAgent: normalizeUserAgent,
  normalizeModelName: normalizeModelName,
  prepareSearchUA: prepareSearchUA
};
