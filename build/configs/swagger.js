"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const process_1 = require("process");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Coffee Store API',
            version: '1.0.0',
            description: 'API Documentation for Coffee Store',
        },
        servers: [
            {
                url: `http://localhost:${process_1.env.APP_PORT}/api`,
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
    apis: ['./src/swaggers/*.yaml'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
const setupSwagger = (app) => {
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map