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

const getAllDataUsers = () => {
    let message = {
        "status": true,
        "statuscode": 200,
        "developer": "Leonardo Scotti Tobias"
    }

    message.users = users;

    if (message.users.length > 0) {
        return message;
    } else {
        return MESSAGE_ERROR;
    }
};

const getPersonalDataUser = (numberUser) => {
    userNumber = numberUser;

    let message = {
        "status": true,
        "statuscode": 200,
        "developer": "Leonardo Scotti Tobias",
        "user": []
    };

    messageUser = message.user;

    let userData = users.find(user => user.number === userNumber);
    if (userData) {
        delete userData.contacts

        messageUser.push(userData)

        return message
    } else {
        return MESSAGE_ERROR;
    }
};

const getPersonalDataOfAllUserContacts = (numberUser) => {
    let userNumber = numberUser;

    let message = {
        "status": true,
        "statuscode": 200,
        "developer": "Leonardo Scotti Tobias",
        "user": []
    }

    let messageUser = message.user;

    let userData = users.find(user => user.number === userNumber);
    if (userData) {
        let id = userData.id;
        let account = userData.account;
        let nickname = userData.nickname;
        let profile_image = userData['profile-image'];
        let start = userData['created-since'].start;
        let end = userData['created-since'].end;
        let number = userData.number;
        let background = userData.background;

        let user = {
            "id": id,
            "account": account,
            "nickname": nickname,
            "created-since": {
                "start": start,
                "end": end
            },
            "profile-image": profile_image,
            "number": number,
            "background": background,
            "contacts": []
        }

        messageUser.push(user)

        userData.contacts.forEach(contact => {
            let name = contact.name;
            let number = contact.number;
            let description = contact.description;
            let image = contact.image;

            let contactData = {
                "name": name,
                "number": number,
                "description": description,
                "image": image
            }

            messageUser[0].contacts.push(contactData);
        })

        return message;
    } else {
        return MESSAGE_ERROR;
    }

};

const getAllMessagesFromAllUserContacts = (numberUser) => {
    let userNumber = numberUser;

    let message = {
        "status": true,
        "statuscode": 200,
        "developer": "Leonardo Scotti Tobias",
        "user": []
    }

    let messageUser = message.user;

    let userData = users.find(user => user.number === userNumber);
    if (userData) {
        let id = userData.id;
        let account = userData.account;
        let nickname = userData.nickname;
        let profile_image = userData['profile-image'];
        let start = userData['created-since'].start;
        let end = userData['created-since'].end;
        let number = userData.number;
        let background = userData.background;

        let user = {
            "id": id,
            "account": account,
            "nickname": nickname,
            "created-since": {
                "start": start,
                "end": end
            },
            "profile-image": profile_image,
            "number": number,
            "background": background,
            "messages": []
        }

        messageUser.push(user)

        userData.contacts.forEach(contact => {
            messageUser[0].messages.push(contact['messages']);
        })

        return message;
    } else {
        return MESSAGE_ERROR;
    }
};

const getAllMessagesFromUserContact = (numberUser, numberContact) => {
    let userNumber = numberUser;
    let contactNumber = numberContact;

    let message
};

const getSearchKeywordUserContactConversation = (numberUser, numberContact, keyword) => {};

console.log(getAllMessagesFromAllUserContacts("1194457796"));

module.exports = {
    getAllDataUsers,
    getPersonalDataUser,
    getPersonalDataOfAllUserContacts,
    getAllMessagesFromAllUserContacts,
    getAllMessagesFromUserContact,
    getSearchKeywordUserContactConversation
}