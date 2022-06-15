# JQL

**J**avascript **Q**uery **L**anguage

Querying, in JavaScript style B)

---------------------------------------

This is just a project I decided to take up. Nothin special.

---------------------------------------

## What it is:
JQL is a language that is currently under development and is basically SQL in JavaScript syntax! :D

## Examples

Print "Hello World!":

```
import 'jql:main/base.jql'
// Get's the print() function, which is not built in (since it is a database language)

print('Hello World!')
//=> Hello World!
```

Create DB & Create Document
```
import 'jql:main/database.jql'

createDb('dogs')
createDocument('dogs', 'dog1')
```

---------------------------------------

## What I did/didn't do

**83% done!**

What I did:
- `print()` function.
- default imports (`import 'dl:main/base.dlang'`)
- variables
- create database
- create document (`JSON` property)

What I need to do:
- read properties