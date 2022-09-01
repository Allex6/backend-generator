import capitalize from "../utils/capitalize.js";

export default function service(modelName, fileExt = 'js'){

    return `import { Router } from "express";
import ${modelName}Controller from "../controllers/${modelName}Controller${fileExt === 'js' ? '.js' : ''}";
import schemaValidator from "../middlewares/schemaValidator${fileExt === 'js' ? '.js' : ''}";
import ${modelName}Schema from "../schemas/${modelName}Schema${fileExt === 'js' ? '.js' : ''}";

const router = Router();

router.post('/', 
    schemaValidator(${modelName}Schema), 
    ${modelName}Controller.create${capitalize(modelName)}
);

router.get('/', 
    ${modelName}Controller.list
);

router.get('/:id',
    ${modelName}Controller.getById
);

router.put('/:id',
    ${modelName}Controller.update${capitalize(modelName)}
);

router.delete('/:id',
    ${modelName}Controller.delete${capitalize(modelName)}
);

export default router;`;

};