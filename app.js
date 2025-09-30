/*******************************************************************
 * Objetivo: API responsável por criar EndPoints imitando o WhatsApp
 * Data: 30/09/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************/

const express    = require('express');
const cors       = require('cors');

const functions = require('./module/functions.js');

const PORT = process.PORT || 8080;

const app = express();

//cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET');

    app.use(cors());
    next();
})

// ========== EndPoints ==========

//EndPoint que lista as mensagens de um contato
app.get('/v1/whatsapp/messages', (request, response) => {
    let numberUser    = request.query.user;
    let numberContact = request.query.contact;

    let messages = functions.getAllMessagesFromUserContact(numberUser, numberContact);
    
    response.status(messages.header.statuscode);
    response.json(messages);
})

//EndPoint que lista tudo
app.get('/v1/whatsapp/list', (request, response) => {
    let all = functions.getAllDataUsers();

    response.status(all.header.statuscode);
    response.json(all);
})

//EndPoint que retorna as informações pessoais do usuário
app.get('/v1/whatsapp/:number', (request, response) => {
    let number = request.params.number;

    let personalData = functions.getPersonalDataUser(number);

    response.status(personalData.header.statuscode);
    response.json(personalData);
})

//EndPoint que lista os contatos do usuário
app.get('/v1/whatsapp/:number/contacts', (request, response) => {
    let number = request.params.number;     

    let contacts = functions.getPersonalDataOfAllUserContacts(number);

    response.status(contacts.header.statuscode);
    response.json(contacts);
})

//EndPoint que lista todas as mensagens de todos os contatos
app.get('/v1/whatsapp/:number/allMessages', (request, response) => {
    let number = request.params.number;

    let messages = functions.getAllMessagesFromAllUserContacts(number);

    response.status(messages.header.statuscode);
    response.json(messages)
})

//EndPoint que procura uma mensagem em uma conversa com um contato
app.get('/v1/whatsapp/:number/keyword', (request, response) => {
    let numberUser = request.params.number;
    let numberContact = request.query.contact;
    let keyword = request.query.keyword;

    let keySerached = functions.getAllMessagesByKeyword(numberUser, numberContact, keyword);

    response.status(keySerached.header.statuscode);
    response.json(keySerached);
})

// ===============================

app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})