// External imports
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

    try {
        let token = req.headers.authorization
        if (token === undefined) {
            return res.status(401).send(` 1:l'utilisateur n'est pas authentifié ou le token est invalide`);
        }

        if (!token.startsWith('Bearer')) {
            return res.status(401).send(` 2:l'utilisateur n'est pas authentifié ou le token est invalide`);
        }

        // Get only the token 
        token = token.split(' ')[1];

        const tokenDecoded = jwt.verify(token, "applicationForUniversity");

        req.user = tokenDecoded;
        next();

    } catch (error) {
        res.status(500).send({ 'success': false, 'msg': error });
    }

};


