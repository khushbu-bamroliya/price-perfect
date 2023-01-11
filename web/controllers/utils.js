var jwt = require('jsonwebtoken');

module.exports = { 
    encodeJWT : async (payLoad, expTime)=>{
        // if (!expTime) return new Error("expiry time not found");
        return jwt.sign({
            data: payLoad
        }, process.env.JWT_SECRET);
    },
    decodeJWT : async (token)=>{
        return new Promise((resolve,reject)=>{
            try {
                var data = jwt.verify(token, process.env.JWT_SECRET);
                // if (!secret) return reject(false);
                return resolve(data);
            } catch (error) {
                return reject(false);
            }
        })
    },
    abTest: async(cases)=>{     
        return new Promise((resolve,reject)=>{
            try {              
                const expanded = cases.flatMap(case_ => Array(case_.pct).fill(case_));
                const case_winner = expanded[Math.floor(Math.random() * expanded.length)];
                console.log("case_winner: " + case_winner.test);
                return resolve(case_winner);
            } catch (error) {
                console.log("Error in abtest",error);
                return reject(false);
            }
        })
    }
}