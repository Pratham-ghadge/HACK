import Contact from "../Model/contact-model.js";

export const contact = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    await Contact.create({ username, email, message });
   return res.status(200).json({ message: "message send successfully " });
  } catch (error) {
    return res.status(500).json({message: "message not delivered"})
  }
};
