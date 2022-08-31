import fse from "fs-extra";
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';
import app from './models/app.js';
import env from './models/env.js';

async function createDefaultFiles(fileExt = 'js'){

    const folderPath = DEFAULT_TEMP_FOLDER;

    const appFile = `${folderPath}/app.${fileExt}`;
    await fse.writeFile(appFile, app);

    const envFile = `${folderPath}/.env`;
    await fse.writeFile(envFile, env);

}

export default createDefaultFiles;