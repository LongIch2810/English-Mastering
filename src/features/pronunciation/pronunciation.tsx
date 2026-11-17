import data from './pronunciations.json';

// CMUdict stores ARPABET phonemes, not IPA syllable boundaries.
const ipa:Record<string,string>={AA:'ɑ',AE:'æ',AH:'ʌ',AO:'ɔ',AW:'aʊ',AY:'aɪ',B:'b',CH:'tʃ',D:'d',DH:'ð',EH:'ɛ',ER:'ɝ',EY:'eɪ',F:'f',G:'ɡ',HH:'h',IH:'ɪ',IY:'i',JH:'dʒ',K:'k',L:'l',M:'m',N:'n',NG:'ŋ',OW:'oʊ',OY:'ɔɪ',P:'p',R:'ɹ',S:'s',SH:'ʃ',T:'t',TH:'θ',UH:'ʊ',UW:'u',V:'v',W:'w',Y:'j',Z:'z',ZH:'ʒ'};
// Cách viết gần âm tiếng Việt, ngắn gọn để ghép thành chuỗi dễ đọc.
const hints:Record<string,string>={AA:'a',AE:'e',AH:'â',AO:'o',AW:'ao',AY:'ai',B:'b',CH:'ch',D:'đ',DH:'đ',EH:'e',ER:'ơ',EY:'ây',F:'ph',G:'g',HH:'h',IH:'i',IY:'i',JH:'gi',K:'k',L:'l',M:'m',N:'n',NG:'ng',OW:'âu',OY:'oi',P:'p',R:'r',S:'s',SH:'s',T:'t',TH:'th',UH:'u',UW:'u',V:'v',W:'u',Y:'y',Z:'z',ZH:'gi'};
const stops=['P','B','T','D','K','G'],glides=['L','R','W','Y'];
function onsetLength(run:string[]){
 const n=run.length;
 if(n>=3&&run[n-3]==='S'&&['P','T','K'].includes(run[n-2])&&['L','R','W'].includes(run[n-1]))return 3;
 if(n>=2){const x=run[n-2],y=run[n-1];if((stops.concat(['F','TH','SH','S','V']).includes(x)&&glides.includes(y))||(x==='S'&&['P','T','K','M','N','L','W'].includes(y)))return 2}
 return n?1:0;
}
// Ghép các âm thành các âm tiết viết theo cách đọc tiếng Việt; âm tiết được nhấn viết hoa.
function vietnamese(tokens:string[],stress:number){
 const items=tokens.map(token=>({code:token.replace(/[012]$/,''),mark:token.match(/[012]$/)?.[0]}));
 const syllables:{onset:string[];nucleus:string;coda:string[]}[]=[];
 let run:string[]=[];
 const say=(i:{code:string;mark?:string})=>i.code==='AH'?(i.mark==='0'?'ờ':'â'):i.code==='ER'&&i.mark==='0'?'ơ':hints[i.code];
 for(const item of items){
  if(item.mark===undefined){run.push(item.code);continue}
  const prev=syllables[syllables.length-1];
  const take=prev?onsetLength(run):run.length;
  if(prev)prev.coda.push(...run.slice(0,run.length-take));
  syllables.push({onset:run.slice(run.length-take),nucleus:say(item),coda:[]});
  run=[];
 }
 if(syllables.length)syllables[syllables.length-1].coda.push(...run);
 return syllables.map((s,i)=>{
  const text=s.onset.map(c=>hints[c]).join('')+s.nucleus+s.coda.map(c=>hints[c]).join('');
  return stress===i+1&&syllables.length>1?text.toUpperCase():text;
 }).join('-');
}
export function getPronunciations(text:string){
 const entries=(data as Record<string,string[][]>)[text.toLowerCase()];
 if(!entries)return [];
 return entries.map(tokens=>{
   let vowel=0,stress=0;
   const phonemes=tokens.map(token=>{
     const code=token.replace(/[012]$/,''), mark=token.match(/[012]$/)?.[0];
     if(mark!==undefined){vowel++;if(mark==='1')stress=vowel}
     return {ipa:code==='AH'&&mark==='0'?'ə':code==='ER'&&mark==='0'?'ɚ':ipa[code],hint:hints[code],primary:mark==='1'};
   });
   return {phonemes,stress,vi:vietnamese(tokens,stress)};
 }).filter(entry=>entry.phonemes.every(p=>p.ipa&&p.hint));
}
export function Pronunciation({text}:{text:string}){
 const entries=getPronunciations(text);
 if(!entries.length)return <div className="ipa">Chưa có phiên âm xác minh cho mục này.</div>;
 return <div className="ipa">{entries.map((entry,i)=><div key={i}>/{entry.phonemes.map(p=>p.ipa).join('')}/ · Đọc gần đúng: <b>{entry.vi}</b></div>)}<small>Âm viết hoa là âm nhấn. Chỉ để tham khảo, hãy nghe audio để đọc chuẩn.</small></div>;
}
