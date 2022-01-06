## Goal of this repository
Using monad Result from npm-package [neverthrow](https://npmjs.com/package/neverthrow) I try to not throw exceptions, but return them.   
It helped me to:  
- save Typescript types of the exceptions; 
- not interrupt execution flow with "throw";
- for other developers it is easier understanding what happens with exceptions when they happen . Because if we throw exception we must find "catch" blocks in the program, which is not easy sometimes;
- now the exception is part of the Business Logic and not something unwanted.

## Repo structure
TODO

## Try it out:
Install dependencies:
```
npm i
```
Run script:
```
node index.js
```
