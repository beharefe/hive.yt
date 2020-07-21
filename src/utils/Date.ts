export function formatDate(date: string | Date): string {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const intlDate = new Intl.DateTimeFormat('en-US', options);

  return intlDate.format(new Date(date));  
}
