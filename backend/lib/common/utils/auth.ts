import { Request } from "express";



export function getToken (req: Request) {
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
  