import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const usuario: Usuario = {
      id: 1,
      nome: 'John Doe',
      email: 'john@example.com',
    };
    expect(service.create(usuario)).toEqual(usuario);
  });

  it('should update a user', () => {
    const usuario: Usuario = {
      id: 1,
      nome: 'John Doe',
      email: 'john@example.com',
    };
    service.create(usuario);
    const updatedUsuario = { ...usuario, nome: 'Jane Doe' };
    expect(service.update(1, updatedUsuario)).toEqual(updatedUsuario);
  });

  describe('delete', () => {
    it('should delete a user', () => {
      const usuario: Usuario = {
        id: 1,
        nome: 'John Doe Delete',
        email: 'john@example.com',
      };
      service.create(usuario);
      service.delete(usuario.id);
      expect(() => service.findOne(usuario.id)).toThrow(NotFoundException);
    });
  });

  it('should find a user by id', () => {
    const usuario: Usuario = {
      id: 1,
      nome: 'John Doe',
      email: 'john@example.com',
    };
    service.create(usuario);
    expect(service.findOne(1)).toEqual(usuario);
  });

  it('should return all users', () => {
    const usuario1: Usuario = {
      id: 1,
      nome: 'John Doe',
      email: 'john@example.com',
    };
    const usuario2: Usuario = {
      id: 2,
      nome: 'Jane Doe',
      email: 'jane@example.com',
    };
    service.create(usuario1);
    service.create(usuario2);
    expect(service.findAll()).toEqual([usuario1, usuario2]);
  });
});
