/**
 * This module establish the connection with database
 */
import mongoose from 'mongoose';


/**
 * global variables
 */

// this function establish the connection between node server and mongo database

const connectDatabase = () => {
    new mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true}).then((data) => {
        console.log("Database connected to: ", data.connection.host)
    }).catch((error) => console.log(error))
}

export default connectDatabase;
