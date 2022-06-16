const IMAGEKIT_URL = "https://ik.imagekit.io/lensterimg";

const imagekitURL = (url: string, name?: string): string => {
  return name
    ? `${IMAGEKIT_URL}/tr:n-${name},tr:di-placeholder.webp/${url}`
    : `${IMAGEKIT_URL}/tr:di-placeholder.webp/${url}`;
};

export default imagekitURL;
