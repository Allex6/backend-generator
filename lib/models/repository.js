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
        INSERT INTO ${modelName}s
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

        return `return await postgres.query(\`
        SELECT * FROM ${modelName}s
        WHERE id = $1
        LIMIT 1
    \`, [id]);`;

    }

}

function getList(modelName, usePrisma){

    if(usePrisma){

        return `return await postgres.${modelName}.findMany();`;

    } else {

        return `return await postgres.query(\`
        SELECT * FROM ${modelName}s
    \`);`;

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

export default function service(modelName, columns, usePrisma){

    const formattedColumns = getColumnsNames(columns);

    return `import postgres from './../databases/postgres.js';
    
async function create({ ${formattedColumns} }){

    ${getCreate(modelName, formattedColumns, usePrisma)}

}

async function getById(id){

    ${getGetById(modelName, usePrisma)}

}

async function list(){

    ${getList(modelName, usePrisma)}

}

async function update(id, { ${formattedColumns} }){

    ${getUpdate(modelName, formattedColumns, usePrisma)}

}

async function delete${capitalize(modelName)}(id){

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