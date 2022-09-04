import { spawn } from 'node:child_process';

/**
 * @description Executes a bash command in the specified folder with the provided arguments. 'exec(npm, [install, express])' for example would install the express in the current folder.
 * @param {String} command The command for the spawn function to execute.
 * @param {Array} args An array of args provided to the command.
 * @param {String} cwd The path where this command should be executed. By default it is the current folder
 */
export default function exec(command, args = [], cwd = './'){

    return new Promise((resolve, reject)=>{

        const child = spawn(
            command,
            args,
            { stdio: 'inherit', cwd }
        );

        child.on('close', resolve);
        child.on('error', reject);

    });

}