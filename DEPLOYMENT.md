# Vercel Deployment Guide

This guide will help you deploy this OpenAI Responses starter app to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **OpenAI API Key**: Get your API key from [platform.openai.com](https://platform.openai.com)
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)

## Environment Variables

The following environment variables need to be configured in Vercel:

### Required
- `OPENAI_API_KEY`: Your OpenAI API key

### Optional (for Google Integration)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret  
- `GOOGLE_REDIRECT_URI`: Your Vercel app URL + `/api/google/callback`
  - Example: `https://your-app-name.vercel.app/api/google/callback`

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect it's a Next.js project

### 2. Configure Environment Variables

1. In the Vercel project settings, go to "Environment Variables"
2. Add the required environment variables:
   ```
   OPENAI_API_KEY=your_actual_openai_api_key
   ```
3. If using Google integration, also add:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=https://your-app-name.vercel.app/api/google/callback
   ```

### 3. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at `https://your-app-name.vercel.app`

## Google OAuth Setup (Optional)

If you want to enable Google Calendar and Gmail integration:

1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one

2. **Enable APIs**:
   - Enable Google Calendar API
   - Enable Gmail API

3. **Create OAuth Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Create OAuth 2.0 Client ID for Web application
   - Add your Vercel domain as authorized redirect URI:
     `https://your-app-name.vercel.app/api/google/callback`

4. **Configure Scopes**:
   - `openid`
   - `email`
   - `profile`
   - `https://www.googleapis.com/auth/calendar.events.readonly`
   - `https://www.googleapis.com/auth/gmail.readonly`

## Post-Deployment

### 1. Verify Deployment
- Visit your Vercel URL
- Test the chat functionality
- Verify API routes are working

### 2. Domain Configuration (Optional)
- Add custom domain in Vercel project settings
- Update `GOOGLE_REDIRECT_URI` if using custom domain

### 3. Monitoring
- Monitor function execution in Vercel dashboard
- Check logs for any errors
- Set up alerts if needed

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript errors are fixed

2. **Environment Variables**:
   - Double-check variable names (case-sensitive)
   - Ensure no trailing spaces in values
   - Redeploy after adding new variables

3. **API Route Timeouts**:
   - Function timeout is set to 60 seconds in `vercel.json`
   - Monitor execution times in Vercel dashboard

4. **Google OAuth Issues**:
   - Verify redirect URI matches exactly
   - Check Google Cloud Console for API quotas
   - Ensure all required scopes are configured

## Performance Optimization

### 1. Caching
- API responses are set to no-cache by default
- Modify headers in `vercel.json` if needed

### 2. Function Optimization
- Keep serverless functions lightweight
- Use appropriate timeout settings
- Monitor cold start times

### 3. Static Assets
- Next.js automatically optimizes static assets
- Images are optimized by Vercel Edge Network

## Security Considerations

1. **Environment Variables**:
   - Never commit `.env` files to Git
   - Use Vercel's encrypted environment variables
   - Rotate API keys regularly

2. **CORS**:
   - Configure CORS headers if needed
   - Restrict origins in production

3. **Rate Limiting**:
   - Consider implementing rate limiting for API routes
   - Monitor usage to prevent abuse

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

## Support

For deployment issues:
1. Check Vercel build logs
2. Review function logs in Vercel dashboard
3. Test locally with production environment variables
4. Consult Vercel documentation and community forums
