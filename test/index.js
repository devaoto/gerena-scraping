const Parser = require('../dist').default;

(async () => {
  console.log(
    await Parser.purchase(
      '2337952545',
      25,
      'voucher',
      'BDMB-T-S-00087960 ',
      '5971-1729-1919-4953',
      false
    )
  );
})();
