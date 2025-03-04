import { env } from 'process';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'WinG Chatbot API',
          version: '1.0.0',
          description: 'API Documentation for WinG Chatbot',
      },
      servers: [
        {
          url: `http://localhost:${env.APP_PORT}/api`,
        },
      ],
      components: {
          securitySchemes: {
              bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
              },
          },
      },
  },
  apis: ['./src/swaggers/*.yaml', './src/swaggers/admin/*.yaml'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: any) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};




// const swaggerDef = {
//   openapi: '3.0.0',
//   info: {
//     title: ' WinG Chatbot API',
//     version: '1.0.0',
//     description: 'API Documentation for WinG Chatbot',
//   },
//   servers: [
//     {
//       url: `http://localhost:${env.APP_PORT}/api`,
//     },
//   ],
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//       },
//     },
//   },
// };
// const options = {
//   definition: swaggerDef,
//   apis: ['./src/swagger/*.yaml']
// };

// const adminOptions = {
//   definition: swaggerDef,
//   apis: ['./src/swagger/admin/*.yaml']
// };

// const swaggerDocApp = swaggerJsdoc(options);
// const swaggerDocAdmin = swaggerJsdoc(adminOptions);

// export default (app: Router) => {
//   app.use('/docs/app', swaggerUi.serve);
//   app.get('/docs/app', (...args) => swaggerUi.setup(swaggerDocApp)(...args));

//   app.use('/docs/admin', swaggerUi.serve);
//   app.get('/docs/admin', (...args) => swaggerUi.setup(swaggerDocAdmin)(...args));
// };