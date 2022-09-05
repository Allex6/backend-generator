export default function getColumnsNames(model, useTypes = false){

    const columns = Object.keys(model).map(column=>{

        if(!useTypes) return column;

        return `${column}: any`;

    }).join(', ');
    return columns;

};