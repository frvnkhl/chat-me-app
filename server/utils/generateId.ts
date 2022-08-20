const generateUniqueId = (): string => {
  const dateString = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);

  return `${dateString}-${randomString}`;
};

export { generateUniqueId };
