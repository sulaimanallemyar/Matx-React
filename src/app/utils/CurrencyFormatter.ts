function CurrencyFormatter(num: number | string, symbol = '$') {
  const number = Number(num);

  if (num && num !== 0) {
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, `${symbol}1,`);
  } else {
    return '0';
  }
}

export default CurrencyFormatter;
