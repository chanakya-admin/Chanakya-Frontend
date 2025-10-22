require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { init } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));

app.get('/', (req, res) => res.json({ message: 'Chanakya API is running' }));

const PORT = process.env.PORT || 4000;

init().then(() => {
  const fs = require('fs');
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});