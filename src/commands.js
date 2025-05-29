import { SlashCommandBuilder } from '@discordjs/builders';

export const ttsQuiz = new SlashCommandBuilder()
    .setName('tts-quiz')
    .setDescription('TikTokShopに関するランダムなクイズを出題します');

// サンプルコード
//const hello = new SlashCommandBuilder()
//     .setName('hello')
//     .setDescription('挨拶をします。')
//     .addStringOption(option =>
//         option
//             .setName('language')
//             .setDescription('言語を指定します。')
//             .setRequired(true) //trueで必須、falseで任意
//             .addChoices(
//             	{name:'Japanese', value:'ja'},
//             	{name:'English', value:'en'}
//             )
//     );

export const commands = [ttsQuiz];