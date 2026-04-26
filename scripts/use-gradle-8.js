const fs = require("fs");
const path = require("path");

const gradleVersion = "8.14.3";
const wrapperPath = path.join(
  __dirname,
  "..",
  "android",
  "gradle",
  "wrapper",
  "gradle-wrapper.properties"
);
const propertiesPath = path.join(__dirname, "..", "android", "gradle.properties");

if (!fs.existsSync(wrapperPath)) {
  throw new Error("Run Expo Android prebuild before patching the Gradle wrapper.");
}

const wrapper = fs.readFileSync(wrapperPath, "utf8");
const updatedWrapper = wrapper.replace(
  /gradle-\d+\.\d+(?:\.\d+)?-bin\.zip/,
  `gradle-${gradleVersion}-bin.zip`
);

fs.writeFileSync(wrapperPath, updatedWrapper);

if (fs.existsSync(propertiesPath)) {
  const properties = fs.readFileSync(propertiesPath, "utf8");
  const autoDownload = "org.gradle.java.installations.auto-download=false";

  if (!properties.includes(autoDownload)) {
    fs.writeFileSync(propertiesPath, `${properties.trimEnd()}\n${autoDownload}\n`);
  }
}

console.log(`Using Gradle ${gradleVersion} for Android native builds.`);
