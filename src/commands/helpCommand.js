export default {
    value: 'help',
    description: 'shows the list of commands available for this bot',
    execute: (commandsList) => {
        const rowSeparator = '-'.repeat(20);
        const commandsInfoString = commandsList.reduce(
            (accumulator, current) =>
                accumulator + `Command: ${current.value}\nDescription: ${current.description}\n${rowSeparator}\n`,
            ''
        );

        return commandsInfoString;
    }
};
