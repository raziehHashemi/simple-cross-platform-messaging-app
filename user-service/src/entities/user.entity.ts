import { ROLE } from 'src/enums/role.enum';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    @Index()
    username: string;

    @Column({
        transformer: {
            to: (value) => {
                if (value === null || value === undefined) return value;
                const salt = bcrypt.genSaltSync();
                return bcrypt.hashSync(value, salt);
            },
            from: (value) => {
                return value;
            }
        },
        nullable: true,
        default: null
    })
    password: string;

    @Column({
        type: "enum",
        enum: ROLE,
        default: ROLE.User,
        nullable: false
    })
    role: ROLE;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
