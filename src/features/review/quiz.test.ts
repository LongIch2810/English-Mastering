// @vitest-environment jsdom
import {beforeEach,describe,expect,it} from 'vitest';
import {availableTypes,blank,buildPool,buildQuiz,dailyMode,dayKey,emptyStats,forms,makeQuestion,recordAnswer,recordDaily,seeded,streak,loadStats,saveStats} from './quiz';
beforeEach(()=>localStorage.clear());
const pool=buildPool();
describe('bộ từ để ôn',()=>{
 it('gồm tất cả từ vựng và cấu trúc động từ, có nghĩa tiếng Việt',()=>{
  expect(pool.length).toBeGreaterThan(440);
  for(const kind of ['adverb','adjective','verb','verb-pattern','preposition','collocation'])expect(pool.some(x=>x.kind===kind),kind).toBe(true);
  expect(new Set(pool.map(x=>x.id)).size).toBe(pool.length);
  for(const x of pool){expect(x.text.trim()).toBeTruthy();expect(x.meaning.trim()).toBeTruthy()}
 });
 it('tạo được câu hỏi cho mọi mục từ với đáp án đúng và 4 lựa chọn khác nhau',()=>{
  const rng=seeded(7);
  for(const item of pool)for(const type of availableTypes(item)){
   const q=makeQuestion(item,type,pool,rng);
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options.map(o=>o.toLowerCase())).size,item.text+type).toBe(4);
   expect(q.options).toContain(q.answer);
   expect(q.answer).toBe(type==='en2vi'?item.meaning:item.text);
  }
 });
});
describe('câu điền từ',()=>{
 it('thay từ trong câu ví dụ bằng chỗ trống, kể cả khi chia dạng',()=>{
  const find=(t:string)=>pool.find(x=>x.text===t)!;
  expect(blank(find('always'))!.sentence).toContain('_____');
  expect(blank(find('always'))!.sentence).not.toMatch(/always/i);
  const ask=blank(find('ask for'))!;
  expect(ask.sentence).toBe('She _____ help.');
  expect(ask.inflected).toBe(true);
  expect(forms('make')).toContain('made');
  expect(forms('study')).toContain('studies');
  expect(forms('stop')).toContain('stopped');
 });
 it('bỏ qua giới từ vì nhiều đáp án cùng hợp lệ',()=>{
  expect(blank(pool.find(x=>x.kind==='preposition')!)).toBeNull();
 });
 it('đa số mục từ có câu điền từ',()=>{
  const n=pool.filter(x=>blank(x)).length;
  expect(n/pool.length).toBeGreaterThan(0.8);
 });
});
describe('bài ôn hằng ngày',()=>{
 it('có 10 câu, cố định trong cùng một ngày và khác nhau giữa các ngày',()=>{
  const a=buildQuiz(pool,dailyMode(),emptyStats(),'daily-2026-11-17');
  const b=buildQuiz(pool,dailyMode(),emptyStats(),'daily-2026-11-17');
  const c=buildQuiz(pool,dailyMode(),emptyStats(),'daily-2026-11-18');
  expect(a).toHaveLength(10);
  expect(a.map(q=>q.id+q.options.join())).toEqual(b.map(q=>q.id+q.options.join()));
  expect(a.map(q=>q.id)).not.toEqual(c.map(q=>q.id));
 });
 it('ưu tiên từ hay sai',()=>{
  let s=emptyStats();
  for(const id of pool.slice(0,5).map(x=>x.id))s=recordAnswer(s,id,false);
  for(const x of pool.slice(5,200))s=recordAnswer(s,x.id,true);
  const ids=buildQuiz(pool,dailyMode(),s,'daily-x').map(q=>q.item.id);
  for(const id of pool.slice(0,5).map(x=>x.id))expect(ids).toContain(id);
 });
 it('tự chọn theo loại từ, dạng câu hỏi và tất cả các từ',()=>{
  const prep=buildQuiz(pool,{kinds:['preposition'],types:['vi2en'],count:'all'},emptyStats(),'s');
  expect(prep).toHaveLength(pool.filter(x=>x.kind==='preposition').length);
  expect(prep.every(q=>q.type==='vi2en')).toBe(true);
  const cloze=buildQuiz(pool,{kinds:[],types:['cloze'],count:20},emptyStats(),'s2');
  expect(cloze.length).toBe(20);
  expect(cloze.every(q=>q.type==='cloze'&&q.sentence!.includes('_____'))).toBe(true);
  const all=buildQuiz(pool,{kinds:[],types:['vi2en','cloze','en2vi'],count:'all'},emptyStats(),'s3');
  expect(all).toHaveLength(pool.length);
 });
});
describe('tiến độ',()=>{
 it('ghi đúng sai, chuỗi ngày và lưu vào localStorage',()=>{
  const now=new Date('2026-11-17T10:00:00');
  let s=recordAnswer(emptyStats(),'w1',false,now);s=recordAnswer(s,'w1',true,now);
  expect(s.words.w1).toEqual({r:1,w:1,last:'2026-11-17'});
  expect(streak(s,now)).toBe(0);
  s=recordDaily(s,8,10,now);
  s=recordDaily(s,7,10,new Date('2026-11-16T10:00:00'));
  expect(streak(s,now)).toBe(2);
  expect(streak(s,new Date('2026-11-18T10:00:00'))).toBe(2);
  expect(streak(s,new Date('2026-11-19T10:00:00'))).toBe(0);
  expect(saveStats(s)).toBe(true);
  expect(loadStats().words.w1.r).toBe(1);
  expect(dayKey(now)).toBe('2026-11-17');
 });
});
