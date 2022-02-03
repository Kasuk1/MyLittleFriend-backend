const { epaycoSecret, epaycoKey } = require('../../config/index.js');
const ErrorHttp = require('../../middlewares/httpError.middleware.js');
const epayco = require('epayco-sdk-node')({
  apiKey: epaycoSecret,
  privateKey: epaycoKey,
  lang: 'ES',
  test: true
})

const registerCard = async(card) => {
  try{
    const cardRegistered = await epayco.token.create(card);
    return { id: cardRegistered.id, card: cardRegistered.card };
  } catch (error) {
    throw new ErrorHttp(error, 503);
  }
};

const registerCustomer = async(customer) => {
  try{
    const newCustomer = await epayco.customers.create(customer);
    if(newCustomer.status) return newCustomer.data.customerId;
    else throw new ErrorHttp(newCustomer.data.description, 503);
  } catch (error) {
    throw new ErrorHttp(error, 503);
  }
};

const registarCardForCustomer = async(cardCustomer) => {
  try{
    const cardPushed = await epayco.customers.addNewToken(cardCustomer);
    return cardPushed;
  } catch (error) {
    throw new ErrorHttp(error, 503);
  }
};

const registerPayment = async(pay) => {
  try{
    const payment = await epayco.charge.create(pay);
    return payment;
  } catch (error) {
    throw new ErrorHttp(error, 503);
  }
};

module.exports = { registerCard, registerCustomer, registarCardForCustomer, registerPayment }