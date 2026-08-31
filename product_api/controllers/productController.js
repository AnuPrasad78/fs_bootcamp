import pool from '../config/db.js';
export const getAllPrdt=async(req,res)=>{
    try{
        const [row]=await pool.query('SELECT * FROM products');
        res.json(row);
    } catch{error}{
        res.status(500).json({error:error.message})
    }
}
export const getPdtById=async(req,res)=>{
    try{
        const [row]=await pool.query('SELECT * FROM products WHERE id= ?',[req.params.id]);
        if(row.length===0){
            return res.status(404).json({error:"product not found"})
        }
        res.json(row);
    } catch{error}{
        res.status(500).json({error:error.message})
    }
}

export const createPdt= async(req,res)=>{
    try{
        const {name,price,description}=req.body;
        if(!price || price<0){
            return res.status(404).json({error:"invalid price"})
        }
        const [result]=await pool.query('INSERT INTO products (name,price,description) VALUES (?,?,?)',[name,price,description]);
        res.status(201).json({id:result.insertId,name,price,description});

    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

export const updatePdt= async(req,res)=>{
    try{
        const {name,price,description}=req.body;
        if(price && price<0){
            return res.status(404).json({error:"invalid price"})
        }
        const [result]=await pool.query('UPDATE products SET name=? , price=? ,description=? WHERE id=? ',[name,price,description,req.params.id]);
        if(result.affectedRows==0){
            return res.status(404).json({error:"Product not Found."})
        };
        res.status(200).json({message:"product updated"});

    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
