const Newsletter = require('../models/newsLetter');

// Subscribe to the newsletter
exports.subscribe = async (req, res) => {
    try {
        const { email, name } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        const existing = await Newsletter.findOne({ where: { email } });

        if (existing) {
            if (existing.isSubscribed) {
                return res.status(409).json({ message: 'Email is already subscribed.' });
            } else {
                existing.isSubscribed = true;
                existing.subscribedAt = new Date();
                await existing.save();
                return res.status(200).json({ message: 'Re-subscribed successfully.' });
            }
        }

        const subscriber = await Newsletter.create({
            email,
            name
        });

        res.status(201).json({ message: 'Subscribed successfully.', subscriber });
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Unsubscribe from the newsletter
exports.unsubscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        const subscriber = await Newsletter.findOne({ where: { email } });

        if (!subscriber || !subscriber.isSubscribed) {
            return res.status(404).json({ message: 'Email is not subscribed.' });
        }

        subscriber.isSubscribed = false;
        await subscriber.save();

        res.status(200).json({ message: 'Unsubscribed successfully.' });
    } catch (error) {
        console.error('Error unsubscribing from newsletter:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get all subscribed users
exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.findAll({
            where: { isSubscribed: true },
            attributes: ['id', 'email', 'name', 'subscribedAt']
        });

        res.status(200).json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
