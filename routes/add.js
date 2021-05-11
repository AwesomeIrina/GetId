const {Router} = require('express');
const {validationResult} = require('express-validator');
const easyvk = require('easyvk');
const auth = require('../middleware/auth');
const path = require('path');
const { listValidators } = require('../utils/validators');
const router = Router();



router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Сформировать список',
    })
});

router.post('/', auth, listValidators, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('regError', errors.array()[0].msg);
        return res.status(422).render('add',{
          title: 'Сформировать список',
          error: errors.array()[0].msg,
          data: {
            title: req.body.title,
            link: req.body.link,
          },
        })
    }

    let link = req.body['link'];

    //split link on two parts
    link = link.split('wall').pop();
    //get owner and post ids from the part of link
    let ownerId = link.split("_")[0];
    let postId = link.split("_")[1];

    easyvk({
        username: '89234882103',
        password: '27022013gkfnjy',
        sessionFile: path.join(__dirname, '.my-session')
      }).then(async vk => {
      
      
        // делаем запрос на GET api.vk.com/method/getComments
        let vkr = await vk.call('wall.getComments', {
          owner_id: ownerId,
          post_id: postId,
          count: 100,
          sort: 'desc',
          extended: 1,
        });

        let vkUsers = new Array();
        let objUser;
        for(user in vkr['profiles']){
          objUser = {
            first_name: vkr['profiles'][user].first_name,
            last_name: vkr['profiles'][user].last_name,
            profile_id: vkr['profiles'][user].id,
          }
          vkUsers[user] = objUser;
        }

        const list = {
          title: req.body.title,
          vkUsers: vkUsers,
        }
          
        try {
          await req.user.addToAcc(list);
          res.redirect('/userLists');
        } catch (error) {
          console.log(error);
        }

      })

})

module.exports = router;