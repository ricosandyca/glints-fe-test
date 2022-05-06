export function validateFileImage(file: File | null | undefined) {
  // if no image provided
  if (!file) return false;
  // validate file type
  if (!/^image.+/.test(file.type)) return false;
  return true;
}
