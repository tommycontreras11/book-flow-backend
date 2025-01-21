import bcrypt from 'bcrypt';
import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { PersonTypeEnum, UserEntity } from "./../../../database/entities/entity/user.entity";

const users = [
    {
        name: "Tommy Contreras",
        username: "tommy11",
        password: bcrypt.hashSync('admin', 10),
        identification: "402-1563214-8",
        carnet_number: "CAR123456",
        person_type: PersonTypeEnum.NATURAL,
        state: StatusEnum.ACTIVE
    }
];

export const UserData: Partial<UserEntity>[] = users.map((user) => ({
    name: user.name,
    username: user.username,
    password: user.password,
    identification: user.identification,
    carnet_number: user.carnet_number,
    person_type: user.person_type,
    state: user.state
}));
