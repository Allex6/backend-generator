import fse from "fs-extra";
import controller from "./models/controller.js";
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';

async function createControllers(models, fileExt = 'js'){

    const folderPath = `${DEFAULT_TEMP_FOLDER}/lib/controllers`;

    for(const model in models){

        const filename = `${folderPath}/${model}Controller.${fileExt}`;
        if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
        await fse.writeFile(filename, controller(model, fileExt));

    }

}

export default createControllers;