const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: false,
  })
);

//if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, '/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build'));
});
//}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
