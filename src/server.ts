import 'reflect-metadata';
import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import { env } from 'process';
import { dataSource } from './data-source';
import authRouter from './routes/app/auth.routes';
import { setupSwagger } from './configs/swagger';
import { errors } from 'celebrate';
import compression from 'compression';
import cors from 'cors';
import userRouter from './routes/app/user.routes';
import adminAuthRouter from './routes/admin/auth.routes';
import adminContentRouter from './routes/admin/admin-content.routes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import './crons/content.cron';
import adminArtRoutes from './routes/admin/admin_art_journal.routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

app.set('name', env.APP_NAME);
app.set('version', env.APP_VERSION);
app.set('host', env.APP_HOST);
app.set('port', env.APP_PORT);
app.set('env', env.APP_ENV);
app.set('db_name', env.DB_NAME);

/* 
  User Routes
*/
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

/* 
  Admin Routes
*/
app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/admin', adminContentRouter);
app.use('/api/admin', adminArtRoutes);

app.use(errors());
app.use(errorMiddleware);

setupSwagger(app);


dataSource.initialize()
  .then(async () => {
  app.listen(app.get('port'), () => {
    console.info(`
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
- Name: ${app.get('name')}
- Version: ${app.get('version')}
- Environment: ${app.get('env')}
- Host: ${app.get('host')}
- APIs Docs: ${app.get('host')}/docs/
- Database: ${app.get('db_name')}
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
      `);
  });
}).catch((error) => {
  console.error('Unable to connect to database:', error);
  process.exit(1)
});
