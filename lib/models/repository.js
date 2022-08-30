import getColumnsNames from "../utils/getColumnsNames.js";
import capitalize from './../utils/capitalize.js';

export default function service(modelName, columns){

    const formattedColumns = getColumnsNames(columns);

    return `import postgres from './../databases/postgres.js';
    
async function create({ ${formattedColumns} }){

    await postgres.${modelName}.create({ ${formattedColumns} });

}

async function getById(id){

    await postgres.${modelName}.findUnique({
        where: {
            id
        }
    });

}

async function list(){

    await postgres.${modelName}.findMany();

}

async function update(id, { ${formattedColumns} }){

    await postgres.${modelName}.update({
        where: {
            id
        },
        data: {
            ${formattedColumns}
        }
    });

}

async function delete${capitalize(modelName)}(id){

    await postgres.${modelName}.delete({
        where: {
            id
        },
    });

}

export default {
    create,
    getById,
    list,
    update,
    delete${capitalize(modelName)}
}`;

};