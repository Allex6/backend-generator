import fse from "fs-extra";
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';
import database from './models/database.js';

async function createDatabase(type, fileExt = 'js'){

    const folderPath = `${DEFAULT_TEMP_FOLDER}/lib/databases`;

    const databaseFile = `${folderPath}/postgres.${fileExt}`;
    if(!fse.existsSync(folderPath)) fse.mkdirSync(folderPath, { recursive: true });
    fse.writeFileSync(databaseFile, database(type));

}

export default createDatabase;