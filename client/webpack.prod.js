const commonConfig = require("./webpack.config");

module.exports = {
  ...commonConfig,
  mode: "production",
  optimization: {
    chunkIds: "named",
  },
};
