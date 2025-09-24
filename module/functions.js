/*******************************************************************
 * Objetivo: Este arquivo é responsável por guardar todas as funções
 *           que manipular o JSON da API.
 * Data: 24/09/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************/

const listOfUsers = require('./contatos.js');
const users = listOfUsers.contatos['whats-users'];

const MESSAGE_ERROR = {
    "status": false,
    "statuscode": 500,
    "developer": "Leonardo Scotti Tobias"
}

const HEADER = {
    "status": true,
    "statuscode": 200,
    "developer": "Leonardo Scotti Tobias"
}

const getAllDataUsers = () => {
    let message = {
        "header": HEADER,
        "main": {}
    };

    let main = message.main;

    main.users = users;

    if (main.users.length > 0) {
        return message;
    } else {
        return MESSAGE_ERROR;
    };
};

const getPersonalDataUser = (numberUser) => {
    userNumber = numberUser;

    let message = {
        "header": HEADER,
        "main": {
            "user": []
        }
    };

    let main = message.main;

    let messageUser = main.user;

    let userData = users.find(user => user.number === userNumber);
    if (userData) {
        delete userData.contacts;

        messageUser.push(userData);

        return message;
    } else {
        return MESSAGE_ERROR;
    };
};

const getPersonalDataOfAllUserContacts = (numberUser) => {
    let userNumber = numberUser;

    let message = {
        "header": HEADER,
        "main": {
            "user": []
        }
    };
    let main = message.main;

    let messageUser = main.user;

    let userData = users.find(user => user.number === userNumber);
    if (userData) {
        messageUser.push(userData);

        userData.contacts.forEach(contact => {
            delete contact.messages
        });

        return message;
    } else {
        return MESSAGE_ERROR;
    };

};

const getAllMessagesFromAllUserContacts = (numberUser) => {
    let userNumber = numberUser;

    let message = {
        "header": HEADER,
        "main": {
            "user": []
        }
    };

    let main = message.main;

    let messageUser = main.user;

    let userData = users.find(user => user.number === userNumber);
    if (userData) {
        messageUser.push(userData);

        return message;
    } else {
        return MESSAGE_ERROR;
    }
};

const getAllMessagesFromUserContact = (numberUser, numberContact) => {
    let userNumber = numberUser;
    let contactNumber = numberContact;

    let message = {
        "header": HEADER,
        "main": {
            "user": []
        }
    };

    let messageUser = message.main.user;

    let userData = users.find(user => user.number === userNumber);
    if (userData) {
        let contactData = userData.contacts.find(contact => contact.number === contactNumber);
        userData.contacts = [];
        userData.contacts.push(contactData);

        messageUser.push(userData);

        return message;
    } else {
        return MESSAGE_ERROR;
    }
};

const getSearchKeywordUserContactConversation = (numberUser, numberContact, keyword) => {};

console.log(JSON.stringify(getAllMessagesFromUserContact("11955577796", "26999999920"), null, 2));

module.exports = {
    getAllDataUsers,
    getPersonalDataUser,
    getPersonalDataOfAllUserContacts,
    getAllMessagesFromAllUserContacts,
    getAllMessagesFromUserContact,
    getSearchKeywordUserContactConversation
}