const mongoose = require("mongoose");
const { Schema } = mongoose;

const turnoSchema = new Schema(
  {
    fecha: { type: Date, required: true },

    hora: { type: String, required: true },

    servicio: { type: Schema.Types.ObjectId, ref: "Servicio", default: null },

    cliente: { type: Schema.Types.ObjectId, ref: "Usuario", default: null },

    nombreClienteManual: { type: String, default: null },

    bloqueado: { type: Boolean, default: false },

    estado: {
      type: String,
      default: "pendiente",
      enum: ["pendiente", "cancelado", "finalizado", "ausente"],
    },
  },
  { timestamps: true },
);

turnoSchema.index({ fecha: 1, hora: 1 }, { unique: true });

module.exports = mongoose.model("Turno", turnoSchema, "turnos");
