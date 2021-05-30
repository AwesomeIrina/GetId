const {Router} = require('express');
const {validationResult} = require('express-validator');
const easyvk = require('easyvk');
const auth = require('../middleware/auth');
const path = require('path');
const { listValidators } = require('../utils/validators');
const router = Router();
const List = require('../models/list');


// router.get('/', (req, res) => {
//     res.render('getList', {
//         title: 'Получить список',
//     })
// });

router.post('/', async (req, res) => {
    let link = req.body['inputVkLink'];
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

        const list = new List({
          vkUsers: vkUsers,
        })
        console.log(list)
          
          try {
            await list.save();
            res.redirect('/showList');
          } catch (error) {
            console.log(error);
          }

        })

        //тут создавай лист и сразу же передавай его на страницу вывода безо всяких сохранений в бд

})

module.exports = router;