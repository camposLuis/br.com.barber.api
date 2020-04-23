import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  provider: string;

  @Column('timestamp')
  date: Date;
}

export default Appointment;
