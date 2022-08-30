import fse from 'fs-extra';
import DEFAULT_TEMP_FOLDER from './utils/defaultTemp.js';

export default async function(dest){

    await fse.move(DEFAULT_TEMP_FOLDER, dest);

};