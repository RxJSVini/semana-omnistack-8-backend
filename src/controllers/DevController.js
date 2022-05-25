const Dev = require("../models/Dev");
const axios = require('axios');


module.exports = {

    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });
        if (userExists) {
            return res.status(200).json(userExists)
        }

        axios.get(`https://api.github.com/users/${username}`)
            .then(async (response) => {
                const { login, bio, avatar_url } = response.data;
                const dev = await Dev.create({
                    name: response.data.name ? response.data.name : 'AnonymousName',
                    user: login,
                    bio: bio,
                    avatar: avatar_url

                })

                return res.status(200).json(dev)
            })
            .catch((error) => {
                return res.status(500).json({ error: error.message })
            })
    },


    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find()
            .and([
                    { _id: { $ne: user } },
                    { _id: { $nin: loggedDev.likes } },
                    { _id: { $nin: loggedDev.dislikes } },
            ])
        if (!users) {
            return res.send(loggedDev)
        }

        return res.json(users);
    },

}


