import bcrypt from "bcrypt";

const passwordToTest = "nuevaContraseñaSegura123"; // Contraseña ingresada
const storedHash =
  "$2b$10$imRC9VwFwm8JsRo3Hh0eb.Da3Iisd/sMijR1IR02PRH4WQen7b67C"; // Hash recuperado de la DB

// Usamos bcrypt.compare() para verificar si la contraseña ingresada es la correcta
bcrypt.compare(passwordToTest, storedHash, (err, isMatch) => {
  if (err) throw err;
  console.log("¿Coinciden las contraseñas?", isMatch); // true si coinciden, false si no
});

