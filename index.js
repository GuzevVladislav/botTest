const TelegramApi = require("node-telegram-bot-api")

// require("node-telegram-bot-api")

const token = '6938406459:AAFqkiOMWEoYe8s2Toj6Uimj-Mmc9s2uFRg'

const bot = new TelegramApi(token, {polling: true})


bot.setMyCommands([
    {command: '/start', description: 'started greeting'},
    {command: '/info', description: 'info'},
    {command: '/help', description: 'commands list'},
    {command: '/game', description: 'game'},



])




const chats = 
{

}


const option =
{
    reply_markup: JSON.stringify(
        {
            inline_keyboard: [
                [{text: '1', callback_data: "1" },{text: '2', callback_data: "2" },{text: '3', callback_data: "3" }],
                [{text: '4', callback_data: "4" },{text: '5', callback_data: "5" },{text: '6', callback_data: "8" }],
                [{text: '7', callback_data: "7" },{text: '8', callback_data: "8" },{text: '9', callback_data: "9" }],
                [{text: '0', callback_data: "0" }]

            ]
        }
    )
}


const again_option =
{
    reply_markup: JSON.stringify(
        {
            inline_keyboard: [
                [{text: 'играть снова, again_option', callback_data: "/again" }],
                
            ]
        }
    )
}




const start = () => 
{
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text === '/start')
        {
            return bot.sendMessage(chatId, `Привет ${msg.from.first_name}`)
    
        }
        if(text.toLowerCase()  === 'кто классный?')
        {
            return bot.sendMessage(chatId, `${msg.from.first_name} классная <3`)
    
        }
        if(text === '/help')
        {
            return bot.sendMessage(chatId, `Список комманд: \n/start - начать пользоваться ботом
            `)
    
        }
        if(text === '/game')
        {
            await bot.sendMessage(chatId, `Я загадываю число`);
            const randomNumber = Math.floor(Math.random() * 10);
            chats[chatId] = randomNumber;
            return  bot.sendMessage(chatId, `отгадай чилсо ${randomNumber}`, option);


        }
        
        return bot.sendMessage(chatId, `Я тебя пока не понимаю. /help для списка команд` )
    })
    bot.on('callback_query', async msg =>
    {
         const data = await msg.data;
        const chatId = msg.message.chat.id;


        if(data === '/again')
        {
            await bot.sendMessage(chatId, `Я загадываю число`);
            const randomNumber = Math.floor(Math.random() * 10);
            chats[chatId] = randomNumber;
            return  bot.sendMessage(chatId, `отгадай чилсо ${randomNumber}`, option);

        }

        if (data == chats[chatId])
        {
            return await bot.sendMessage(chatId, `угадал ${chats[chatId]}`, again_option)
        }
        else{
            return await bot.sendMessage(chatId, `попробуй еще раз  ${chats[chatId]}`, again_option)
        }
    })
        
}

start();

