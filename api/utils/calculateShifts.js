function calculateShifts(start, end) {
  // Parse the start and end times into Date objects
  const startParts = start.split(':');
  const endParts = end.split(':');
  const startDate = new Date(0, 0, 0, startParts[0], startParts[1]);
  const endDate = new Date(0, 0, 0, endParts[0], endParts[1]);

  // Calculate the start time of the first shift
  let currentShiftStart = new Date(startDate);
  currentShiftStart.setMinutes(Math.ceil(startDate.getMinutes() / 30) * 30);

  // Calculate the end time of the last shift
  let currentShiftEnd = new Date(endDate);
  currentShiftEnd.setMinutes(Math.floor(endDate.getMinutes() / 30) * 30);

  // Generate an array of all the available shifts
  const shifts = [];
  while (currentShiftStart <= currentShiftEnd) {
    shifts.push(
      `${currentShiftStart.getHours()}:${currentShiftStart
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    );
    currentShiftStart.setMinutes(currentShiftStart.getMinutes() + 30);
  }

  return shifts;
}

module.exports = { calculateShifts };
