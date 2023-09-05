import { Model, Column, Table, Sequelize, DataType, Default, HasOne } from 'sequelize-typescript';
// import { sequelize } from '../database';

@Table({
    tableName: 'tasks',
})
class Tasks extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public title!: string;


    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    public description!: string;


    @Column({
        type: DataType.STRING,
        defaultValue: true
    })
    public status!: string;

}

export default Tasks;