import { promisify } from 'util'
import con from '../database/connection.js'

export const newpro = async (req, res) => {
    const { proId, proNombre, proDesc, proPrecio,proCat } = req.body
    const data = {
        pro_id:proId, 
        pro_nombre:proNombre, 
        pro_desc: proDesc, 
        pro_precio: proPrecio,
        pro_cat: proCat
    }

    con.query('INSERT INTO producto SET ?', data, (err, result) => {
        if (err) {
            console.log('Ocurrio un error al insertar el producto')
            return
        }
        res.redirect('/productos')
    })
}

export const updatepro = async(req,res,next) =>{
    const { proNombre, proDesc, proPrecio,proCat, proId } = req.body
    con.query( 'UPDATE producto SET pro_nombre=?, pro_desc=?, pro_precio=?, pro_cat=? WHERE pro_id = ?',[proNombre, proDesc,proPrecio, proCat,proId],(err, result)=>{
        if (err) {
            console.log('Ocurrio un error al actualizar el producto')
            return
        }
        res.redirect('/productos')
    })
}

export const showpro = async(req, res, next) =>{
    const { proId } = req.body
    con.query('SELECT * FROM producto where pro_id = ?',[proId], async (err, result) => {
        req.data =  result[0]
        next()
    })
}

export const deletepro = async(req, res) =>{
    const { proId } = req.body
    var max = 0
    con.query('DELETE FROM producto where pro_id = ?',[proId], async (err, result) => {
        con.query('SELECT MAX(pro_id) FROM producto;',"",async (err, result) => {
            max = result[0]["MAX(pro_id)"]
            if(max == null){ max = 1 }
            con.query('ALTER TABLE producto AUTO_INCREMENT = ?',[max], async (err, result) => {
                res.redirect("productos")
            })
        })
    })
}

export const productos = async (req, res, next) => {
    con.query('SELECT * FROM producto', async (err, result) => {
        req.Dic =  result
        next()
        
    })  
}