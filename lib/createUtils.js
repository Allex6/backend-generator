import fse from "fs-extra";
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';
import errorFactory from './models/errorFactory.js';
import formatJoiErrors from './models/formatJoiErrors.js';

async function createUtils(){

    const folderPath = `${DEFAULT_TEMP_FOLDER}/lib/utils`;

    const errorFactoryFile = `${folderPath}/errorFactory.js`;
    if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
    await fse.writeFile(errorFactoryFile, errorFactory);

    const formatJoiErrorsFile = `${folderPath}/formatJoiErrors.js`;
    if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
    await fse.writeFile(formatJoiErrorsFile, formatJoiErrors);

}

export default createUtils;