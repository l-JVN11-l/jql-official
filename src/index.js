const fs = require('fs')

const createId = text => { return btoa(text) }

class DLang {
  constructor(code) {
    this.lines = code.split('\n')
  }

  noHandler() {}

  dbGetDocUnsafeConditionRunner_(params, variables, returnCode) {
    let filedata = params
    let object

    if (variables[filedata[0]]) {
      filedata[0] = variables[filedata[0]]
    } else {
      this.noHandler()
    }

    if (variables[filedata[1]]) {
      filedata[1] = variables[filedata[1]]
    } else {
      this.noHandler()
    }

    try {
      object = JSON.parse(fs.readFileSync(`unsafeDb/${filedata[0]}.json`))[filedata[1]]
    } catch (error) {
      console.error(error)
    }

    if (returnCode) {
      return object
    }
  }

  run() {
    let lines = this.lines
    let testingUtils_ = false
    let databaseUtils_ = false
    let variables = {}

    for (let i = 0; i < lines.length; i++) {
      // testing utils import test
      if (lines[i] === 'import \'dl:main/base.jql\'') {
        testingUtils_ = true
      }

      // database utils import test
      if (lines[i] === 'import \'dl:main/database.jql\'') {
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
        let dbAddPropertyUnsafeCondition_ = (currFunction_ === 'createProperty' && databaseUtils_ === true)
        let dbRemoveDocUnsafeCondition_ = (currFunction_ === 'removeDocument' && databaseUtils_ === true)
        let dbRemove_ = (currFunction_ === 'removeDB' && databaseUtils_ === true)
        let dbRemovePropertyUnsafeCondition_ = (currFunction_ === 'removeProperty' && databaseUtils_ === true)
        let dbRenameDocUnsafeCondition_ = (currFunction_ === 'renameDocument' && databaseUtils_ === true)
        let dbRenamePropertyUnsafeCondition_ = (currFunction_ === 'renameProperty' && databaseUtils_ === true)
        let dbChangePropertyUnsafeCondition_ = (currFunction_ === 'changeProperty' && databaseUtils_ === true)
        let dbGetDocUnsafeCondition_ = (currFunction_ === 'getDocument' && databaseUtils_ === true)

        // TODO: getProperty
        
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
            // fs.writeFile(`unsafeDb/${text}.json`, ), err => {
            //   if (err) throw err
            // })

            try {
              fs.writeFileSync(`unsafeDb/${text}.json`, JSON.stringify({
                id: createId(text)
              }))
            } catch (error) {
              console.error(error)
            }
          }
        }

        if (dbAddDocUnsafeCondition_) {
          let filedata = text.split(', ') || text.split(',')
          let object

          if (variables[filedata[0]]) {
            filedata[0] = variables[filedata[0]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[1]]) {
            filedata[1] = variables[filedata[1]]
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

        if (dbAddPropertyUnsafeCondition_) {
          let filedata = text.split(', ')
          let object

          if (variables[filedata[0]]) {
            filedata[0] = variables[filedata[0]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[1]]) {
            filedata[1] = variables[filedata[1]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[2]]) {
            filedata[2] = variables[filedata[2]]
          } else {
            this.noHandler()
          }

          try {
            object = JSON.parse(fs.readFileSync(`unsafeDb/${filedata[0]}.json`))
          } catch (error) {
            console.error(error)
          }

          const object2 = {}
          object2[filedata[2]] = filedata[3]

          object[filedata[1]] = object2

          Object.assign(object[filedata[1]], object2)

          try {
            fs.writeFileSync(`unsafeDb/${filedata[0]}.json`, JSON.stringify(object))
          } catch (error) {
            console.error(error)
          }
        }

        if (dbRemoveDocUnsafeCondition_) {
          let filedata = text.split(', ')
          let object

          if (variables[filedata[0]]) {
            filedata[0] = variables[filedata[0]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[1]]) {
            filedata[1] = variables[filedata[1]]
          } else {
            this.noHandler()
          }

          try {
            object = JSON.parse(fs.readFileSync(`unsafeDb/${filedata[0]}.json`))
          } catch (error) {
            console.error(error)
          }

          delete object[filedata[1]]
          
          fs.writeFileSync(`unsafeDb/${filedata[0]}.json`, JSON.stringify(object))
        }

        if (dbRemove_) {
          let filedata = text.split(', ')

          if (variables[filedata[0]]) {
            filedata[0] = variables[filedata[0]]
          } else {
            this.noHandler()
          }

          try {
            fs.unlinkSync(`unsafeDb/${filedata[0]}.json`)
          } catch (error) {
            console.error(error)
          }
        }

        if (dbRemovePropertyUnsafeCondition_) {
          let filedata = text.split(', ')
          let object

          if (variables[filedata[0]]) {
            filedata[0] = variables[filedata[0]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[1]]) {
            filedata[1] = variables[filedata[1]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[2]]) {
            filedata[2] = variables[filedata[2]]
          } else {
            this.noHandler()
          }

          try {
            object = JSON.parse(fs.readFileSync(`unsafeDb/${filedata[0]}.json`))
          } catch (error) {
            console.error(error)
          }

          delete object[filedata[1]][filedata[2]]
        
          try {
            fs.writeFileSync(`unsafeDb/${filedata[0]}.json`, JSON.stringify(object))
          } catch (error) {
            console.error(error)
          }
        }

        if (dbRenameDocUnsafeCondition_) {
          let filedata = text.split(', ') || text.split(',')
          let object

          if (variables[filedata[0]]) {
            filedata[0] = variables[filedata[0]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[1]]) {
            filedata[1] = variables[filedata[1]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[2]]) {
            filedata[2] = variables[filedata[2]]
          } else {
            this.noHandler()
          }

          try {
            object = JSON.parse(fs.readFileSync(`unsafeDb/${filedata[0]}.json`))
          } catch (error) {
            console.error(error)
          }

          let currVal = object[filedata[1]]
          delete object[filedata[1]]

          object[filedata[2]] = currVal
          
          try {
            fs.writeFileSync(`unsafeDb/${filedata[0]}.json`, JSON.stringify(object))
          } catch (error) {
            console.error(error)
          }
        }

        if (dbRenamePropertyUnsafeCondition_) {
          let filedata = text.split(', ') || text.split(',')
          let object

          if (variables[filedata[0]]) {
            filedata[0] = variables[filedata[0]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[1]]) {
            filedata[1] = variables[filedata[1]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[2]]) {
            filedata[2] = variables[filedata[2]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[3]]) {
            filedata[3] = variables[filedata[3]]
          } else {
            this.noHandler()
          }

          try {
            object = JSON.parse(fs.readFileSync(`unsafeDb/${filedata[0]}.json`))
          } catch (error) {
            console.error(error)
          }

          let currVal = object[filedata[1]][filedata[2]]
          delete object[filedata[1]][filedata[2]]

          let obj =  { }
          obj[filedata[3]] = currVal

          Object.assign(object[filedata[1]], obj)
          
          
          try {
            fs.writeFileSync(`unsafeDb/${filedata[0]}.json`, JSON.stringify(object))
          } catch (error) {
            console.error(error)
          }
        }

        if (dbChangePropertyUnsafeCondition_) {
          let filedata = text.split(', ') || text.split(',')
          let object

          if (variables[filedata[0]]) {
            filedata[0] = variables[filedata[0]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[1]]) {
            filedata[1] = variables[filedata[1]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[2]]) {
            filedata[2] = variables[filedata[2]]
          } else {
            this.noHandler()
          }

          if (variables[filedata[3]]) {
            filedata[3] = variables[filedata[3]]
          } else {
            this.noHandler()
          }

          try {
            object = JSON.parse(fs.readFileSync(`unsafeDb/${filedata[0]}.json`))
          } catch (error) {
            console.error(error)
          }

          object[filedata[1]][filedata[2]] = filedata[3]

          try {
            fs.writeFileSync(`unsafeDb/${filedata[0]}.json`, JSON.stringify(object))
          } catch (error) {
            console.error(error)
          }
        }

        if (dbGetDocUnsafeCondition_) {
          this.dbGetDocUnsafeConditionRunner_(text.split(', ') || text.split(','), variables, false)
        }
      }

      // variables
      if (lines[i].includes('var', 0)) {
        let final_
        let inlineFunctions_ = [
          'getDocument'
        ]

        final_ = lines[i]
                      .replace('var', '')
                      .replace('=', '')
                      .trim()
                      .split('\'')

        if (!lines[i].split('\'')[0].includes('(')) {
          variables[final_[0].trim()] = final_[1]
        } else {
          let newLine = lines[i]
                        .replace('var', '')
                        .replace('=', '')
                        .trim()
                        .split('\'')

          let functionName = newLine[0].split('(')[0].split(' ')[2]
          let variableName = newLine[0].split(' ')[0].trim()
          let params = []

          if (inlineFunctions_.find(el => el === functionName)) {
            for (let i = 0; i < newLine.length; i++) {
              if (newLine[i].includes('(')) {
                var bit = newLine[i].split('(')[1].replace(',','').trim()
                if (!bit.includes('\'')) {
                  if (variables[bit]) {
                    params.push(variables[bit])
                  } else {
                    throw new ReferenceError(`${bit} is not defined.`)
                  }
                } else {
                  params.push(bit)
                }
              } else if (!newLine[i].includes('\'')) {
                if (variables[newLine[i]]) {
                  params.push(variables[bit])
                } else if (newLine[i] === ')') {
                  // bad :(
                } else {
                  params.push(newLine[i])
                }
              } else {
                throw new ReferenceError(`${newLine[i]} is not defined.`)
              }
            }
          } else {
            throw new Error(`${functionName} is not defined.`)
          }

          variables[variableName] = this.dbGetDocUnsafeConditionRunner_(params, variables, true)
        }
      }

      // comments (like this one!)
      if (lines[i].includes('//', 0)) {
        this.noHandler()
      }
    }
  }
}

module.exports = DLang