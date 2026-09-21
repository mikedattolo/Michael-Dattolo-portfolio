"""Native browser/HTTP checks for the built site. Requires Playwright + Chromium.
Run: python -m pip install playwright==1.55.0; python -m playwright install chromium
Then: python tests/browser.py. No production deployment or external form submission.
"""
import hashlib,json,os,subprocess,time,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'qa-output';OUT.mkdir(exist_ok=True)
SITE=json.loads((ROOT/'content/site.json').read_text())
PROJECTS=json.loads((ROOT/'content/projects.json').read_text())
ROUTES=['/','/work/','/about/','/resume/','/contact/','/work/archive/']+['/work/'+p['slug']+'/' for p in PROJECTS]
BASE='http://127.0.0.1:4173'
results={'route_checks':[],'interaction_checks':[],'errors':[],'screenshots':[]}
server=subprocess.Popen(['node','scripts/serve.mjs'],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
def record(name,fn):
 try:fn();results['interaction_checks'].append({'name':name,'passed':True})
 except Exception as e:results['errors'].append({'name':name,'error':str(e)})
def expect(condition,message):
 if not condition:raise AssertionError(message)
try:
 for i in range(40):
  try:urllib.request.urlopen(BASE,timeout=1);break
  except Exception:time.sleep(.2)
 with sync_playwright() as p:
  options={'headless':True}
  if os.getenv('CHROMIUM_PATH'):options['executable_path']=os.environ['CHROMIUM_PATH']
  browser=p.chromium.launch(**options)
  for width,height in [(320,800),(390,844),(768,1024),(1440,1000)]:
   context=browser.new_context(viewport={'width':width,'height':height},reduced_motion='reduce')
   page=context.new_page()
   errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   for route in ROUTES:
    try:
     response=page.goto(BASE+route,wait_until='networkidle',timeout=20000)
     expect(response.status==200,f'{route} returned {response.status}')
     expect(page.locator('h1').count()==1,'Not exactly one h1')
     expect(not page.evaluate('document.documentElement.scrollWidth > innerWidth'),'Horizontal overflow')
     for img in page.locator('img').all():
      img.scroll_into_view_if_needed();img.evaluate('(i)=>i.decode()')
     broken=page.locator('img').evaluate_all('(imgs)=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)')
     expect(not broken,'Broken images: '+str(broken))
     page.evaluate('scrollTo(0,0)')
     if width in [390,1440]:
      filename=(route.strip('/').replace('/','-') or 'home')+f'-{width}.png'
      page.screenshot(path=str(OUT/filename),full_page=True,animations='disabled')
      results['screenshots'].append(filename)
     results['route_checks'].append({'route':route,'width':width,'status':response.status,'passed':True})
    except Exception as e:results['errors'].append({'route':route,'width':width,'error':str(e)})
   expect(not errors,'Browser JavaScript errors: '+str(errors))
   context.close()
  context=browser.new_context(viewport={'width':1440,'height':1000},permissions=['clipboard-read','clipboard-write'])
  page=context.new_page()
  def navigation():
   page.goto(BASE);page.get_by_role('link',name='View My Work',exact=True).click();page.wait_for_url(BASE+'/work/')
   page.locator('.case-link').first.click();page.wait_for_url(BASE+'/work/5-axis-3d-printing-waste-reduction/')
   page.reload(wait_until='networkidle');expect('Reducing Plastic Waste' in page.locator('h1').inner_text(),'Case refresh failed')
   page.get_by_role('navigation',name='Main navigation').get_by_role('link',name='Contact',exact=True).click();page.wait_for_url(BASE+'/contact/')
   expect(page.locator('.contact-email').get_attribute('href')=='mailto:'+SITE['email'],'Wrong mailto')
   expect(page.locator('main a[href="'+SITE['linkedin']+'"]').count()==1,'Wrong LinkedIn')
  record('native navigation, case refresh, contact destinations',navigation)
  def resume_download():
   page.goto(BASE+'/resume/')
   with page.expect_download() as dl:page.locator('main a[download]').click()
   download=dl.value;expect(download.suggested_filename=='Michael_Dattolo_Resume_2026.pdf','Wrong filename')
   saved=OUT/'download-test.pdf';download.save_as(saved)
   expect(saved.read_bytes()==(ROOT/'assets/documents/Michael_Dattolo_Resume_2026.pdf').read_bytes(),'PDF bytes changed')
   response=context.request.get(BASE+SITE['resume']);expect(response.headers['content-type']=='application/pdf','Wrong MIME type')
   saved.unlink()
  record('native résumé download, filename, MIME and exact bytes',resume_download)
  def clipboard():
   page.goto(BASE+'/contact/');page.get_by_role('button',name='Copy email address').click()
   page.wait_for_function("document.querySelector('[data-copy-status]').textContent==='Email address copied.'")
   expect(page.evaluate('navigator.clipboard.readText()')==SITE['email'],'Clipboard text differs')
  record('actual clipboard copy',clipboard)
  def fallback():
   page.goto(BASE+'/contact/');page.evaluate("Object.defineProperty(navigator,'clipboard',{value:undefined,configurable:true})")
   page.get_by_role('button',name='Copy email address').click()
   expect('Copy is unavailable' in page.locator('[data-copy-status]').inner_text(),'Fallback falsely reports success')
  record('honest copy failure fallback',fallback)
  context.close()
  context=browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce');page=context.new_page()
  def keyboard():
   page.goto(BASE);page.keyboard.press('Tab');expect(page.locator('.skip').evaluate('(e)=>e===document.activeElement'),'Skip link not first')
   page.keyboard.press('Enter');expect(page.url.endswith('#main'),'Skip destination wrong')
   menu=page.get_by_role('button',name='Menu',exact=True);menu.focus();page.keyboard.press('Enter')
   expect(menu.get_attribute('aria-expanded')=='true','Menu not expanded')
   page.keyboard.press('Tab');expect(page.locator('#main-nav a').first.evaluate('(e)=>e===document.activeElement'),'Nav keyboard sequence wrong')
   page.keyboard.press('Escape');expect(menu.get_attribute('aria-expanded')=='false','Escape did not close')
   expect(menu.evaluate('(e)=>e===document.activeElement'),'Escape did not restore focus')
   expect(page.evaluate('getComputedStyle(document.documentElement).scrollBehavior')=='auto','Reduced motion not honored')
   expect(menu.evaluate('(e)=>getComputedStyle(e).outlineStyle')!='none','Keyboard focus outline missing')
  record('keyboard skip/menu/Escape/focus and reduced motion',keyboard)
  context.close()
  context=browser.new_context(java_script_enabled=False,viewport={'width':390,'height':844});page=context.new_page()
  def no_js():
   for route in ROUTES:
    page.goto(BASE+route,wait_until='domcontentloaded')
    expect(page.locator('#main-nav').is_visible(),'Navigation missing without JS')
    expect(page.locator('h1').is_visible(),'Content missing without JS')
  record('all pages available without JavaScript',no_js)
  context.close();browser.close()
 # Server-side checks are separate from browser interaction.
 for source,target in SITE['redirects'].items():
  record('redirect '+source,lambda source=source,target=target:expect(urllib.request.urlopen(BASE+source).url==BASE+target,'Redirect target differs'))
 def unknown():
  try:urllib.request.urlopen(BASE+'/not-a-page/')
  except urllib.error.HTTPError as e:expect(e.code==404,'Unknown route not 404');return
  raise AssertionError('Unknown route silently returned success')
 record('unknown route returns real 404',unknown)
finally:
 server.terminate()
 (OUT/'browser-report.json').write_text(json.dumps(results,indent=2))
 print(json.dumps({'routeChecks':len(results['route_checks']),'interactionChecks':len(results['interaction_checks']),'errors':results['errors']},indent=2))
if results['errors']:raise SystemExit(1)
