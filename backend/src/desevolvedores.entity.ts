import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Niveis } from "./niveis.entity";

@Entity("desenvolvedores")
export class Desenvolvedores {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Niveis, niveis => niveis.id)
    @JoinColumn({ name: "nivel_id" })
    nivel_id: Niveis;
    
    @Column()
    nome: string;

    @Column()
    sexo: string;

    @Column()
    datanascimento: string

    @Column()
    hobby: string;

}