import {execFileSync} from 'node:child_process';
if(process.env.PORTFOLIO_PRODUCTION_APPROVED!=='yes'){
 console.error('Production deployment is blocked. Review the preview first. After explicit approval, run PORTFOLIO_PRODUCTION_APPROVED=yes npm run deploy.');
 process.exit(1);
}
execFileSync(process.execPath,['scripts/build.mjs','--production'],{stdio:'inherit'});
execFileSync('npx',['wrangler','deploy'],{stdio:'inherit',shell:process.platform==='win32'});
