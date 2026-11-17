// @vitest-environment jsdom
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {SpeechProvider} from '../../shared/speech';
import {Review} from './review';
import {dayKey,loadStats} from './quiz';
beforeEach(()=>{localStorage.clear();Object.defineProperty(window,'speechSynthesis',{value:Object.assign(new EventTarget(),{getVoices:()=>[],cancel:vi.fn(),speak:vi.fn()}),configurable:true})});
afterEach(cleanup);
const ui=()=>render(<SpeechProvider><Review/></SpeechProvider>);
it('làm trọn bài hằng ngày 10 câu, lưu tiến độ và chuỗi ngày',()=>{
 ui();
 fireEvent.click(screen.getByRole('button',{name:/Bắt đầu ôn hôm nay/}));
 for(let i=1;i<=10;i++){
  expect(screen.getByText(new RegExp('Câu '+i+'/10'))).toBeTruthy();
  const choices=screen.getByRole('group',{name:'Các đáp án'}).querySelectorAll('button');
  expect(choices).toHaveLength(4);
  fireEvent.click(choices[0]);
  expect(screen.getByRole('status').textContent).toMatch(/Chính xác|Chưa đúng/);
  fireEvent.click(screen.getByRole('button',{name:i<10?/Câu tiếp theo/:/Xem kết quả/}));
 }
 expect(screen.getByText(/câu đúng/)).toBeTruthy();
 const s=loadStats();
 expect(Object.keys(s.words).length).toBe(10);
 expect(s.daily[dayKey()].total).toBe(10);
});
it('tự chọn tất cả giới từ theo dạng nghĩa tiếng Việt',()=>{
 ui();
 fireEvent.change(screen.getByLabelText('Loại từ'),{target:{value:'preposition'}});
 fireEvent.change(screen.getByLabelText('Dạng câu hỏi'),{target:{value:'vi2en'}});
 fireEvent.change(screen.getByLabelText('Số câu'),{target:{value:'all'}});
 fireEvent.click(screen.getByRole('button',{name:'Bắt đầu bài ôn'}));
 expect(screen.getByText(/Câu 1\/15/)).toBeTruthy();
 expect(screen.getByText('Nghĩa tiếng Việt:')).toBeTruthy();
});
