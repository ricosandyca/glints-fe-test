export function humanizeFirebaseErrorMessage(msg: string): string {
  return (
    msg
      // delete firebase text
      .replace(/^firebase:/gi, '')
      // delete error code
      .replace(/\(.*\).$/gi, '')
      // trim spaces
      .trim()
  );
}
