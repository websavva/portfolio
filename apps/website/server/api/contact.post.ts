import { ContactDto } from '#server/dtos';

export default defineEventHandler(async (event) => {
  const { name, email, company, message } =
    await readValidatedBody(event, (rawBody) => {
      const result = ContactDto.safeParse(rawBody);

      if (!result.success) {
        const { errors } = result.error;

        throw createError({
          statusCode: 400,
          statusMessage:
            errors[0]?.message || 'Validation failed',
        });
      }

      return result.data;
    });

  const telegramMessage = [
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Company:</b> ${escapeHtml(company)}`,
    `<b>Message:</b>`,
    `<blockquote>${escapeHtml(message)}</blockquote>`,
  ].join('\n');

  await $fetch(
    `https://api.telegram.org/bot${process.env
      .WS_PRIVATE_TELEGRAM_BOT_API_KEY!}/sendMessage`,
    {
      method: 'POST',
      body: {
        chat_id:
          process.env.WS_PRIVATE_TELEGRAM_BOT_CHAT_ID!,
        text: telegramMessage,
        parse_mode: 'HTML',
      },
    },
  );

  return true;
});
