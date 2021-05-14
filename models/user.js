const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userData: {
        items: [{
            title: {
                type: String,
                required: true,
            },
            vkUsers: {
                type: Array,
                required: true,
            },
        }],
    },
    groupToken: {
        type: String,
    }
});

userSchema.methods.addToAcc = function(list) {
    const clonedItems = this.userData.items; 
    clonedItems.push({
        title: list.title,
        vkUsers: list.vkUsers,
    })

    const newList = {items: clonedItems};

    this.userData = newList;
    return this.save();
} 

userSchema.methods.removeFromLists = function(id){
    let clonedItems = [...this.userData.items]; //копируем массив
    let iterator = 0;
    let arr = new Array();
    for(item in clonedItems){
        if (clonedItems[item]._id.toString() !=  id.toString()){
            arr[iterator] = clonedItems[item];
            iterator +=1;
        }
    }
    
    clonedItems = arr;
    const newList = {items: clonedItems};
    this.userData = newList;
    return this.save();
}


userSchema.methods.findListId = function(id){ //копируем массив
    for(item in this.userData.items){
        if (this.userData.items[item]._id.toString() ===  id.toString()){
            return this.userData.items[item];
        }
    }
}

function wordsCount(names){
    str = names.toString();
    str = str.replace(/[\s.,%]/g, ' ');
    str = str.replace(/(^\s*)|(\s*$)/gi,"");
    str = str.replace(/[ ]{2,}/gi," ");
    str = str.replace(/\n /,"\n");
    return str.split(' ').length;
}


userSchema.methods.update = function(list){

    if(list.first_name == null){
        this.removeFromLists(list.id);
        return;
    }

    let clonedItems = [...this.userData.items];
    let objUser;
    let vkUsers = new Array();
    let index = 0;

    let nameCounter = wordsCount(list.first_name);
    if(nameCounter == 1){
        objUser = {
            first_name: list.first_name,
            last_name: list.last_name,
            profile_id: list.profile_id,
        }
        vkUsers[index] = objUser;
    }else{
        for(let user = 0; user < nameCounter; user++){
            objUser = {
                first_name: list.first_name[user],
                last_name: list.last_name[user],
                profile_id: list.profile_id[user],
            }
            vkUsers[index] = objUser;
            index+=1;
        }
    }

    for(let item in clonedItems){
        if (clonedItems[item]._id.toString() ===  list.id.toString()){
            clonedItems[item].title = list.title;
            clonedItems[item].vkUsers = vkUsers;
        }
    }

    const newList = {items: clonedItems};
    this.userData = newList;
    return this.save();
}

module.exports = model('User', userSchema);