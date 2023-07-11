export const checkPathname = (pathname: string) => {
  return (
    pathname !== '/login' &&
    pathname !== '/register' &&
    pathname !== '/recover' &&
    pathname !== '/' &&
    !pathname.includes('passwordChange')
  );
};
