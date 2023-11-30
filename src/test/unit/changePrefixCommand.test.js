import { expect } from 'chai'; 
import { stub } from 'sinon';

import changePrefixCommand from '../../commands/changePrefixCommand.js';
import ServerModel from '../../mongo/models/server.js';

describe('changePrefixCommand', () => {
    let serverStub;

    beforeEach(() => {
        serverStub = stub(ServerModel, 'createOrUpdateServerPrefix');
    });

    afterEach(() => {
        serverStub.restore();
    });

    it('returns a successful message after changing the prefix', async () => {
        const prefixChanged = '!';
        const message = {
            id: 5,
            guild: { id: 1 },
            channel: { id: 2 },
            content: 'change-prefix ' + prefixChanged,
            author: {
                username: 'Some user'
            }
        };
        serverStub.resolves(prefixChanged);

        const result = await changePrefixCommand.execute(message);
        expect(result).to.equal(`Prefix was changed to '${prefixChanged}'`);
    });

    it('throws error if the message does not contain the prefix', async () => {
        const message = {
            id: 6,
            guild: { id: 3 },
            channel: { id: 4 },
            content: 'change-prefix',
            author: {
                id: 12,
                username: 'Some user'
            }
        };
        serverStub.resolves();

        try {
            await changePrefixCommand.execute(message);
            expect.fail('Expected error was not thrown');
        } catch (err) {
            expect(err.message).to.equal('Prefix provided is not valid');
        }
    });
});