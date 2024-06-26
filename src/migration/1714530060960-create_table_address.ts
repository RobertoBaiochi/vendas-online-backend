import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1714530060960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.address (
            id int NOT NULL,
            user_id int NOT NULL,
            complement character varying NOT NULL,
            number int NOT NULL,
            cep character varying NOT NULL,
            city_id int NOT NULL,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id),
            foreign key (user_id) references public.user(id),
            foreign key (city_id) references public.city(id)
        );

        CREATE SEQUENCE public.address_id_seq
            AS int
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;

        ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;

        ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`drop table public.address`);
  }
}
