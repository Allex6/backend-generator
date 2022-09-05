export default function errorFactory(fileExt){
    
    return `function errorFactory(type${fileExt === 'js' ? '' : ': string | number'}, messagetype${fileExt === 'js' ? '' : ': string'}){

    return {
        type,
        message
    }

};
    
export default errorFactory;`;

};