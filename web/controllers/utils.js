var jwt = require('jsonwebtoken');

module.exports = {
    encodeJWT: async (payLoad, expTime) => {
        return jwt.sign({
            data: payLoad
        }, process.env.JWT_SECRET);
    },
    decodeJWT: async (token) => {
        try {
            var decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.data;
        } catch (error) {
            console.log("Error in decode jwt", error);
        }
    },
    abTest: async (cases) => {
        return new Promise((resolve, reject) => {
            try {
                const expanded = cases.flatMap(case_ => Array(case_.pct).fill(case_));
                const case_winner = expanded[Math.floor(Math.random() * expanded.length)];
                console.log("case_winner: " + case_winner.test);
                return resolve(case_winner);
            } catch (error) {
                console.log("Error in abtest", error);
                return reject(false);
            }
        })

    },
    delay: async (delayInMS) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, delayInMS);
        });
    }
}