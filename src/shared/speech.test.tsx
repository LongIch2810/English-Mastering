// @vitest-environment jsdom
import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {AudioButton,SpeechControls,SpeechProvider} from './speech';

const voices=[{name:'English UK',lang:'en-GB',voiceURI:'uk'},{name:'English US',lang:'en-US',voiceURI:'us'}] as SpeechSynthesisVoice[];
let synth: EventTarget & {getVoices:ReturnType<typeof vi.fn>;speak:ReturnType<typeof vi.fn>;cancel:ReturnType<typeof vi.fn>;pause:ReturnType<typeof vi.fn>;resume:ReturnType<typeof vi.fn>};
beforeEach(()=>{
  localStorage.clear();
  synth=Object.assign(new EventTarget(),{getVoices:vi.fn(()=>voices),speak:vi.fn(),cancel:vi.fn(),pause:vi.fn(),resume:vi.fn()});
  Object.defineProperty(window,'speechSynthesis',{value:synth,configurable:true});
  vi.stubGlobal('SpeechSynthesisUtterance',class {text:string;voice?:SpeechSynthesisVoice;lang='';rate=1;constructor(text:string){this.text=text}});
});
afterEach(()=>{cleanup();vi.unstubAllGlobals()});
describe('phát âm trình duyệt',()=>{
  it('ưu tiên en-US, phát cả câu và điều khiển trình phát',()=>{
    render(<SpeechProvider><AudioButton text="I am always busy."/><SpeechControls/></SpeechProvider>);
    fireEvent.click(screen.getByLabelText('Nghe: I am always busy.'));
    expect(synth.speak).toHaveBeenCalledOnce();
    const utterance=synth.speak.mock.calls[0][0];
    expect(utterance.text).toBe('I am always busy.');
    expect(utterance.voice.lang).toBe('en-US');
    fireEvent.click(screen.getByText('Tạm dừng'));expect(synth.pause).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByText('Tiếp tục'));expect(synth.resume).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByText('Dừng'));expect(synth.cancel).toHaveBeenCalled();
  });
  it('lưu lựa chọn giọng và tốc độ, cảnh báo khi không dùng en-US',()=>{
    render(<SpeechProvider><AudioButton text="hello"/><SpeechControls/></SpeechProvider>);
    fireEvent.change(screen.getByLabelText('Giọng'),{target:{value:'uk'}});
    fireEvent.change(screen.getByLabelText('Tốc độ'),{target:{value:'1.25'}});
    expect(localStorage.getItem('voice')).toBe('uk');
    expect(localStorage.getItem('rate')).toBe('1.25');
    expect(screen.getByText(/Giọng không phải en-US/)).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Nghe: hello'));
    expect(synth.speak.mock.calls[0][0].rate).toBe(1.25);
  });
});
