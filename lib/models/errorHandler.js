import getExpressTypes from "../utils/getExpressTypes.js";

export default function errorHandler(fileExt){

    return `${getExpressTypes(fileExt)}
function errorHandler(error${fileExt === 'js' ? '' : ': { type: string, message: string | number }'}, req${fileExt === 'js' ? '' : ': Request'}, res${fileExt === 'js' ? '' : ': Response'}, next${fileExt === 'js' ? '' : ': NextFunction'}){

    if(error.type === 'not_found') res.status(404).send(error.message);
    if(error.type === 'conflict') res.status(422).send(error.message);

    return res.sendStatus(500);

};

export default errorHandler;`;

};