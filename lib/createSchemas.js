import fse from "fs-extra";
import schema from "./models/schema.js";
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';

async function createSchemas(models){

    const folderPath = `${DEFAULT_TEMP_FOLDER}/lib/schemas`;

    for(const model in models){

        const filename = `${folderPath}/${model}Schema.js`;
        if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
        await fse.writeFile(filename, schema(model, models));

    }

}

export default createSchemas;