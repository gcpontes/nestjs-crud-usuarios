import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];

  create(usuario: Usuario): Usuario {
    this.usuarios.push(usuario);
    return usuario;
  }

  findAll(): Usuario[] {
    return this.usuarios;
  }

  findOne(id: number): Usuario {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) {
      throw new NotFoundException('Usuario not found');
    }
    return usuario;
  }

  update(id: number, updateUser: Partial<Usuario>): Usuario {
    const usuario = this.findOne(id);
    Object.assign(usuario, updateUser);
    return usuario;
  }

  delete(id: number): void {
    const index = this.usuarios.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException('Usuario not found' + index);
    }
    this.usuarios.splice(index, 1);
  }
}
