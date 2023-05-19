import express, { Express, Request, Response } from 'express';
import { a } from 'src/test';

console.log(a);


console.log(234);

const app: Express = express();

app.get('/', (req: Request, res: Response) => {

  res.send('Express + TypeScript Server');
});

const port=8080
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});