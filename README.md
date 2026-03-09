# Flow JSON Preview & Tester

Test and validate template message flows that require dynamic data outside of WhatsApp. 
Minus the 10 second timeouts!


## Motivation
Debugging WhatsApp Flows shouldn't require a deploy.

This tool replicates the in-app Flow previewer so you can test, debug and iterate without deploying - and without needing account access. 

Point it at your local service via a tunnel (e.g ngrok) and test your flows.

## Quick Start
To run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
