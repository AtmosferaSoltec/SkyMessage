import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "plantilla" })
export class Plantilla {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true
    })
    titulo: string;

    @Column({
        type: "text",
        nullable: false
    })
    cuerpo: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: Date;

}
