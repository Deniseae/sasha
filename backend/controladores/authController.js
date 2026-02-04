const Usuario = require("../modelos/usuario");
const bcrypt = require("bcryptjs");

// 📌 REGISTRO DE USUARIO (Actualizado para Estética Sasha)
const register = async (req, res) => {
  try {
    const {
      email,
      password,
      nombres,
      apellidos,
      dni,
      direccion,
      telefono,
      tipoDePiel, // Nuevo campo opcional desde el registro
      alergias, // Nuevo campo opcional desde el registro
    } = req.body;

    // 1️⃣ Verificar si ya existe el email
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // 2️⃣ Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Crear nuevo usuario fusionado
    const newUser = new Usuario({
      email,
      password: hashedPassword,
      nombres,
      apellidos,
      dni,
      direccion,
      telefono,
      tipoDePiel: tipoDePiel || "No especificado",
      alergias: alergias || "Ninguna",
      rol: "usuario",
    });

    await newUser.save();

    res.status(201).json({
      message: "¡Bienvenida a Estética Sasha! Registro completado.",
      usuario: {
        _id: newUser._id,
        email: newUser.email,
        nombres: newUser.nombres,
        rol: newUser.rol,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { register };
