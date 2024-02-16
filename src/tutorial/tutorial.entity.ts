import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column('simple-array')
  keywords: string[];
}