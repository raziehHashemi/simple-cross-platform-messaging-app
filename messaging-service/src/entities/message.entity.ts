import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        nullable: false
    })
    content: string;

    @Column({
        type: 'uuid',
        default: () => 'uuid_generate_v4()',
    })
    @Index()
    fileId: string;

    @Column({
        type: 'text',
        nullable: true
    })
    fileName: string;

    @Column({
        type: 'text',
        nullable: false
    })
    @Index()
    fromId: string;

    @Column({
        type: 'text',
        nullable: false
    })
    @Index()
    toId: string;

    @Column({ default: false })
    isRead: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
