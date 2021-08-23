import Portfolio from '../models/portfolio';
import {mapper} from '../constants';

import axios from 'axios';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
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

export const getLastTweetsFromUser = async (
  twitterUserId: string,
  limit = 10
) => {
  try {
    if (
      !process.env.TWITTER_API_KEY ||
      !process.env.TWITTER_API_SECRET ||
      !process.env.TWITTER_ACESS_TOKEN ||
      !process.env.TWITTER_ACESS_TOKEN_SECRET
    )
      throw new Error('Add Twitter credentials to env');

    const oauth = new OAuth({
      consumer: {
        key: process.env.TWITTER_API_KEY,
        secret: process.env.TWITTER_API_SECRET,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto
          .createHmac('sha1', key)
          .update(base_string)
          .digest('base64');
      },
    });

    const requestData = {
      url: `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${twitterUserId}&count=${limit}`,
      method: 'GET',
    };

    const token = {
      key: process.env.TWITTER_ACESS_TOKEN,
      secret: process.env.TWITTER_ACESS_TOKEN_SECRET,
    };

    const res = await axios.get(requestData.url, {
      headers: oauth.toHeader(oauth.authorize(requestData, token)) as any,
    });
    console.log('getLastTwitsFromUser', res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
    //return [];
  }
};
