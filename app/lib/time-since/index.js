// @flow
/**
 * Shows how much time has passed since now and a given timestamp
 */
import _ from 'lodash';

const timeSince = (timestamp: number): string => {
  const now = new Date();

  const secondsPast = (_.now() - timestamp) / 1000;

  let result:string = '';

  if (secondsPast < 60) {
    result = `${parseInt(secondsPast, 10)} s ago`;
  }
  else if (secondsPast < 3600) {
    result = `${parseInt(secondsPast / 60, 10)} m ago`;
  }
  else if (secondsPast <= 86400) {
    result = `${parseInt(secondsPast / 3600, 10)} h ago`;
  }

  if (secondsPast > 86400) {
    const dmyTimestamp = new Date(timestamp);
    const day = dmyTimestamp.getDate();
    // $FlowFixMe
    const monthArray:Array<string> = dmyTimestamp.toDateString().match(/ [a-zA-Z]*/);
    const month = monthArray[0].trim();
    const year = dmyTimestamp.getFullYear() === now.getFullYear() ? '' : ` ${dmyTimestamp.getFullYear()}`;
    result = `on ${day} ${month} ${year}`;
  }

  return `${result}`;
};

export default timeSince;
