import { Router } from "express";
import { usuario, crearUsuario, actualizarUsuario, eliminarUsuario } from '../controllers/user.js';

const router = Router();

router.get('/traerDatos', usuario);
router.post('/crear', crearUsuario);
router.put("/actualizar/:id", actualizarUsuario);
router.delete('/eliminar/:id', eliminarUsuario);

export default router;