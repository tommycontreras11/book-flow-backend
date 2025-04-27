import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { BookEntity } from "./book.entity";
import { UserEntity } from "./user.entity";

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

  @Column({ nullable: true })
  parent_comment_id: number | null;

  @Column({ type: "enum", enum: StatusEnum })
  status: StatusType;

  @ManyToOne(() => BookEntity, (book) => book.comments)
  @JoinColumn({ name: "book_id", referencedColumnName: "id" })
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies, {
    nullable: true,
  })
  @JoinColumn({ name: "parent_comment_id", referencedColumnName: "id" })
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  replies: CommentEntity[];
}
