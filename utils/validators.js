const {body} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.loginValidators = [
    body('name').custom(async (value, {req}) => {
        try {
            const user = await User.findOne({name: value});
            if(!user){
                return Promise.reject('Неверное имя пользователя');
            }
        } catch (error) {
            console.log(error);
        }

    })
        .isLength({min: 2})
        .withMessage('Имя не может быть менее 2 символов')
        .trim(),

    body('password','Пароль не может быть менее 6 символов')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .custom(async (value,{req}) => {
            userName = req.body.name;
            const user = await User.findOne({name: userName});
            console.log(user)
            const areSame = await bcrypt.compare(value, user.password)
            if(!areSame){
                throw new Error('Неверный пароль');
            }
            return true;
        })
        .trim(),
];

exports.registerValidators = [
    body('name').custom(async (value, {req}) => {
        try {
            const user = await User.findOne({name: value});
            if(user){
                return Promise.reject('Пользователь уже существует');
            }
        } catch (error) {
            console.log(error);
        }

    })
        .isLength({min: 2})
        .withMessage('Имя не может быть менее 2 символов')
        .trim(),

    body('password','Пароль не может быть менее 6 символов')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .trim(),

    body('confirm').custom(async (value,{req}) => {
        if(value !== req.body.password){
            throw new Error('Пароли не совпадают');
        }
        return true;

    })
        .trim(),
];

exports.listValidators = [
    body('title')
        .isLength({min: 3})
        .withMessage('Заголовок должен содержать минимум 3 символа')
        .trim(),

    body('link')
        .custom(async (value, {req}) => {
            try {
                const vkFind = 'vk.com';
                const wallFind = 'w=wall';
                console.log(value.toString().indexOf(vkFind), value.toString().indexOf(wallFind));
                if(value.toString().indexOf(vkFind) == -1 && value.toString().indexOf(wallFind) == -1){
                    return Promise.reject('Введите корректную ссылку на пост');
                }
            } catch (error) {
                console.log(error);
            }
        }),

];