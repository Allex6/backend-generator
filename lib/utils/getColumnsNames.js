export default function getColumnsNames(model){

    const columns = Object.keys(model).join(', ');
    return columns;

};