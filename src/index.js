//inicio de aplicacion
const app = require('./server');


//iniciando servidor
app.listen(app.get('port') /*puerto definido en server.js*/, ()=>{
    console.log(`Server on port ${app.get('port')}`);

})