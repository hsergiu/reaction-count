import { expect } from 'chai'; 

import helpCommand from '../../commands/helpCommand.js';
import { getCommandsAvailable  } from '../../initializeCommands.js';

describe('helpCommand', () => {
    it('returns the list of commands with description', async () => {
        const commands = getCommandsAvailable();
        const result = await helpCommand.execute(commands);

        for (const command of commands) {
            expect (result).to.include(command.description);
        }
    });
});