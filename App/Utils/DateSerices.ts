import moment from 'moment';

export function formatDate(postedDateString: string) {
  const postedDate = moment(postedDateString);
  const currentDate = moment();
  const timeDifference = currentDate.diff(postedDate, 'hours');

  if (timeDifference < 1) {
    const minutesDifference = currentDate.diff(postedDate, 'minutes');
    // console.log(
    //   `${
    //     minutesDifference === 1
    //       ? `${minutesDifference} minute ago`
    //       : minutesDifference === 0
    //       ? 'Now'
    //       : `${minutesDifference} minutes ago`
    //   } `,
    // );
    return `${
      minutesDifference === 1
        ? `${minutesDifference} minute ago`
        : minutesDifference === 0
        ? 'Now'
        : `${minutesDifference} minutes ago`
    } `;
  } else if (timeDifference <= 24) {
    // console.log(
    //   `${timeDifference} ${timeDifference === 1 ? 'hour' : 'hours'} ago`,
    // );
    return `${timeDifference} ${timeDifference === 1 ? 'hour' : 'hours'} ago`;
  } else if (timeDifference > 24 && timeDifference <= 48) {
    // console.log(`Yesterday at ${postedDate.format('h:mm A')}`);
    return `Yesterday at ${postedDate.format('h:mm A')}`;
  } else if (timeDifference <= 168) {
    // console.log(
    //   `${postedDate.format('dddd')} at ${postedDate.format('h:mm A')}`,
    // );
    return `${postedDate.format('dddd')} at ${postedDate.format('h:mm A')}`;
  } else {
    // console.log(postedDate.format('MM-DD-YY [at] h:mm A'));
    return postedDate.format('MM|DD|YY [at] h:mm A');
  }
}

//  else if (timeDifference < 48) {
//   console.log(`Yesterday at ${postedDate.format('h:mm A')}`);
//   return `Yesterday at ${postedDate.format('h:mm A')}`;
// }
