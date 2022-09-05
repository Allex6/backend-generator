export default function getExpressTypes(fileExt = 'js'){
    return (fileExt === 'ts') ? "import { Request, Response, NextFunction } from 'express';" : '';
};