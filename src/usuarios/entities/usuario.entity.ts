import { ApiProperty } from '@nestjs/swagger';

export class Usuario {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  email: string;
}
