const formatDate = dateString => {
  const date = new Date(dateString);

  // Format date in "MM|DD|YY" format
  const formattedDate = date.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });

  // Format time in "h:mm a" format
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${formattedDate} at ${formattedTime}`;
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

  simplifyDate,
  formatTime,
};
