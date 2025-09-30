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
    "header": {
        "status": false,
        "statuscode": 500,
        "developer": "Leonardo Scotti Tobias"
    }
};

const HEADER = {
    "status": true,
    "statuscode": 200,
    "developer": "Leonardo Scotti Tobias"
};

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
    userNumber = String(numberUser);
    if (!userNumber) {
        return MESSAGE_ERROR;
    }

    let message = {
        "header": HEADER,
        "main": {
            "user": []
        }
    };

    let main = message.main;

    let messageUser = main.user;

    let contatos = JSON.parse(JSON.stringify(users))
    let userData = contatos.find(user => user.number === userNumber);
    if (userData) {
        delete userData.contacts;

        messageUser.push(userData);

        return message;
    } else {
        return MESSAGE_ERROR;
    };
};

const getPersonalDataOfAllUserContacts = (numberUser) => {
    let userNumber = String(numberUser);
    if (!userNumber) {
        return MESSAGE_ERROR;
    }

    let message = {
        "header": HEADER,
        "main": {
            "user": []
        }
    };
    let main = message.main;

    let messageUser = main.user;

    let contatos = JSON.parse(JSON.stringify(users))
    let userData = contatos.find(user => user.number === userNumber);
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
    let userNumber = String(numberUser);
    if (!userNumber) {
        return MESSAGE_ERROR;
    }

    let message = {
        "header": HEADER,
        "main": {
            "user": []
        }
    };

    let main = message.main;

    let messageUser = main.user;

    let contatos = JSON.parse(JSON.stringify(users))

    let userData = contatos.find(user => user.number === userNumber);
    if (userData) {
        messageUser.push(userData);

        return message;
    } else {
        return MESSAGE_ERROR;
    }
};

const getAllMessagesFromUserContact = (numberUser, numberContact) => {
    let userNumber = String(numberUser);
    let contactNumber = String(numberContact);
    if (!userNumber || !contactNumber) {
        return MESSAGE_ERROR;
    }

    let message = {
        "header": HEADER,
        "main": {
            "user": []
        }
    };

    let messageUser = message.main.user;

    let contatos = JSON.parse(JSON.stringify(users))
    let userData = contatos.find(user => user.number === userNumber);
    if (userData) {
        let contactData = userData.contacts.find(contact => contact.number === contactNumber);
        if(!contactData) {
            return MESSAGE_ERROR;
        }
        userData.contacts = [];
        userData.contacts.push(contactData);

        messageUser.push(userData);

        return message;
    } else {
        return MESSAGE_ERROR;
    }
};

const getAllMessagesByKeyword = (numberUser, numberContact, keyword) => {
    let userNumber = numberUser;
    let contactNumber = numberContact;
    let keySerached = keyword;
    if (!userNumber || !contactNumber || !keySerached) {
        return MESSAGE_ERROR
    }

    let userData = getAllMessagesFromUserContact(userNumber, contactNumber);
    if (!userData) {
        return MESSAGE_ERROR;
    }

    let messages = userData.main.user[0].contacts[0].messages;

    let messageSearched = messages.filter(messageWanted => messageWanted.content.toLowerCase().includes(keySerached.toLowerCase()));

    messages = messageSearched;

    userData.main.user[0].contacts[0].messages = messageSearched;

    if (userData.main.user[0].contacts[0].messages.length <= 0) {
        return MESSAGE_ERROR;
    } else {
        return userData;
    }
};

//console.log(JSON.stringify(getAllMessagesByKeyword("11987876567", "26999999963", "leonid"), null, 2));

module.exports = {
    getAllDataUsers,
    getPersonalDataUser,
    getPersonalDataOfAllUserContacts,
    getAllMessagesFromAllUserContacts,
    getAllMessagesFromUserContact,
    getAllMessagesByKeyword
}