import exec from './cli/exec.js';

function getDevDependencies(preferredLanguage, dependencies){

    const devDependencies = [];

    if(preferredLanguage === 'Typescript') {

        devDependencies.push('ts-node');
        devDependencies.push('typescript');

        const invalidTypes = [
            '@prisma/client',
            'express-async-errors',
            'dotenv',
            'joi'
        ];

        dependencies.forEach(dependency=>{

            if(invalidTypes.indexOf(dependency) === -1) devDependencies.push(`@types/${dependency}`);

        });

    }

    return devDependencies;

}

/**
 * @description This function is responsible for installing the new project's dependencies in the destination folder.
 * @param {String} newProjectFolder The path where the project will be saved.
 * @param {Array} dependencies Array containing the dependencies names to be instaled with npm. Ex => ['express', 'joi', ...]
 * @param {String} preferredLanguage Choose between Typescript or Javascript.
 */
async function installDependencies(newProjectFolder, dependencies, preferredLanguage, usePrisma = false){

    const devDependencies = getDevDependencies(preferredLanguage, dependencies);

    if(usePrisma) dependencies.push('@prisma/client');

    if(devDependencies.length > 0){

        await exec('npm', ['install', '-D'].concat(devDependencies), newProjectFolder);
        await exec('npm', ['install'].concat(dependencies), newProjectFolder);

    } else {

        await exec('npm', ['install'].concat(dependencies), newProjectFolder);

    }

    if(preferredLanguage === 'Typescript') await exec('npx', ['tsc', '--init'], newProjectFolder);

};

/**
 * @description This function creates a default package.json file in the destination folder.
 * @param {String} newProjectFolder The path where the project will be saved.
 */
async function initPackageJson(newProjectFolder){

    await exec('npm', ['init', '-y'], newProjectFolder);

}

export {
    installDependencies,
    initPackageJson
};