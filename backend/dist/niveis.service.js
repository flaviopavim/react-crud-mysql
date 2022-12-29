"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const niveis_entity_1 = require("./niveis.entity");
describe('Teste dos níveis', () => {
    let niveis;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [niveis_entity_1.Niveis],
        }).compile();
        niveis = module.get(niveis_entity_1.Niveis);
    });
    it('should be defined', () => {
        expect(niveis).toBeDefined();
    });
});
//# sourceMappingURL=niveis.service.js.map