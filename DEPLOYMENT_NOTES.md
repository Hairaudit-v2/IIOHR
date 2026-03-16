# Deployment Notes

## Vercel target

Deploy the main IIOHR website from the repository root.

- Root Directory: repo root
- Framework Preset: `Other`
- Build Command: blank
- Output Directory: blank

The `iiohr-next/` folder is a separate Next.js app and should only be deployed by a separate Vercel project whose Root Directory is set to `iiohr-next`.

## Tracked dependency cleanup

This repository currently has tracked dependency files under `node_modules`, which should be removed from git tracking before relying on `.gitignore` alone.

Run:

```bash
git rm -r --cached node_modules
git rm -r --cached iiohr-next/node_modules
git rm -r --cached iiohr-next/.next
git add .
git commit -m "Clean repo for Vercel deployment"
```
