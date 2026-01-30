export const getUserLocalStorage = () => {
   try {
      const userData = localStorage.getItem("userProfile");
      if (userData) {
         const dataUserLocalstorage = JSON.parse(userData);
         return dataUserLocalstorage;
      }
   } catch (error) {
      return console.error(
         "Failed to parse user data from localStorage",
         error,
      );
   }
};

// console.log("getUserLocalStorage: ", getUserLocalStorage());
