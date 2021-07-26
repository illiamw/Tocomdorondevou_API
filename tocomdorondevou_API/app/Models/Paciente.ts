import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import  Formulario  from './Formulario';



export default class Paciente extends BaseModel {
  @column({ isPrimary: true })
  public nsus: string


  @hasOne(() => Formulario, {
    foreignKey: 'paciente_nsus', // defaults to userId
  })
  public formulario: HasOne <typeof Formulario>

  @column()
  public nome: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public senha: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
