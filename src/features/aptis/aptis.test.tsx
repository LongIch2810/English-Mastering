// @vitest-environment jsdom
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {MemoryRouter,Route,Routes} from 'react-router-dom';
import {SpeechProvider} from '../../shared/speech';
import {AptisPart} from './aptis';
import {readAptis} from './aptis-store';
import {parts} from './data/aptis-data';
beforeEach(()=>{
 localStorage.clear();
 Object.defineProperty(window,'speechSynthesis',{value:Object.assign(new EventTarget(),{getVoices:()=>[],cancel:vi.fn(),speak:vi.fn()}),configurable:true});
});
afterEach(cleanup);
it('mỗi phần đều có trang định tuyến và nguồn chính thức',()=>{
 for(const part of parts){
  const route='/aptis/'+part.skill+'/part-'+part.number;
  const view=render(<SpeechProvider><MemoryRouter initialEntries={[route]}><Routes><Route path="/aptis/:skill/:part" element={<AptisPart/>}/></Routes></MemoryRouter></SpeechProvider>);
  expect(screen.getByRole('heading',{name:part.title})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'Nguồn'}));
  expect(screen.getByRole('link',{name:/Test Format Overview/}).getAttribute('href')).toContain('britishcouncil.org');
  view.unmount();
 }
});
it('giữ phần yêu thích và ghi chú sau khi mở lại',()=>{
 const renderPage=()=>render(<SpeechProvider><MemoryRouter initialEntries={['/aptis/reading/part-2']}><Routes><Route path="/aptis/:skill/:part" element={<AptisPart/>}/></Routes></MemoryRouter></SpeechProvider>);
 const view=renderPage();
 fireEvent.click(screen.getByRole('button',{name:/Lưu phần này/}));
 fireEvent.change(screen.getByLabelText('Ghi chú của bạn'),{target:{value:'Nhớ kiểm tra đại từ.'}});
 view.unmount();renderPage();
 expect(screen.getByDisplayValue('Nhớ kiểm tra đại từ.')).toBeTruthy();
 expect(readAptis().bookmarks).toContain('reading/2');
});
