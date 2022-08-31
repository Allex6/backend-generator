import createControllers from "./createControllers.js";
import createDefaultFiles from "./createDefaultFiles.js";
import createMiddlewares from "./createMiddlewares.js";
import createRepositories from "./createRepository.js";
import createRouters from "./createRouters.js";
import createSchemas from "./createSchemas.js";
import createServices from "./createServices.js";
import createUtils from "./createUtils.js";
import installDependencies from "./installDependencies.js";
import moveProject from "./moveProject.js";
import readModels from "./readModels.js";
import prompts from 'prompts';
import chalk from 'chalk';
import createDatabase from "./createDatabase.js";

class Initializer {

    constructor(){

        this.modelsPath = '';
        this.destinationPath = '';
        this.dependencies = [];
        this.shouldInitPackageJson = true;
        this.installDependenciesAfterCreation = true;
        this.usePrisma = true;
        return this;

    }

    async start(){

        const options = [
            {
                type: 'text',
                name: 'modelsPath',
                message: 'Enter the path to read the models.json file: ',
                initial: './models.json'
            },
            {
                type: 'text',
                name: 'destinationPath',
                message: 'Enter the path to the folder where the project will be saved. The name of the last folder in the path indicates the name of the project. Ex: ./../my-project ',
                initial: './../new-project'
            },
            {
                type: 'confirm',
                name: 'usePrisma',
                message: "Do you want to use prisma for better management of your db's migrations ?",
                initial: true
            },
            {
                type: 'confirm',
                name: 'shouldInitPackageJson',
                message: 'Do you want to initialize package.json in the project"s destination folder? Choose "no" if a package.json already exists in the destination folder.',
                initial: true
            },
            {
                type: 'confirm',
                name: 'installDependenciesAfterCreation',
                message: 'Do you want to install the dependencies after the project is created ?',
                initial: true
            }
        ];

        const response = await prompts(options);
        console.log(chalk.hex('#00BFFF').underline.bold('Creating files and folders...'));
        this.configure(response).exec();

    }

    /**
     * 
     * @param {Object} configOptions A configuration object. Object.models configures the path for reading the application's models. Object.destination sets the path where the new project will be saved. Object.dependencies adds an array of dependencies to be installed using npm. Object.usePrisma defines whether you want to use the prism for migration management or not. Note: There is already a few dependencies to be installed by default, like express.
     */
    configure({ modelsPath, destinationPath, dependencies, usePrisma = true, shouldInitPackageJson = true, installDependenciesAfterCreation = true }){

        this.modelsPath = modelsPath;
        this.destinationPath = destinationPath;
        this.dependencies = [
            "cors",
            "dotenv",
            "express",
            "express-async-errors",
            "joi"
        ];

        this.shouldInitPackageJson = shouldInitPackageJson;
        this.installDependenciesAfterCreation = installDependenciesAfterCreation;

        this.usePrisma = usePrisma;
        const dbDependency = (usePrisma) ? "@prisma/client" : 'pg';
        this.dependencies.push(dbDependency);

        if(dependencies) this.dependencies = this.dependencies.concat(dependencies);

        return this;

    }

    async exec(){
        
        const models = await readModels(this.modelsPath);
        await createSchemas(models);
        await createUtils();
        await createMiddlewares();
        await createRouters(models);
        await createControllers(models);
        await createServices(models);
        await createRepositories(models, this.usePrisma);
        await createDefaultFiles();
        const dbType = (this.usePrisma) ? 'prisma' : 'postgres';
        await createDatabase(dbType);
        await moveProject(this.destinationPath);
        if(this.installDependenciesAfterCreation) {
            console.log(chalk.hex('#00BFFF').underline.bold('Installing dependencies.'));
            await installDependencies(this.destinationPath, this.dependencies, this.shouldInitPackageJson);
        } else {
            console.log(chalk.hex('#00FF7F').underline.bold('Project created!.'));
        }

    }

}

export default Initializer;