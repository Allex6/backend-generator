import fse from "fs-extra";
import repository from "./models/repository.js";
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';

async function createRepositories(models, usePrisma, fileExt = 'js'){

    const folderPath = `${DEFAULT_TEMP_FOLDER}/lib/repositories`;

    for(const model in models){

        const filename = `${folderPath}/${model}Repository.${fileExt}`;
        if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
        await fse.writeFile(filename, repository(model, models[model], usePrisma));

    }

}

export default createRepositories;