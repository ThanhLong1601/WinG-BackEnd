import express from 'express';
import { env } from 'process';
import { dataSource } from './data-source';
import authRouter from './routes/user.routes';
const app = express();

app.use(express.json());


app.set('name', env.APP_NAME);
app.set('version', env.APP_VERSION);
app.set('host', env.APP_HOST);
app.set('port', env.APP_PORT);
app.set('env', env.APP_ENV);
app.set('db_name', env.DB_NAME);

app.use('/api/auth', authRouter);

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
