import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'http';
import controller from './controllers';
import db from './controllers/db';

let app = express();
let http = Server(app);

app.use(bodyParser.json());
app.use(controller);

http.listen(3000, function () {
	console.log("Listening on port: 3000");
}); 