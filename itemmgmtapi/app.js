const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express() ;
const port=3001;
app.use (cors());
app.use(bodyParser.json());


const items=[
    {id:1,name:'Maruti',amount:5},
    {id:2,name:'Toyota',amount:4},
    {id:3,name:'Hyundai',amount:6}
]

app.post('/item',(req,res)=>{
    const newItem=req.body;
    console.log('newItem',newItem);
    newItem.Id=items.length+1;
    items.push(newItem);
    res.json(items)

})
app.get('/item',(req,res)=>{
    res.json(items)

})
app.patch('/item/:name',(req,res)=>{
    const itemName=req.params.name;
    const updatedItem=req.body;
    const index=items.findIndex(item=>item.name===itemName);
    if(index !=-1)
    {
        items[index]={...items[index],...updatedItem} 
        res.json(items);  
    }else{
        res.status(404).json({error:'item not found'});
    }
});
app.delete('/item/:name', (req, res) => {
    const itemName = req.params.name;
    const index = items.findIndex((item) => item.name === itemName);
    if (index !== -1) {
      items.splice(index, 1);
      res.json(items);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})
