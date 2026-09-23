import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export default class User {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	title!: string

	@Column()
	path!: string

	@Column()
	duration_seconds!: number

	@Column()
	type!: string

	@Column()
	from!: string

	@Column()
	creator!: string

	@Column()
	other_details!: string
}
