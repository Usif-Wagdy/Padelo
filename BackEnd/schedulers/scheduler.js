const cron = require('node-cron');
const Court = require('../models/court.model');

const generateSlots = () => {
  const slots = [];
  const startHour = 10; // 10 AM
  const endHour = 2; // 2 AM (next day)

  for (let hour = startHour; hour < 24; hour++) {
    const startTime = new Date();
    startTime.setHours(hour, 0, 0, 0);

    const endTime = new Date();
    endTime.setHours(hour + 1, 0, 0, 0);

    slots.push({
      startTime,
      endTime,
    });
  }

  for (let hour = 0; hour < endHour; hour++) {
    const startTime = new Date();
    startTime.setHours(hour, 0, 0, 0);
    startTime.setDate(startTime.getDate() + 1); // Move to the next day

    const endTime = new Date();
    endTime.setHours(hour + 1, 0, 0, 0);
    endTime.setDate(endTime.getDate() + 1); // Move to the next day

    slots.push({
      startTime,
      endTime,
    });
  }

  return slots;
};

// Schedule task to run at midnight every day
cron.schedule('0 0 * * *', async () => {
  try {
    const courts = await Court.find();
    courts.forEach(async (court) => {
      court.slots = generateSlots();
      await court.save();
    });
    console.log('Slots regenerated for all courts');
  } catch (error) {
    console.error('Error regenerating slots:', error);
  }
});
