// base.entity.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
export abstract class ParentEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'boolean', default: true })
    isActive: boolean = true;

    @Field()
    @CreateDateColumn({ type: 'timestamp'})
    createDate: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updateDate: Date;
}
