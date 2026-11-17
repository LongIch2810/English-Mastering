// @vitest-environment jsdom
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
import {SpeechProvider} from '../../shared/speech';
import {RecognitionGuide,guides} from './word-recognition';
beforeEach(()=>{Object.defineProperty(window,'speechSynthesis',{value:Object.assign(new EventTarget(),{getVoices:()=>[],cancel:vi.fn(),speak:vi.fn()}),configurable:true})});
afterEach(cleanup);
it('có hướng dẫn cho cả năm loại từ',()=>{
 for(const kind of ['verb','adjective','adverb','preposition','collocation']){
  render(<SpeechProvider><RecognitionGuide kind={kind}/></SpeechProvider>);
  expect(screen.getByText(guides[kind].title)).toBeTruthy();
  expect(guides[kind].rules.length).toBeGreaterThanOrEqual(4);
  cleanup();
 }
});
it('giới từ và collocations có các cặp ví dụ phân biệt, từ loại thì không',()=>{
 expect(guides.preposition.pairs!.length).toBeGreaterThanOrEqual(6);
 expect(guides.collocation.pairs!.length).toBeGreaterThanOrEqual(4);
 render(<SpeechProvider><RecognitionGuide kind="preposition"/></SpeechProvider>);
 expect(screen.getByText('Ví dụ phân biệt')).toBeTruthy();
 expect(screen.getByText('for – since – during')).toBeTruthy();
 expect(screen.queryByText('Bảng so sánh nhanh')).toBeNull();
 cleanup();
 render(<SpeechProvider><RecognitionGuide kind="verb"/></SpeechProvider>);
 expect(screen.queryByText('Ví dụ phân biệt')).toBeNull();
 expect(screen.getByText('Bảng so sánh nhanh')).toBeTruthy();
});
it('không hiển thị cho loại khác',()=>{
 const {container}=render(<SpeechProvider><RecognitionGuide kind="unknown"/></SpeechProvider>);
 expect(container.textContent).toBe('');
});
