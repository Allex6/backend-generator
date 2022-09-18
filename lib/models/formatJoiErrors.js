export default function formatJoiErrors(fileExt){

    return `import { ValidationError } from 'joi';
    export default function(error${fileExt === 'js' ? '' : ': ValidationError'}){

    const result = error.details.map(${fileExt === 'js' ? 'item' : '(item: { message: string })'} => item.message);
    return result;
    
};`;

};