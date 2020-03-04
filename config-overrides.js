const { override, fixBabelImports, addLessLoader } = require("customize-cra");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, "./src/static/less/antd.less"),
    "utf8"
  )
);

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themeVariables
  })
);
