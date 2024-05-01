import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableState1714529063175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE TABLE public.state (
        id int NOT NULL,
        name character varying NOT NULL,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        update_ad timestamp without time zone DEFAULT now() NOT NULL,
        primary key (id)
    );
    
    CREATE SEQUENCE public.state_id_seq
        AS int
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
    
    ALTER SEQUENCE public.state_id_seq OWNED BY public.state.id;
    
    ALTER TABLE ONLY public.state ALTER COLUMN id SET DEFAULT nextval('public.state_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.state;
    `);
  }
}
