const steps = [
    {
        type: 'text',
        name: 'modelsPath',
        message: 'Enter the path to read the models.json file: ',
        initial: './models.json'
    },
    {
        type: 'text',
        name: 'destinationPath',
        message: 'Enter the path to the folder where the project will be saved. The name of the last folder in the path indicates the name of the project. Ex: ./../my-project ',
        initial: './../new-project'
    },
    {
        type: 'select',
        name: 'preferredLanguage',
        message: 'Select a programming language to use in this project: ',
        choices: [
            { title: 'Javascript', value: 'Javascript' },
            { title: 'Typescript', value: 'Typescript' }
        ],
        initial: 0
    },
    {
        type: 'confirm',
        name: 'usePrisma',
        message: "Do you want to use prisma for better management of your db's migrations ?",
        initial: true
    },
    {
        type: 'confirm',
        name: 'initPackageJson',
        message: 'Do you want to initialize package.json in the project"s destination folder? Choose "no" if a package.json already exists in the destination folder.',
        initial: true
    },
    {
        type: 'confirm',
        name: 'installDependencies',
        message: 'Do you want to install the dependencies after the project is created ?',
        initial: true
    }
];

export default steps;