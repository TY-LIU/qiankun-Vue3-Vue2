const port = 6700;

module.exports = {
  devServer: {
    port
  },
  transpileDependencies: ['single-spa', 'qiankun', 'import-html-entry']
};

