import Portfolio from '../models/portfolio';
import {mapper} from '../constants';

export const viewPortfolio = async (id: Portfolio['id']) => {
  try {
    const portfolio = new Portfolio();
    portfolio.id = id;
    const result = await mapper.get(portfolio);
    console.log(portfolio, result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updatePortfolio = async (
  params: Pick<Portfolio, 'id'> & Partial<Omit<Portfolio, 'id'>>
) => {
  let portfolio = new Portfolio();
  portfolio.id = params.id;
  portfolio = {...portfolio, ...params, updatedAt: new Date()};
  return await mapper.update(portfolio);
};
