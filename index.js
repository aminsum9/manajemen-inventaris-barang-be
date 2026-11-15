const express = require('express');

const app = express();

const userRouter = require('./routers/user');

app.use(express.json());

// routers
app.use('/api/user', userRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});