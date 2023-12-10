export function responseError(message?: string, data?: string) {
  return {
    success: false,
    ...(message && { message: message }),
    ...(data && { data: data }),
  };
}
