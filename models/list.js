const {Schema, model} = require('mongoose');

const list = new Schema({
    vkUsers: {
        type: Array,
        required: true,
    },
})

module.exports = model('List', list);












// const {v4 : uuidv4} = require('uuid');
// const fs = require('fs');
// const path = require('path');
// const { rejects } = require('assert');
// const { Console } = require('console');

// class List{
//    constructor(title, vkUsers){
//        this.title = title;
//        this.vkUsers = vkUsers;
//        this.id = uuidv4();
//    } 

//    toJSON(){
//        return ({
//            title: this.title,
//            vkUsers: this.vkUsers,
//            id: this.id,
//        })
//    }

//    static async remove(id){
//        let lists = await List.getAll();

//        if(lists.find(l => l.id === id)){
//            lists = lists.filter(l => l.id != id);
//        }

//        return new Promise((resolve, reject) => {
//         fs.writeFile(
//          path.join(__dirname, '..', 'data', 'lists.json'),
//          JSON.stringify(lists),
//          (error) => {
//              if(error){
//                  reject(error);
//              }else{
//                  resolve(lists);
//              }
//          }
//      )
//  }); 
       


//    }

//    static async update(list){
//        const lists = await List.getAll();
//        const idx = lists.findIndex(l => l.id === list.id);
//        lists[idx] = list;


//        return new Promise((resolve, reject) => {
//         fs.writeFile(
//          path.join(__dirname, '..', 'data', 'lists.json'),
//          JSON.stringify(lists),
//          (error) => {
//              if(error){
//                  reject(error);
//              }else{
//                  resolve();
//              }
//          }
//      )
//  }); 

// }

//    //сохраняем в бд новый список
//    async save() {
//        const lists = await List.getAll();
//        lists.push(this.toJSON());

//        return new Promise((resolve, reject) => {
//            fs.writeFile(
//             path.join(__dirname, '..', 'data', 'lists.json'),
//             JSON.stringify(lists),
//             (error) => {
//                 if(error){
//                     reject(error);
//                 }else{
//                     resolve();
//                 }
//             }
//         )
//     });
//    }

//    //получаем всё содержимое базы данных
//    static getAll() {
//        return new Promise((resolve, reject) => {
//            fs.readFile(
//                path.join(__dirname,'..', 'data', 'lists.json'),
//                 'utf-8',
//                 (error, content) => {
//                     if(error) {
//                         reject(error);
//                 }else{
//                     resolve(JSON.parse(content));
//                 }
//             }
//         )
//        })
//    }

//    static async getById(id){
//        const list = await List.getAll();

//        return list.find( l => l.id === id);
//    }
// }

// module.exports = List;