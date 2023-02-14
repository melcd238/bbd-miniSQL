import * as fs from 'fs';
import * as readline from 'readline';
import { Table } from './utils/tableArr';
import { Readable } from 'stream';




const mainFunction = () => {
    const table = new Table();
    let input: Readable;

    if(!process.stdin.isTTY) {
        input= fs.createReadStream("/dev/stdin");
        process.stdout.write(`Reading from terminal\n`);
    
    } else {
        input = process.stdin;
        process.stdout.write (`Reading from stdin\n`);
    }

    const rl = readline.createInterface({
        input,
        output: process.stdout,
        prompt: 'miniSQL$ ',
    })
   

  rl.prompt();

  rl.on('line', (input) => {
        const inputArr = input.split(' ');
        const command = inputArr[0];
        let value = inputArr.slice(1).join(' ').replace(/\"/g, "");
        switch (command) {
            case '': {
                rl.prompt();
                break;
            }
            case 'exit': {
                if (value) {
                       let exitCode = parseInt(value);
                    if (exitCode >= 0 || exitCode <= 255) {
                        process.exit(exitCode);
                    } else {
                        process.stdout.write(`Error: Invalid exitCode\n`)
                        rl.prompt();
                        return;
                    }
                } else {
                    process.exit(0);
                }
                break;
            }
            case 'SELECT': {
                if (value) {
                    table.selectWithUsername(value);
                } else {
                    table.select();
                }
                rl.prompt();
                break;
            }
            case 'INSERT': {
                if (value) {
                    table.insert(value);
                } else {
                    process.stdout.write(`Error: Missing value\n`)
                }
                rl.prompt();
                break;
            }
            default: {
                wierdCommand(command);
                rl.prompt();
                break;
            }
        }
    })

}



const wierdCommand = (command:String) => {
    process.stdout.write(`illegal instruction: ${command}\n`)
    process.stdout.write(`usage: INSERT username\n`)
    process.stdout.write(`       SELECT [username]\n`)
    process.stdout.write(`       exit [code]\n`)
}

mainFunction();