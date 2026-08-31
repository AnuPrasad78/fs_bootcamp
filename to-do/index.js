const express= require('express');

const app= express();
app.use(express.json()); //middleware
const PORT=3000;

let todo=[
    {id:1, task:"task1",status:false},
    {id:2, task:"complete node", status:false}
]


//route
app.get('/todo',(req,res)=>{
    console.log(todo)
    res.json(todo)
})
app.get('/todo/:id',(req,res)=>{
    const id=req.params.id;
    console.log(req.params)
    const todos=todo.find(t=>t.id===parseInt(id));
    if(!todos) return res.status(404).send("Todo not Found");
    res.json(todos);
})

app.post('/todo',(req,res)=>{
    console.log(req.body)
    const newtodo={id: todo.length+1,
        task:req.body.task,
        status:false
    } 
    todo.push(newtodo)
    res.status(201).json(newtodo)
})
app.put('/todo', (req,res)=>{
    const {id,task,status}=req.body;
    const t=todo.find(i=>i.id===parseInt(id));
    if(!t) return res.status(404).send('Todo not Found.');
    t.task=task || todo.task;
    t.status=status!==undefined? status: t.status;
    res.json(todo);
})

app.delete('/todo/:id', (req,res) => {
    const idfrmparams =req.params.id;
    const idx=todo.findIndex(i=>i.id===parseInt(idfrmparams))
    console.log(idx);
    if(idx===-1) return res.status(404).send("Todo not Exist");
    const dlt=todo.splice(idx,1);
    res.json(dlt);
    console.log("hey");
    console.log(todo);

})

app.listen(PORT,()=>{
    console.log(`listening at http://127.0.0.1:${PORT}`)
})

