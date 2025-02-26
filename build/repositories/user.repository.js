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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = exports.getUserByPhoneNumber = exports.getUserById = void 0;
const user_model_1 = require("./../models/user.model");
const data_source_1 = require("../data-source");
const getUserById = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const userReposỉtory = data_source_1.dataSource.getRepository(user_model_1.UserModel);
    return userReposỉtory.findOne({ where: { uid } });
});
exports.getUserById = getUserById;
const getUserByPhoneNumber = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const userReposỉtory = data_source_1.dataSource.getRepository(user_model_1.UserModel);
    return userReposỉtory.findOne({ where: { phone } });
});
exports.getUserByPhoneNumber = getUserByPhoneNumber;
const saveUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userReposỉtory = data_source_1.dataSource.getRepository(user_model_1.UserModel);
    const user = userReposỉtory.create(data);
    return userReposỉtory.save(user);
});
exports.saveUser = saveUser;
//# sourceMappingURL=user.repository.js.map