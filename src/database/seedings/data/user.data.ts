import bcrypt from 'bcrypt';
import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { PersonTypeEnum, UserEntity } from "./../../../database/entities/entity/user.entity";

const users = [
    {
        name: "Tommy Contreras",
        email: "tommy11@gmail.com",
        password: bcrypt.hashSync('admin', 10),
        identification: "402-1563214-8",
        carnet_number: "CAR123456",
        person_type: PersonTypeEnum.NATURAL,
        status: StatusEnum.ACTIVE
    }
];

export const UserData: Partial<UserEntity>[] = users.map((user) => ({
    name: user.name,
    email: user.email,
    password: user.password,
    identification: user.identification,
    carnet_number: user.carnet_number,
    person_type: user.person_type,
    status: user.status
}));
