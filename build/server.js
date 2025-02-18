"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const data_source_1 = require("./data-source");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.set('name', process_1.env.APP_NAME);
app.set('version', process_1.env.APP_VERSION);
app.set('host', process_1.env.APP_HOST);
app.set('port', process_1.env.APP_PORT);
app.set('env', process_1.env.APP_ENV);
app.set('db_name', process_1.env.DB_NAME);
data_source_1.dataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
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
})).catch((error) => {
    console.error('Unable to connect to database:', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map