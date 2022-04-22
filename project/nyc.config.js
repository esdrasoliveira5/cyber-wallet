module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "src/tests"
  ],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov"
  ],
}