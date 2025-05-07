import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { CommentEntity } from "./comment.entity";
import { UserEntity } from "./user.entity";

export enum CommentInteractionTypeEnum {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

export type CommentInteractionType = keyof typeof CommentInteractionTypeEnum;

@Entity({ name: "comment-interactions" })
export class CommentInteractionEntity extends BaseEntity {
  @Column({ type: "enum", enum: CommentInteractionTypeEnum })
  type: CommentInteractionType;

  @Column()
  user_id: number;

  @Column()
  comment_id: number;

  @ManyToOne(() => CommentEntity, (comment) => comment.interactions)
  @JoinColumn({ name: "comment_id", referencedColumnName: "id" })
  comment: CommentEntity;

  @ManyToOne(() => UserEntity, (user) => user.interactions)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;
}
