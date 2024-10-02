import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosModule } from '../usuarios.module';
import { UsuariosController } from '../usuarios.controller';
import { UsuariosService } from '../usuarios.service';

describe('UsuariosModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsuariosModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have UsuariosController', () => {
    const controller = module.get<UsuariosController>(UsuariosController);
    expect(controller).toBeDefined();
  });

  it('should have UsuariosService', () => {
    const service = module.get<UsuariosService>(UsuariosService);
    expect(service).toBeDefined();
  });
});
