import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCity1714529072714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE TABLE public.city (
        id int NOT NULL,
        state_id int NOT NULL,
        name character varying NOT NULL,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        updated_at timestamp without time zone DEFAULT now() NOT NULL,
        primary key (id),
        foreign key (state_id) references public.state(id) 
    );
    
    CREATE SEQUENCE public.city_id_seq
        AS int
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
    
    ALTER SEQUENCE public.city_id_seq OWNED BY public.city.id;
    
    ALTER TABLE ONLY public.city ALTER COLUMN id SET DEFAULT nextval('public.city_id_seq'::regclass);
        
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.city;
    `);
  }
}
