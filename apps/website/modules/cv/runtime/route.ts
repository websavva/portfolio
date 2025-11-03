export default defineEventHandler(async (event) => {
  const cvFileArrayBuffer = await fetch(
    `http://localhost:${process.env.PORT}/docs/cv/${event.context.i18n.locale}.pdf`,
    {
      method: 'GET',
    },
  ).then((res) => res.arrayBuffer());

  // Convert ArrayBuffer to Buffer
  const cvFileBuffer = Buffer.from(cvFileArrayBuffer);

  setResponseHeaders(event, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'inline; filename="cv.pdf"',
    'Content-Length': cvFileBuffer.length.toString(),
    'Cache-Control': 'public, max-age=3600',
    'Accept-Ranges': 'bytes',
  });

  return cvFileBuffer;
});
