export const joinPaths = (...paths: string[]): string => {
  return paths.join("/").replaceAll(/\/+/g, "/");
};

export const getFileExtension = (filename: any) => {
  // get file extension
  const extension = filename.split(".").pop();
  return extension;
};
