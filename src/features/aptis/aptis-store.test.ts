// @vitest-environment jsdom
import {beforeEach,describe,expect,it} from 'vitest';
import {readAptis,saveAptis,toggleValue} from './aptis-store';
import {parts,skills,sources,reading4Conflict} from './data/aptis-data';
import {samples,wordCount} from './data/aptis-samples';
import {extraExercises} from './data/aptis-extra-exercises';
beforeEach(()=>localStorage.clear());
describe('dữ liệu Aptis',()=>{
 it('có 18 phần thuộc đúng năm kỹ năng và mỗi phần có nguồn, hướng dẫn',()=>{
  expect(parts).toHaveLength(18);
  expect(new Set(parts.map(p=>p.skill+':'+p.number)).size).toBe(18);
  for(const skill of skills)expect(parts.filter(p=>p.skill===skill.id)).toHaveLength(skill.id==='grammar-vocabulary'?2:4);
  for(const part of parts){expect(part.format).toBeTruthy();expect(part.steps.length).toBeGreaterThan(2);expect(part.tips.length).toBe(5);const id=part.skill+'/'+part.number;if(part.quiz)expect(1+(extraExercises[id]?.length||0)).toBe(5);if(part.prompt)expect(samples[id]).toHaveLength(2)}
 });
 it('giữ tiến độ và ghi chú khi đọc lại',()=>{
  const state=readAptis();state.completed=toggleValue(state.completed,'reading/2');state.notes['reading/2']='Ghi chú';
  saveAptis(state);expect(readAptis().notes['reading/2']).toBe('Ghi chú');expect(readAptis().completed).toEqual(['reading/2']);
 });
 it('các mẫu viết có số từ trong khoảng công bố và đáp án hợp lệ',()=>{
  for(const group of Object.values(samples))for(const sample of group)if(sample.words){
   const count=wordCount(sample.answer);expect(count).toBeGreaterThanOrEqual(sample.words[0]);expect(count).toBeLessThanOrEqual(sample.words[1]);
  }
  for(const part of parts){
   const list=[...(part.quiz?[part.quiz]:[]),...(extraExercises[part.skill+'/'+part.number]||[])];
   for(const q of list){expect(q.answer).toBeGreaterThanOrEqual(0);expect(q.answer).toBeLessThan(q.options.length);expect(new Set(q.options).size).toBe(q.options.length);expect(q.explanation).toBeTruthy()}
  }
 });
 it('nguồn có địa chỉ hợp lệ và bất đồng Reading 4 vẫn được đánh dấu mở',()=>{
  for(const source of Object.values(sources)){expect(new URL(source.url).protocol).toBe('https:');expect(source.verifiedAt).toBe('2026-11-17')}
  expect(reading4Conflict.verificationStatus).toBe('CONFLICT_OPEN');
 });
});
