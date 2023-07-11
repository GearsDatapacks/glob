# Glob
### Glob is a high level esoteric programming language.

Glob was a submission in the [Truttle1 Esojam](https://discord.gg/Mb7KXydKwQ) (Esolang jam), where the theme was "It's not a bug, it's a feature"

If you don't look too closely, glob just looks like your average programming language.

Assign variables with the `=` operator, use arithmetic operators to perform calculations.

```
x = 1
y = x * (3 - 1)
"y is 2"
```

**However, there are some things you might notice that are a bit off**

Any variables you declare are global. Everything exists within the same scope. Because of this, function arguments don't really make sense, so those are removed as well.

To define a function, simply use the `function` keyword, followed by the name and then the code, and ending the statement with the `end` keyword.
Use the function name like a variable, it will be re-evaluated every time.

EX.
```
function increment
  x = x + 1
end

x = 0
increment
increment
increment

"x is now 3"
```

You may have noticed, I am using strings instead of comments. Glob has no comments, but putting a string in the wild won't intefer with your program.

Quickly, the datatypes supported by glob are:
- **Number**: this can be a float, but you will have to calculate that yourself, as it only supports integer syntax.
- **Boolean**: Can be computed with comparison operators, might be useful to store in the `true` and `false` variables.
- **Null**: What you get when something goes wrong.
- **String**: A string of characters. Can be concatenated to other strings using the `+` operator.
- **Array**: An array of any values, can be indexed using `array[0]` syntax, works for assignment too.

### Function return values
You cannot use the `return` keyword inside functions.
Instead, the return value of a function is the last evaluated expression in the function body.

EX.
```
function add
  a + b
end

a = 1
b = 2

c = add
"c is 3"
```

### If statements
If statements exist just as you would expect:

```
true = 1 == 1

if true
  result = 1
end

"result is 1"
```

### Operators
The following operators are valid glob syntax, and work exactly as they do in other languages:
- +, -, *, /, %, =
- ==, !=, >, <, >=, <=
- !, - (unary operators)

There is also the append operator `<<`, which appends an item to an array.

EX.
```
array = [1,2,3]
array << 4

"array is now [1,2,3,4]"
```

### Parsing
Glob is parsed differently to most languages.
In languages such as java, c, c++ and javascript (kinda), the user defines the end of a statement with a semicolon.
In other languages, e.g. python, ruby, go, the parser finds the end of statements when the line ends.

Glob, on the other hand, starts a new statement whenever it finds a token that doesn't fit with the current one. This means the following syntax is valid: `a = 1 b = 2 c = 3`

It does mean that you can encounter some problems...

For example,
```
x = 1
-2
```

Sets the x variable to -1, because the statement can continue with the `-2` on the next line, and so it does.

Also, to make it easier to implement, all numbers are just variables. This means you can reassign them if you feel like it.

EX.
```
1 = 2

x = 1
x = x - 2
"x is now 0"
```

### Types and errors
Glob doesn't care about types, and uses javascript's method of addition, subtraction, etc. So if you see `[Object object]` out in the wild, that's why.
Also, if glob finds a missing character, it doesn't really care.

EX.
```
foo = [1,2,(3 + 1

"valid syntax"
```

If it encounters an error while evaluating a value, it will just return null and continue.


### Stdlib
Now, you probably noticed that I haven't used any builtin functions yet.
There are 2 of them:
- **print**: Prints the value in the `print_input` variable
- **random**: Returns a random number between 0 and 1

In general, any function that takes an input will use the value in the `<function name>_input` variable, then reset it to null so that it doesn't get accidentally used again

So, let's write our hello world program.

```
print_input = "Hello, world!"
print
```

More example programs can be found in the [examples folder](https://github.com/GearsDatapacks/glob/tree/main/examples).

### Try glob
1. Make sure you have node installed.
2. Download the latest version of glob from the [releases page](https://github.com/GearsDatapacks/glob/releases) and extract it.
3. Open a terminal and run `node <path to extracted folder>` (This folder should contain and `index.js` file).
Running the above command with no additional arguments will open the glob repl, which allows you to write glob line by line.
If you wish to create more complex programs, create a file ending in `.glob`, and run `node <path to extracted folder> <path to glob file>`. This should interpret the entire file.

### Contributing
Feel free to look at the source code and have a go at modifying it. 
It's a bit of a mess at the moment as I had very limited time to make this project.

**Note: to run the dev version, you will need typescript installed on you machine. You can either use ts-node to run the code of the fly, or the typescript compiler to compile to js, then run it.**
