import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne(email: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    blockUser(id: number): Promise<void>;
    deleteUser(id: number): Promise<void>;
    createUser(user: Partial<User>): Promise<User>;
}
