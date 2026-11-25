const { Telegraf } = require('telegraf');
const sharp = require('sharp');

const bot = new Telegraf(process.env.TOKEN);

bot.on('photo', async (ctx) => {
  try {
    const photo = ctx.message.photo[ctx.message.photo.length - 1];
    const link = await ctx.telegram.getFileLink(photo.file_id);
    const res = await fetch(link.href);
    const buffer = Buffer.from(await res.arrayBuffer());
    const stickerBuffer = await sharp(buffer)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp()
      .toBuffer();
    await ctx.replyWithSticker({ source: stickerBuffer });
  } catch (e) {
    ctx.reply('No pude hacer el sticker, probá con otra foto');
  }
});

bot.launch();
console.log('Bot prendido');
