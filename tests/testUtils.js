import sinon from 'sinon';
import shortid from 'shortid';

export const getShortIdStub = () => {
  let shortIdCounter = 0;

  return sinon
    .stub(shortid, 'generate')
    .callsFake(() => `pseudo_generated_key_${shortIdCounter++}`);
};

export const restoreShortIdStub = (shortIdStub) => {
  shortIdStub.restore();
};
