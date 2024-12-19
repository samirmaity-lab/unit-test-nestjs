import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create a user successfully', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    const createdUser = service.create(user);
    expect(createdUser).toEqual(expect.objectContaining(user));
    expect(createdUser.id).toBeDefined();
  });

  it('should find all users', () => {
    service.create({ name: 'John Doe', email: 'john@example.com' });
    const users = service.findAll();
    expect(users).toHaveLength(1);
  });

  it('should find a user by ID', () => {
    const user = service.create({ name: 'John Doe', email: 'john@example.com' });
    const foundUser = service.findOne(user.id);
    expect(foundUser).toEqual(user);
  });

  it('should update a user successfully', () => {
    const user = service.create({ name: 'John Doe', email: 'john@example.com' });
    const updatedUser = service.update(user.id, { name: 'Jane Doe' });
    expect(updatedUser.name).toBe('Jane Doe');
  });

  it('should delete a user successfully', () => {
    const user = service.create({ name: 'John Doe', email: 'john@example.com' });
    const deletedUser = service.remove(user.id);
    expect(deletedUser).toEqual(user);
    expect(service.findAll()).toHaveLength(0);
  });

  it('should throw NotFoundException when user not found', () => {
    expect(() => service.findOne(999)).toThrow('User with ID 999 not found');
  });
});
