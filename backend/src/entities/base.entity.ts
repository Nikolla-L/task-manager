import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';

export abstract class Base {

    @PrimaryGeneratedColumn()
	id: number;

    @Column({
		nullable: true
	})
	createdBy?: number;

	@Column({update: false})
	@CreateDateColumn({
		type: 'timestamp'
	})
	createdAt: Date;

    @UpdateDateColumn({
		type: 'timestamp'
	})
	updatedAt?: Date | null;

    @DeleteDateColumn({
		type: 'timestamp'
	})
	deletedAt?: Date | null;

}
