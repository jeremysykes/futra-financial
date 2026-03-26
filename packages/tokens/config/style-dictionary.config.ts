export default {
  source: ['src/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'primitives.css',
          format: 'css/variables',
        },
      ],
    },
  },
};
