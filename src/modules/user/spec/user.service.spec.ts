import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { User } from '../../../core/ententies/user.entity';

describe('UserService', () => {

  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {

    it('successfully creating user', async () => {  
      

      expect(userService.create()).resolves.toEqual(User);
    });
  });
});
