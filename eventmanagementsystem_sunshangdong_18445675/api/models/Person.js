/**
 * Person.js 
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

    eventName: {
      type: "string",
      required: true
    },

    shortDescription: {
      type: "string"
    },

    fullDescription: {
      type: "string"
    },

    imageURL: {
      type: "string"
    },

    organizer: {
      type: "string"
    },

    eventDate: {
      type: 'string',
      columnType: 'date',
      required: true
    },

    time: {
      type: "string"
    },

    startDate: {
      type: 'string',
      columnType: 'date'
    },

    endDate: {
      type: 'string',
      columnType: 'date'
    },

    quota: {
      type:'number'
    },

    venue: {
      type: "string"
    },
  
    isHighlight: {
      type: "string",
      enum: ['0', '1'],
      defaultsTo: '0'
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    belong: {
      collection: 'User',
      via: 'participate'
    },

  },

  getInvalidIdMsg: function (opts) {

    if (typeof opts.id === "undefined" || isNaN(parseInt(opts.id)))
      return "Event id incorrect.";

    return null;        // falsy

  },
};

