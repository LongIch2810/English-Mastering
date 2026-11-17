import {words} from '../vocabulary/store';
import {groups} from '../vocabulary/verb-patterns';

export type Item={id:string;text:string;kind:string;category:string;meaning:string;explanation:string;examples:[string,string][]};
export type QType='vi2en'|'cloze'|'en2vi';
export type Question={id:string;item:Item;type:QType;options:string[];choices:Item[];answer:string;sentence?:string;translation?:string;inflected?:boolean};
export type Mode={kinds:string[];types:QType[];count:number|'all';onlyWeak?:boolean};
export type Stats={words:Record<string,{r:number;w:number;last:string}>;daily:Record<string,{correct:number;total:number}>};

export const kindLabels:Record<string,string>={adverb:'Trạng từ',adjective:'Tính từ',verb:'Động từ','verb-pattern':'Động từ + to V / V-ing',preposition:'Giới từ',collocation:'Collocations'};
export const typeLabels:Record<QType,string>={vi2en:'Nghĩa tiếng Việt → chọn từ tiếng Anh',cloze:'Điền từ vào câu tiếng Anh',en2vi:'Từ tiếng Anh → chọn nghĩa tiếng Việt'};

export function buildPool():Item[]{
 const base:Item[]=words.map(w=>({id:'w'+w.id,text:w.text,kind:w.kind,category:w.category,meaning:w.meaning,explanation:w.explanation,examples:JSON.parse(w.examples) as [string,string][]}));
 const patterns:Item[]=groups.flatMap((g,gi)=>g.items.map((it,i)=>({id:'p'+gi+'-'+i,text:it[0],kind:'verb-pattern',category:g.title,meaning:it[1],explanation:g.description,examples:[[it[2],it[3]] as [string,string]]})));
 return [...base,...patterns];
}

// Bộ tạo số ngẫu nhiên có hạt giống để bộ câu hỏi hằng ngày ổn định trong ngày.
export function seeded(seed:number){let a=seed>>>0;return ()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
export function hash(text:string){let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
export function shuffle<T>(list:T[],rng:()=>number){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

const irregular:Record<string,string[]>={be:['am','is','are','was','were','been','being'],do:['does','did','done','doing'],have:['has','had','having'],go:['goes','went','gone','going'],make:['makes','made','making'],get:['gets','got','gotten','getting'],say:['says','said','saying'],buy:['buys','bought','buying'],take:['takes','took','taken','taking'],give:['gives','gave','given','giving'],come:['comes','came','coming'],see:['sees','saw','seen','seeing'],know:['knows','knew','known','knowing'],think:['thinks','thought','thinking'],tell:['tells','told','telling'],find:['finds','found','finding'],eat:['eats','ate','eaten','eating'],drink:['drinks','drank','drunk','drinking'],write:['writes','wrote','written','writing'],read:['reads','reading'],run:['runs','ran','running'],begin:['begins','began','begun','beginning'],speak:['speaks','spoke','spoken','speaking'],bring:['brings','brought','bringing'],leave:['leaves','left','leaving'],keep:['keeps','kept','keeping'],meet:['meets','met','meeting'],sit:['sits','sat','sitting'],stand:['stands','stood','standing'],teach:['teaches','taught','teaching'],choose:['chooses','chose','chosen','choosing'],forget:['forgets','forgot','forgotten','forgetting'],feel:['feels','felt','feeling'],hear:['hears','heard','hearing'],pay:['pays','paid','paying'],send:['sends','sent','sending'],spend:['spends','spent','spending'],win:['wins','won','winning'],lose:['loses','lost','losing'],sleep:['sleeps','slept','sleeping'],wear:['wears','wore','worn','wearing'],drive:['drives','drove','driven','driving'],fall:['falls','fell','fallen','falling']};
export function forms(head:string){
 const h=head.toLowerCase(),out=new Set<string>([h]);
 (irregular[h]||[]).forEach(f=>out.add(f));
 if(/[^aeiou]y$/.test(h)){out.add(h.slice(0,-1)+'ies');out.add(h.slice(0,-1)+'ied')}else out.add(h+'s');
 if(/(s|x|z|ch|sh|o)$/.test(h))out.add(h+'es');
 if(h.endsWith('e')){out.add(h+'d');out.add(h.slice(0,-1)+'ing')}else{out.add(h+'ed');out.add(h+'ing')}
 if(/[^aeiou][aeiou][^aeiouwxy]$/.test(h)){out.add(h+h.slice(-1)+'ed');out.add(h+h.slice(-1)+'ing')}
 return [...out];
}
const esc=(s:string)=>s.replace(/[\\^$.*+?()[\]{}|]/g,'\\$&');
// Tìm mục từ (cho phép biến đổi của từ đầu tiên) trong câu ví dụ và thay bằng chỗ trống.
export function blank(item:Item):{sentence:string;translation:string;inflected:boolean}|null{
 if(item.kind==='preposition')return null;
 const tokens=item.text.split(/\s+/);
 const head=tokens[0].toLowerCase();
 if(tokens.length===1&&['be','do','have','get'].includes(head))return null;
 const alt=forms(head).map(esc).join('|');
 const rest=tokens.slice(1).map(esc).join('\\s+');
 const re=new RegExp("(^|[^A-Za-z'])("+alt+")"+(rest?'\\s+'+rest:'')+"(?![A-Za-z'])",'i');
 for(const [en,vi] of item.examples){
  const m=re.exec(en);
  if(!m)continue;
  const matched=en.slice(m.index+m[1].length,m.index+m[0].length);
  const sentence=en.slice(0,m.index+m[1].length)+'_____'+en.slice(m.index+m[0].length);
  return {sentence,translation:vi,inflected:matched.toLowerCase()!==item.text.toLowerCase()};
 }
 return null;
}
export function availableTypes(item:Item):QType[]{return blank(item)?['vi2en','cloze','en2vi']:['vi2en','en2vi']}

export function makeQuestion(item:Item,type:QType,pool:Item[],rng:()=>number):Question{
 const pick=type==='en2vi'?(x:Item)=>x.meaning:(x:Item)=>x.text;
 const correct=pick(item);
 const seen=new Set([correct.toLowerCase()]);
 const candidates=pool.filter(x=>x.id!==item.id&&x.meaning!==item.meaning&&x.text.toLowerCase()!==item.text.toLowerCase());
 const sameCategory=shuffle(candidates.filter(x=>x.kind===item.kind&&x.category===item.category),rng);
 const sameKind=shuffle(candidates.filter(x=>x.kind===item.kind&&x.category!==item.category),rng);
 const others=shuffle(candidates.filter(x=>x.kind!==item.kind),rng);
 const distractors:Item[]=[];
 for(const x of [...sameCategory,...sameKind,...others]){
  const value=pick(x),k=value.toLowerCase();
  if(seen.has(k))continue;
  seen.add(k);distractors.push(x);
  if(distractors.length===3)break;
 }
 const ordered=shuffle([item,...distractors],rng);
 const base={id:item.id+':'+type,item,type,answer:correct,options:ordered.map(pick),choices:ordered};
 if(type==='cloze'){const b=blank(item)!;return {...base,sentence:b.sentence,translation:b.translation,inflected:b.inflected}}
 return base;
}

export const emptyStats=():Stats=>({words:{},daily:{}});
export const dayKey=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const statsKey='english-mastery-review-v1';
export function loadStats():Stats{try{const raw=localStorage.getItem(statsKey);return raw?{...emptyStats(),...(JSON.parse(raw) as Stats)}:emptyStats()}catch{return emptyStats()}}
export function saveStats(s:Stats){try{localStorage.setItem(statsKey,JSON.stringify(s));return true}catch{return false}}
export function recordAnswer(s:Stats,id:string,correct:boolean,now=new Date()):Stats{
 const cur=s.words[id]||{r:0,w:0,last:''};
 return {...s,words:{...s.words,[id]:{r:cur.r+(correct?1:0),w:cur.w+(correct?0:1),last:dayKey(now)}}};
}
export function recordDaily(s:Stats,correct:number,total:number,now=new Date()):Stats{return {...s,daily:{...s.daily,[dayKey(now)]:{correct,total}}}}
export function streak(s:Stats,now=new Date()){
 let n=0;const d=new Date(now);
 if(!s.daily[dayKey(d)])d.setDate(d.getDate()-1);
 while(s.daily[dayKey(d)]){n++;d.setDate(d.getDate()-1)}
 return n;
}

function priority(item:Item,s:Stats,rng:()=>number,today:string){
 const st=s.words[item.id];
 if(!st)return 2+rng();
 if(st.w>st.r)return 3+rng();
 const days=st.last?Math.max(0,(Date.parse(today)-Date.parse(st.last))/86400000):30;
 return Math.min(days,30)/30+rng()*0.5;
}
export function buildQuiz(pool:Item[],mode:Mode,stats:Stats,seed:string):Question[]{
 const rng=seeded(hash(seed));
 let items=pool.filter(x=>mode.kinds.length===0||mode.kinds.includes(x.kind));
 if(mode.types.length===1&&mode.types[0]==='cloze')items=items.filter(x=>availableTypes(x).includes('cloze'));
 if(mode.onlyWeak)items=items.filter(x=>{const st=stats.words[x.id];return st&&st.w>=st.r});
 const today=dayKey();
 const ordered=mode.count==='all'?shuffle(items,rng):items.map(x=>[x,priority(x,stats,rng,today)] as const).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
 const chosen=mode.count==='all'?ordered:ordered.slice(0,mode.count);
 return shuffle(chosen,rng).map(item=>{
  const allowed=availableTypes(item).filter(t=>mode.types.includes(t));
  const types=allowed.length?allowed:availableTypes(item).filter(t=>t!=='cloze');
  return makeQuestion(item,types[Math.floor(rng()*types.length)],pool,rng);
 });
}
export const DAILY_COUNT=10;
export const dailyMode=():Mode=>({kinds:[],types:['vi2en','cloze','en2vi'],count:DAILY_COUNT});

export type WeakEntry={item:Item;r:number;w:number;last:string;forgetting:boolean};
// Các từ đã từng trả lời sai, từ đang quên (sai nhiều hơn hoặc bằng đúng) xếp trước.
export function weakItems(pool:Item[],s:Stats):WeakEntry[]{
 const byId=new Map(pool.map(x=>[x.id,x]));
 const list:WeakEntry[]=[];
 for(const [id,st] of Object.entries(s.words)){
  const item=byId.get(id);
  if(item&&st.w>0)list.push({item,r:st.r,w:st.w,last:st.last,forgetting:st.w>=st.r});
 }
 return list.sort((a,b)=>Number(b.forgetting)-Number(a.forgetting)||(b.w-b.r)-(a.w-a.r)||b.last.localeCompare(a.last)||a.item.text.localeCompare(b.item.text));
}
export function forgetWord(s:Stats,id:string):Stats{const {[id]:_,...rest}=s.words;return {...s,words:rest}}
