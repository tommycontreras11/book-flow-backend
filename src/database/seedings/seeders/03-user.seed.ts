import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { UserData } from "../data/user.data";
import { UserEntity } from "../../entities/entity/user.entity";

export class UserSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const userRepository = dataSource.getRepository(UserEntity);

            await Promise.all(UserData.map(async (user) => {
                const exists = await userRepository.findOneBy({ name: user.name });

                if(exists) return;

                await userRepository.save(user);
            }));
        } catch (error) {
            console.error('UserSeeder -> run: ', error)
        }
    }
}