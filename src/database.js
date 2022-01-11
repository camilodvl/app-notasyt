const mongoose = require('mongoose')
//conexión a la bd


mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(db => console.log('BD CONNECTED'))
.catch(err => console.log(err));