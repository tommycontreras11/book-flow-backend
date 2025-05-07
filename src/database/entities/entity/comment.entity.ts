import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { BookEntity } from "./book.entity";
import { UserEntity } from "./user.entity";
import { CommentInteractionEntity } from "./comment-interaction.entity";

@Tree("closure-table")
@Entity({ name: "comments" })
export class CommentEntity extends BaseEntity {
  @Column({ type: "text" })
  content: string;

  @Column({ nullable: true })
  file_name: string;

  @Column()
  book_id: number;

  @Column()
  user_id: number;

  @Column({ type: "enum", enum: StatusEnum })
  status: StatusType;

  @ManyToOne(() => BookEntity, (book) => book.comments)
  @JoinColumn({ name: "book_id", referencedColumnName: "id" })
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;

  @TreeParent()
  parent: CommentEntity;

  @TreeChildren()
  replies: CommentEntity[];

  @OneToMany(() => CommentInteractionEntity, (interaction) => interaction.comment)
  interactions: CommentInteractionEntity[];
}
