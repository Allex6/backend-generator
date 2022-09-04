import createControllers from './createControllers.js';
import createDefaultFiles from './createDefaultFiles.js';
import createMiddlewares from './createMiddlewares.js';
import createRepositories from './createRepository.js';
import createRouters from './createRouters.js';
import createSchemas from './createSchemas.js';
import createServices from './createServices.js';
import createUtils from './createUtils.js';
import installDependencies from './installDependencies.js';
import moveProject from './moveProject.js';
import readModels from './readModels.js';
import prompts from 'prompts';
import createDatabase from './createDatabase.js';
import steps from './cli/steps.js';
import print from './cli/print.js';
import options from './config/options.js';

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
        
        this.generate();

    }

    languageExt(){

        switch (this.options.preferredLanguage) {

            case 'Typescript':
                return 'ts';
        
            default:
                return 'js';
        }

    }

    async generate(){
        
        const models = await readModels(this.options.modelsPath);
        const fileExt = this.languageExt();

        await createSchemas(models, fileExt);
        await createUtils(fileExt);
        await createMiddlewares(fileExt);
        await createRouters(models, fileExt);
        await createControllers(models, fileExt);
        await createServices(models, fileExt);
        await createRepositories(models, this.options.usePrisma, fileExt);
        await createDefaultFiles(fileExt);
        await createDatabase(this.options.usePrisma, fileExt);
        await moveProject(this.options.destinationPath);

        if(this.options.installDependencies) {

            print('Installing dependencies.');
            await installDependencies(
                this.options.destinationPath, 
                this.options.dependencies, 
                this.options.preferredLanguage,
                this.options.initPackageJson
            );

        } else {

            print('Project created!', 'success');

        }

    }

}

export default BackendGenerator;