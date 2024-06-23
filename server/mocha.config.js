module.exports = {
  require: ["ts-node/register"],
  extension: ["ts"],
  spec: "test/**/*.spec.ts",
  timeout: 5000,
  recursive: true,
  exit: true,
};
