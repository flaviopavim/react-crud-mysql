import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("niveis")
export class Niveis {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nivel: string;

}