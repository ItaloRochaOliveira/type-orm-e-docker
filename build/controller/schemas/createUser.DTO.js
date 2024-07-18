"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
});
exports.editUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
});
//# sourceMappingURL=createUser.DTO.js.map