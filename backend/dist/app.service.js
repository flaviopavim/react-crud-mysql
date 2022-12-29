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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const desevolvedores_entity_1 = require("./desevolvedores.entity");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const niveis_entity_1 = require("./niveis.entity");
let AppService = class AppService {
    helloWorld() {
        return 'Hello World!';
    }
    async listarDesenvolvedores() {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const desenvolvedores = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).find({
            relations: ["nivel_id"],
            order: {
                id: "DESC"
            }
        });
        return desenvolvedores;
    }
    async listarDesenvolvedoresPaginacao(paginacao) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const desenvolvedores = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).find({
            relations: ["nivel_id"],
            order: {
                id: "DESC"
            },
            skip: (parseInt(paginacao) - 1) * 6,
            take: 6
        });
        const total = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).find();
        return {
            total: total.length,
            desenvolvedores: desenvolvedores
        };
    }
    async buscarDesenvolvedores(busca, paginacao) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const desenvolvedores = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).find({
            where: {
                nome: (0, typeorm_1.Like)(`%${busca}%`),
                hobby: (0, typeorm_1.Like)(`%${busca}%`)
            },
            relations: ["nivel_id"],
            order: {
                id: "DESC"
            },
            skip: (parseInt(paginacao) - 1) * 6,
            take: 6
        });
        const total = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).find();
        return {
            total: total.length,
            desenvolvedores: desenvolvedores
        };
    }
    async buscarDesenvolvedor(id) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const desenvolvedor = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).findOne(id, {
            relations: ["nivel_id"],
            order: {
                id: "DESC"
            }
        });
        return desenvolvedor;
    }
    async cadastrarDesenvolvedor(desenvolvedor) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const desenvolvedorCadastrado = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).save(desenvolvedor);
        const desenvolvedorComNivel = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).findOne(desenvolvedorCadastrado.id, {
            relations: ["nivel_id"]
        });
        return desenvolvedorComNivel;
    }
    async editarDesenvolvedor(id, desenvolvedor) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).update(id, desenvolvedor);
        const desenvolvedorComNivel = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).findOne(id, {
            relations: ["nivel_id"]
        });
        return desenvolvedorComNivel;
    }
    async excluirDesenvolvedor(id) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const desenvolvedorExcluido = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).delete(id);
        if (desenvolvedorExcluido.affected === 1) {
            return {
                message: 'Desenvolvedor excluído com sucesso'
            };
        }
        else {
            return {
                message: 'Desenvolvedor não encontrado'
            };
        }
    }
    async listarNiveis() {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const niveis = await defaultConnection.getRepository(niveis_entity_1.Niveis).find({
            order: {
                id: "DESC"
            }
        });
        return niveis;
    }
    async listarNiveisPaginacao(paginacao) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const niveis = await defaultConnection.getRepository(niveis_entity_1.Niveis).find({
            order: {
                id: "DESC"
            },
            skip: (parseInt(paginacao) - 1) * 6,
            take: 6
        });
        const total = await defaultConnection.getRepository(niveis_entity_1.Niveis).find();
        return {
            total: total.length,
            niveis: niveis
        };
    }
    async buscarNiveis(busca, paginacao) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const niveis = await defaultConnection.getRepository(niveis_entity_1.Niveis).find({
            where: {
                nivel: (0, typeorm_1.Like)(`%${busca}%`)
            },
            order: {
                id: "DESC"
            },
            skip: (parseInt(paginacao) - 1) * 6,
            take: 6
        });
        const total = await defaultConnection.getRepository(niveis_entity_1.Niveis).find();
        return {
            total: total.length,
            niveis: niveis
        };
    }
    async buscarNivel(id) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const nivel = await defaultConnection.getRepository(niveis_entity_1.Niveis).findOne(id);
        return nivel;
    }
    async cadastrarNivel(nivel) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const nivelCadastrado = await defaultConnection.getRepository(niveis_entity_1.Niveis).save(nivel);
        return nivelCadastrado;
    }
    async editarNivel(id, nivel) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const nivelEditado = await defaultConnection.getRepository(niveis_entity_1.Niveis).update(id, nivel);
        return nivelEditado;
    }
    async excluirNivel(id) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const nivelExcluido = await defaultConnection.getRepository(niveis_entity_1.Niveis).delete(id);
        if (nivelExcluido.affected === 1) {
            return {
                status: 201,
                message: 'Nível excluído com sucesso'
            };
        }
        else {
            return {
                status: 404,
                message: 'Nível não encontrado'
            };
        }
    }
};
__decorate([
    __param(0, (0, common_1.Param)('busca')),
    __param(1, (0, common_1.Param)('paginacao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "buscarDesenvolvedores", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "buscarDesenvolvedor", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, desevolvedores_entity_1.Desenvolvedores]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "editarDesenvolvedor", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "excluirDesenvolvedor", null);
__decorate([
    __param(0, (0, common_1.Param)('paginacao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "listarNiveisPaginacao", null);
__decorate([
    __param(0, (0, common_1.Param)('busca')),
    __param(1, (0, common_1.Param)('paginacao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "buscarNiveis", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "buscarNivel", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, niveis_entity_1.Niveis]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "editarNivel", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "excluirNivel", null);
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map