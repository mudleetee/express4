const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ahoy-node-passport', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})