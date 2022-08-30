import fse from "fs-extra";
import service from "./models/service.js";
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';

async function createServices(models){

    const folderPath = `${DEFAULT_TEMP_FOLDER}/lib/services`;

    for(const model in models){

        const filename = `${folderPath}/${model}Service.js`;
        if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
        await fse.writeFile(filename, service(model, models[model]));

    }

}

export default createServices;