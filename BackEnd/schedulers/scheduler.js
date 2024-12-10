const cron = require('node-cron');
const Court = require('../models/court.model');
const moment = require('moment-timezone');

//* no use for now
const generateSlots = (startHour = 12, endHour = 3) => {
  const slots = [];
  const today = moment().tz('Africa/Cairo');

  for (let hour = startHour; hour < 24 + endHour; hour++) {
    const startTime = today
      .clone()
      .hour(hour % 24)
      .minute(0)
      .second(0)
      .millisecond(0);
    if (hour >= 24) {
      startTime.add(1, 'day'); // Move to the next day
    }
    const endTime = startTime.clone().add(1, 'hour');

    slots.push({
      startTime: startTime.toDate(),
      endTime: endTime.toDate(),
    });
  }

  return slots;
};

// Schedule task to run at midnight every day
// cron.schedule('0 0 * * *', async () => {
//   try {
//     const courts = await Court.find();
//     await Promise.all(
//       courts.map(async (court) => {
//         court.slots = generateSlots();
//         await court.save();
//       }),
//     );
//     console.log('Slots regenerated for all courts');
//   } catch (error) {
//     console.error('Error regenerating slots:', error);
//   }
// });

module.exports = { generateSlots };
