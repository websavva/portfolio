import { ContactDto } from '@@/server/dtos';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (rawBody) => {
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

  return true;
});
