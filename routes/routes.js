import express from 'express'
import { productos,newpro,showpro, updatepro, deletepro } from '../controllers/proController.js'
import { categorias,newcat,showcat, updatecat, deletecat } from '../controllers/catController.js'
const router = express.Router()



router.get('/productos', productos,(req, res) => {
    res.render('productos', {productos:req.Dic})
})

router.get('/newpro', (req, res) => {
    res.render('newpro')
})

router.post('/showpro',showpro, (req, res) => {
    res.render('modpro', {producto:req.data})
})

router.get('/categorias', categorias,(req, res) => {
    res.render('categorias', {categorias:req.Dic})
})

router.get('/newcat', (req, res) => {
    res.render('newcat')
})
router.post('/showcat',showcat, (req, res) => {
    res.render('modcat', {categoria:req.data})
})


router.post('/newpro',newpro)
router.post('/updatepro',updatepro)
router.post('/deletepro',deletepro)
router.post('/newcat',newcat)
router.post('/updatecat',updatecat)
router.post('/deletecat',deletecat)

export default router