import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/play/:id', (req: Request, res: Response) => {

    var filePath = 'dist/temp/chunks/' + req.params.id;
    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                res.status(404).end(content, 'utf-8');
            }
            else {
                res.status(500).send('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        }
        else {
            res.end(content, 'utf-8');
        }
    });
})


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});