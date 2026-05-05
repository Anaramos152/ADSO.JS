import { crearUsuario } from "../controllers/user.js";
import { supabase } from "../db/db.js";
// Obtener todos los usuarios (Get)
export const UserModel ={
    obtenerTodos: async () =>{
        const {data,error}= await supabase
             .from("usuario")
             .select("*");

        return {data,error};
    },
    
    crearUsuario: async (usuario) => {
    const { data, error } = await supabase
        .from("usuario")
        .insert([usuario])
        .select();

    return { data, error };
    },

    actualizarUsuario: async (id, datos) => {
        const { data, error } = await supabase
            .from("usuario")
            .update(datos)
            .eq("id", id)
            .select();

        return { data, error };
    },

    eliminarUsuario: async (id) => {
        const { data, error } = await supabase
            .from("usuario")
            .delete()
            .eq("id", id)
            .select();

        return { data, error };
    },

};
