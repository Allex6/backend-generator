import capitalize from "../utils/capitalize.js";

function getExpressTypes(){
    return "import { Request, Response, NextFunction } from 'express';";
}

export default function service(modelName, fileExt = 'js'){

    return `import ${modelName}Service from './../services/${modelName}Service${fileExt === 'js' ? '.js' : ''}';
${fileExt === 'js' ? '' : getExpressTypes()}

async function create${capitalize(modelName)}(req${fileExt === 'js' ? '' : ' :Request'}, res${fileExt === 'js' ? '' : ' :Response'}, next${fileExt === 'js' ? '' : ' :NextFunction'}){

    const bodyData = req.body;
    await ${modelName}Service.create${capitalize(modelName)}(bodyData);
    res.sendStatus(201);

}

async function getById(req${fileExt === 'js' ? '' : ' :Request'}, res${fileExt === 'js' ? '' : ' :Response'}, next${fileExt === 'js' ? '' : ' :NextFunction'}){

    const { id } = req.params;
    const ${modelName}Data = await ${modelName}Service.getById(${fileExt === 'js' ? '' : `Number(`}id${fileExt === 'js' ? '' : `)`});
    res.send(${modelName}Data);

}

async function list(req${fileExt === 'js' ? '' : ' :Request'}, res${fileExt === 'js' ? '' : ' :Response'}, next${fileExt === 'js' ? '' : ' :NextFunction'}){

    const ${modelName}s = await ${modelName}Service.list();
    res.send(${modelName}s);

}

async function update${capitalize(modelName)}(req${fileExt === 'js' ? '' : ' :Request'}, res${fileExt === 'js' ? '' : ' :Response'}, next${fileExt === 'js' ? '' : ' :NextFunction'}){

    const { id } = req.params;
    const bodyData = req.body;
    await ${modelName}Service.update${capitalize(modelName)}(${fileExt === 'js' ? '' : `Number(`}id${fileExt === 'js' ? '' : `)`}, bodyData);
    res.sendStatus(200);

}

async function delete${capitalize(modelName)}(req${fileExt === 'js' ? '' : ' :Request'}, res${fileExt === 'js' ? '' : ' :Response'}, next${fileExt === 'js' ? '' : ' :NextFunction'}){

    const { id } = req.params;
    await ${modelName}Service.delete${capitalize(modelName)}(${fileExt === 'js' ? '' : `Number(`}id${fileExt === 'js' ? '' : `)`});
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