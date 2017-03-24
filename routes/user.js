'use strict';

const Boom = require('boom');
const Joi = require('joi');

exports.register = function(server, options, next) {

    const db = server.app.db;

    server.route({
        method: 'GET',
        path: '/api/user',
        handler: function(request, reply) {

            db.users.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        }
    });

    server.route({
        method: 'GET',
        path: '/api/user/{id}',
        handler: function(request, reply) {

            db.users.findOne({
                _id: request.params.id
            }, (err, doc) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (!doc) {
                    return reply(Boom.notFound());
                }

                reply(doc);
            });

        }
    });

    server.route({
        method: 'POST',
        path: '/api/user',
        handler: function(request, reply) {

            const user = request.payload;

            //Create an id
            user._id = Math.floor( (Math.random()*9000) + 999 );

            db.users.save(user, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(user);
            });
        },
        config: {
            validate: {
                payload: {
                    name: Joi.string().alphanum().required(),
                    email: Joi.string().email(),
                    age: Joi.number().integer(),
                    topics: Joi.array().items(Joi.string()),
                }
            }
        }
    });

    server.route({
        method: 'PATCH',
        path: '/api/user/{id}',
        handler: function(request, reply) {

            db.users.update({
                _id: request.params.id
            }, {
                $set: request.payload
            }, function(err, result) {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                reply().code(204);
            });
        },
        config: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().alphanum().required(),
                    email: Joi.string().email(),
                    age: Joi.number().integer(),
                    topics: Joi.array().items(Joi.string()),
                }).required().min(1)
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/api/user/{id}',
        handler: function(request, reply) {

            db.users.remove({
                _id: request.params.id
            }, function(err, result) {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                reply().code(204);
            });
        }
    });


    return next();
};

exports.register.attributes = {
    name: 'routes-user'
};
