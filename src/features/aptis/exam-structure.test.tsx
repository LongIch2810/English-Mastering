// @vitest-environment jsdom
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {MemoryRouter,Route,Routes} from 'react-router-dom';
import {SpeechProvider} from '../../shared/speech';
import {ExamStructure,Walkthrough} from './exam-structure';
import {AptisPart} from './aptis';
beforeEach(()=>{localStorage.clear();Object.defineProperty(window,'speechSynthesis',{value:Object.assign(new EventTarget(),{getVoices:()=>[],cancel:vi.fn(),speak:vi.fn()}),configurable:true})});
afterEach(cleanup);
it('hiển thị năm hợp phần và 18 phần học',()=>{
 render(<SpeechProvider><MemoryRouter><ExamStructure/></MemoryRouter></SpeechProvider>);
 expect(screen.getByRole('heading',{name:/Cấu trúc bài thi Aptis/})).toBeTruthy();
 expect(screen.getByText(/162 phút/)).toBeTruthy();
 expect(screen.getAllByRole('link',{name:/^Part \d:/})).toHaveLength(18);
});
it('walkthrough lưu trạng thái đã đọc mà không sửa tiến độ học từ vựng',()=>{
 localStorage.setItem('english-mastery-data-v1','{"saved":[],"learned":[1],"attempts":[],"reviews":[]}');
 render(<SpeechProvider><MemoryRouter initialEntries={['/aptis/walkthrough/1']}><Routes><Route path="/aptis/walkthrough/:step" element={<Walkthrough/>}/></Routes></MemoryRouter></SpeechProvider>);
 fireEvent.click(screen.getByRole('button',{name:'Đánh dấu đã đọc cấu trúc'}));
 expect(JSON.parse(localStorage.getItem('aptis-structure-read-v1')!)).toContain('grammar-vocabulary/1');
 expect(JSON.parse(localStorage.getItem('english-mastery-data-v1')!).learned).toEqual([1]);
 expect(screen.getByText(/Phần 1\/18/)).toBeTruthy();
});
