declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development',
      API_BASEURL: string,
      PORT: string,
      SUPABASE_REF: string,
      SUPABASE_URL: string,
      SUPABASE_ANON_KEY: string,
      SUPABASE_ACCESS_TOKEN: string,
      JWT_SECRET: string,
      JWT_ALGORITHM: string,
      JWT_EXPIRE_HOURS: string
    }
  }
}

export {}