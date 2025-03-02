export const classNames = (
  mainClass: string,
  mods: Record<string, boolean> = {},
  additionalClasses: string[] = [],
): string => {
  const parsedMods = Object.entries(mods)
    .filter((record) => record[1])
    .map(([className]) => className)
    .join(' ');

  const parsedAdditionalClasses = additionalClasses
    .filter((className) => className)
    .join(' ');

  return [mainClass, parsedMods, parsedAdditionalClasses].join(' ').trim();
};
