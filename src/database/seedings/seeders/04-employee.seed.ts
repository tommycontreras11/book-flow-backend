import { EmployeeEntity } from "../../entities/entity/employee.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { EmployeeData } from "../data/employee.data";

export class EmployeeSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const employeeRepository = dataSource.getRepository(EmployeeEntity);

            await Promise.all(EmployeeData.map(async (user) => {
                const exists = await employeeRepository.findOneBy({ name: user.name });

                if(exists) return;

                await employeeRepository.save(user);
            }));
        } catch (error) {
            console.error('EmployeeSeeder -> run: ', error)
        }
    }
}