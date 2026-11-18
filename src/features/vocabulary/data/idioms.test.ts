// @vitest-environment jsdom
import {describe,expect,it} from 'vitest';
import {idiomRows} from './idioms';
import {words} from '../store';
import {blank,buildPool} from '../../review/quiz';
import {guides} from '../word-recognition';

describe('thành ngữ',()=>{
 it('có đủ thông tin: nghĩa, cách dùng Speaking/Writing và hai ví dụ có dịch',()=>{
  expect(idiomRows.length).toBeGreaterThanOrEqual(60);
  expect(new Set(idiomRows.map(r=>r[0].toLowerCase())).size).toBe(idiomRows.length);
  for(const [text,kind,category,meaning,explanation,examples] of idiomRows){
   expect(kind).toBe('idiom');
   expect(category.trim(),text).toBeTruthy();
   expect(meaning.trim(),text).toBeTruthy();
   expect(explanation,text).toMatch(/Speaking/);
   expect(examples,text).toHaveLength(2);
   for(const [en,vi] of examples){expect(en.trim()).toBeTruthy();expect(vi.trim()).toBeTruthy()}
  }
 });
 it('thành ngữ không trùng mục từ khác và có mặt trong bộ từ học',()=>{
  const idioms=words.filter(w=>w.kind==='idiom');
  expect(idioms).toHaveLength(idiomRows.length);
  const others=new Set(words.filter(w=>w.kind!=='idiom').map(w=>w.text.toLowerCase()));
  for(const w of idioms)expect(others.has(w.text.toLowerCase()),w.text).toBe(false);
 });
 it('có câu điền từ cho gần hết thành ngữ để ôn tập',()=>{
  const pool=buildPool().filter(x=>x.kind==='idiom');
  const ok=pool.filter(x=>blank(x));
  expect(ok.length/pool.length).toBeGreaterThan(0.85);
 });
 it('có hướng dẫn thành ngữ với các cặp ví dụ phân biệt',()=>{
  expect(guides.idiom.pairs!.length).toBeGreaterThanOrEqual(3);
  expect(guides.idiom.title).toMatch(/Thành ngữ/);
 });
});
