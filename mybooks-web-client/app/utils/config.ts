const config = {
  apiUrl: process.env.NODE_ENV === 'development' ? 'https://localhost:4000' : process.env.MYBOOKS_API_URL_PROD || 'https://api.mybooks.fit',
  baseUrl: process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : process.env.MYBOOKS_HOME_URL_PROD || 'https://api.mybooks.fit',
};

export default config;