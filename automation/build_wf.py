import json
FN = "https://uzdjwpkgldzhnoxjeyrw.supabase.co/functions/v1/realtor-request"
SYSTEM = """You turn a realtor's email into website listing actions.
Allowed actions: hide, show, hero_on, hero_off, feature, unfeature, mark_sold, not_sold, set_sold_price.
- hide: don't show a listing on the website. show: show it again.
- hero_on / hero_off: add/remove a listing in the homepage slider (max 3).
- feature / unfeature: featured listing on/off.
- mark_sold: move to Sold. not_sold: it did not sell / remove it from Sold.
- set_sold_price: value = the sold price as a number.
Match listings ONLY from the provided list (by address, unit, street, MLS number). Use the listing "id".
Reply with JSON only, no prose:
{"actions":[{"action":"...","listing_id":"...","value":null}],"needs_human":false,"reason":""}
If the email asks for anything else (text/design changes, new listings, questions), or you are not sure which listing is meant, return {"actions":[],"needs_human":true,"reason":"<short reason>"}.
If the email is not a request at all (thanks, chit-chat), return {"actions":[],"needs_human":false,"reason":"no request"}."""

nodes = [
 {"id":"n1","name":"New email (sony@bluluma.com)","type":"n8n-nodes-base.emailReadImap","typeVersion":2.1,"position":[0,0],
  "parameters":{"mailbox":"INBOX","postProcessAction":"nothing","downloadAttachments":False,"format":"simple","options":{}}},
 {"id":"n2","name":"Get realtor + listings","type":"n8n-nodes-base.httpRequest","typeVersion":4.2,"position":[240,0],
  "parameters":{"method":"POST","url":FN,"authentication":"genericCredentialType","genericAuthType":"httpHeaderAuth",
   "sendBody":True,"specifyBody":"json",
   "jsonBody":"={{ JSON.stringify({ op: 'context', sender: $json.from }) }}","options":{}}},
 {"id":"n3","name":"From a realtor client?","type":"n8n-nodes-base.if","typeVersion":2.2,"position":[480,0],
  "parameters":{"conditions":{"options":{"caseSensitive":True,"typeValidation":"loose","version":2},"combinator":"and",
   "conditions":[{"id":"c1","leftValue":"={{ $json.known_sender }}","rightValue":True,"operator":{"type":"boolean","operation":"true","singleValue":True}}]},"options":{}}},
 {"id":"n4","name":"Claude reads the email","type":"n8n-nodes-base.httpRequest","typeVersion":4.2,"position":[720,-100],
  "parameters":{"method":"POST","url":"https://api.anthropic.com/v1/messages","authentication":"genericCredentialType","genericAuthType":"httpHeaderAuth",
   "sendHeaders":True,"headerParameters":{"parameters":[{"name":"anthropic-version","value":"2023-06-01"}]},
   "sendBody":True,"specifyBody":"json",
   "jsonBody":"={{ JSON.stringify({ model: 'claude-sonnet-5-5', max_tokens: 800, system: " + json.dumps(SYSTEM) + ", messages: [{ role: 'user', content: 'Listings:\\n' + JSON.stringify($json.listings) + '\\n\\nEmail subject: ' + $('New email (sony@bluluma.com)').item.json.subject + '\\n\\nEmail body:\\n' + ($('New email (sony@bluluma.com)').item.json.textPlain || '').slice(0, 6000) }] }) }}",
   "options":{}}},
 {"id":"n5","name":"Split actions","type":"n8n-nodes-base.code","typeVersion":2,"position":[960,-100],
  "parameters":{"jsCode":"""const mail = $('New email (sony@bluluma.com)').first().json;
let plan = { actions: [], needs_human: true, reason: 'Could not read AI reply' };
try {
  const text = $input.first().json.content[0].text;
  plan = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
} catch (e) {}
const base = { sender: mail.from, subject: mail.subject, body: (mail.textPlain || '').slice(0, 4000), needs_human: !!plan.needs_human, reason: plan.reason || '' };
if (plan.needs_human || !plan.actions?.length) return [{ json: { ...base, skip: true } }];
return plan.actions.map(a => ({ json: { ...base, skip: false, action: a.action, listing_id: a.listing_id, value: a.value ?? null } }));"""}},
 {"id":"n6","name":"Apply change","type":"n8n-nodes-base.httpRequest","typeVersion":4.2,"position":[1200,-100],
  "parameters":{"method":"POST","url":FN,"authentication":"genericCredentialType","genericAuthType":"httpHeaderAuth",
   "sendBody":True,"specifyBody":"json",
   "jsonBody":"={{ $json.skip ? JSON.stringify({ op: 'noop' }) : JSON.stringify({ op: 'apply', sender: $json.sender, subject: $json.subject, action: $json.action, listing_id: $json.listing_id, value: $json.value }) }}",
   "options":{"response":{"response":{"neverError":True}}}}},
 {"id":"n7","name":"Summarize","type":"n8n-nodes-base.code","typeVersion":2,"position":[1440,-100],
  "parameters":{"jsCode":"""const plans = $('Split actions').all().map(i => i.json);
const results = $input.all().map(i => i.json);
const p = plans[0];
const applied = plans.filter(x => !x.skip).map((x, i) => results[i] || {});
const ok = applied.filter(r => r.ok).map(r => r.summary);
const failed = applied.filter(r => !r.ok).map(r => r.summary || r.error || 'error');
const silent = !p.needs_human && plans.every(x => x.skip) && p.reason === 'no request';
return [{ json: {
  sender: p.sender, subject: p.subject, body: p.body, silent,
  all_ok: !silent && !p.needs_human && ok.length > 0 && failed.length === 0,
  reply: ok.join('\\n'),
  problem: [p.needs_human ? 'AI: ' + p.reason : '', ...failed].filter(Boolean).join('\\n'),
  done: ok.join('\\n'),
} }];"""}},
 {"id":"n8","name":"All done?","type":"n8n-nodes-base.if","typeVersion":2.2,"position":[1680,-100],
  "parameters":{"conditions":{"options":{"caseSensitive":True,"typeValidation":"loose","version":2},"combinator":"and",
   "conditions":[{"id":"c2","leftValue":"={{ $json.all_ok }}","rightValue":True,"operator":{"type":"boolean","operation":"true","singleValue":True}}]},"options":{}}},
 {"id":"n9","name":"Reply to realtor (cc Sony)","type":"n8n-nodes-base.emailSend","typeVersion":2.1,"position":[1920,-200],
  "parameters":{"fromEmail":"Sony Lin <sony@bluluma.com>","toEmail":"={{ $json.sender }}","subject":"={{ 'Re: ' + $json.subject }}",
   "emailFormat":"text","text":"={{ 'Hi,\\n\\nDone — your website has been updated:\\n\\n' + $json.reply + '\\n\\nThanks,\\nSony' }}",
   "options":{"ccEmail":"sony@bluluma.com"}}},
 {"id":"n10","name":"Not silent?","type":"n8n-nodes-base.if","typeVersion":2.2,"position":[1920,0],
  "parameters":{"conditions":{"options":{"caseSensitive":True,"typeValidation":"loose","version":2},"combinator":"and",
   "conditions":[{"id":"c3","leftValue":"={{ $json.silent }}","rightValue":False,"operator":{"type":"boolean","operation":"false","singleValue":True}}]},"options":{}}},
 {"id":"n11","name":"Forward to Sony","type":"n8n-nodes-base.emailSend","typeVersion":2.1,"position":[2160,0],
  "parameters":{"fromEmail":"Bluluma Automation <sony@bluluma.com>","toEmail":"sony@bluluma.com",
   "subject":"={{ '【需要 Sony 處理】' + $json.subject }}","emailFormat":"text",
   "text":"={{ '寄件人: ' + $json.sender + '\\n\\n原因:\\n' + $json.problem + ($json.done ? '\\n\\n已自動完成:\\n' + $json.done : '') + '\\n\\n--- 原信 ---\\n' + $json.body }}",
   "options":{}}},
]
connections = {
 "New email (sony@bluluma.com)":{"main":[[{"node":"Get realtor + listings","type":"main","index":0}]]},
 "Get realtor + listings":{"main":[[{"node":"From a realtor client?","type":"main","index":0}]]},
 "From a realtor client?":{"main":[[{"node":"Claude reads the email","type":"main","index":0}],[]]},
 "Claude reads the email":{"main":[[{"node":"Split actions","type":"main","index":0}]]},
 "Split actions":{"main":[[{"node":"Apply change","type":"main","index":0}]]},
 "Apply change":{"main":[[{"node":"Summarize","type":"main","index":0}]]},
 "Summarize":{"main":[[{"node":"All done?","type":"main","index":0}]]},
 "All done?":{"main":[[{"node":"Reply to realtor (cc Sony)","type":"main","index":0}],[{"node":"Not silent?","type":"main","index":0}]]},
 "Not silent?":{"main":[[{"node":"Forward to Sony","type":"main","index":0}],[]]},
}
wf = {"name":"Realtor 信件 → 自動更新網站房源","nodes":nodes,"connections":connections,"settings":{"executionOrder":"v1"}}
json.dump(wf, open('/home/claude/eric-kim-realty-concept-a/automation/realtor-email-workflow.json','w'), ensure_ascii=False, indent=1)
print(len(json.dumps(wf)))
