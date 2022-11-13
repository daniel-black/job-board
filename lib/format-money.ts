const usd = new Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' });

export default function formatMoney(amount: number): string {
  const formatted = usd.format(amount);
  
  if (amount > 100) {
    return formatted.split('.')[0];
  }
  
  return formatted;
}