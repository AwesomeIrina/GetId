const {Router} = require('express');
const auth = require('../middleware/auth');
const router = Router();


router.get('/', auth, async (req, res) => {
    const user = await req.user.populate('userData.items');
    const lists = user.userData.items.map(l => ({
         ...l._doc
    }));
    res.render('userLists', {
        title: 'My Lists',
        lists
    });
    
});

router.get('/:id/edit', auth, async (req, res) => {
    if(!req.query.allow){
        return res.redirect('/');
    }
    let list = await req.user.findListId(req.params.id);
    list = list._doc;
    res.render('list-edit', {
        title: `Редактировать ${list.title}`,
        list,
    });
});


router.post('/edit', auth, async (req, res) => {
    await req.user.update(req.body);
    res.redirect('/userLists');
})

router.post('/remove', auth, async (req, res) =>{
    await req.user.removeFromLists(req.body.id);
    res.redirect("/userLists");
})

module.exports = router;