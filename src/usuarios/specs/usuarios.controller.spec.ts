import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from '../usuarios.controller';
import { UsuariosService } from '../usuarios.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new usuario', () => {
      const createUsuarioDto: CreateUsuarioDto = {
        id: 1,
        nome: 'John Doe',
        email: 'john.doe@example.com',
      };
      const result: Usuario = {
        id: 1,
        nome: 'John Doe',
        email: 'john.doe@example.com',
      };
      jest.spyOn(service, 'create').mockImplementation(() => result);

      expect(controller.create(createUsuarioDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of usuarios', () => {
      const result: Usuario[] = [
        /* array de usuários */
      ];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single usuario', () => {
      const result: Usuario = {
        id: 1,
        nome: 'John Doe',
        email: 'john.doe@example.com',
      };
      jest.spyOn(service, 'findOne').mockImplementation(() => result);

      expect(controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a usuario', () => {
      const updateUsuarioDto: UpdateUsuarioDto = {
        /* dados do DTO */
      };
      const result: Usuario = {
        id: 1,
        nome: 'John Doe',
        email: 'john.doe@example.com',
      };
      jest.spyOn(service, 'update').mockImplementation(() => result);

      expect(controller.update('1', updateUsuarioDto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a usuario', () => {
      jest.spyOn(service, 'delete').mockImplementation(() => undefined);

      expect(controller.delete('1')).toBeUndefined();
    });
  });
});
