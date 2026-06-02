const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const FILES = [
  ["LimbusCompanyIOSLocalization.module", "LimbusCompanyIOSLocalization.plugin"],
  [
    "LimbusCompanyIOSLocalization-pre-release.module",
    "LimbusCompanyIOSLocalization-pre-release.plugin",
  ],
];

function ensureSupportedLoonPlugin(content, source) {
  const requiredSections = ["[URL Rewrite]", "[MITM]"];
  for (const section of requiredSections) {
    if (!content.includes(section)) {
      throw new Error(`${source} is missing ${section}`);
    }
  }

  if (!/^#!name=/m.test(content)) {
    throw new Error(`${source} is missing a plugin name`);
  }
}

for (const [sourceName, targetName] of FILES) {
  const sourcePath = path.join(ROOT, sourceName);
  const targetPath = path.join(ROOT, targetName);
  const content = fs.readFileSync(sourcePath, "utf8").trimEnd() + "\n";

  ensureSupportedLoonPlugin(content, sourceName);
  fs.writeFileSync(targetPath, content);
  console.log(`${sourceName} -> ${targetName}`);
}
