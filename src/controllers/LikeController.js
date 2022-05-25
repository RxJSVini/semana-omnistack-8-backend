const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        try {
            const { user } = req.headers;
            const { devId } = req.params;
            const loggedDev = await Dev.findById(user);
            const targetDev = await Dev.findById(devId);
            if (!targetDev) {
                return res.status(404).json({ message: "Dev not exists" })
            }
            if (targetDev.likes.includes(loggedDev._id)) {
                const loggedSocket = req.connectedUsers[user];
                const targetSocket = req.connectedUsers[devId];
                console.log(req.connectedUsers)
                if (loggedSocket) {

                    req.io.to(loggedSocket).emit("match", targetDev)
                }
                if (targetSocket) {

                    req.io.to(targetSocket).emit("match", loggedSocket)
                }
            }
            loggedDev.likes = []
            // loggedDev.likes.push(targetDev._id);
            await loggedDev.save();

            return res.json(loggedDev)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}