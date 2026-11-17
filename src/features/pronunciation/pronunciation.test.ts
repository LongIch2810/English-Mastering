import {describe,expect,it} from 'vitest';
import {getPronunciations} from './pronunciation';
describe('phiên âm CMUdict',()=>{
 it('hiển thị nguyên âm có trọng âm chính và phân biệt schwa',()=>{
   const examples=getPronunciations('about');
   expect(examples.length).toBeGreaterThan(0);
   expect(examples[0].stress).toBe(2);
   expect(examples[0].phonemes[0].ipa).toBe('ə');
   expect(examples[0].phonemes.some(p=>p.primary)).toBe(true);
 });
 it('không đoán phiên âm từ không có trong nguồn',()=>{
   expect(getPronunciations('not-a-real-entry')).toEqual([]);
   expect(getPronunciations('look after')).toEqual([]);
 });
});
describe('cách đọc tiếng Việt',()=>{
 it('ghép thành chuỗi ngắn, viết hoa âm nhấn',()=>{
  expect(getPronunciations('about')[0].vi).toBe('ờ-BAOT');
  expect(getPronunciations('always')[0].vi).toBe('OL-uâyz');
  expect(getPronunciations('afraid')[0].vi).toBe('ờ-PHRÂYĐ');
 });
});
