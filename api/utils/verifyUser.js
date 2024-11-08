import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const JWT_SECRET = '3234f4c9d88243b9d1ee7760fe042cf4ae4b50a995bd04374b3bf2b2d83170d62252f08f8fd5a3169a08a2f7d1a054cff38c9f387be20a67bcd6099de47d44d3'

export const verifyToken = (req, res, next) => {
  //name of token is access_token
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, JWT_SECRET, (err, user) => {
    //if there is error we are returning new error of 403
    if (err) return next(errorHandler(403, 'Forbidden'));

    //if there is no error we are sending it to next function
    //we are sending it inside the request
    req.user = user;
    //if we have sucessfully verified user then we are going to next function i.e. updateUser
    next();
  });
};


export const verifyOwner = (req, res, next) => {
  if (req.user && req.user.userType === "owner"){
    return next();
  }else{
    return next(errorHandler(403, 'Forbidden'));
  }
}