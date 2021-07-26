import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Formulario from 'App/Models/Formulario';
import Paciente from 'App/Models/Paciente';

export default class FormulariosController {
  public async registraResposta({ request }: HttpContextContract) {

    console.log("---- Registra Resposta ----");


    const data = request.only(["latitude", "longitude","resultado", "respostas","versao"])

    const nsus = request.only(["nsus", "nome", "email", "senha",])


    const paciente = await Paciente.find(nsus.nsus)
    if (!paciente) {

      const paciente_novo = await Paciente.create(nsus)
      const paciente_novo_load = await Paciente.findOrFail(nsus.nsus)

      const form_novo = await paciente_novo_load.related('formulario').create(data)

      return form_novo
    }else{
      const form_existe = await paciente.related('formulario').create(data)

      return form_existe
    }




  }

  public async formulariosTodos() {

    console.log("---- Lista Formularios ----");
    const forms = await Formulario.all()
    console.log(forms)
    return forms

  }
}
