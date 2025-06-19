import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schedules } from './schedule.entity';

@Entity({ name: 'films' })
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  director: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'float', nullable: true })
  rating: number;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  cover: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedules: Schedules[];
}
