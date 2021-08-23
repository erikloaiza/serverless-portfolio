import Portfolio from '../models/portfolio';
import {mapper} from '../constants';

/**
 * gets portfolio from database
 *
 * @param id portfolio id
 * @returns portfolio
 */
export const viewPortfolio = async (id: Portfolio['id']) => {
  try {
    const portfolio = new Portfolio();
    portfolio.id = id;
    const result = await mapper.get(portfolio);
    return result;
  } catch (error) {
    return null;
  }
};

/**
 * updates portfolio from database
 *
 * @param params portfolio params
 * @returns portfolio
 */
export const updatePortfolio = async (
  params: Pick<Portfolio, 'id'> & Partial<Omit<Portfolio, 'id'>>
) => {
  try {
    let portfolio = await viewPortfolio(params.id);
    if (!portfolio) return null;

    params.createdAt && delete params.createdAt;
    params._v && delete params._v;

    portfolio = Object.assign(portfolio, {...params, updatedAt: new Date()});

    const result = await mapper.update(portfolio);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
