import { expect } from 'chai';
import { stub } from 'sinon';

import getStatsCommand from '../../commands/getStatsCommand.js';
import MessageScoreModel from '../../mongo/models/messageScore.js';

describe('getStatsCommand', () => {
  let messageScoreStub;

  beforeEach(() => {
    messageScoreStub = stub(MessageScoreModel, 'findMostReactedToMessages');
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

    const result = await getStatsCommand.execute(message);
    expect(result).to.equal('No stats for the current server');
  });

  it('returns top message if data exists', async () => {
    const message = {
      id: 6,
      guild: { id: 3 },
      channel: { id: 4 },
    };
    messageScoreStub.resolves([{
      messageId: message.id,
      guildId: message.guild.id,
      channelId: message.channel.id,
      count: 5,
      content: 'Test message',
    }]);

    const result = await getStatsCommand.execute(message);
    expect(result).to.include('Most reacted to messages in this server:');
    expect(result).to.include('(5 reactions) "Test message"');
    expect(result).to.include('https://discord.com/channels/3/4/6');
  });
});
