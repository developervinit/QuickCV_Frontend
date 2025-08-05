// useGoogleOAuth.js
export const useGoogleOAuth = () => {
  const redirectToGoogleLogin = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: 'https://your-backend.com/oauth2/callback',
      response_type: 'code',
      scope: 'openid profile email',
      access_type: 'offline',
      prompt: 'consent',
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  return { redirectToGoogleLogin };
};
