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
exports.Desenvolvedores = void 0;
const typeorm_1 = require("typeorm");
const niveis_entity_1 = require("./niveis.entity");
let Desenvolvedores = class Desenvolvedores {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Desenvolvedores.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => niveis_entity_1.Niveis, niveis => niveis.id),
    (0, typeorm_1.JoinColumn)({ name: "nivel_id" }),
    __metadata("design:type", niveis_entity_1.Niveis)
], Desenvolvedores.prototype, "nivel_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Desenvolvedores.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Desenvolvedores.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Desenvolvedores.prototype, "datanascimento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Desenvolvedores.prototype, "hobby", void 0);
Desenvolvedores = __decorate([
    (0, typeorm_1.Entity)("desenvolvedores")
], Desenvolvedores);
exports.Desenvolvedores = Desenvolvedores;
//# sourceMappingURL=desevolvedores.entity.js.map