import { UserModel } from '../models/user.js';

export const usuario = async (req, res)=>{
    //aqui se recibe el modelo envio con el "return"
    const {data, error} = await UserModel.obtenerTodos();
    
    console.log("DATA:", data);
    console.log("ERROR:", error);

    if(error){
        return res.status(400).json({error});
    }

    return res.status(200).json(data)
};

export const crearUsuario = async (req,res)=>{
    const { nombre, email, rol, activo, apellido } = req.body;

    if(!nombre || !email || !rol || !activo || !apellido){
        return res.status(500).json({mensaje: "Faltan datos"});
    }

    const { data, error } = await UserModel.crearUsuario({
        nombre,
        email,
        rol,
        activo,
        apellido
    });

    if(error){
        return res.status(400).json({
            mensaje: "No se pudo crear usuario",
            error: error.message
        });
    }

    return res.status(201).json({
        mensaje: "Usuario creado exitosamente",
        usuario: data[0]
    });


};

export const actualizarUsuario = async (req, res) => {

    const { id } = req.params;
    const { nombre, email, rol, activo, apellido } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    const datosActualizar = {};

    if (nombre) datosActualizar.nombre = nombre;
    if (email) datosActualizar.email = email;
    if (rol) datosActualizar.rol = rol;
    if (activo) datosActualizar.activo = activo;
    if (apellido) datosActualizar.apellido = apellido;

    const { data, error } = await UserModel.actualizarUsuario(id, datosActualizar);

    if (error) {
        return res.status(500).json({
            mensaje: "No se pudo actualizar usuario",
            error: error.message
        });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({
        mensaje: "Usuario actualizado exitosamente",
        usuario: data[0]
    });
};

export const eliminarUsuario = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    const { data, error } = await UserModel.eliminarUsuario(id);

    if (error) {
        return res.status(500).json({
            mensaje: "No se pudo eliminar usuario",
            error: error.message
        });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({
        mensaje: "Usuario eliminado exitosamente",
        usuario: data[0]
    });
};

