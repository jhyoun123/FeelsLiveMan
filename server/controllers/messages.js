const mongoose = require('mongoose');
const Message = mongoose.model('Message');
const tmi = require('tmi.js');


module.exports = {
  // connects bot to twitch chat and listens for messages in twitch chat
  activate: function(req, res){
    var options = {
      options: {
        debug: true
      },
      connection: {
          cluster: "aws",
          reconnect: true
      },
      identity: {
        username: "FeelsLiveMan",
        password: 'oauth:wsylz5rbgz5bmmkdhzt37wrawbu6gp'
      },
      channels: ["yami_tamashi"]
    }

    var client = new tmi.client(options);
    client.connect();
    client.on("connected", function(address, port){
      client.action("yami_tamashi", "Hello, I am connected to the chat!");
    })
    client.on("chat", function(channel, user, message, self){
      client.action("yami_tamashi", "Your message was: " + message)
      Message.create({"content": message})
    })
    res.redirect('/home')

  },

  index: function(req, res) {
    Message.find({})
      .then((data) => {
        console.log(data);
        res.json(data)
      })
      .catch(err => console.log(err))
  },

  login: function(req, res) {
    console.log(req.body)
    req.session.name = req.body.name
    req.session.complete = false
    console.log(req.session.name)
    res.json(true)
  },

  get_stream: function(req, res) {
    if(req.session.name){
			res.json(req.session.name)
		} else {
			res.status(500).json(false)
		}
  }
}
