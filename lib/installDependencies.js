import { spawn } from 'node:child_process';
import chalk from 'chalk';

/**
 * @description This function is responsible for installing the new project's dependencies in the destination folder.
 * @param {String} newProjectFolder The path where the project will be saved.
 * @param {Array} dependencies Array containing the dependencies names to be instaled with npm. Ex => ['express', 'joi', ...]
 * @param {Boolean} initPackageJson A boolean that indicates whether the json package should be initialized in the destination folder. If true, the command "npm init -y" will be executed. If false, only dependencies will be installed.
 */
async function installDependencies(newProjectFolder, dependencies, devDependencies, preferredLanguage, initPackageJson = true){

    if(initPackageJson) {

        spawn(
            'npm',
            ['init', '-y'],
            { stdio: 'inherit', cwd: newProjectFolder }
        );

    }

    if(preferredLanguage === 'Typescript'){

        spawn(
            'npx',
            ['tsc', '--init'],
            { stdio: 'inherit', cwd: newProjectFolder }
        );

    }

    if(devDependencies.length > 0){

        const devInstall = spawn(
            'npm',
            ['install', '-D'].concat(devDependencies),
            { stdio: 'inherit', cwd: newProjectFolder }
        );
    
        devInstall.on('close', ()=>{

            const mainInstall = spawn(
                'npm',
                ['install'].concat(dependencies),
                { stdio: 'inherit', cwd: newProjectFolder }
            );

            mainInstall.on('close', () => console.log(chalk.hex('#00FF7F').underline.bold('Project created!')));

        });

    } else {

        const mainInstall = spawn(
            'npm',
            ['install'].concat(dependencies),
            { stdio: 'inherit', cwd: newProjectFolder }
        );
    
        mainInstall.on('close', () => console.log(chalk.hex('#00FF7F').underline.bold('Project created!')));

    }

};

export default installDependencies;