const express = require('express')
const mysql = require('mysql2/promise')

//configurar banco de dados
const conn = mysql.createPool({
    database:'db_eletro',
    user:'root',
    password:'',
    host:'localhost'
})

//Executa o express
const APP = express()

//ConfiguraÃ§Ã£o
APP.use(express.json())
APP.use(express.urlencoded({extended: true}))
APP.set('view engine','ejs')
APP.set('views','./views')

//AplicaÃ§Ã£o no ar
APP.listen(3000)


APP.post('/categoria/criar', async (req, res) => {
    
    const { nome, descricao } = req.body;

    const cmd = 'insert into categoria (nome, descricao) values (?,?);'
    const sql = await conn.query(cmd, [nome, descricao])
   
    if(sql[0].affectedRows == 0)
    {       

    }

    res.redirect('/categoria/lista')
})


APP.get('/categoria/apagar/:id', async (req, res) => {
    
    const id = req.params.id;

    const cmd = 'delete from categoria where id_categoria = ?'
    const sql = await conn.query(cmd, [id])
   
    if(sql[0].affectedRows == 0)
    {       

    }

    res.redirect('/categoria/lista')
})

APP.post('/categoria/editar', async (req, res) => {
    
    const { id, nome, descricao } = req.body;

    const cmd = 'update categoria set nome = ?, descricao = ? where id_categoria = ?;'
    const sql = await conn.query(cmd, [nome, descricao, id])
   
    if(sql[0].affectedRows == 0)
    {       

    }

    res.redirect('/categoria/lista')
})


APP.get('/categoria/criar', (req,res) => {
    res.render("criar.ejs")
})

APP.get('/categoria/editar/:id', async (req,res) => {
    
    const id = req.params.id;
    const cmd = "select * from categoria where id_categoria = ?;"
    const sql = await conn.query(cmd, [id])

    const dado = sql[0]
    
    res.render("editar.ejs", {dado: dado[0]})
})

APP.get('/categoria/lista', async (req, res) => {
    
    let dados = [];

    const cmd = 'select * from categoria;'
    const sql = await conn.query(cmd)
   
    if(sql[0].length > 0)
    {
        dados = sql[0]
    }

    res.render('lista.ejs', { dados: dados})

})