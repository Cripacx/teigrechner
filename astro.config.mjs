// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' && Boolean(repositoryName);
const isUserPage = repositoryName?.endsWith('.github.io') ?? false;

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io` : undefined,
  base: isGitHubPages && !isUserPage ? `/${repositoryName}` : '/',
  integrations: [vue()],

  vite: {
    plugins: [tailwindcss()]
  }
});