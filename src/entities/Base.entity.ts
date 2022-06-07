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

export abstract class Base{

    @PrimaryGeneratedColumn()
	id: number;

    @JoinColumn({name: 'created_by'})
	@ManyToOne(() => User)
	createdBy: User;

	@Column({update: false})
	@CreateDateColumn({
		type: 'timestamp'
	})
	createdAt: Date;

    @JoinColumn({name: 'updated_by'})
	@ManyToOne(() => User)
	updatedBy?: number | null;

    @UpdateDateColumn({
		type: 'timestamp'
	})
	updatedAt?: Date | null;

	@JoinColumn({name: 'deleted_by'})
	@ManyToOne(() => User)
	deletedBy?: number | null;

    @DeleteDateColumn({
		type: 'timestamp'
	})
	deletedAt?: Date | null;

}
