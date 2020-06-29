const moment = require('moment');
formatMessage = (user, message)=>{
  return{
      user,
      message,
      time:moment().format('h:mm a')
  }
}

module.exports = formatMessage;