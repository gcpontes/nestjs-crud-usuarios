import { validate } from 'class-validator';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

describe('CreateUsuarioDto', () => {
  let dto: CreateUsuarioDto;

  beforeEach(() => {
    dto = new CreateUsuarioDto();
    dto.id = 1;
    dto.nome = 'João'; // Preenche o campo obrigatório
    dto.email = 'valid@example.com'; // Preenche o campo obrigatório
  });

  it('should fail if email is not valid', async () => {
    dto.email = 'invalid-email';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should pass if email is valid', async () => {
    dto.email = 'valid@example.com';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if nome is empty', async () => {
    dto.nome = '';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should pass if nome is not empty', async () => {
    dto.nome = 'João';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
