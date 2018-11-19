/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {



        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username) return res.badRequest();
        if (!req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401);
            return res.send("User not found");
        }

        const match = await sails.bcrypt.compare(req.body.password, user.password);
        if (!match) {
            res.status(401);
            return res.send("Wrong Password");
        }

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;
            req.session.userid = user.id;

            sails.log("Session: " + JSON.stringify(req.session));

            // return res.json(req.session);

            if (req.wantsJSON) {
                return res.redirect('/');
            } else {
                return res.ok("Login successfully");
            }

        });

    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.ok("Log out successfully");

        });
    },

    populate: async function (req, res) {

        if (!['participate'].includes(req.params.association)) return res.notFound();

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await User.findOne(req.params.id).populate(req.params.association);

        if (!model) return res.notFound();

        return res.json(model);

    },

    add: async function (req, res) {


        // Here, the user id should be available as req.params.id, 
        // while the person id should be available as req.params.fk, 
        // as indicated in the route endpoint /user/:id/:association/add/:fk.
        // Exercise: Develop an URL which makes admin supervises Martin.

        if (!['participate'].includes(req.params.association)) return res.notFound();

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        if (!await User.findOne(req.params.id)) return res.notFound();

        if (req.params.association == "participate") {
            if (!await Person.findOne(req.params.fk)) return res.notFound();
        }

        await User.addToCollection(req.params.id, req.params.association).members(req.params.fk);

        return res.ok('Add operation completed.');

    },

    remove: async function (req, res) {

        // Notice the use of removeFromCollection() in line 15. 
        // Again, req.params.id specifies the user id, 
        // while req.params.fk represents the person id.
        // Exercise: Develop the URL so that Kenny no longer works for boss.
        // Please note that for the sake of easy testing, 
        // currently we allow GET method to make changes in the server side database. 
        // It should be avoided and we will fix this next week.

        if (!['participate'].includes(req.params.association)) return res.notFound();

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        if (!await User.findOne(req.params.id)) return res.notFound();

        if (req.params.association == "participate") {
            if (!await Person.findOne(req.params.fk)) return res.notFound();
        }
        // 这是第15行
        await User.removeFromCollection(req.params.id, req.params.association).members(req.params.fk);

        return res.ok('Operation completed.');

    },


    register: async function (req, res) {

        if (req.method == "GET") {
            var models = await User.find();
            return res.view('user/register', { users: models });
        }
        if (typeof req.body.User === "undefined")
            return res.badRequest("Nothing Input");

        await User.create(req.body.User);

        return res.ok("Successfully created!");

    },


};

