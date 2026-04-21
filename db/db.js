import "dotenv/config"; 
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if(!supabaseKey || !supabaseUrl){
    console.error("ERROR: FALTAN LAS VARIABLES DE ENTORNO EN EL ARCHIVO .ENV");
    process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const conectarDB = () => {
    console.log("CONEXIÓN CON SUPABASE CONFIGURADA");
};