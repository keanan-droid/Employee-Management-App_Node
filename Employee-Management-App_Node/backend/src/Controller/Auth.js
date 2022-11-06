import { compare } from "bcrypt";
import { genSalt, hash, bcrypt } from "bcrypt";
import { DbConfig } from "../Config/db.config";
import { jwt } from "jsonwebtoken";

export class AuthController {
  async signup(request, response) {
    const pool = new DbConfig().getPool(); 

    const { name, password } = request.body;

    if (!name || !password) {
      return response
        .status(400)
        .json({ msg: "All fields are required to create a user" });
    }


    try {

      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);

      const pgClient = await pool.connect();

      const query = {
        text: "INSERT INTO Users (name, password) VALUES ($1, $2)",
        values: [name, hashedPassword],
      };

      await pgClient.query(query);
      pgClient.release();

      return response.status(201).json({ msg: "User created" });
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async signin(request, response) {
      const { name, password } = request.body;

      if (!name || !password) {
        return response
        .status(400)
        .json({ msg: "All fileds are required to login" })
      }

    const query = {
      text: "SELECT * FROM Users WHERE name = $1",
      values: [name]
    }
    

    const pool = new DbConfig().getPool();

    try {

      const pgClient = await pool.connect();
      const user = await (await pgClient.query(query)).rows[0];
      if (!user) {
        return response
        .status(404)
        .json({ msg: "user with this name does not exist" })
      }

      const isValidPassword = await compare(password, user.password)

      if (!isValidPassword) {
        return response.status(401).json({ msg: "Invalid credentials" });
      }

      pgClient.release();

      return response.status(201).json({ msg: "welcome user" })

    } catch (error) {
      return response.status(500).json(error)
    }
  }

  async getData(request, response) {

    const pool = new DbConfig().getPool();

    try {

      const pgClient = await pool.connect();

      const query = {
              text: "SELECT * FROM Users",
            }
      
      const Users = await (await pgClient.query(query)).rows;

      pgClient.release();
      return response.status(201).json({ Users })
          
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  // async update(request, response ) {

  //   const pool = new DbConfig().getPool();

  //   const { email, password, username, setNewPassword } = request.body;

  //   if (!email || !password || !username || !setNewPassword) {
  //     return response
  //     .status(400)
  //     .json({ msg: "All fields are required to login" })
  //   }

  //   const salt = await genSalt();
  //   const hashedPassword = await hash(setNewPassword, salt);

  //   try {
      
  //     const pgClient = await pool.connect();

  //     const query = {
  //       text: "SELECT * FROM Account WHERE email = $1",
  //       values: [email]
  //     }

  //     const account = await (await pgClient.query(query)).rows[0];

  //     if (!account) {
  //       return response
  //       .status(404)
  //       .json({ msg: "Account with this email does not exist" })
  //     }

  //     const updateQuery = {
  //       text: "UPDATE Account SET password = $1 WHERE email = $2",
  //       values: [hashedPassword, email]
  //     }

  //     const newAccount = await (await pgClient.query(updateQuery)).rows[0];


  //     pgClient.release();
  //     return response.status(201).json({ msg: "Credientials updated" })

  //   } catch (error) {
  //     return response.status(500).json(error)
  //   }


  // }
}
