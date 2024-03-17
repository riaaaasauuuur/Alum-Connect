import express from 'express';
import cors from 'cors'
import helmet from 'helmet'
import fileUpload from 'express-fileupload';
import InitializeApp from './utils/InitializeApp.js';

const app = express();

//setup express middlewares
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(fileUpload());


//init db connection

app.get('/', (req, res) => {
    res.send(`ERP Services (Server time: ${Date.now()})`);
})

InitializeApp.init(app);
