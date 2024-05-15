const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000

const Carro = mongoose.model('Carro', {nome: String, ano: String, descricao: String})

app.get('/', async (req, res) => {
    const carros = await Carro.find()
    return res.send(carros)
}) 

app.delete('/:id', async (req,res) => {
    const carro = await Carro.findByIdAndDelete(req.params.id)
    return res.send(carro)
})

app.put('/:id', async (req,res) => {
    const carro = await Carro.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome,
        ano: req.body.ano,
        descricao: req.body.descricao
    })

    return res.send(carro)
})



app.post('/', async (req, res) => {
    const carro = new Carro({
        nome: req.body.nome,
        ano: req.body.ano,
        descricao: req.body.descricao
    })

    await carro.save()
    res.send(carro)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://guilhermegoncalves4871:nBwbVTNb7n97DM4J@projecto-api.pe6jxkb.mongodb.net/')
    console.log(`Exemplo rodando na porta ${port}`)
})