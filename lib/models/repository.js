import getColumnsNames from "../utils/getColumnsNames.js";
import capitalize from './../utils/capitalize.js';

function getParamsFromColumns(formattedColumns, contentForSet = false){

    const params = [];
    const splitted = formattedColumns.split(',');

    for(let i = 0; i < splitted.length; i++){

        if(contentForSet){

            params.push(`${splitted[i]} = $${i + 1}`);

        } else {
            params.push(`$${i + 1}`);
        }

    }

    return params.join(', ');

}

function getCreate(modelName, formattedColumns, usePrisma){

    if(usePrisma){

        return `await postgres.${modelName}.create({ ${formattedColumns} });`;

    } else {

        return `await postgres.query(\`
        INSERT INTO ${modelName}s (${formattedColumns})
        VALUES (${getParamsFromColumns(formattedColumns)})
    \`, [${formattedColumns}]);`;

    }

}

function getGetById(modelName, usePrisma){

    if(usePrisma){

        return `return await postgres.${modelName}.findUnique({
        where: {
            id
        }
    });`;

    } else {

        return `const { rows: ${modelName}s } = await postgres.query(\`
        SELECT * FROM ${modelName}s
        WHERE id = $1
        LIMIT 1
    \`, [id]);
    
    return (${modelName}s.length > 0) ? ${modelName}s[0] : null;`;

    }

}

function getList(modelName, usePrisma){

    if(usePrisma){

        return `return await postgres.${modelName}.findMany();`;

    } else {

        return `const { rows: ${modelName}s } = await postgres.query(\`
        SELECT * FROM ${modelName}s
    \`);
    
    return ${modelName}s;`;

    }

}

function getUpdate(modelName, formattedColumns, usePrisma){

    if(usePrisma){

        return `await postgres.${modelName}.update({
        where: {
            id
        },
        data: {
            ${formattedColumns}
        }
    });`;

    } else {

        const splitted = formattedColumns.split(',');

        return `await postgres.query(\`
        UPDATE ${modelName}s
        SET ${getParamsFromColumns(formattedColumns, true)}
        WHERE id = $${splitted.length}
    \`, [${formattedColumns}, id]);`;

    }

}

function getDelete(modelName, usePrisma){

    if(usePrisma){

        return `await postgres.${modelName}.delete({
        where: {
            id
        },
    });`;

    } else {

        return `await postgres.query(\`
        DELETE FROM ${modelName}s
        WHERE id = $1
    \`, [id]);`;

    }

}

export default function service(modelName, columns, usePrisma, fileExt = 'js'){

    const formattedColumns = getColumnsNames(columns);
    const useTypes = (fileExt === 'ts');
    const paramsColumns = getColumnsNames(columns, useTypes);

    return `import postgres from './../databases/postgres${fileExt === 'js' ? '.js' : ''}';

/**
 * @description Insert a new ${modelName} record into the database.
 * @param {Object} ${modelName}Data An object with the fields needed to create a ${modelName}
 */
async function create(${fileExt === 'js' ? '' : `${modelName}Data: `}{ ${paramsColumns} }){
    ${fileExt === 'js' ? '' : `\n\t const { ${formattedColumns} } = ${modelName}Data;`}
    ${getCreate(modelName, formattedColumns, usePrisma)}

}

/**
 * @description Search for a ${modelName} by ID.
 * @param {Number} id The ${modelName} id saved in the database.
 * @returns The ${modelName} saved in the database, or null if it does not exists.
 */
async function getById(id${fileExt === 'js' ? '' : `: number`}){

    ${getGetById(modelName, usePrisma)}

}

/**
 * @description Search for a list of ${modelName}s.
 * @returns A list of ${modelName}s.
 */
async function list(){

    ${getList(modelName, usePrisma)}

}

/**
 * @description Updates all data of a single record of ${modelName}
 * @param {Object} ${modelName}Data An object with the fields needed to update a ${modelName}
 */
async function update(id${fileExt === 'js' ? '' : `: number`}, ${fileExt === 'js' ? '' : `${modelName}Data: `}{ ${paramsColumns} }){
    ${fileExt === 'js' ? '' : `\n\t const { ${formattedColumns} } = ${modelName}Data;`}
    ${getUpdate(modelName, formattedColumns, usePrisma)}

}

/**
 * @description Deletes a ${modelName} by ID.
 * @param {Number} id The ${modelName} id saved in the database.
 */
async function delete${capitalize(modelName)}(id${fileExt === 'js' ? '' : `: number`}){

    ${getDelete(modelName, usePrisma)}

}

export default {
    create,
    getById,
    list,
    update,
    delete${capitalize(modelName)}
}`;

};