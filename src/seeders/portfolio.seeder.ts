// eslint-disable-next-line node/no-unpublished-import
import {name, image, lorem} from 'faker';
import Portfolio from '../api/models/portfolio';
import {mapper} from '../api/constants';

const PortfolioSeeder = async () => {
  console.log('seeding portfolios');
  const totalPortfolios = process.env.TOTAL_SEED || 100;
  //   let batch = [] as Portfolio[];
  for (let i = 0; i <= totalPortfolios; i++) {
    const portfolio = Object.assign(new Portfolio(), {
      description: lorem.paragraphs(),
      firstName: name.firstName(),
      lastName: name.lastName(),
      profileImage: image.people(),
      twitterProfile: '', //TODO
    });

    await mapper.put(portfolio);

    // batch = [...batch, portfolio];

    //TODO: use as batch
    // if (i % 25 === 0 || i === totalPortfolios) {
    //   const r = await mapper.batchPut(batch);
    //   console.log(r);
    //   batch = [];
    // }
  }
};

export default PortfolioSeeder;
