const fs = require('fs')
const DLang = require('./src/index')

fs.readFile('./test/test.jql', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const app = new DLang(data)
  app.run()
});
