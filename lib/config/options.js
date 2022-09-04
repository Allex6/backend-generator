const options = {
    modelsPath: '',
    destinationPath: '',
    dependencies: [
        'cors',
        'dotenv',
        'express',
        'express-async-errors',
        'joi',
        'pg'
    ],
    devDependencies: [],
    initPackageJson: true,
    installDependencies: true,
    usePrisma: false,
    database: 'postgres'
};

export default options;