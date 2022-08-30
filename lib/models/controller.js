import capitalize from "../utils/capitalize.js";

export default function service(modelName){

    return `import ${modelName}Service from './../services/${modelName}Service.js';
    
async function create${capitalize(modelName)}(req, res, next){

    const bodyData = req.body;
    await ${modelName}Service.create${capitalize(modelName)}(bodyData);
    res.sendStatus(201);

}

async function getById(req, res, next){

    const { id } = req.params;
    const ${modelName}Data = await ${modelName}Service.getById(id);
    res.send(${modelName}Data);

}

async function list(req, res, next){

    const ${modelName}s = await ${modelName}Service.list();
    res.send(${modelName}s);

}

async function update${capitalize(modelName)}(req, res, next){

    const { id } = req.params;
    const bodyData = req.body;
    await ${modelName}Service.update${capitalize(modelName)}(id, bodyData);
    res.sendStatus(200);

}

async function delete${capitalize(modelName)}(req, res, next){

    const { id } = req.params;
    await ${modelName}Service.delete${capitalize(modelName)}(id);
    res.sendStatus(200);

}

export default {
    create${capitalize(modelName)},
    getById,
    list,
    update${capitalize(modelName)},
    delete${capitalize(modelName)}
}`;

};