// import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Mail from "@ioc:Adonis/Addons/Mail";
import Formulario from "App/Models/Formulario";
import Application from "@ioc:Adonis/Core/Application";
import Gestor from "App/Models/Gestor";
const Excel = require("excel4node");
export default class RelatoriosController {
  public async relatorioGestor() {

    // Gerenciando Datas
    const agora = new Date();

    const mes = agora.getMonth() + 1;
    const hora = agora.getHours();
    const ano = agora.getFullYear();

    // Configurando Hello
    const periodo =
      hora >= 12
        ? hora >= 18
          ? "Boa noite,"
          : "Boa tarde,"
        : hora >= 6
        ? "Boa dia,"
        : "Boa madrugada,";

    // Gerando relatório
    const consultaMesStart = ano + "-" + mes + "-01";

    const consultaMesStop = ano + "-" + (mes + 1) + "-01";

    const relatorioMes = await Formulario.query()
      .select(
        "id",
        "resultado",
        "respostas",
        "latitude",
        "longitude",
        "versao",
        "created_at"
      )
      .whereBetween("created_at", [consultaMesStart, consultaMesStop]);


    // Gerando Anexo
    const headingColumnNames = [
      "id",
      "Resultado",
      "Respostas",
      "latitude",
      "longitude",
      "VersaoFormulario",
      "data_hora_resposta",
    ];
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet("Relatório Mês: " + mes);
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    let rowIndex = 2;
    relatorioMes.forEach((record) => {
      let columnIndex = 1;
      const obj = record.serializeAttributes();

      Object.keys(obj).forEach((columnName) => {
        console.log(obj);

        if (typeof obj[columnName] === "string")
          ws.cell(rowIndex, columnIndex++).string(obj[columnName] + "");
        else if (typeof obj[columnName] === "number")
          ws.cell(rowIndex, columnIndex++).number(obj[columnName]);
      });
      rowIndex++;
    });

    wb.write(
      Application.resourcesPath(
        "/relatorios/relatorio" + ano + "_" + mes + ".xlsx"
      )
    );

    // Disparo de Email



    // const gestor = {
    //   nome: "William Ferreira",
    //   email: "william.luis.ferreira@usp.br",
    //   periodo: periodo,
    //   mes: mes,
    //   ano: ano,
    // };


    const gestores = await Gestor.all()

    let gestoresDisparo:Array<Object> = []
    let gestor:Object = {}

    for (let index = 0; index < gestores.length; index++) {
      gestor = gestores[index].toJSON()
      // Configurando Email
      gestor['periodo'] = periodo
      gestor['mes'] = mes
      gestor['ano'] = ano
      gestoresDisparo.push(gestor);
      gestor= {}
    }

    console.log("Gestores",gestoresDisparo);

    //Disparo dos emails
    gestoresDisparo.forEach(async (gestor)=>{
      console.log(gestor);

      await Mail.sendLater((message) => {
        message
          .from("ToComDorOndeVou? <postmaster@williamferreira.site>")
          .to(gestor['email'])
          .subject(
            "[ToComDorOndeVou] Relatório Referente ao mês " +
              mes +
              "/" +
              ano +
              "."
          )
          .htmlView("emails/relatorio", { gestor })
          .attach(
            Application.resourcesPath(
              "/relatorios/relatorio" + ano + "_" + mes + ".xlsx"
            )
          );
      });
    })


    return relatorioMes;
  }
}
