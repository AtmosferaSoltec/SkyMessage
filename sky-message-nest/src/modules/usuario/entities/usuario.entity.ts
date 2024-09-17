import { Envio } from 'src/modules/envio/entities/envio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  user: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar'
  })
  instance: string;

  @Column({
    type: 'varchar'
  })
  token: string;

  @OneToMany(() => Envio, (envio) => envio.usuario)
  envios: Envio[];
  
}
