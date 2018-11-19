/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('person/create');

        if (typeof req.body.Person === "undefined")
            return res.badRequest("Nothing Input");

        await Person.create(req.body.Person);

        return res.ok("Successfully created!");
    },

    // action - index
    index: async function (req, res) {

        var models = await Person.find();
        return res.view('person/index', { persons: models });

    },

    // action - detail
    detail: async function (req, res) {

        var message = Person.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await Person.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('person/detail', { person: model });

    },

    // action - admin
    admin: async function (req, res) {

        var models = await Person.find();
        return res.view('person/admin', { persons: models });

    },

    // action - delete
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var message = Person.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var models = await Person.destroy(req.params.id).fetch(); //fetch();用来删除东西的

        if (models.length == 0) return res.notFound();

        return res.ok("Event Deleted.");

    },
    // action - update
    update: async function (req, res) {

        var message = Person.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        if (req.method == "GET") {

            var model = await Person.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('person/update', { person: model });

        } else {

            if (typeof req.body.Person === "undefined")
                return res.badRequest("Form-data not received.");

            var models = await Person.update(req.params.id).set({
                name: req.body.Person.name,
                age: req.body.Person.age,
                eventName: req.body.Person.eventName,
                shortDescription: req.body.Person.shortDescription,
                fullDescription: req.body.Person.fullDescription,
                imageURL: req.body.Person.imageURL,
                organizer: req.body.Person.organizer,
                eventDate: req.body.Person.eventDate,
                time: req.body.Person.time,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");

        }
    },

    // action - paginate
    paginate: async function (req, res) {

        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const numOfItemsPerPage = 2;

        const qName = req.query.eventName || "";
        const qStartDate = req.query.startDate || "";
        const qEndDate = req.query.endDate || "";


        console.log("qstartdate" + qStartDate + "enddate" + qEndDate);
        var models = await Person.find({
            limit: numOfItemsPerPage,
            skip: numOfItemsPerPage * qPage,

            where: {
                eventName: { contains: qName },
                or: [
                    { eventDate: { '>=': qStartDate } },
                    { eventDate: { '<=': qEndDate } },
                ],
            },
            sort: 'eventName'
        });
        console.log("length:%s", models.length);

        var search = await Person.find({

            where: {
                eventName: { contains: qName },
                or: [
                    { eventDate: { '>=': qStartDate } },
                    { eventDate: { '<=': qEndDate } },
                ],
            },
        });

        var numOfPage = Math.ceil(await search.length / numOfItemsPerPage);
        return res.view('person/paginate', { persons: models, count: numOfPage });
    },

  
    populate: async function (req, res) {

        if (!['belong'].includes(req.params.association)) return res.notFound();
    
        const message = sails.getInvalidIdMsg(req.params);
    
        if (message) return res.badRequest(message);
    
        var model = await Person.findOne(req.params.id).populate(req.params.association);
    
        if (!model) return res.notFound();
    
        return res.json(model);
    
    },

};

