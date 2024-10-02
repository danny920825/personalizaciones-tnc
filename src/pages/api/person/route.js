import { DBFFile } from "dbffile";
import path from "path";

// Función para formatear la fecha y la hora
function formatDate() {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0, por eso sumamos 1
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year}-${hours}-${minutes}`;
}

let fieldDescriptors = [
  { name: "COD_TIPID", type: "C", size: 2 },
  { name: "COD_PAEXID", type: "C", size: 3 },
  { name: "NUM_IDEPER", type: "C", size: 15 },
  { name: "APELLIDO_1", type: "C", size: 50 },
  { name: "APELLIDO_2", type: "C", size: 50 },
  { name: "NOMBRE", type: "C", size: 50 },
  { name: "NOMB_APELL", type: "C", size: 23 },
  { name: "DIR_PERSO1", type: "C", size: 35 },
  { name: "DIR_PERSO2", type: "C", size: 35 },
  { name: "DIR_PERSO3", type: "C", size: 35 },
  { name: "EST_MLC", type: "L", size: 1 },
  { name: "NOM_MNAC", type: "L", size: 1 },
  { name: "NUM_IDEBEN", type: "C", size: 15 },
  { name: "AP1_BENEF", type: "C", size: 50 },
  { name: "AP2_BENEF", type: "C", size: 50 },
  { name: "NOMBRE_B", type: "C", size: 50 },
  { name: "CTA_MNAC", type: "C", size: 16 },
  { name: "CTA_MLC", type: "C", size: 16 },
];

export async function POST({ request }) {
  const data = await request.json();
  
  // create a new DBF file
  try {
    // Usar la función de formateo para obtener la fecha y hora
    const formattedDate = formatDate();
    const fileName = `personalizacion-${formattedDate}.dbf`; // Nombre del archivo con la fecha y hora
    const filePath = path.join(process.cwd(), "public/files", fileName);

    let dbf = await DBFFile.create(filePath, fieldDescriptors);
    // append some records
    let records = data.map(item => (      
        {
          COD_TIPID: "CI",
          COD_PAEXID: "247",
          NUM_IDEPER: item.NUM_IDEPER,
          APELLIDO_1: item.APELLIDO_1,
          APELLIDO_2: item.APELLIDO_2,
          NOMBRE: item.NOMBRE,
          NOMB_APELL: item.NOMB_APELL,
          DIR_PERSO1: item.DIR_PERSO1,
          DIR_PERSO2: item.DIR_PERSO2,
          DIR_PERSO3: item.DIR_PERSO3,
          EST_MLC: false,
          NOM_MNAC: true,
          NUM_IDEBEN: "",
          AP1_BENEF: "",
          AP2_BENEF: "",
          NOMBRE_B: "",
          CTA_MNAC: "",
          CTA_MLC: "",
        }
    ))

    const results = await dbf.appendRecords(records);

    console.log(results);

    return new Response(JSON.stringify({ message: "ok", file: fileName }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error" }), { status: 500 });
  }
}
