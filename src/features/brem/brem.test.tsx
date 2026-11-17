// @vitest-environment jsdom
import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {SpeechProvider} from '../../shared/speech';
import {Brem} from './brem';
import {assemble,templates} from './data/brem-data';
beforeEach(()=>{localStorage.clear();Object.defineProperty(window,'speechSynthesis',{value:Object.assign(new EventTarget(),{getVoices:()=>[],cancel:vi.fn(),speak:vi.fn()}),configurable:true})});
afterEach(cleanup);
describe('khung BREM',()=>{
 it('có khung cho cả tám phần và không gắn BREM máy móc',()=>{
  for(const skill of ['speaking','writing'])for(let part=1;part<=4;part++)expect(templates.some(t=>t.skill===skill&&t.part===part)).toBe(true);
  const photo=templates.find(t=>t.id==='s2-photo')!;
  expect(photo.sentences[0].english).toContain('picture');
  expect(photo.sentences.some(s=>s.purpose.startsWith('B ·'))).toBe(false);
 });
 it('giữ placeholder nếu chưa điền và ghép đủ nội dung khi có giá trị',()=>{
  const t=templates.find(x=>x.id==='s1-like')!;
  expect(assemble(t,{})).toContain('[activity]');
  expect(assemble(t,{activity:'reading',detail:'read at home',reason:'it is fun'})).not.toMatch(/\[.+?\]/);
 });
 it('lưu và mở lại bài cùng nội dung các ô',()=>{
  vi.stubGlobal('crypto',{randomUUID:()=> 'test-id'});
  const view=render(<SpeechProvider><Brem/></SpeechProvider>);
  fireEvent.change(screen.getByLabelText('Hoạt động (danh từ hoặc V-ing)'),{target:{value:'reading'}});
  fireEvent.change(screen.getByLabelText('Việc bạn thường làm'),{target:{value:'read at home'}});
  fireEvent.change(screen.getByLabelText('Lý do (mệnh đề đầy đủ)'),{target:{value:'it helps me relax'}});
  fireEvent.click(screen.getByRole('button',{name:'Ghép bài trả lời'}));
  fireEvent.change(screen.getByLabelText('Chỉnh sửa bài'),{target:{value:'I enjoy reading. It helps me relax.'}});
  fireEvent.change(screen.getByLabelText('Việc bạn thường làm'),{target:{value:'read in the evening'}});
  expect((screen.getByRole('button',{name:'Lưu bài'}) as HTMLButtonElement).disabled).toBe(true);
  fireEvent.click(screen.getByRole('button',{name:'Ghép bài trả lời'}));
  fireEvent.change(screen.getByLabelText('Chỉnh sửa bài'),{target:{value:'I enjoy reading. It helps me relax.'}});
  fireEvent.click(screen.getByRole('button',{name:'Lưu bài'}));
  expect(JSON.parse(localStorage.getItem('english-mastery-brem-v1')!)[0].answer).toContain('I enjoy reading');
  view.unmount();
  render(<SpeechProvider><Brem/></SpeechProvider>);
  fireEvent.click(screen.getByRole('button',{name:'Bài đã lưu'}));
  fireEvent.click(screen.getByRole('button',{name:'Mở lại'}));
  expect(screen.getByDisplayValue('reading')).toBeTruthy();
  expect(screen.getByDisplayValue('I enjoy reading. It helps me relax.')).toBeTruthy();
  vi.unstubAllGlobals();
 });
 it('Writing 3 lưu riêng ba câu và giữ số từ',()=>{
  vi.stubGlobal('crypto',{randomUUID:()=> 'writing-test'});
  const view=render(<SpeechProvider><Brem/></SpeechProvider>);
  fireEvent.change(screen.getByLabelText('Kỹ năng'),{target:{value:'writing'}});
  fireEvent.change(screen.getByLabelText('Part'),{target:{value:'3'}});
  fireEvent.change(screen.getByLabelText('Ý kiến là mệnh đề'),{target:{value:'a club would help'}});
  fireEvent.change(screen.getByLabelText('Lý do là mệnh đề'),{target:{value:'we can practice'}});
  fireEvent.change(screen.getByLabelText('Ví dụ là mệnh đề'),{target:{value:'we could discuss books'}});
  fireEvent.change(screen.getByLabelText('Kết luận là mệnh đề'),{target:{value:'the club is useful'}});
  fireEvent.click(screen.getByRole('button',{name:'Ghép bài trả lời'}));
  fireEvent.change(screen.getByLabelText('Câu trả lời 2'),{target:{value:'One two three'}});
  fireEvent.change(screen.getByLabelText('Câu trả lời 3'),{target:{value:'Four five'}});
  fireEvent.click(screen.getByRole('button',{name:'Lưu bài'}));
  expect(JSON.parse(localStorage.getItem('english-mastery-brem-v1')!)[0].extraAnswers).toEqual(['One two three','Four five']);
  view.unmount();vi.unstubAllGlobals();
 });
 it('không làm thay đổi tiến độ luyện từ vựng khi đánh dấu yêu thích',()=>{
  localStorage.setItem('english-mastery-data-v1',JSON.stringify({saved:[],learned:[1],attempts:[],reviews:[]}));
  render(<SpeechProvider><Brem/></SpeechProvider>);
  fireEvent.click(screen.getByRole('button',{name:'Lưu khung yêu thích'}));
  expect(JSON.parse(localStorage.getItem('english-mastery-data-v1')!).learned).toEqual([1]);
  expect(JSON.parse(localStorage.getItem('english-mastery-brem-favorites-v1')!)).toContain('s1-like');
 });
});
