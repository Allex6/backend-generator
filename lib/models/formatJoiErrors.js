export default `export default function(error){

    const result = error.details.map(item => item.message);
    return result;

};`;