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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const app_service_1 = require("./app.service");
const desevolvedores_entity_1 = require("./desevolvedores.entity");
const niveis_entity_1 = require("./niveis.entity");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    helloWorld() {
        return this.appService.helloWorld();
    }
    listarDesenvolvedores() {
        return this.appService.listarDesenvolvedores();
    }
    listarDesenvolvedoresPaginacao(paginacao) {
        return this.appService.listarDesenvolvedoresPaginacao(paginacao);
    }
    buscarDesenvolvedores(busca, paginacao) {
        return this.appService.buscarDesenvolvedores(busca, paginacao);
    }
    buscarDesenvolvedor(id) {
        return this.appService.buscarDesenvolvedor(id);
    }
    cadastrarDesenvolvedor(desenvolvedor) {
        return this.appService.cadastrarDesenvolvedor(desenvolvedor);
    }
    editarDesenvolvedor(id, desenvolvedor) {
        return this.appService.editarDesenvolvedor(id, desenvolvedor);
    }
    excluirDesenvolvedor(id) {
        return this.appService.excluirDesenvolvedor(id);
    }
    listarNiveis() {
        return this.appService.listarNiveis();
    }
    listarNiveisPaginacao(paginacao) {
        return this.appService.listarNiveisPaginacao(paginacao);
    }
    buscarNiveis(busca, paginacao) {
        return this.appService.buscarNiveis(busca, paginacao);
    }
    buscarNivel(id) {
        return this.appService.buscarNivel(id);
    }
    cadastrarNivel(nivel) {
        return this.appService.cadastrarNivel(nivel);
    }
    editarNivel(id, nivel) {
        return this.appService.editarNivel(id, nivel);
    }
    async excluirNivel(response, id) {
        const defaultConnection = (0, typeorm_1.getConnection)();
        const desenvolvedores = await defaultConnection.getRepository(desevolvedores_entity_1.Desenvolvedores).findOne({
            where: {
                nivel_id: id
            }
        });
        if (desenvolvedores) {
            return response.status(501).send({ error: 'Não foi possível excluir o nível. Existem desenvolvedores associados ao nível.' });
        }
        else {
            const nivel = await defaultConnection.getRepository(niveis_entity_1.Niveis).findOne({
                where: {
                    id: id
                }
            });
            if (nivel) {
                await defaultConnection.getRepository(niveis_entity_1.Niveis).delete(id);
                return response.status(common_1.HttpStatus.OK).send({ message: 'Nível excluído com sucesso!' });
            }
            else {
                return response.status(common_1.HttpStatus.NOT_FOUND).send({ error: 'Nível não encontrado.' });
            }
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "helloWorld", null);
__decorate([
    (0, common_1.Get)('/listar/desenvolvedores'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "listarDesenvolvedores", null);
__decorate([
    (0, common_1.Get)('/listar/desenvolvedores/:paginacao'),
    __param(0, (0, common_1.Param)('paginacao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AppController.prototype, "listarDesenvolvedoresPaginacao", null);
__decorate([
    (0, common_1.Get)('/buscar/desenvolvedores/:busca/:paginacao'),
    __param(0, (0, common_1.Param)('busca')),
    __param(1, (0, common_1.Param)('paginacao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Object)
], AppController.prototype, "buscarDesenvolvedores", null);
__decorate([
    (0, common_1.Get)('/desenvolvedor/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AppController.prototype, "buscarDesenvolvedor", null);
__decorate([
    (0, common_1.Post)('/cadastrar/desenvolvedor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [desevolvedores_entity_1.Desenvolvedores]),
    __metadata("design:returntype", Object)
], AppController.prototype, "cadastrarDesenvolvedor", null);
__decorate([
    (0, common_1.Patch)('/editar/desenvolvedor/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, desevolvedores_entity_1.Desenvolvedores]),
    __metadata("design:returntype", Object)
], AppController.prototype, "editarDesenvolvedor", null);
__decorate([
    (0, common_1.Delete)('/excluir/desenvolvedor/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AppController.prototype, "excluirDesenvolvedor", null);
__decorate([
    (0, common_1.Get)('/listar/niveis'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "listarNiveis", null);
__decorate([
    (0, common_1.Get)('/listar/niveis/:paginacao'),
    __param(0, (0, common_1.Param)('paginacao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AppController.prototype, "listarNiveisPaginacao", null);
__decorate([
    (0, common_1.Get)('/buscar/niveis/:busca/:paginacao'),
    __param(0, (0, common_1.Param)('busca')),
    __param(1, (0, common_1.Param)('paginacao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Object)
], AppController.prototype, "buscarNiveis", null);
__decorate([
    (0, common_1.Get)('/nivel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AppController.prototype, "buscarNivel", null);
__decorate([
    (0, common_1.Post)('/cadastrar/nivel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [niveis_entity_1.Niveis]),
    __metadata("design:returntype", Object)
], AppController.prototype, "cadastrarNivel", null);
__decorate([
    (0, common_1.Patch)('/editar/nivel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, niveis_entity_1.Niveis]),
    __metadata("design:returntype", Object)
], AppController.prototype, "editarNivel", null);
__decorate([
    (0, common_1.Delete)('/excluir/nivel/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "excluirNivel", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map