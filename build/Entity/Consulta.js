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
exports.Consulta = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let Consulta = class Consulta {
    constructor(id, name, description, status, data, createdAt, updatedAt, userId, user) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.data = data;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.user = user;
    }
};
exports.Consulta = Consulta;
__decorate([
    (0, typeorm_1.Column)("varchar", { primary: true, name: "id", length: 36 }),
    __metadata("design:type", String)
], Consulta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], Consulta.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "description", nullable: true, length: 200 }),
    __metadata("design:type", Object)
], Consulta.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "status", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], Consulta.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "data", nullable: true, length: 24 }),
    __metadata("design:type", Object)
], Consulta.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "created_at", nullable: true, length: 24 }),
    __metadata("design:type", Object)
], Consulta.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "updated_at", nullable: true, length: 24 }),
    __metadata("design:type", Object)
], Consulta.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "user_id", length: 36 }),
    __metadata("design:type", String)
], Consulta.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.consultas, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }]),
    __metadata("design:type", Users_1.Users)
], Consulta.prototype, "user", void 0);
exports.Consulta = Consulta = __decorate([
    (0, typeorm_1.Index)("user_id", ["userId"], {}),
    (0, typeorm_1.Entity)("consulta", { schema: "TYPE-ORM-E-DOCKER-SQL" }),
    __metadata("design:paramtypes", [String, Object, Object, Object, Object, Object, Object, String, Users_1.Users])
], Consulta);
//# sourceMappingURL=Consulta.js.map