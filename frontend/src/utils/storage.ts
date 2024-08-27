export const getUsersFromStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  
  export const saveUserToStorage = (user: { name: string; email: string; phone: string; password: string }) => {
    const users = getUsersFromStorage();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };
  