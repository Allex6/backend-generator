function getModelsRoutersImports(models, fileExt){

    let imports = '';

    for(const modelName in models){

        imports += `import ${modelName}Router from './lib/routers/${modelName}Router${fileExt === 'js' ? '.js' : ''}';\n`;

    }

    return imports;

}

function getModelsRoutersUses(models){

    let uses = '';

    for(const modelName in models){

        uses += `app.use('/${modelName}s', ${modelName}Router);\n`;

    }

    return uses;

}

export default function app(models, fileExt = 'js'){

    return `import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
${getModelsRoutersImports(models, fileExt)}import errorHandler from './lib/middlewares/errorHandler${fileExt === 'js' ? '.js' : ''}';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;

const app = express();
app.use(cors());
app.use(express.json());

${getModelsRoutersUses(models)}
app.use(errorHandler);

app.listen(SERVER_PORT, () => console.log(\`Server running at port \${SERVER_PORT}\`));`;

};