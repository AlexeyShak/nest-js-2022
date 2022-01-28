import 'reflect-metadata'
import { Task } from 'src/tasks/task.entity';
import { Entity, Column, PrimaryColumn, OneToMany} from 'typeorm';


@Entity({name: 'users'})
export class User  {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      login: this.login,
    };
  }
}