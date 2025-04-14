module.exports = {
  plugins: [
    require("postcss-nested"), // Add this for reliable nesting
    require("postcss-preset-env")({
      stage: 3, // CRA defaults to stage 3 features
      features: {
        "nesting-rules": false, // Disable default nesting to avoid conflicts
      },
    }),
    require("autoprefixer"), // CRA uses this for autoprefixing
  ],
};
