import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should create a user successfully', () => {
    const dto = { name: 'John Doe', email: 'john@example.com' };
    jest.spyOn(service, 'create').mockImplementation(() => ({
      id: 1,
      ...dto,
    }));
    expect(controller.create(dto)).toEqual({ id: 1, ...dto });
  });
});
