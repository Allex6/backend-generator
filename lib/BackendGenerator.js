import createControllers from './createControllers.js';
import createDefaultFiles from './createDefaultFiles.js';
import createMiddlewares from './createMiddlewares.js';
import createRepositories from './createRepository.js';
import createRouters from './createRouters.js';
import createSchemas from './createSchemas.js';
import createServices from './createServices.js';
import createUtils from './createUtils.js';
import { initPackageJson, installDependencies } from './dependenciesController.js';
import moveProject from './moveProject.js';
import readJSON from './utils/readJSON.js';
import prompts from 'prompts';
import createDatabase from './createDatabase.js';
import steps from './cli/steps.js';
import print from './cli/print.js';
import options from './config/options.js';
import fse from 'fs-extra';

class BackendGenerator {

    constructor(){

        this.setOptions(options);
        return this;

    }

    setOptions(options){
        this.options = options;
    }

    async start(){

        const response = await prompts(steps);
        print('Creating files and folders...');
        this.setOptions(response);
        this.options.dependencies = options.dependencies;
        this.generate();

    }

    filesExt(){

        switch (this.options.preferredLanguage) {

            case 'Typescript':
                return 'ts';
        
            default:
                return 'js';
        }

    }

    async generate(){
        
        const models = await readJSON(this.options.modelsPath);
        const fileExt = this.filesExt();

        await createSchemas(models, fileExt);
        await createUtils(fileExt);
        await createMiddlewares(fileExt);
        await createRouters(models, fileExt);
        await createControllers(models, fileExt);
        await createServices(models, fileExt);
        await createRepositories(models, this.options.usePrisma, fileExt);
        await createDefaultFiles(models, fileExt);
        await createDatabase(this.options.usePrisma, fileExt);
        await moveProject(this.options.destinationPath);

        if(this.options.installDependencies) {

            print('Installing dependencies.');
            await installDependencies(
                this.options.destinationPath, 
                this.options.dependencies, 
                this.options.preferredLanguage,
                this.options.usePrisma
            );

        }

        if(this.options.initPackageJson) {

            await initPackageJson(this.options.destinationPath);
            await this.updateGeneratedPackageJson();

        }
        print('Project created!', 'success');

    }

    async updateGeneratedPackageJson(){

        const filePath = `${this.options.destinationPath}/package.json`;
        const packageJsonContent = (await fse.readFile(filePath)).toString();

        const fileExt = this.filesExt();

        const scriptsContent = `"test": "echo \\"Error: no test specified\\" && exit 1", \n\t\t"dev": "nodemon app.${fileExt}", \n\t\t"start": "node app.${fileExt}"`;

        let newPackageJsonContent = packageJsonContent.replace(/"test": "echo \\"Error: no test specified\\" && exit 1"/gi, scriptsContent);

        if(this.options.preferredLanguage === 'Javascript'){

            const typeModuleContent = `"type": "module"`;
            newPackageJsonContent = newPackageJsonContent.replace(/"description": ""/gi, typeModuleContent);

        }

        await fse.writeFile(filePath, newPackageJsonContent);

    }

}

export default BackendGenerator;