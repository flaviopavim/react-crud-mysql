import { Test, TestingModule } from '@nestjs/testing';
import { Niveis } from './niveis.entity';

describe('Teste dos níveis', () => {
  let niveis: Niveis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Niveis],
    }).compile();

    niveis = module.get<Niveis>(Niveis);
  });

  it('should be defined', () => {
    expect(niveis).toBeDefined();
  });
});
