import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Formularios extends BaseSchema {
  protected tableName = 'formularios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .string('paciente_nsus',15)
        .references('pacientes.nsus')
        .onDelete('CASCADE')
      table.integer('resultado').notNullable()
      table.string('respostas').notNullable()
      table.double('latitude').notNullable()
      table.double('longitude').notNullable()
      table.integer('versao').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
