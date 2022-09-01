import capitalize from "../utils/capitalize.js";
import getColumnsNames from "../utils/getColumnsNames.js";

export default function service(modelName, columns, fileExt = 'js'){

    const formattedColumns = getColumnsNames(columns);

    return `import ${modelName}Repository from '../repositories/${modelName}Repository${fileExt === 'js' ? '.js' : ''}';
import errorFactory from '../utils/errorFactory${fileExt === 'js' ? '.js' : ''}';

async function create${capitalize(modelName)}({ ${formattedColumns} }){

    await ${modelName}Repository.create({ ${formattedColumns} });

}

async function getById(id){

    await ${modelName}Repository.getById(id);

}

async function list(){

    await ${modelName}Repository.list();

}

async function update${capitalize(modelName)}(id, { ${formattedColumns} }){

    await ${modelName}Repository.update(id, { ${formattedColumns} });

}

async function delete${capitalize(modelName)}(id){

    await ${modelName}Repository.delete${capitalize(modelName)}(id);

}

export default {
    create${capitalize(modelName)},
    getById,
    list,
    update${capitalize(modelName)},
    delete${capitalize(modelName)}
}`;

};