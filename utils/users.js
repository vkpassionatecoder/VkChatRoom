let users = [];

userJoin = (id,username,room)=>{
    const user = {id,username,room};
    users.push(user);
    return user;
}

getUser = (id)=>{

     return users.find(x=>x.id === id);
}
userDisconnect = (id)=>{   
    const index = users.findIndex(user => user.id === id);
    if(index != -1){

       return users.splice(index,1)[0];
    }
}

getUsersByRoom = (room)=>{

      return users.filter(user=>user.room === room);
}

module.exports = {
    userJoin,
    getUser,
    userDisconnect,
    getUsersByRoom
}