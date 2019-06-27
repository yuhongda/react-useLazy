const presets = [
  [
    "@babel/preset-react",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    }
  ],
];

const plugins = [
  ["@babel/plugin-proposal-decorators", { "legacy": true }],
  [
    'import',
    {
      libraryName: 'antd',
      style: 'css'
    },
  ],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['@babel/plugin-syntax-dynamic-import']
];

module.exports = { 
  presets,  
  env: {
    development: {
      presets: ['@babel/preset-env']
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ]
      ]
    },
    test: {
      presets: ['@babel/preset-env'],
      plugins: [
        [
          'nornj-loader',
          {
            extensions: ['.t.html']
          }
        ]
      ]
    }
  },
  plugins 
};
