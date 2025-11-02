export const publicDefine = Object.fromEntries(
  Object.entries(process.env)
    .filter(([key]) => key.startsWith('WS_PUBLIC_'))
    .map(([key, value]) => [
      `process.env.${key}`,
      JSON.stringify(value),
    ])
    .filter(([_, value]) => value !== undefined),
) as Record<string, string>;
