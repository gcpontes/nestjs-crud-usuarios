import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  getSchemaPath,
} from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new usuario' })
  @ApiBody({
    type: CreateUsuarioDto,
    examples: {
      example1: {
        summary: 'Example of a new usuario',
        value: {
          id: 1,
          nome: 'John Doe',
          email: 'john.doe@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The usuario has been successfully created.',
    type: Usuario,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUsuarioDto: CreateUsuarioDto): Usuario {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Return all usuarios.',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath(Usuario) },
        },
      },
    },
  })
  findAll(): Usuario[] {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a usuario by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The id of the usuario to retrieve',
    schema: {
      example: '1',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Return the usuario with the given id.',
    type: Usuario,
  })
  @ApiResponse({ status: 404, description: 'Usuario not found.' })
  findOne(@Param('id') id: string): Usuario {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a usuario by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The id of the usuario to update',
    schema: {
      example: '1',
    },
  })
  @ApiBody({
    type: UpdateUsuarioDto,
    examples: {
      example1: {
        summary: 'Example of an update to a usuario',
        value: {
          name: 'John Doe Updated',
          email: 'john.doe.updated@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The usuario has been successfully updated.',
    type: Usuario,
  })
  @ApiResponse({ status: 404, description: 'Usuario not found.' })
  update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Usuario {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a usuario by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The id of the usuario to delete',
    schema: {
      example: '1',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The usuario has been successfully deleted.',
    type: Usuario,
  })
  @ApiResponse({ status: 404, description: 'Usuario not found.' })
  delete(@Param('id') id: string) {
    return this.usuariosService.delete(+id);
  }
}
