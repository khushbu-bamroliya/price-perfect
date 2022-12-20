var jwt = require('jsonwebtoken');

module.exports = { 
    encodeJWT : async (payLoad, expTime)=>{
        if (!expTime) return new Error("expiry time not found");
        return jwt.sign({
            data: payLoad
        }, process.env.JWT_SECRET);
    },
    decodeJWT : async (token)=>{
        return new Promise((resolve,reject)=>{
            try {
                var data = jwt.verify(token, process.env.JWT_SECRET);
                if (!secret) return reject(false);
                return resolve(data);
            } catch (error) {
                return reject(false);
            }
        })
    }
}