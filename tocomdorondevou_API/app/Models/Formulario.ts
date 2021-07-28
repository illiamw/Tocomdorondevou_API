import { DateTime } from 'luxon'
import { BaseModel, column,  } from '@ioc:Adonis/Lucid/Orm'

export default class Formulario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public paciente_nsus: string

  @column()
  public resultado: number

  @column()
  public respostas: string

  @column()
  public latitude: number

  @column()
  public longitude: number

  @column()
  public versao: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
