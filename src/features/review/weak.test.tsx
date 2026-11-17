// @vitest-environment jsdom
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {SpeechProvider} from '../../shared/speech';
import {WeakWords} from './weak';
import {buildPool,emptyStats,forgetWord,loadStats,recordAnswer,weakItems} from './quiz';
beforeEach(()=>{localStorage.clear();Object.defineProperty(window,'speechSynthesis',{value:Object.assign(new EventTarget(),{getVoices:()=>[],cancel:vi.fn(),speak:vi.fn()}),configurable:true})});
afterEach(cleanup);
const pool=buildPool();
const ui=()=>render(<SpeechProvider><MemoryRouter><WeakWords/></MemoryRouter></SpeechProvider>);
it('ghi lại từ trả lời sai, xếp từ đang quên trước và loại từ đã nhớ',()=>{
 let s=emptyStats();
 s=recordAnswer(s,pool[0].id,false);s=recordAnswer(s,pool[0].id,false);
 s=recordAnswer(s,pool[1].id,false);s=recordAnswer(s,pool[1].id,true);s=recordAnswer(s,pool[1].id,true);
 s=recordAnswer(s,pool[2].id,true);
 const list=weakItems(pool,s);
 expect(list.map(e=>e.item.id)).toEqual([pool[0].id,pool[1].id]);
 expect(list[0].forgetting).toBe(true);
 expect(list[1].forgetting).toBe(false);
 expect(forgetWord(s,pool[0].id).words[pool[0].id]).toBeUndefined();
});
it('hiển thị từ sai kèm nghĩa, ví dụ, số lần sai và cho xóa khỏi danh sách',()=>{
 const s=recordAnswer(emptyStats(),pool[0].id,false);
 localStorage.setItem('english-mastery-review-v1',JSON.stringify(s));
 ui();
 expect(screen.getByRole('heading',{name:pool[0].text})).toBeTruthy();
 expect(screen.getByText(pool[0].meaning)).toBeTruthy();
 expect(screen.getByText(/Sai 1 lần · đúng 0 lần/)).toBeTruthy();
 fireEvent.click(screen.getByRole('button',{name:'Xóa khỏi danh sách'}));
 expect(loadStats().words[pool[0].id]).toBeUndefined();
 expect(screen.getByText(/Chưa có từ nào/)).toBeTruthy();
});
it('hiển thị hướng dẫn khi chưa có từ sai',()=>{
 ui();
 expect(screen.getByText(/Chưa có từ nào/)).toBeTruthy();
});
