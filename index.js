import openai from "./config/openai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    // const response = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo-0301',
    //     messages: [{"role": "user", "content": "What is the capital of India?"}],
    //     max_tokens: 30
    // });

    // console.log(response.choices[0].message.content);

    console.log(colors.bold.green('Welcome to the ChatBot Program!'));
    console.log(colors.bold.green('You can start chatting with the bot.'));
    
    const chatHistory = [];

    while (true) {
        const input = readlineSync.question(colors.rainbow('You: '));

        try {
            const messages = chatHistory.map(([role, content]) => ({ role, content }));
            
            messages.push({ role: 'user', content: input });
            //Call the API with user input
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo-0301',
                messages: messages,
                max_tokens: 30
            });

            const output = response.choices[0].message.content;

            if (input.toLowerCase() === 'exit') {
                console.log(colors.blue('ChatGPT: ') + output);
                return;
            }

            console.log(colors.green('Bot: ') + output)

            chatHistory.push(['user', input]);
            chatHistory.push(['assistant', output]);
        } catch (error) {
            console.error(colors.red(error));
        }
    }
}

main();