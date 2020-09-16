const server = require('./api/server')


const port = process.env.PORT || 5000

server.listen(port, ()=>{
    console.log(`Sever is listening at port: ${port}`)
})