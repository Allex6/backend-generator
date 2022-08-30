import fse from "fs-extra";
import router from "./models/router.js";
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';

async function createRouters(models){

    const folderPath = `${DEFAULT_TEMP_FOLDER}/lib/routers`;

    for(const model in models){

        const filename = `${folderPath}/${model}Router.js`;
        if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
        await fse.writeFile(filename, router(model));

    }

}

export default createRouters;