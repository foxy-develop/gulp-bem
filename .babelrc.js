module.exports = {
  presets: [require("@babel/preset-env")],
  plugins: [
    require("@babel/plugin-proposal-class-properties"),
    require("@babel/plugin-proposal-private-methods"),
    require("@babel/plugin-syntax-dynamic-import"),
    require("@babel/plugin-transform-runtime")
  ]
};
