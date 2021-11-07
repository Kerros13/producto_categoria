import { promisify } from 'util'
import con from '../database/connection.js'

export const newcat = async (req, res) => {
    const { catNombre, catDesc } = req.body
    const data = {
        cat_nombre:catNombre,
        cat_desc:catDesc
    }
   
    con.query('INSERT INTO categoria SET ?', data, (err, result) => {
        if (err) {
            console.log('Ocurrio un error al insertar la categoria')
            return
        }
        res.redirect('/categorias')
    })
}

export const updatecat = async(req,res,next) =>{
    const { catNombre,catDesc,catId } = req.body
   con.query( 'UPDATE categoria SET cat_nombre = ?, cat_desc = ? WHERE cat_id = ?',[catNombre,catDesc,catId],(err, result)=>{
    if (err) {
        console.log('Ocurrio un error al actualizar la categoria')
        return
    }
    res.redirect('/categorias')
   })
}

export const showcat = async(req, res, next) =>{
    const { catId } = req.body
    con.query('SELECT * FROM categoria where cat_id = ?',[catId], async (err, result) => {
          req.data = result[0]
          next()
      })
}

export const deletecat = async(req, res, next) =>{
    const { catId } = req.body
    var max = 0
    con.query('DELETE FROM categoria where cat_id = ?',[catId], async (err, result) => {
        con.query('SELECT MAX(cat_id) FROM categoria;',"",async (err, result) => {
            max = result[0]["MAX(cat_id)"]
            if(max == null){ max = 1 }
            con.query('ALTER TABLE categoria AUTO_INCREMENT = ?',[max], async (err, result) => {
                res.redirect("categorias")
            })
        })
    })
}

export const categorias = async (req, res, next) => {
    con.query('SELECT * FROM categoria', async (err, result) => {
        req.Dic =  result
        next()
    })  
}