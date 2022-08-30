import fse from "fs-extra";
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';
import schemaValidator from './models/schemaValidator.js';
import errorHandler from './models/errorHandler.js';

async function createMiddlewares(){

    const folderPath = `${DEFAULT_TEMP_FOLDER}/lib/middlewares`;

    const schemaValidatorFile = `${folderPath}/schemaValidator.js`;
    if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
    fse.writeFileSync(schemaValidatorFile, schemaValidator);

    const errorHandlerFile = `${folderPath}/errorHandler.js`;
    if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
    await fse.writeFile(errorHandlerFile, errorHandler);

}

export default createMiddlewares;