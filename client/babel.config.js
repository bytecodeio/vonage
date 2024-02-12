module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/env",
        {
          targets: {
            esmodules: true,
          },
          modules: false,
        },
      ],
      [
        "@babel/preset-react",
        // {
        //   development: process.env.BABEL_ENV !== "build",
        // },
      ],
    ],
    env: {
      build: {
        ignore: [
          "**/*.d.ts",
          "**/*.test.js",
          "**/*.test.jsx",
          "__snapshots__",
          "__tests__",
        ],
      },
    },
    ignore: ["node_modules"],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-runtime",
      "babel-plugin-styled-components",
      ["@babel/plugin-proposal-private-methods", { loose: true }],
    ],
  };
};
