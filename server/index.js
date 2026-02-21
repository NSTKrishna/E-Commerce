const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('E-Commerce API is running');
});

const authRoutes = require('./routes/auth.routes');

app.use('/api/auth', authRoutes);
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/orders', require('./routes/order.routes'));



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
