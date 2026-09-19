"use strict";

/**
 * LumiaDetect Database
 * Real Microsoft/Nokia Lumia models identifiable via User-Agent strings.
 * Schema is designed for extensibility without changing detector core.
 */

var MODELS = [
  // Lumia 500 series
  {
    name: "Lumia 510",
    aliases: ["Microsoft Lumia 510", "Nokia Lumia 510", "Lumia510", "Lumia-510", "Lumia_510"],
    series: "500",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 7.5"
  },
  {
    name: "Lumia 520",
    aliases: ["Microsoft Lumia 520", "Nokia Lumia 520", "Lumia520", "Lumia-520", "Lumia_520"],
    series: "500",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 525",
    aliases: ["Microsoft Lumia 525", "Nokia Lumia 525", "Lumia525", "Lumia-525", "Lumia_525"],
    series: "500",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 530",
    aliases: ["Microsoft Lumia 530", "Nokia Lumia 530", "Lumia530", "Lumia-530", "Lumia_530"],
    series: "500",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 532",
    aliases: ["Microsoft Lumia 532", "Nokia Lumia 532", "Lumia532", "Lumia-532", "Lumia_532"],
    series: "500",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 535",
    aliases: ["Microsoft Lumia 535", "Nokia Lumia 535", "Lumia535", "Lumia-535", "Lumia_535"],
    series: "500",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },

  // Lumia 600 series
  {
    name: "Lumia 610",
    aliases: ["Microsoft Lumia 610", "Nokia Lumia 610", "Lumia610", "Lumia-610", "Lumia_610"],
    series: "600",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 7.5"
  },
  {
    name: "Lumia 620",
    aliases: ["Microsoft Lumia 620", "Nokia Lumia 620", "Lumia620", "Lumia-620", "Lumia_620"],
    series: "600",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 625",
    aliases: ["Microsoft Lumia 625", "Nokia Lumia 625", "Lumia625", "Lumia-625", "Lumia_625"],
    series: "600",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 630",
    aliases: ["Microsoft Lumia 630", "Nokia Lumia 630", "Lumia630", "Lumia-630", "Lumia_630"],
    series: "600",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 630 Dual SIM",
    aliases: [
      "Microsoft Lumia 630 Dual SIM",
      "Nokia Lumia 630 Dual SIM",
      "Lumia 630 Dual SIM",
      "Lumia630 Dual SIM",
      "Lumia-630-Dual-SIM",
      "Lumia_630_Dual_SIM"
    ],
    series: "600",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 635",
    aliases: ["Microsoft Lumia 635", "Nokia Lumia 635", "Lumia635", "Lumia-635", "Lumia_635"],
    series: "600",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 636",
    aliases: ["Microsoft Lumia 636", "Nokia Lumia 636", "Lumia636", "Lumia-636", "Lumia_636"],
    series: "600",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 638",
    aliases: ["Microsoft Lumia 638", "Nokia Lumia 638", "Lumia638", "Lumia-638", "Lumia_638"],
    series: "600",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 640",
    aliases: ["Microsoft Lumia 640", "Nokia Lumia 640", "Lumia640", "Lumia-640", "Lumia_640"],
    series: "600",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 640 XL",
    aliases: [
      "Microsoft Lumia 640 XL",
      "Nokia Lumia 640 XL",
      "Lumia640XL",
      "Lumia-640-XL",
      "Lumia_640_XL",
      "Lumia 640XL"
    ],
    series: "600",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 640 LTE",
    aliases: [
      "Microsoft Lumia 640 LTE",
      "Nokia Lumia 640 LTE",
      "Lumia640LTE",
      "Lumia-640-LTE",
      "Lumia_640_LTE"
    ],
    series: "600",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 650",
    aliases: ["Microsoft Lumia 650", "Nokia Lumia 650", "Lumia650", "Lumia-650", "Lumia_650"],
    series: "600",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows 10 Mobile"
  },
  {
    name: "Lumia 650 Dual SIM",
    aliases: [
      "Microsoft Lumia 650 Dual SIM",
      "Nokia Lumia 650 Dual SIM",
      "Lumia650 Dual SIM",
      "Lumia-650-Dual-SIM",
      "Lumia_650_Dual_SIM"
    ],
    series: "600",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows 10 Mobile"
  },

  // Lumia 700 series
  {
    name: "Lumia 710",
    aliases: ["Microsoft Lumia 710", "Nokia Lumia 710", "Lumia710", "Lumia-710", "Lumia_710"],
    series: "700",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 7.5"
  },
  {
    name: "Lumia 720",
    aliases: ["Microsoft Lumia 720", "Nokia Lumia 720", "Lumia720", "Lumia-720", "Lumia_720"],
    series: "700",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 730",
    aliases: ["Microsoft Lumia 730", "Nokia Lumia 730", "Lumia730", "Lumia-730", "Lumia_730"],
    series: "700",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 730 Dual SIM",
    aliases: [
      "Microsoft Lumia 730 Dual SIM",
      "Nokia Lumia 730 Dual SIM",
      "Lumia730 Dual SIM",
      "Lumia-730-Dual-SIM",
      "Lumia_730_Dual_SIM"
    ],
    series: "700",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 735",
    aliases: ["Microsoft Lumia 735", "Nokia Lumia 735", "Lumia735", "Lumia-735", "Lumia_735"],
    series: "700",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },

  // Lumia 800 series
  {
    name: "Lumia 800",
    aliases: ["Microsoft Lumia 800", "Nokia Lumia 800", "Lumia800", "Lumia-800", "Lumia_800"],
    series: "800",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 7.5"
  },
  {
    name: "Lumia 810",
    aliases: ["Microsoft Lumia 810", "Nokia Lumia 810", "Lumia810", "Lumia-810", "Lumia_810"],
    series: "800",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 820",
    aliases: ["Microsoft Lumia 820", "Nokia Lumia 820", "Lumia820", "Lumia-820", "Lumia_820"],
    series: "800",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 822",
    aliases: ["Microsoft Lumia 822", "Nokia Lumia 822", "Lumia822", "Lumia-822", "Lumia_822"],
    series: "800",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 830",
    aliases: ["Microsoft Lumia 830", "Nokia Lumia 830", "Lumia830", "Lumia-830", "Lumia_830"],
    series: "800",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },

  // Lumia 900 series
  {
    name: "Lumia 900",
    aliases: ["Microsoft Lumia 900", "Nokia Lumia 900", "Lumia900", "Lumia-900", "Lumia_900"],
    series: "900",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 7.5"
  },
  {
    name: "Lumia 920",
    aliases: ["Microsoft Lumia 920", "Nokia Lumia 920", "Lumia920", "Lumia-920", "Lumia_920"],
    series: "900",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 925",
    aliases: ["Microsoft Lumia 925", "Nokia Lumia 925", "Lumia925", "Lumia-925", "Lumia_925"],
    series: "900",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 928",
    aliases: ["Microsoft Lumia 928", "Nokia Lumia 928", "Lumia928", "Lumia-928", "Lumia_928"],
    series: "900",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 929",
    aliases: ["Microsoft Lumia 929", "Nokia Lumia 929", "Lumia929", "Lumia-929", "Lumia_929", "Lumia Icon"],
    series: "900",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia Icon",
    aliases: ["Microsoft Lumia Icon", "Nokia Lumia Icon", "LumiaIcon", "Lumia-Icon", "Lumia_Icon"],
    series: "900",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },
  {
    name: "Lumia 930",
    aliases: ["Microsoft Lumia 930", "Nokia Lumia 930", "Lumia930", "Lumia-930", "Lumia_930"],
    series: "900",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8.1"
  },
  {
    name: "Lumia 950",
    aliases: ["Microsoft Lumia 950", "Nokia Lumia 950", "Lumia950", "Lumia-950", "Lumia_950"],
    series: "900",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows 10 Mobile"
  },
  {
    name: "Lumia 950 XL",
    aliases: [
      "Microsoft Lumia 950 XL",
      "Nokia Lumia 950 XL",
      "Lumia950XL",
      "Lumia-950-XL",
      "Lumia_950_XL",
      "Lumia 950XL",
      "Lumia 950 XL Dual SIM"
    ],
    series: "900",
    manufacturer: "Microsoft",
    platform: "Windows Phone",
    osGeneration: "Windows 10 Mobile"
  },

  // Lumia 1000 series
  {
    name: "Lumia 1020",
    aliases: ["Microsoft Lumia 1020", "Nokia Lumia 1020", "Lumia1020", "Lumia-1020", "Lumia_1020"],
    series: "1000",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },

  // Lumia 1300 series
  {
    name: "Lumia 1320",
    aliases: ["Microsoft Lumia 1320", "Nokia Lumia 1320", "Lumia1320", "Lumia-1320", "Lumia_1320"],
    series: "1300",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  },

  // Lumia 1500 series
  {
    name: "Lumia 1520",
    aliases: ["Microsoft Lumia 1520", "Nokia Lumia 1520", "Lumia1520", "Lumia-1520", "Lumia_1520"],
    series: "1500",
    manufacturer: "Nokia",
    platform: "Windows Phone",
    osGeneration: "Windows Phone 8"
  }
];

/**
 * Returns a shallow copy of the models array to protect internal data.
 */
function getAllModels() {
  var result = [];
  for (var i = 0; i < MODELS.length; i++) {
    result.push({
      name: MODELS[i].name,
      aliases: MODELS[i].aliases.slice(),
      series: MODELS[i].series,
      manufacturer: MODELS[i].manufacturer,
      platform: MODELS[i].platform,
      osGeneration: MODELS[i].osGeneration
    });
  }
  return result;
}

/**
 * Find a model by exact name or any alias (case-insensitive).
 * @param {string} query
 * @returns {object|null}
 */
function findModel(query) {
  if (!query || typeof query !== "string") {
    return null;
  }
  var q = query.toLowerCase().replace(/[\s\-_]+/g, "");
  for (var i = 0; i < MODELS.length; i++) {
    var m = MODELS[i];
    var nameNorm = m.name.toLowerCase().replace(/[\s\-_]+/g, "");
    if (nameNorm === q) {
      return m;
    }
    for (var j = 0; j < m.aliases.length; j++) {
      var aliasNorm = m.aliases[j].toLowerCase().replace(/[\s\-_]+/g, "");
      if (aliasNorm === q) {
        return m;
      }
    }
  }
  return null;
}

/**
 * Return only model names (for getModels API).
 */
function getModelNames() {
  var names = [];
  for (var i = 0; i < MODELS.length; i++) {
    names.push(MODELS[i].name);
  }
  return names;
}

module.exports = {
  MODELS: MODELS,
  getAllModels: getAllModels,
  findModel: findModel,
  getModelNames: getModelNames
};
