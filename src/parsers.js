import fs from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';

const parser = (filepath) => {
    const absolutePath = path.resolve(cwd(), filepath)
    const data = JSON.parse(fs.readFileSync(absolutePath), 'utf-8')
    return data
} 

export default parser