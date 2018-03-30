const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {

    app.post('api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            lastName,
            password
        } = body;
        let {
            email
        } = body;

        if (!firstName) {
            return res.end({
                success: false,
                message: 'Error: First name cannot be blank.'
            });
        }
        if (!lastName) {
            return res.end({
                success: false,
                message: 'Error: Last name cannot be blank.'
            });
        }
        if (!email) {
            return res.end({
                success: false,
                message: 'Error: email cannot be blank.'
            });
        }
        if (!password) {
            return res.end({
                success: false,
                message: 'Error: password cannot be blank.'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.end({
                    success: false,
                    message: 'Error: Server error'
                });
            } else if (previousUsers.length > 0) {
                return res.end({
                    success: false,
                    message: 'Error: Account already exists.'
                });
            }

            const newUser = new User();

            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.passwords = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.end({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.end({
                    success: true,
                    message: 'Signed up'
                });
            })
        });
    });

    app.post('api/account/signin', (req, res, next) => {
        const { body } = req;
        const {
            password
        } = body;
        let {
            email
        } = body;

        if (!email) {
            return res.end({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {
            return res.end({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            if(users.length !=1){
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }

            const user = users[0];

            if(!user.validPassword(password)){
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }

            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err,doc) => {
                if(err) {
                    return res.send({
                        success: false,
                        message: 'Error: server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                });
            });
        });

    });

    app.get('api/account/verify', (req, res, next) => {
        const { query } = req;
        const { token } = query;

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }

            if(session.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Good'
                });
            }
            
        });
    });

    app.get('api/account/logout', (req, res, next) =>{
        const { query } = req;
        const { token } = query;

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set:{
                isDeleted:true
            }
        },null, (err, sessions) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }

            if(session.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Good'
                });
            }
            
        });
    });
}