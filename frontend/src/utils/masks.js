const maskDate = (value) => {
const date = new Date(value);
if (isNaN(date.getTime())) {
    return 'Data inválida';
}
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});
return dateFormatter.format(date);
}

const maskCurrency = (value) => {
    const cleaned = (value?.toString() || '0').replace(/\D/g, '');
    const cents = parseInt(cleaned, 10)/100
    const currency = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return currency.format(cents);
  }

const mask = (value, type) => {
const dict = {
    'currency': maskCurrency,
    'date': maskDate
}

return dict[type](value);
}

export { mask };