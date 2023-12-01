import { expect } from 'chai';
import { stub } from 'sinon';

import clearStatsCommand from '../../commands/clearStatsCommand.js';
import MessageScoreModel from '../../mongo/models/messageScore.js';
import ServerModel from '../../mongo/models/server.js';

describe('clearStatsCommand', () => {
  let messageScoreStub; let
    serverStub;

  beforeEach(() => {
    messageScoreStub = stub(MessageScoreModel, 'deleteMany');
    serverStub = stub(ServerModel, 'deleteMany');
  });

  afterEach(() => {
    messageScoreStub.restore();
    serverStub.restore();
  });

  it('returns a successful message after clearing stats', async () => {
    const message = {
      id: 5,
      guild: { id: 1 },
      channel: { id: 2 },
      author: {
        username: 'Some user',
      },
    };
    messageScoreStub.resolves();
    serverStub.resolves();

    const result = await clearStatsCommand.execute(message);
    expect(result).to.equal('Stats and configurations cleared');
  });

  it('throws error if the user is not superadmin', async () => {
    const message = {
      id: 6,
      guild: { id: 3 },
      channel: { id: 4 },
      author: {
        id: 12,
        username: 'Some user',
      },
    };
    messageScoreStub.resolves();
    serverStub.resolves();

    try {
      await clearStatsCommand.execute(message);
      expect.fail('Expected error was not thrown');
    } catch (err) {
      expect(err.message).to.equal(`${message.author.username} does not have permission to clear stats`);
    }
  });
});
