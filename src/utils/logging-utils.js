export default async function logError(context = null, error, sendMessage = { channel: null }) {
    const appendedContext = context ? `[${context}] error:` : '';
    console.error(appendedContext, error);
    if (error.cause === 'user' && sendMessage.channel) await sendMessage.channel.send(error.message);
}
