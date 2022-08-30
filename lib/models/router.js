import capitalize from "../utils/capitalize.js";

export default function service(modelName){

    return `import { Router } from "express";
import ${modelName}Controller from "../controllers/${modelName}Controllers.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import ${modelName}Schema from "../schemas/${modelName}Schema.js";

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