import { expect } from 'chai';
import { stub } from 'sinon';

import getAuthorstatsCommand from '../../commands/getAuthorStatsCommand.js';
import MessageScoreModel from '../../mongo/models/messageScore.js';

describe('getAuthorstatsCommand', () => {
  let messageScoreStub;

  beforeEach(() => {
    messageScoreStub = stub(MessageScoreModel, 'findTopAuthors');
  });

  afterEach(() => {
    messageScoreStub.restore();
  });

  it('returns default message if no data', async () => {
    const message = {
      id: 5,
      guild: { id: 1 },
      channel: { id: 2 },
    };
    messageScoreStub.resolves([]);

    const result = await getAuthorstatsCommand.execute(message);
    expect(result).to.equal('No stats for the current server');
  });

  it('returns top message if data exists', async () => {
    const message = {
      id: 6,
      guild: { id: 3 },
      channel: { id: 4 },
    };
    messageScoreStub.resolves([{
      _id: '23434353',
      totalScore: 15,
    }]);

    const result = await getAuthorstatsCommand.execute(message);
    expect(result).to.include('Top authors in this server:');
    expect(result).to.include('<@23434353>');
  });
});
