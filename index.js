//Importamos todas las librerias de express
import express from 'express';
import dotenv from "dotenv";
import { supabase } from "./db/db.js";

dotenv.config();

//creamos la app de express
const app = express();

//Para leer el formato json 
app.use(express.json());

//creación de nuestra primera ruta
app.get('/',(req, res)=>{
    res.send({
        mensaje: "Bienvenido a mi API REST con Express"
    });
});

// ruta saludar 
app.get('/saludo',(req, res)=>{
    res.send({
        mensaje: "Bienvenido al curso de JavaScript",
        hora:new Date().toLocaleTimeString()
    })
});

app.get('/nombre', (req, res) => {
    res.send({
        mensaje: "Mi nombre es Ana María Ramos Rojas"
    })
});

app.get("/usuario", async (req, res) => {

    const { data, error } = await supabase
    .from("usuario")
    .select("*");

    if(error){
        console.error("Error:", error);
        return res.status(500).json({ error });
    }

    console.log("Usuarios obtenidos:", data);

    res.json({
        total: data.length,
        usuario: data
    });
});

//Creamos la ruta

app.post("/Crear",async(req,res)=>{

    const{nombre,email,rol,activo,apellido}=req.body;

    if(!nombre || !email || !rol || !activo || !apellido){
        console.log("❌ Faltan datos");
        return res.status(400).json({error:"Faltan datos"});
    }

    //insertamos los datos de la base de datos

    const{data,error}=await supabase
    .from("usuario")
    .insert([{nombre,email,rol,activo,apellido}])
    .select();

    //Validamos si hay error 

    if(error){
        console.error("Error:", error);
        return res.status(500).json({error});

        //respuesta al cliente
        res.json({
            mensaje:"Usuario creado exitosamente",
            usuario:data(0)
        });
    }

});

app.put("/usuario/:id", async(req,res)=>{
    
    console.log("🕹️ BODY UPDATE:", req.body);

    const { id } = req.params;
    const { nombre,email,rol,activo,apellido } = req.body;

    if(!id){
        return res.status(400).json({error: "Falta el id"});
    }

    if(!nombre && !email && !rol && !activo && !apellido){
        return res.status(400).json({error: "No hay datos para actualizar"});
    }

    const datosActualizar = {};
    if(nombre) datosActualizar.nombre = nombre;
    if(email) datosActualizar.email = email;
    if(rol) datosActualizar.rol = rol;
    if(activo) datosActualizar.activo = activo;
    if(apellido) datosActualizar.apellido = apellido;

    console.log("📌 Datos a actualizar", datosActualizar);

    const { data,error } = await supabase
        .from("usuario")
        .update(datosActualizar)
        .eq("id", id)
        .select();
        
    console.log("🕹️ DB:", data);
    console.log("⚠️ Error:", error);

    if(error){
        return res.status(500).json({ error });
    }

    if(!data || data.length === 0){
        return res.status(404).json({ error: "Usuario no encontrado"});
    }

    res.json({
        mensaje: "✅ Usuario actualizado",
        usuario: data[0]
    });

});

// Agrega la / al principio
app.delete("/usuario/:id", async (req, res) => {
    
    const { id } = req.params;

    console.log("🗑️ ID a eliminar", id)

    // validar el id  
    if(!id){
        return res.status(400).json({error: "FAlta el id"});
    }

    const { data,error } = await supabase
        .from("usuario")
        .delete()
        .eq("id", id)
        .select();

    console.log("🕹️ DB:", data)
    console.log("⚠️ Error:.", error);

    if (error) {
        return res.status(500).json({error});
    }

    if(!data || data.length === 0){
        return res.status(404).json({error: "Usuario no encontrado"});
    }

    res.json({
        mensaje: "✅ Usuario Eliminado",
        usuario: data[0]
    });
});

//definimos el puerto
const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});