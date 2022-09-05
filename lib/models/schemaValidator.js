import getExpressTypes from "../utils/getExpressTypes.js";

export default function schemaValidator(fileExt = 'js'){

    return `import formatJoiErrors from './../utils/formatJoiErrors${fileExt === 'js' ? '.js' : ''}';
${getExpressTypes(fileExt)}
    
export default function validateSchemaMiddleware(schema${fileExt === 'js' ? '' : ': any'}) {
    return (req${fileExt === 'js' ? '' : ': Request'}, res${fileExt === 'js' ? '' : ': Response'}, next${fileExt === 'js' ? '' : ': NextFunction'}) => { 

        const { error } = schema.validate(req.body);
        if (error) return res.status(422).send(formatJoiErrors(error));

        next();
    }
}`;

};