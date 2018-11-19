/**
 * User.js 
 * 这个person其实是命名错误了，应该叫event。可是改了太多的变量，改回这个名字实在是太麻烦了。
 * 于是就干脆用这个名字了
 * 
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * User participate Event(Person)!
 * Event(Person) belong User!!!!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * 
 * 
**/

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    username: {
      type: 'string',
      unique: true,
      required: true
    },

    password: {
      type: "string"
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


    role: {
      type: 'string',
      enum: ['admin', 'student', 'visitor'],
      defaultsTo: 'visitor'
    },

    participate: {
      collection: 'Person',
      via: 'belong'
    }



  },

};

