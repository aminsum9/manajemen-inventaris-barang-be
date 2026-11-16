const express = require('express');
const cookieParser = require("cookie-parser");
const { authenticated } = require('./middleware/auth');

const app = express();

const userRouter = require('./routers/user');
const productRouter = require('./routers/product');

app.use(express.json());
app.use(cookieParser());

// routers
app.use('/api/user', userRouter);
app.use('/api/items',authenticated, productRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});