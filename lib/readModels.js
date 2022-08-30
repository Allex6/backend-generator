import fse from 'fs-extra';

/**
 * 
 * @param {String} filePath Reads the specified file and gets the models used for generating the structure.
 * @returns A JSON containing all the models and it's columns.
 */
async function readModels(filePath){

    const data = await fse.readFile(filePath);
    const json = JSON.parse(data.toString());
    return json;

}

export default readModels;