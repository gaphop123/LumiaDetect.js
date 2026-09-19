"use strict";

/**
 * LumiaDetect.js – Unit tests
 * Run with: node test/test.js
 */

var path = require("path");
var LumiaDetect = require(path.join(__dirname, "..", "dist", "LumiaDetect.js"));

var passed = 0;
var failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log("  ✓ " + message);
  } else {
    failed++;
    console.log("  ✗ " + message);
  }
}

function assertEq(actual, expected, message) {
  var ok = actual === expected;
  if (!ok) {
    console.log("    expected: " + JSON.stringify(expected));
    console.log("    actual:   " + JSON.stringify(actual));
  }
  assert(ok, message);
}

function section(title) {
  console.log("\n=== " + title + " ===");
}

/* ------------------------------------------------------------------ */
/*  Helpers – inject UA via private test hook                         */
/* ------------------------------------------------------------------ */
function detectUA(ua) {
  return LumiaDetect._detectWithUA(ua);
}

/* ------------------------------------------------------------------ */
/*  Tests                                                             */
/* ------------------------------------------------------------------ */

section("Lumia 520");
(function () {
  var ua = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)";
  var info = detectUA(ua);
  assertEq(info.isLumia, true, "isLumia === true");
  assertEq(info.isWindowsPhone, true, "isWindowsPhone === true");
  assertEq(info.model, "Lumia 520", "model === Lumia 520");
  assertEq(info.series, "500", "series === 500");
  assertEq(info.manufacturer, "Nokia", "manufacturer === Nokia");
  assertEq(info.confidence, "high", "confidence === high");
  assert(info.os === "Windows Phone 8" || info.os === "Windows Phone", "OS detected");
})();

section("Lumia 640");
(function () {
  var ua = "Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; Microsoft; Lumia 640) like Gecko";
  var info = detectUA(ua);
  assertEq(info.isLumia, true, "isLumia === true");
  assertEq(info.model, "Lumia 640", "model === Lumia 640");
  assertEq(info.series, "600", "series === 600");
  assertEq(info.manufacturer, "Microsoft", "manufacturer === Microsoft");
  assertEq(info.confidence, "high", "confidence === high");
  assertEq(info.os, "Windows Phone 8.1", "os === Windows Phone 8.1");
})();

section("Lumia 950");
(function () {
  var ua = "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.10586";
  var info = detectUA(ua);
  assertEq(info.isLumia, true, "isLumia === true");
  assertEq(info.model, "Lumia 950", "model === Lumia 950");
  assertEq(info.series, "900", "series === 900");
  assertEq(info.os, "Windows 10 Mobile", "os === Windows 10 Mobile");
  assertEq(info.osVersion, "10.0", "osVersion === 10.0");
  assertEq(info.confidence, "high", "confidence === high");
})();

section("Lumia 950 XL");
(function () {
  var ua = "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950 XL Dual SIM) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14393";
  var info = detectUA(ua);
  assertEq(info.isLumia, true, "isLumia === true");
  assertEq(info.model, "Lumia 950 XL", "model === Lumia 950 XL");
  assertEq(info.series, "900", "series === 900");
  assertEq(info.manufacturer, "Microsoft", "manufacturer === Microsoft");
  assertEq(info.confidence, "high", "confidence === high");
})();

section("Lumia 1020");
(function () {
  var ua = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 1020)";
  var info = detectUA(ua);
  assertEq(info.isLumia, true, "isLumia === true");
  assertEq(info.model, "Lumia 1020", "model === Lumia 1020");
  assertEq(info.series, "1000", "series === 1000");
  assertEq(info.manufacturer, "Nokia", "manufacturer === Nokia");
})();

section("Lumia 1520");
(function () {
  var ua = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 1520)";
  var info = detectUA(ua);
  assertEq(info.isLumia, true, "isLumia === true");
  assertEq(info.model, "Lumia 1520", "model === Lumia 1520");
  assertEq(info.series, "1500", "series === 1500");
})();

section("Windows Phone generic (no Lumia)");
(function () {
  var ua = "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)";
  var info = detectUA(ua);
  assertEq(info.isLumia, false, "isLumia === false (generic WP)");
  assertEq(info.isWindowsPhone, true, "isWindowsPhone === true");
  assertEq(info.model, null, "model === null");
  assertEq(info.confidence, "low", "confidence === low");
})();

section("Windows 10 desktop (false positive protection)");
(function () {
  var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
  var info = detectUA(ua);
  assertEq(info.isLumia, false, "isLumia === false");
  assertEq(info.isWindowsPhone, false, "isWindowsPhone === false");
  assertEq(info.model, null, "model === null");
  assertEq(info.confidence, null, "confidence === null");
})();

section("Android (false positive protection)");
(function () {
  var ua = "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36";
  var info = detectUA(ua);
  assertEq(info.isLumia, false, "isLumia === false");
  assertEq(info.isWindowsPhone, false, "isWindowsPhone === false");
})();

section("iPhone (false positive protection)");
(function () {
  var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1";
  var info = detectUA(ua);
  assertEq(info.isLumia, false, "isLumia === false");
  assertEq(info.isWindowsPhone, false, "isWindowsPhone === false");
})();

section("hasModel API");
(function () {
  assertEq(LumiaDetect.hasModel("Lumia 950 XL"), true, 'hasModel("Lumia 950 XL")');
  assertEq(LumiaDetect.hasModel("lumia 950 xl"), true, 'hasModel("lumia 950 xl") case-insensitive');
  assertEq(LumiaDetect.hasModel("Lumia950XL"), true, 'hasModel("Lumia950XL")');
  assertEq(LumiaDetect.hasModel("Fake Phone"), false, 'hasModel("Fake Phone") === false');
})();

section("getModels API");
(function () {
  var models = LumiaDetect.getModels();
  assert(Array.isArray(models), "getModels returns array");
  assert(models.length > 30, "getModels has many models (" + models.length + ")");
  assert(models.indexOf("Lumia 520") !== -1, "contains Lumia 520");
  assert(models.indexOf("Lumia 950 XL") !== -1, "contains Lumia 950 XL");
})();

section("Alias matching");
(function () {
  var ua1 = "Mozilla/5.0 (Windows Phone 10.0; Microsoft; Lumia950XL)";
  var info1 = detectUA(ua1);
  assertEq(info1.isLumia, true, "Lumia950XL alias matched");
  assertEq(info1.model, "Lumia 950 XL", "resolved to Lumia 950 XL");

  var ua2 = "Mozilla/5.0 (Windows Phone 8.1; Nokia Lumia 640 XL)";
  var info2 = detectUA(ua2);
  assertEq(info2.model, "Lumia 640 XL", "Nokia Lumia 640 XL alias matched");
})();

section("Immutability");
(function () {
  var info = detectUA("Mozilla/5.0 (Windows Phone 10.0; Microsoft; Lumia 950)");
  var originalModel = info.model;
  try {
    info.model = "Fake";
  } catch (e) {
    // freeze may throw in strict mode
  }
  var info2 = detectUA("Mozilla/5.0 (Windows Phone 10.0; Microsoft; Lumia 950)");
  assertEq(info2.model, originalModel, "internal result not mutated by caller");
})();

section("Empty / missing UA");
(function () {
  var info = detectUA("");
  assertEq(info.isLumia, false, "empty UA → not Lumia");
  assertEq(info.isWindowsPhone, false, "empty UA → not WP");
})();

/* ------------------------------------------------------------------ */
/*  Summary                                                           */
/* ------------------------------------------------------------------ */
console.log("\n========================================");
console.log("Passed: " + passed);
console.log("Failed: " + failed);
console.log("========================================");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All tests passed.");
  process.exit(0);
}
