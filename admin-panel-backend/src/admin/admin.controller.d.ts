import { UsersService } from '../users/users.service';
export declare class AdminController {
    private usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<import("../users/user.entity").User[]>;
    blockUser(id: number): Promise<void>;
    deleteUser(id: number): Promise<void>;
    updateSettings(settings: any): void;
}
