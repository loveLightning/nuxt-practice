export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): T {
  let timeoutID: any = null;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as T;
}

export const getFormattedTime = (sunset: number): string => {
  const date = new Date(sunset);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
};
