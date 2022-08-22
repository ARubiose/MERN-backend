// https://mongoosejs.com/
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database online');
    } catch (error) {
        console.log(error);
        throw new Error('Cannot inititialize connection to MongoDB');
    }
};

module.exports = {
    dbConnection,
};
