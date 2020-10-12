import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import config from '../config';
import passport from 'passport';
import * as swaggerUI from 'swagger-ui-express';
import { RegisterRoutes } from '../lib/routes/routes';
import {errorHandler} from "./middleware/errorHandling";
import {sequelize} from './sequalize';
const swaggerJSON = require('./swagger/swagger.json');


class App {

    public app: express.Express;
    public dbUri: string = config.database;

    constructor() {
        this.app = express();
        this.config();
        this.setupPassport();
        this.setupSwagger();
        RegisterRoutes(this.app);
        this.app.use(errorHandler); //error handler middleware
        this.setupSequalize();

    }   
    
    private config(): void {

        this.app.use(bodyParser.json({ limit: '5mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 5000 }));

        // serving static files 
        // this.app.use(express.static('public')); 
        this.app.use(cors())

    }

    private setupPassport(): void {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        require('../config/passport');
    }

    private setupSwagger(): void {
        this.app.use('/swagger.json', (req, res) => {
           res.send(swaggerJSON);
        });
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
    }

    private async setupSequalize(): Promise<void> {
        await sequelize.sync({force: false});
    }


    // private mongoSetup(): void {
    //     mongoose.Promise = global.Promise;
    //     mongoose.connect(this.mongoUrl);
    // }
}

export default new App().app;