import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
type Speech = {voices:SpeechSynthesisVoice[];voice:string;setVoice:(v:string)=>void;rate:number;setRate:(n:number)=>void;status:string;play:(text:string)=>void;pause:()=>void;resume:()=>void;stop:()=>void;replay:()=>void};
const Context=createContext<Speech|null>(null);
export function SpeechProvider({children}:{children:ReactNode}) {
  const [voices,setVoices]=useState<SpeechSynthesisVoice[]>([]);
  const [voice,setVoiceState]=useState(localStorage.getItem('voice')||'');
  const [rate,setRateState]=useState(Number(localStorage.getItem('rate'))||1);
  const [status,setStatus]=useState('Sẵn sàng');
  const last=useRef(''), sequence=useRef(0);
  const supported=typeof window!=='undefined' && 'speechSynthesis' in window;
  useEffect(()=>{
    if(!supported)return;
    const synth=window.speechSynthesis;
    const load=()=>setVoices(synth.getVoices().filter(v=>v.lang.toLowerCase().startsWith('en')));
    load(); synth.addEventListener('voiceschanged',load);
    return ()=>{sequence.current++; synth.removeEventListener('voiceschanged',load); synth.cancel();};
  },[supported]);
  const selected=voices.find(v=>v.voiceURI===voice)||voices.find(v=>v.lang.toLowerCase()==='en-us')||voices[0];
  const setVoice=(v:string)=>{setVoiceState(v);localStorage.setItem('voice',v)};
  const setRate=(n:number)=>{setRateState(n);localStorage.setItem('rate',String(n))};
  const play=(text:string)=>{
    if(!supported||!selected){setStatus('Không có giọng tiếng Anh khả dụng trên thiết bị.');return;}
    const current=++sequence.current;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text); u.voice=selected;u.lang=selected.lang;u.rate=rate;
    u.onstart=()=>{if(current===sequence.current)setStatus('Đang đọc')};
    u.onend=()=>{if(current===sequence.current)setStatus('Đã đọc xong')};
    u.onerror=()=>{if(current===sequence.current)setStatus('Không thể phát âm. Hãy thử lại.')};
    last.current=text;window.speechSynthesis.speak(u);
  };
  return <Context.Provider value={{voices,voice:selected?.voiceURI||'',setVoice,rate,setRate,status:supported?status:'Trình duyệt không hỗ trợ phát âm.',play,pause:()=>{window.speechSynthesis?.pause();setStatus('Đã tạm dừng')},resume:()=>{window.speechSynthesis?.resume();setStatus('Đang đọc')},stop:()=>{sequence.current++;window.speechSynthesis?.cancel();setStatus('Đã dừng')},replay:()=>{if(last.current)play(last.current)}}}>{children}</Context.Provider>;
}
export function useSpeechSynthesis(){const value=useContext(Context);if(!value)throw new Error('Missing SpeechProvider');return value}
export function AudioButton({text}:{text:string}){const speech=useSpeechSynthesis();return <button type="button" className="audio" onClick={()=>speech.play(text)} aria-label={'Nghe: '+text} title="Nghe phát âm">◖))</button>}
export function SpeechControls(){const s=useSpeechSynthesis(),v=s.voices.find(v=>v.voiceURI===s.voice);return <section className="speech"><div><strong>Giọng đọc</strong><span className="muted" role="status"> · {s.status}</span></div><div className="speech-row"><label>Giọng <select value={s.voice} onChange={e=>s.setVoice(e.target.value)}>{s.voices.length===0&&<option value="">Không có giọng tiếng Anh</option>}{s.voices.map(v=><option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}</select></label><label>Tốc độ <select value={s.rate} onChange={e=>s.setRate(Number(e.target.value))}><option value={0.75}>0,75×</option><option value={1}>1×</option><option value={1.25}>1,25×</option></select></label><button onClick={s.pause}>Tạm dừng</button><button onClick={s.resume}>Tiếp tục</button><button onClick={s.stop}>Dừng</button><button onClick={s.replay}>Nghe lại</button></div>{v&&v.lang.toLowerCase()!=='en-us'&&<small>Giọng không phải en-US; chất lượng và âm sắc phụ thuộc thiết bị.</small>}</section>}
