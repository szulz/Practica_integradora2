// ------------MULTER-------------
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "public"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploader = multer({ storage });
const path = require("path")


//  --------------MONGOOSE--------------
const { connect } = require("mongoose")
async function connectMongo() {
    try {
        await connect(
            "mongodb+srv://ezeszulz:test@coder.phqbv0m.mongodb.net/allUsers?retryWrites=true&w=majority"
        );
        console.log('plug to mongo');
    } catch (e) {
        console.log(e);
        throw "can not connect"
    }
}

// -----------EXPORTS-----------------

module.exports = {
    mongo: connectMongo,
    multer: uploader
};