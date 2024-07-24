import { genSalt } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    correo: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true,
    },
    contraseña: {
        type: String,
        required: [true, "La contraseña es requerida"],
    },
    nombre: {
        type: String,
        required: false,
    },
    apellido: {
        type: String,
        required: false,
    },
    imagen: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    perfil: {
        type: Boolean,
        required: false,
    }
});

userSchema.pre("save", async function(next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

const Usuario = mongoose.model("Usuarios",userSchema);

export default Usuario;