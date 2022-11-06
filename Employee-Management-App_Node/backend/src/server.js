import express from "express";
import AuthRoutes from "./Routes/Auth";

const cors = require('cors');
const server = express();
server.use(cors());
server.use(AuthRoutes);

const port = 3002;

server.listen(port, () => {
  console.log(`Server started on PORT ${port} 🚀`);
});
