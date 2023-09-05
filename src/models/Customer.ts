import { Model, Column, Table, Sequelize,DataType, Default, HasOne } from 'sequelize-typescript';
// import { sequelize } from '../database';

@Table({
  tableName: 'customers',
})
class Customer extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public first_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public last_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public email!: string;
  

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public mobile!: string;
  


  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public password!: string;


  @Column({
    type: DataType.BOOLEAN,
    defaultValue:true
  })
  public status!: boolean;


  // Additional fields here
}
export default Customer;
