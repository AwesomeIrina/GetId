const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator'); //const {body} = require('express-validator/check');
const User = require('../models/user');
const { registerValidators } = require('../utils/validators');
const { loginValidators } = require('../utils/validators');
const router = Router();


router.get('/login', async(req, res) =>{
    res.render('auth/login', {
        title: 'Authtorization',
        logError: req.flash('logError'),
        regError: req.flash('regError'),
    });
});

router.get('/logout', async(req, res) =>{
    req.session.destroy( ()=>{
        res.redirect('/auth/login');
    }); 
});

// //логин
router.post('/login', loginValidators, async (req, res) =>{
    try {
        const{name, password} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.flash('regError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login')
        }
        const candidate = await User.findOne({name});
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save(error => {
            if(error){
                throw error;
            }
            res.redirect('/userLists');
        })

    //     const candidate = await User.findOne({name});
    //     if(candidate){
    //         const areSame = await bcrypt.compare(password, candidate.password);
    //         if(areSame){
    //             req.session.user = candidate;
    //             req.session.isAuthenticated = true;
    //             req.session.save(error => {
    //     if(error){
    //         throw error;
    //     }
    //     res.redirect('/userLists');
    // })
    //         }else {
    //             req.flash('logError', 'Неверный пароль');
    //             res.redirect('/auth/login');
    //         }
    //     }else {
    //         req.flash('logError', 'Такого пользователя не существует');
    //         res.redirect('/auth/login');
    //     }
        
    } catch (error) {
        console.log(error);
    }

});


 //регистрация
router.post('/register', registerValidators, async (req, res) => {
    try{
        const{name, password} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.flash('regError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login')
        }
        //шифруем пароль, 10 символов шифрования, чтобы было сложнее взломать
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name, password: hashPassword, lists: {items: []}//, userList: {items: []}
        });
        await user.save();
        res.redirect('/auth/login');

    }catch(error){
        console.log(error);
    }
})


module.exports = router;