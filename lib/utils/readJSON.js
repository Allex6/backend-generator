import fse from 'fs-extra';

/**
 * 
 * @param {String} filePath Reads the specified file and gets the models used for generating the structure.
 * @returns A JSON containing all the models and it's columns.
 */
async function readJSON(filePath){

    const json = await fse.readJSON(filePath);
    return json;

}

export default readJSON;