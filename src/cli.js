#!/usr/bin/env node
const [,, ...args] = process.argv
const fs = require('fs')
const JQL = require('../dist/jql.min.js')

fs.readFile(args[0], 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const app = new JQL(data)
  app.run()
});
