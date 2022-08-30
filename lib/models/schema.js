function getModelColumns(model){

    let result = '';
    let count = 0;
    const totalColumns = Object.keys(model).length;

    for(const column in model){
        
        result += `\n\t${column}: joi.${model[column]}${count === (totalColumns - 1) ? '\n' : ','}`;

        count++;

    }

    return result;

}

export default function schema(model, models){

    return `import joi from 'joi';

const ${model}Schema = joi.object({${getModelColumns(models[model])}});

export default ${model}Schema;`;

}