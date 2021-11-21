import { Request } from "express";



export function getToken(req: Request) {

  const authHeader = req.get('authorization');

  if (!authHeader) {
    return null
  }
  const parts = authHeader.split(' ')
  if (parts.length !== 2) {
    return null
  }
  const scheme = parts[0]
  const token = parts[1]
  if (/^Bearer$/i.test(scheme)) {
    return token
  }
  return null
}

export const nonceGenerator = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < possible.length; i++) { 
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
