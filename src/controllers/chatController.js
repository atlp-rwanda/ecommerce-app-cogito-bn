import db from '../database/models';
import messageSchema from '../middleware/liveChat.validator';

// handle sending messages to the chat
export const CreatNewMessage = async (req, res) => {
  try {
    // Validate the request body
    const { error } = messageSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { message, sender } = req.body;

    // Create the new message
    const Newmessage = await db.Chats.create({
      message,
      sender,
    });

    // Broadcast the message to all connected clients
    res.status(201).json({
      status: 201,
      data: Newmessage,
      message: req.t('message_sent'),
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message, data: {} });
  }
};

// getting all messages
export const listAllMessages = async (req, res) => {
  try {
    const allMessages = await db.Chats.findAll({});

    if (allMessages.length === 0) {
      res.status(200).json({
        status: 200,
        data: allMessages,
        message: req.t('no_message_found'),
      });
    } else {
      res.status(200).json({
        status: 200,
        data: allMessages,
        message: req.t('messages_retrieved'),
      });
    }
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message, data: {} });
  }
};
