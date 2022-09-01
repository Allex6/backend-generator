export default function schemaValidator(fileExt = 'js'){

    return `import formatJoiErrors from './../utils/formatJoiErrors${fileExt === 'js' ? '.js' : ''}';

export default function validateSchemaMiddleware(schema) {
    return (req, res, next) => { 

        const { error } = schema.validate(req.body);
        if (error) return res.status(422).send(formatJoiErrors(error));

        next();
    }
}`;

};