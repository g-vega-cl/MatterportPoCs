import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { BaseModel } from "../libraries/BaseModel";
import { User } from "./User";

@Table({
  tableName: "items",
})
export class Items extends BaseModel<Items> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  media: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: null,
  })
  color: string;

  @Column({
    type: DataType.JSON,
  })
  position: string;

  @Column({
    type: DataType.JSON,
  })
  normal: string;

  @Column({
    allowNull: true,
    defaultValue: true,
  })
  isPowered: boolean;

  @Column({
    allowNull: true,
    defaultValue: 0,
  })
  value: number;

  @Column
  matterportId: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  type: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
