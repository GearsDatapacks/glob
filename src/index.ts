import { inspect } from "util";
import Readline from "readline/promises";
import * as fs from 'fs/promises';
import tokenise from "./lexer";
import { LanguageError } from "./errors";

const stdio = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const log = (x: any) => console.log(inspect(x, {
  depth: Infinity,
  colors: true,
}));

if (process.argv[2]) {
  run(process.argv[2]);
}

else {
  repl();
}

async function run (fileName: string) {
  // const parser = new Parser();
  // const env = createGlobalEnvironemt();
  try {
    const sourceCode = (await fs.readFile(fileName)).toString();
    // const program = parser.parse(sourceCode);
    // const result = evaluate(program, env);
    
    
    log(tokenise(sourceCode));
    // log(result);

    process.exit(0);
  }
  
  catch (err) {
    if (err instanceof LanguageError) {
      console.error(err.error);
    }
    console.error(err);
    process.exit(1);
  }
}

async function repl () {
  // const parser = new Parser();

  console.log('Esojam2 v0.1.0');

  while (true) {
    const input = await stdio.question('> ');

    if (!input || input.startsWith('exit')) {
      process.exit(0);
    }
    try {
      // const program = parser.parse(input);

      // const result = evaluate(program, env);
  
      log(tokenise(input));
    }
    
    catch (err) {
      if (err instanceof LanguageError) {
        console.error(err.error);
      }

      else {
        console.error(err);
        process.exit(1);
      }

      // process.exit(1);
    }
  }
}
