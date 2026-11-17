import {expect,it} from 'vitest';
import {templates} from './brem-data';
import {levelExamples} from './brem-levels';
import {wordCount} from '../../aptis/data/aptis-samples';
it('mọi dạng câu hỏi đều có mẫu A2, B1, B2 và đúng giới hạn số từ',()=>{
 for(const t of templates){
  for(const level of ['A2','B1','B2']){
   const ex=levelExamples[t.id]?.[level];
   expect(ex,t.id+' '+level).toBeTruthy();
   expect(ex[0].trim()).toBeTruthy();expect(ex[1].trim()).toBeTruthy();
   if(t.skill==='writing'&&t.range){const n=wordCount(ex[0]);expect(n,t.id+' '+level).toBeGreaterThanOrEqual(t.range[0]);expect(n,t.id+' '+level).toBeLessThanOrEqual(t.range[1])}
  }
 }
});
