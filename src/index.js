const fs = require('fs')

class DLang {
  constructor(code) {
    this.lines = code.split('\n')
  }

  noHandler() {}

  run() {
    let lines = this.lines
    let testingUtils_ = false
    let databaseUtils_ = false
    let variables = {}

    for (let i = 0; i < lines.length; i++) {
      // testing utils import test
      if (lines[i] === 'import \'dl:main/base.dlang\'') {
        testingUtils_ = true
      }

      // database utils import test
      if (lines[i] === 'import \'dl:main/database.dlang\'') {
        databaseUtils_ = true
      }

      // functions
      if (lines[i].includes('(')) {
        let currFunction_ = lines[i].split('(')[0]
        let text;
        let value = lines[i]
                    .replace('(', '')
                    .replace(')', '')
                    .replace(currFunction_, '')

        if (value.includes('\'')) {
          text = value
                  .replace(/\'/g, '')
        } else {
          text = variables[value]
        }
  
        // function conditions
        let printCondition_ = (currFunction_ === 'print' && testingUtils_ === true)
        let dbCreateUnsafeCondition_ = (currFunction_ === 'createUnsafeDB' && databaseUtils_ === true)
        let dbAddDocUnsafeCondition_ = (currFunction_ === 'createDocument' && databaseUtils_ === true)
        
        if (printCondition_) {
          // print condition
          if (text === undefined) {
            console.error(`${value} is not defined.`)
          } else {
            console.log(text)
          }
        } else if (dbCreateUnsafeCondition_) {
          // createUnsafeDB condition
          // actually we will start with the filename checker
          let unallowedChars = [
            ' ',
            '+',
            '=',
            '-',
            '!',
            '@',
            '#',
            '$',
            '%',
            '^',
            '&',
            '*',
            '(',
            ')',
            '{',
            '[',
            ']',
            '}',
            '|',
            '\\',
            '"',
            '\'',
            ';',
            ':',
            '?',
            '/',
            '.',
            '>',
            '<',
            ','
          ]

          const filenameChecker = (name) => {
            let yesorno = false
            for (let i = 0; i < unallowedChars.length; i++) {
              if (name.includes(unallowedChars[i])) {
                yesorno = true
                break
              }
            }

            return yesorno
          }

          if (filenameChecker(text)) {
            throw TypeError('Unallowed letter in the given file name.')
          } else {
            fs.writeFile(`unsafeDb/${text}.json`, '{}', err => {
              if (err) throw err
            })
          }
        }

        if (dbAddDocUnsafeCondition_) {
          let filedata = text.split(', ')
          let object

          if (variables[filedata[0]]) {
            filedata[0] = variables[filedata[0]]
          } else {
            this.noHandler()
          }

          try {
            object = JSON.parse(fs.readFileSync(`unsafeDb/${filedata[0]}.json`))
          } catch (error) {
            console.error(error)
          }

          object[filedata[1]] = {}
          fs.writeFileSync(`unsafeDb/${filedata[0]}.json`, JSON.stringify(object))
        }
      }

      // variables
      if (lines[i].includes('var', 0)) {
        let final_ = lines[i]
                      .replace('var', '')
                      .replace('=', '')
                      .trim()
                      .split('\'')

        variables[final_[0].trim()] = final_[1]
      }

      // comments (like this one!)
      if (lines[i].includes('//', 0)) {
        this.noHandler()
      }
    }
  }
}

module.exports = DLang