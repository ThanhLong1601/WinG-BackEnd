"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const typeorm_1 = require("typeorm");
const base_model_1 = require("./base.model");
let UserModel = class UserModel extends base_model_1.BaseModel {
};
exports.UserModel = UserModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'uid' }),
    __metadata("design:type", String)
], UserModel.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'phone' }),
    __metadata("design:type", String)
], UserModel.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'pin_code' }),
    __metadata("design:type", String)
], UserModel.prototype, "pinCode", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'is_kkh_patient', default: true }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "isKkhPatient", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'avatar', nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name' }),
    __metadata("design:type", String)
], UserModel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'email', nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'date_of_birth', nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ethnicity', nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "ethnicity", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'current_occupation', nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "currentOccupation", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'highest_attained_education', nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "highestAttainedEducation", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'has_pregnancies', default: true }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "hasPregnancies", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'vaginal_deliveries', nullable: true }),
    __metadata("design:type", Number)
], UserModel.prototype, "vaginalDeliveries", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'caesarean_sections', nullable: true }),
    __metadata("design:type", Number)
], UserModel.prototype, "caesareanSections", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'miscarriages', nullable: true }),
    __metadata("design:type", Number)
], UserModel.prototype, "miscarriages", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'need_update_profile', default: true }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "needUpdateProfile", void 0);
exports.UserModel = UserModel = __decorate([
    (0, typeorm_1.Entity)('users')
], UserModel);
//# sourceMappingURL=user.model.js.map