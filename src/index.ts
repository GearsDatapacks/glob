import Readline from "readline/promises";
import * as fs from 'fs/promises';
import { LanguageError } from "./errors";
import Parser from "./parser";
import { evaluate } from "./interpreter";
import { setupEnvironment } from "./interpreter/environment";
import { stringify } from "./interpreter/utils";

const stdio = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (process.argv[2]) {
  run(process.argv[2]);
}

else {
  repl();
}

async function run (fileName: string) {
  const parser = new Parser();
  try {
    const sourceCode = (await fs.readFile(fileName)).toString();
    const program = parser.parse(sourceCode);
    setupEnvironment();
    const result = evaluate(program);

    process.exit(0);
  }
  
  catch (err) {
    if (err instanceof LanguageError) {
      console.error(err.error);
    }
    else {
      console.error(err);
    }
    process.exit(1);
  }
}

async function repl () {
  const parser = new Parser();

  console.log('Glob v0.1.0');
  setupEnvironment();

  while (true) {
    const input = await stdio.question('> ');

    if (!input || input.startsWith('exit')) {
      process.exit(0);
    }
    try {
      const program = parser.parse(input);
      const result = evaluate(program);
  
      console.log(stringify(result));
    }
    
    catch (err) {
      if (err instanceof LanguageError) {
        console.error(err.error);
      }

      else {
        console.error(err);
        process.exit(1);
      }
    }
  }
}
