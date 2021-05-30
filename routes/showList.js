const {Router} = require('express');
const router = Router();


router.get('/', async (req, res) => {
    const user = await req.user.populate('userData.items');
    const list = user.userData.items.map(l => ({
         ...l._doc //... - фишка ES6 синтаксиса - перебор всех элементов массива
    }));
    res.render('userLists', {
        title: 'Список',
    });
    
});

module.exports = router;