// @vitest-environment jsdom
import {beforeEach,describe,expect,it} from 'vitest';
import {store,words,dictionary} from './store';
beforeEach(()=>localStorage.clear());
describe('dữ liệu trên thiết bị',()=>{
 it('bộ từ không trùng và mỗi mục có hai ví dụ được dịch',()=>{
   expect(new Set(words.map(w=>w.kind+':'+w.text)).size).toBe(words.length);
   for(const word of words){
     expect(word.meaning.trim()).toBeTruthy();
     expect(word.explanation.trim()).toBeTruthy();
     const examples=JSON.parse(word.examples) as string[][];
     expect(examples.length).toBeGreaterThanOrEqual(2);
     for(const [english,vietnamese] of examples){expect(english.trim()).toBeTruthy();expect(vietnamese.trim()).toBeTruthy()}
   }
   expect(words.find(w=>w.text==='interested in')?.kind).toBe('collocation');
   expect(words.filter(w=>w.kind==='adjective')).toHaveLength(150);
   expect(words.filter(w=>w.kind==='verb')).toHaveLength(150);
   expect(words.filter(w=>w.kind==='adverb')).toHaveLength(50);
   expect(words.filter(w=>w.kind==='collocation')).toHaveLength(50);
 });
 it('lưu, ngăn trùng và ôn tập qua lần đọc lại',async()=>{
   await store.save('Hello','xin chào');
   await expect(store.save('HELLO','xin chào')).rejects.toThrow('đã được lưu');
   const saved=await store.saved();await store.review(saved[0].id,'good');
   expect((await store.saved())[0].state).toBe('learning');
   expect((await store.progress()).saved).toBe(1);
 });
 it('ghi tiến độ và tra từ có sẵn',async()=>{
   const word=words.find(w=>w.text==='always')!;
   await store.setLearned(word.id,true);
   expect((await store.progress()).learned).toBe(1);
   expect((await dictionary('always'))[0].word).toBe('always');
   await expect(dictionary('not-a-real-entry')).rejects.toThrow('Chưa có từ');
 });

});
