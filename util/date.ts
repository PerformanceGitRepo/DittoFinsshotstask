export function formatDateLabel(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0'); 
  const month = date.toLocaleDateString('en-US', { month: 'short' });  
  const year = date.toLocaleDateString('en-US', { year: '2-digit' });
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

  return `${weekday} ${month} ${day}`;
}