import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      // Custom dev-server sync plugin to update codebase state from UI edits
      {
        name: 'sync-portfolio-codebase',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.method === 'POST' && req.url === '/api/sync-portfolio-codebase') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  const { videos, clients, reels } = data;

                  if (videos) {
                    const filePath = path.resolve(process.cwd(), 'src/components/YoutubePortfolio.tsx');
                    let content = fs.readFileSync(filePath, 'utf-8');
                    // Find INITIAL_YOUTUBE_VIDEOS array and replace it cleanly on disk!
                    const regex = /const INITIAL_YOUTUBE_VIDEOS:\s*YoutubeVideoItem\[\]\s*=\s*\[[\s\S]*?\];/;
                    if (regex.test(content)) {
                      const newArrayStr = `const INITIAL_YOUTUBE_VIDEOS: YoutubeVideoItem[] = ${JSON.stringify(videos, null, 2)};`;
                      content = content.replace(regex, newArrayStr);
                      fs.writeFileSync(filePath, content, 'utf-8');
                    }
                  }

                  if (clients) {
                    const filePath = path.resolve(process.cwd(), 'src/components/Clients.tsx');
                    let content = fs.readFileSync(filePath, 'utf-8');
                    // Find INITIAL_CLIENTS array and replace it cleanly on disk!
                    const regex = /const INITIAL_CLIENTS:\s*ClientItem\[\]\s*=\s*\[[\s\S]*?\];/;
                    if (regex.test(content)) {
                      const newArrayStr = `const INITIAL_CLIENTS: ClientItem[] = ${JSON.stringify(clients, null, 2)};`;
                      content = content.replace(regex, newArrayStr);
                      fs.writeFileSync(filePath, content, 'utf-8');
                    }
                  }

                  if (reels) {
                    const filePath = path.resolve(process.cwd(), 'src/components/ReelsPortfolio.tsx');
                    let content = fs.readFileSync(filePath, 'utf-8');
                    // Find DEFAULT_REELS array and replace it cleanly on disk!
                    const regex = /const DEFAULT_REELS:\s*ReelItem\[\]\s*=\s*\[[\s\S]*?\];/;
                    if (regex.test(content)) {
                      const newArrayStr = `const DEFAULT_REELS: ReelItem[] = ${JSON.stringify(reels, null, 2)};`;
                      content = content.replace(regex, newArrayStr);
                      fs.writeFileSync(filePath, content, 'utf-8');
                    }
                  }

                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, message: 'Source code updated successfully! You can now download the ZIP and deploy to Netlify.' }));
                } catch (err: any) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: false, error: err.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
