import express, { Application, Request, Response } from 'express';

const port: number = 3000;

const app: Application = express();
app.use(express.json());
app.use(express.static('./src/client'));

app.listen(port, '0.0.0.0', () => {
    console.log(`running at port ${port}...`);
});
