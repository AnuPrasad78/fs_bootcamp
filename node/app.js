const http=require('http');
const port=8000;
const server=http.createServer((req,res)=>{
    res.end("hello");
});
server.listen(port,()=>{
    console.log(`server is running at ${port}`)
})