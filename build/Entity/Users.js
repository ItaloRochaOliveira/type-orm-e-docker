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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Consulta_1 = require("./Consulta");
let Users = class Users {
    constructor(id, name, password, createdAt, consultas, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.consultas = consultas;
    }
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.Column)("varchar", { primary: true, name: "id", length: 36 }),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email", unique: true, length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "password", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "created_at", nullable: true, length: 24 }),
    __metadata("design:type", Object)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Consulta_1.Consulta, (consulta) => consulta.user),
    __metadata("design:type", Array)
], Users.prototype, "consultas", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Index)("email", ["email"], { unique: true }),
    (0, typeorm_1.Entity)("users", { schema: "TYPE-ORM-E-DOCKER-SQL" }),
    __metadata("design:paramtypes", [String, Object, Object, Object, Array, String])
], Users);
//# sourceMappingURL=Users.js.map