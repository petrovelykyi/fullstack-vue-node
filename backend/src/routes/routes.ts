import express from 'express';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  email: string;
  password: string;
}

interface JwtObject {
  id: string;
  userEmail: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

const SECRET = 'secret';

const users: Array<User> = [];

const router = express.Router();

router.post('/registration', (req, res) => {
  const { email, password } = req.body;

  const existUser = users.find((u) => u.email === email);

  if (existUser) {
    res.status(409).send({ error: 'User already exists!' });
  } else {
    const newUser: User = {
      id: Number(new Date()),
      email,
      password,
    };

    users.push(newUser);
    console.log(users);
    res.sendStatus(201);
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });

  const existUser = users.find((u) => email === u.email);

  if (existUser) {
    if (existUser.password === password) {
      // add cookie
      const { id, email: userEmail } = existUser;
      const token = jwt.sign({ id, userEmail }, SECRET, {
        audience: 'http://localhost',
        expiresIn: '3d',
        issuer: 'EnvisionTEC',
      });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 * 3 });
      res.json({ userEmail });
    } else {
      res.status(401).send({ error: 'Wrong password!' });
    }
  } else {
    res.status(401).send({ error: 'Wrong username!' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.sendStatus(204);
});

router.get('/user', (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const jwtObj = jwt.verify(token, SECRET) as JwtObject;
      console.log({ jwtObj });
      res.status(200).send({ userEmail: jwtObj.userEmail });
    } catch (e) {
      console.log(e.toString());
      res.status(401).send({ error: e });
    }
  }
});

export default router;
