import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn(),
            getUserByUsername: jest.fn(),
            getAllUsers: jest.fn(),
            getUserByEmail: jest.fn(),
            addUser: jest.fn(),
            insertUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          username: 'user1',
          password: 'password1',
          role: 'user',
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          username: 'user2',
          password: 'password2',
          role: 'user',
        },
      ];
      jest.spyOn(userService, 'getUsers').mockResolvedValue(mockUsers);

      const result = await controller.getAllUsers();

      expect(result).toEqual(mockUsers);
    });

    describe('getUserByUsername', () => {
      it('should return a user by username', async () => {
        const username = 'user1';
        const mockUser = {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          username: 'user1',
          password: 'password1',
          role: 'user',
        };
        jest
          .spyOn(userService, 'getUserByUsername')
          .mockResolvedValue(mockUser);

        const result = await controller.getUserByUsername(username);

        expect(result).toEqual(mockUser);
      });

      it('should handle user not found', async () => {
        const nonExistentUsername = 'nonexistent_user';
        jest.spyOn(userService, 'getUserByUsername').mockResolvedValue(null);

        const result = await controller.getUserByUsername(nonExistentUsername);

        expect(result).toBeNull();
      });
    });

    describe('getUserByEmail', () => {
      it('should return a user by email', async () => {
        const email = 'john@example.com';
        const mockUser = {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          username: 'user1',
          password: 'password1',
          role: 'user',
        };
        jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockUser);

        const result = await controller.getUserByEmail(email);

        expect(result).toEqual(mockUser);
      });

      it('should handle user not found', async () => {
        const email = 'nonexistent_email@example.com';
        jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);

        const result = await controller.getUserByEmail(email);

        expect(result).toBeNull();
      });
    });

    describe('addUser', () => {
      it('should add a new user', async () => {
        const newUser = {
          userFirstName: 'New',
          userLastName: 'User',
          userEmail: 'newuser@example.com',
          userUsername: 'newuser',
          userPassword: 'newpassword',
        };

        const mockInsertedUserId = '3';
        jest
          .spyOn(userService, 'insertUser')
          .mockResolvedValue(mockInsertedUserId);

        const result = await controller.addUser(
          newUser.userFirstName,
          newUser.userLastName,
          newUser.userEmail,
          newUser.userUsername,
          newUser.userPassword,
        );

        expect(result).toEqual({ NewUser: mockInsertedUserId });
      });
    });
  });
});
