import mongoose from "mongoose";
import cron from "node-cron";
import Guest from "./guestModel.js";
import { sendBulkPersonalizedEmails } from "../middlewares/mailMiddleware.js";

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hostName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
  },
  dressCode: {
    type: String,
  },
  mealPreferences: {
    type: Boolean,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  variation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "variation",
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "template",
  },
});

const Event = mongoose.model("events", eventSchema);

export default Event;

cron.schedule("0 0 */3 * * *", async (req, res) => {
  try {
    const currentDate = new Date();
    const eventsNeedingReminders = await Event.find({
      eventDate: { $gt: currentDate }, // Events in the future
    });

    eventsNeedingReminders.forEach(async (event) => {
      const daysDifference = Math.floor(
        (event.eventDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      if (daysDifference % 3 === 0) {
        // Send reminders to guests every three days
        const guestList = await Guest.findOne({ event: event._id });
        const guestsInfo = guestList.guests.map(({ id, email }) => ({
          id,
          email,
        }));
        const ipAddress = req.socket.remoteAddress; // Replace with the actual IP address extraction logic
        const address = ipAddress.replace(/^.*:/, "");
        await sendBulkPersonalizedEmails(event, guestsInfo, address);
      }

      if (daysDifference >= 5) {
        // Send regular reminders to guests when there are 5 or more days left
        const guestList = await Guest.findOne({ event: event._id });
        const phoneNumbers = guestList.guests.map(({ id, phone }) => phone);
        // Implement logic to send regular reminders (e.g., using an SMS service)
        await sendBulkPersonalizedEmails(event, guestsInfo, address);
      }
    });
  } catch (error) {
    console.error("Error sending invitation reminder:", error);
  }
});
