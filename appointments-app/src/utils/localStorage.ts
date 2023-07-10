export const getLocalStorage = (item: string) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('session');
    return token;
  }
};

export const setLocalStorage = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('session', token);
  }
};

export const checkLocalStorage = (item: string) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(item);
    return data ? true : false;
  } else return false
};
