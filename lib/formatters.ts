const currencyFormatter = new Intl.NumberFormat('ro-RO', {
  style: 'currency',
  currency: 'RON',
  maximumFractionDigits: 0,
});

export function formatCurrencyRON(value: number) {
  if (!Number.isFinite(value)) {
    return currencyFormatter.format(0);
  }
  return currencyFormatter.format(value);
}

export function formatPayTypeSuffix(payType?: string) {
  switch (payType) {
    case 'hourly':
      return '/oră';
    case 'fixed':
      return '/proiect';
    case 'negotiable':
      return '/negociabil';
    default:
      return '';
  }
}

export function formatPayRate(value: number, payType?: string) {
  const suffix = formatPayTypeSuffix(payType);
  return `${formatCurrencyRON(value)}${suffix ? ` ${suffix}` : ''}`;
}
