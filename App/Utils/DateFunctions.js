function formatDate(datetimeString) {
  const datetime = new Date(datetimeString);
  const now = new Date();

  // Check if the date is today
  if (datetime.toDateString() === now.toDateString()) {
    const timeString = datetime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'GMT',
    });
    return `Today at ${timeString}`;
  }

  // Check if the date is yesterday
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  );
  if (datetime.toDateString() === yesterday.toDateString()) {
    const timeString = datetime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'GMT',
    });
    return `Yesterday at ${timeString}`;
  }

  // Format the date as weekday, date, and time
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'GMT',
  };
  return datetime.toLocaleString('en-US', options);
}

const givingDateFormat = dateString => {
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-US',
    options,
  );
  const formattedDateWithoutCommas = formattedDate.replace(/,/g, '');
  return formattedDateWithoutCommas;
};

/* Preview greeting in relation with current time */
const getGreeting = () => {
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;
  if (hours < 12) greet = 'Good Morning';
  else if (hours >= 12 && hours < 17) greet = 'Good Afternoon';
  else if (hours >= 17 && hours < 24) greet = 'Good Evening';
  return greet;
};
function simplifyDate(dateString) {
  const dateObject = new Date(dateString);
  const day = String(dateObject.getUTCDate()).padStart(2, '0');
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
  const year = String(dateObject.getUTCFullYear());
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
function formatTime(dateString) {
  const dateObject = new Date(dateString);
  const hours = dateObject.getUTCHours();
  const minutes = dateObject.getUTCMinutes();

  let formattedHours = hours;
  let ampm = 'AM';

  if (hours > 12) {
    formattedHours = hours - 12;
    ampm = 'PM';
  } else if (hours === 0) {
    formattedHours = 12;
  } else if (hours === 12) {
    ampm = 'PM';
  }

  const formattedTime = `${formattedHours}:${String(minutes).padStart(
    2,
    '0',
  )} ${ampm} GMT`;

  return formattedTime;
}
export default {
  formatDate,
  getGreeting,
  givingDateFormat,
  simplifyDate,
  formatTime,
};
