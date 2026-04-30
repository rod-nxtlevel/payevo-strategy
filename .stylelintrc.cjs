module.exports = {
  ignoreFiles: [
    "PayEvo Design System/colors_and_type.css",
    "PayEvo Design System/preview/**/*.html",
    "PayEvo Design System/ui_kits/workspace/index.html",
    "PayEvo Design System/_inspect.html",
    "prototypes/**/*.html",
    "index.html",
    "**/*.svg"
  ],
  overrides: [
    {
      files: ["**/*.html"],
      customSyntax: "postcss-html"
    }
  ],
  rules: {
    "color-no-hex": true,
    "function-disallowed-list": ["rgb", "rgba", "hsl", "hsla"]
  }
};
