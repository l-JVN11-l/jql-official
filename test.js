const fs = require('fs')
const DLang = require('./dist/dlang.min.js')

fs.readFile('./test/test.dlang', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const app = new DLang(data)
  app.run()
});
