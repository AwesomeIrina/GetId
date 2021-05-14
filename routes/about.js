const {Router} = require('express');
const router = Router();


router.get('/', (req, res) => {
    res.render('about', {
        title: 'О сайте',
    })
});

router.get('/getToken', (req, res) => {
    res.render('getToken', {
        title: 'Как получить токен?',
    })
});

module.exports = router;