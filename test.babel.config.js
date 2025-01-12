const isTest = process.env.NODE_ENV === 'test';

module.exports = (api) => {
  api.cache(true);

  if (isTest) {
    return {
      presets: [
        '@babel/preset-env',
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ],
        '@babel/preset-typescript',
      ],
    };
  }

  return {};
};
