import fse from "fs-extra";
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';
import errorFactory from './models/errorFactory.js';
import formatJoiErrors from './models/formatJoiErrors.js';

async function createUtils(fileExt = 'js'){

    const folderPath = `${DEFAULT_TEMP_FOLDER}/lib/utils`;

    const errorFactoryFile = `${folderPath}/errorFactory.${fileExt}`;
    if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
    await fse.writeFile(errorFactoryFile, errorFactory(fileExt));

    const formatJoiErrorsFile = `${folderPath}/formatJoiErrors.${fileExt}`;
    if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
    await fse.writeFile(formatJoiErrorsFile, formatJoiErrors(fileExt));

}

export default createUtils;