const {Router} = require('express');
const easyvk = require('easyvk');
const auth = require('../middleware/auth');
const router = Router();

router.get('/:id/edit', auth, async (req, res) => {
    if(!req.query.allow){
        return res.redirect('/');
    }

    let list = await req.user.findListId(req.params.id)
    list = list._doc;
    res.render('writeMessage', {
        title: `Отправить сообщение`,
        list
    });
});

router.post('/send', auth, async (req, res) => {
    let list = await req.user.findListId(req.body.id)
    const message = req.body.sendMessage;
    easyvk({
        token: '8426e7ee14e5047f514f63c1968b642b6edc382b71a514f4ad3e56a39cf6eaede5007522744a53cfd955b'
      }).then(async vk => {
      
        for(user in list.vkUsers){
            let peerId = list.vkUsers[user].profile_id; // ID получателя
      
            /** Отправляем сообщение */
            await vk.call('messages.send', {
              peer_id: peerId,
              message: message,
              /** Получаем случайное число с привязкой к дате*/
              random_id: easyvk.randomId()
            })
        }
      })
    res.redirect('/userLists');
})

module.exports = router;