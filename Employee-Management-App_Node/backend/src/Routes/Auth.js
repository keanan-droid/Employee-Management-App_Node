import { Router, json } from "express";
import { AuthController } from "../Controller/Auth";

const router = Router();
const Controller = new AuthController();

router.post("/api/signup", json(), (request, response) => {
  Controller.signup(request, response);
});

router.post("/api/signin", json(), (request, response) => {
  Controller.signin(request, response);
});

router.get("/api/getData", json(), (request, response) => {
  Controller.getData(request, response);
});

export default router;
