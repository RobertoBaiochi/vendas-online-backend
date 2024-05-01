import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableState1714584999775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.state
            ADD uf varchar(2) NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    ALTER TABLE public.state
	    DROP uf;
    `);
  }
}
