export default function formatJoiErrors(fileExt){

    return `export default function(error${fileExt === 'js' ? '' : ': { details: [] }'}){

    const result = error.details.map(${fileExt === 'js' ? 'item' : '(item: { message: string })'} => item.message);
    return result;
    
};`;

};