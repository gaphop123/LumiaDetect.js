# LumiaDetect.js

**Zero-dependency JavaScript library** for detecting Microsoft Lumia / Nokia Lumia devices and Windows Phone / Windows 10 Mobile from browser User-Agent signals.

> LumiaDetect detects browser-provided User-Agent/device signals.  
> It cannot cryptographically or physically verify that the underlying hardware is a genuine Lumia device.  
> User-Agent strings can be spoofed.

---

## Features

- Pure JavaScript, zero dependencies
- No network requests, no tracking, no analytics, no cookies
- Synchronous API + Callback + Promise + Event listeners
- Real Lumia model database (extensible)
- Confidence levels: `high` / `medium` / `low`
- Works in browsers (including legacy Windows Phone browsers) and Node.js
- CommonJS, browser global, and ES Module friendly
- Safe when `navigator` or modern APIs are missing

---

## Installation

```bash
npm install lumia-detect
```

Or include the script directly:

```html
<script src="dist/LumiaDetect.js"></script>
<!-- or the minified build -->
<script src="dist/LumiaDetect.min.js"></script>
```

---

## Browser usage

```html
<script src="LumiaDetect.js"></script>
<script>
  console.log(LumiaDetect.isLumia());
  console.log(LumiaDetect.getInfo());
</script>
```

---

## CommonJS usage

```js
const LumiaDetect = require("lumia-detect");

console.log(LumiaDetect.isLumia());
console.log(LumiaDetect.getModel());
```

---

## ESM usage

```js
import LumiaDetect from "lumia-detect";

console.log(LumiaDetect.getInfo());
```

---

## API

### Synchronous helpers

| Method | Returns | Description |
|--------|---------|-------------|
| `isLumia()` | `boolean` | `true` if a Lumia model or Lumia+WP signal is detected |
| `isWindowsPhone()` | `boolean` | `true` if Windows Phone / Windows 10 Mobile signals are present |
| `getModel()` | `string \| null` | Matched model name (e.g. `"Lumia 950 XL"`) |
| `getSeries()` | `string \| null` | Series string (e.g. `"900"`) |
| `getOS()` | `string \| null` | OS name (e.g. `"Windows 10 Mobile"`) |
| `getUserAgent()` | `string \| null` | Current User-Agent |
| `getPlatform()` | `string \| null` | Current platform |
| `getInfo()` | `object` | Full detection result (immutable snapshot) |
| `getModels()` | `string[]` | All known model names |
| `hasModel(name)` | `boolean` | Whether a model (or alias) exists in the database |

### Callback API

```js
LumiaDetect.detect(function (info) {
  console.log("Success:", info);
}, function (error) {
  console.error("Error:", error);
});
```

### Promise API

```js
LumiaDetect.detect()
  .then(function (info) {
    console.log(info);
  })
  .catch(function (error) {
    console.error(error);
  });
```

### Event API

```js
function onResult(info) {
  console.log("Detected:", info);
}

LumiaDetect.onDetect(onResult);
LumiaDetect.run();          // notifies all listeners

LumiaDetect.offDetect(onResult);  // remove listener
```

---

## Detection result (`getInfo()`)

```js
{
  isLumia: true,
  isWindowsPhone: true,
  model: "Lumia 950 XL",
  series: "900",
  manufacturer: "Microsoft",
  os: "Windows 10 Mobile",
  osVersion: "10.0",
  userAgent: "...",
  platform: "...",
  confidence: "high",
  matchedPattern: "Lumia 950 XL"
}
```

Fields that cannot be determined are `null` (never the string `"undefined"`).

---

## Confidence system

| Level | Meaning |
|-------|---------|
| `high` | Exact known Lumia model matched |
| `medium` | `"Lumia"` keyword present together with a Windows Phone signal, but no specific model |
| `low` | Generic Windows Phone signal only – **not** treated as Lumia |
| `null` | No relevant signal |

A generic Windows Phone signal alone never sets `isLumia: true`.

---

## Detection priority

1. Exact Lumia model / alias match  
2. Lumia keyword + Windows Phone signal  
3. Generic Windows Phone signal  
4. Unknown  

---

## Supported Lumia models

The built-in database includes (among others):

**500 series**  
Lumia 510, 520, 525, 530, 532, 535

**600 series**  
Lumia 610, 620, 625, 630, 630 Dual SIM, 635, 636, 638, 640, 640 XL, 640 LTE, 650, 650 Dual SIM

**700 series**  
Lumia 710, 720, 730, 730 Dual SIM, 735

**800 series**  
Lumia 800, 810, 820, 822, 830

**900 series**  
Lumia 900, 920, 925, 928, 929, Icon, 930, 950, 950 XL

**1000 / 1300 / 1500 series**  
Lumia 1020, 1320, 1520

The database is designed so new models can be added without changing the detector core.

---

## Windows Phone signals recognised

- `Windows Phone`
- `Windows Phone OS`
- `Windows Mobile`
- `IEMobile`
- `WPDesktop`

Plain `Windows`, `Microsoft`, or `Win32` alone are **not** treated as Windows Phone.

---

## False-positive protection

The following environments are correctly reported as non-Lumia / non-Windows-Phone:

- Windows 10 / 11 desktop
- macOS
- Linux
- Android
- iPhone / iPad
- ChromeOS

---

## Limitations

- Detection is based solely on the User-Agent (and platform) string supplied by the browser.
- User-Agents can be spoofed by users, extensions, or privacy tools.
- Some rare or carrier-specific Lumia variants may not appear in the database.
- `navigator.userAgentData` is used when available but is never required.

---

## License

MIT License – see [LICENSE](LICENSE).
