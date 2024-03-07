// Internal imports
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }

};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formatDeFriends = friends.map(
            ({ _id, firstName, lastName, domaine, position, imgChemin }) => {
                return { _id, firstName, lastName, domaine, position, imgChemin };
            }
        );
        res.status(200).send(formatDeFriends);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};


export const addDeleteFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, domaine, position, imgChemin }) => {
                return { _id, firstName, lastName, domaine, position, imgChemin };
            }
        );

        res.status(200).send(formattedFriends);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};


export const serchByDomaine = async (req, res) => {
    try {
        const { domaine } = req.query;

        const users = await User.find({ domaine: { $regex: new RegExp(domaine, 'i') } });

        res.json(users);
    } catch (error) {
        console.error(`Erreur de recherche d'utilisateurs :`, error);
        res.status(500).json({ error: 'Erreur de serveur' });
    }
};

