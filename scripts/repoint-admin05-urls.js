const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ADMIN_RAW_BASE =
  "https://raw.githubusercontent.com/admin05/LimbusCompany-IOS-Localization/refs/heads/main";

const RUNTIME_FILES = [
  "LimbusCompanyIOSLocalization.module",
  "LimbusCompanyIOSLocalization-pre-release.module",
  "LimbusCompanyIOSLocalization.plugin",
  "LimbusCompanyIOSLocalization-pre-release.plugin",
];

const RESOURCE_RULES = [
  {
    matcher: /^(\^https\?:\/\/\.\*localize_jp\.zip\$\s+).*(\s+302)$/m,
    replacement: `$1${ADMIN_RAW_BASE}/localize_jp.zip$2`,
    label: "localize_jp.zip rewrite",
  },
  {
    matcher:
      /^(\^https:\/\/downloadcommon\\\.limbuscompanycdn\\\.org\/\.\*LocalizePatchInfo\\\.json\$\s+).*(\s+302)$/m,
    replacement: `$1${ADMIN_RAW_BASE}/manifest.json$2`,
    label: "LocalizePatchInfo.json rewrite",
  },
];

function readText(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function writeText(relativePath, content) {
  fs.writeFileSync(path.join(ROOT, relativePath), content);
}

function repointModule(relativePath) {
  let content = readText(relativePath);

  for (const rule of RESOURCE_RULES) {
    if (!rule.matcher.test(content)) {
      throw new Error(`${relativePath} is missing ${rule.label}`);
    }
    content = content.replace(rule.matcher, rule.replacement);
  }

  writeText(relativePath, content);
  console.log(`Repointed ${relativePath}`);
}

function auditRuntimeFile(relativePath) {
  const content = readText(relativePath);
  const forbidden = [
    "ghcruise/LimbusCompany-IOS-Localization/releases",
    "releases/latest/download",
    "script.hub",
  ];

  for (const value of forbidden) {
    if (content.includes(value)) {
      throw new Error(`${relativePath} still contains forbidden runtime URL: ${value}`);
    }
  }

  for (const resource of ["localize_jp.zip", "manifest.json"]) {
    const expected = `${ADMIN_RAW_BASE}/${resource}`;
    if (!content.includes(expected)) {
      throw new Error(`${relativePath} is missing ${expected}`);
    }
  }
}

for (const relativePath of RUNTIME_FILES) {
  repointModule(relativePath);
}

for (const relativePath of RUNTIME_FILES) {
  auditRuntimeFile(relativePath);
}

console.log("Runtime URL audit passed");
