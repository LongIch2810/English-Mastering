import {AudioButton} from '../../shared/speech';
import {contrastGuides,type Guide,type Rule} from './word-contrast';


const wordClassGuides:Record<string,Guide>={
 verb:{
  title:'Cách nhận biết động từ (verb) trong câu',
  question:'Từ này cho biết hành động, hoạt động hoặc trạng thái của chủ ngữ?',
  rules:[
   {title:'1. Đứng ngay sau chủ ngữ',detail:'Động từ chính thường theo sau chủ ngữ (danh từ hoặc đại từ).',examples:[['She works in a bank.','Cô ấy làm việc ở ngân hàng.','works'],['The children play outside.','Bọn trẻ chơi ở ngoài.','play']]},
   {title:'2. Đứng sau trợ động từ hoặc động từ khuyết thiếu',detail:'Sau can, will, should, must, do/does/did, have/has… là động từ nguyên mẫu hoặc phân từ.',examples:[['I can swim.','Tôi biết bơi.','swim'],['They have finished.','Họ đã xong.','finished']]},
   {title:'3. Đứng sau “to”',detail:'To + động từ nguyên mẫu (to V). Cẩn thận: “to” cũng có thể là giới từ (to the station).',examples:[['I want to learn English.','Tôi muốn học tiếng Anh.','learn'],['We went to the station.','Chúng tôi đến nhà ga.','(“to” là giới từ; station là danh từ)']]},
   {title:'4. Có thể đổi thì, đổi ngôi',detail:'Động từ đổi hình thức: work → works → worked → working. Danh từ và tính từ không đổi như vậy.',examples:[['He works. / He worked. / He is working.','Anh ấy làm việc (hiện tại / quá khứ / đang).','work']]}
  ],
  suffixes:'Đuôi thường gặp (chỉ là gợi ý): -ize/-ise (realize), -ify (simplify), -ate (activate), -en (widen), tiền tố en-/be- (enjoy, become).',
  traps:['Nhiều từ vừa là động từ vừa là danh từ: a walk / to walk, a play / to play, a drink / to drink. Phải nhìn vị trí trong câu.','V-ing có thể là động từ (is reading), danh từ (Reading is fun) hoặc tính từ (an interesting book).','Cùng một từ đổi vai trò theo câu: “Water the plants” (động từ) và “a glass of water” (danh từ).']
 },
 adjective:{
  title:'Cách nhận biết tính từ (adjective) trong câu',
  question:'Từ này mô tả đặc điểm, tính chất của một danh từ hoặc đại từ?',
  rules:[
   {title:'1. Đứng trước danh từ',detail:'Vị trí phổ biến nhất: (mạo từ) + tính từ + danh từ.',examples:[['She has a beautiful voice.','Cô ấy có giọng hát đẹp.','beautiful'],['It is an important decision.','Đó là một quyết định quan trọng.','important']]},
   {title:'2. Đứng sau “be” và động từ nối',detail:'Sau be, become, seem, look, feel, sound, taste, get… dùng tính từ, không dùng trạng từ.',examples:[['The soup tastes delicious.','Món súp có vị ngon.','delicious'],['He looks tired.','Anh ấy trông mệt.','tired']]},
   {title:'3. Thêm được “very”, “so”, “too”',detail:'Very + tính từ là phép thử nhanh (very big, so happy, too cold).',examples:[['The room is very small.','Căn phòng rất nhỏ.','small']]},
   {title:'4. Có dạng so sánh',detail:'Tính từ có thể so sánh hơn / nhất: big → bigger → biggest; useful → more useful → most useful.',examples:[['This book is more useful than that one.','Cuốn này hữu ích hơn cuốn kia.','useful']]}
  ],
  suffixes:'Đuôi thường gặp (chỉ là gợi ý): -ful (careful), -less (useless), -ous (famous), -able/-ible (comfortable), -ive (active), -al (national), -ic (basic), -y (happy), -ish, -ent/-ant.',
  traps:['Không phải từ nào đuôi -ly cũng là trạng từ: friendly, lovely, lonely, daily, weekly, early là tính từ (daily/weekly/early còn là trạng từ).','Sau động từ nối dùng tính từ: “She looks happy” đúng; “She looks happily” sai.','Tính từ không có dạng số nhiều: a big house / big houses.']
 },
 adverb:{
  title:'Cách nhận biết trạng từ (adverb) trong câu',
  question:'Từ này cho biết cách thức, thời gian, nơi chốn, tần suất hoặc mức độ của hành động, tính từ hoặc câu?',
  rules:[
   {title:'1. Bổ nghĩa cho động từ',detail:'Trả lời “như thế nào / khi nào / ở đâu / thường xuyên không”. Hay đứng sau động từ hoặc sau tân ngữ.',examples:[['She speaks clearly.','Cô ấy nói rõ ràng.','clearly'],['We met yesterday.','Chúng tôi gặp nhau hôm qua.','yesterday']]},
   {title:'2. Đứng trước tính từ hoặc trạng từ khác',detail:'Chỉ mức độ: very, quite, extremely, really, too, so.',examples:[['The test was extremely difficult.','Bài kiểm tra cực kỳ khó.','extremely'],['He drives very carefully.','Anh ấy lái xe rất cẩn thận.','very']]},
   {title:'3. Trạng từ tần suất: trước động từ thường, sau “be”',detail:'always, usually, often, sometimes, never… đứng giữa trợ động từ và động từ chính, hoặc sau be.',examples:[['I always drink tea.','Tôi luôn uống trà.','always'],['She is never late.','Cô ấy không bao giờ trễ.','never']]},
   {title:'4. Đứng đầu câu hoặc cuối câu',detail:'Bổ nghĩa cho cả câu; thường có dấu phẩy khi đứng đầu câu.',examples:[['Unfortunately, the shop was closed.','Tiếc là cửa hàng đã đóng.','Unfortunately'],['I will call you tomorrow.','Tôi sẽ gọi bạn vào ngày mai.','tomorrow']]}
  ],
  suffixes:'Đuôi -ly thường là dấu hiệu (quickly, carefully, happily) nhưng không bắt buộc. Trạng từ không đuôi -ly: very, well, fast, hard, late, soon, often, always, never, just, still, already, here, there, now, then.',
  traps:['fast, hard, late, early vừa là tính từ vừa là trạng từ: a fast car (tính từ) / drives fast (trạng từ).','good là tính từ, well là trạng từ: a good singer / sings well. Riêng “well” còn là tính từ khi nói sức khỏe: I feel well.','hard ≠ hardly: works hard (chăm chỉ), hardly works (hầu như không làm). late ≠ lately: arrived late (muộn), lately (gần đây).']
 }
};

export const guides:Record<string,Guide>={...wordClassGuides,...contrastGuides};

const rows:[string,string,string,string][]=[
 ['Hỏi gì?','Hành động / trạng thái gì?','Danh từ ấy như thế nào? (loại nào)','Hành động xảy ra thế nào / khi nào / ở đâu / mức độ nào?'],
 ['Vị trí điển hình','Sau chủ ngữ, sau modal, sau to','Trước danh từ; sau be / look / feel / seem','Sau động từ, trước tính từ, đầu hoặc cuối câu'],
 ['Phép thử','Đổi được thì (work / worked)','Thêm được very; có dạng so sánh','Bỏ đi câu vẫn đủ nghĩa; bổ nghĩa cho từ không phải danh từ'],
 ['Ví dụ','She sings.','a quiet room','sings quietly']
];

export function RecognitionGuide({kind}:{kind:string}){
 const guide=guides[kind];
 if(!guide)return null;
 return <details className="word-card" open><summary><strong>{guide.title}</strong></summary>
  <p className="notice">Câu hỏi chính: {guide.question}</p>
  {guide.rules.map(rule=><section key={rule.title}><h3>{rule.title}</h3><p>{rule.detail}</p>{rule.examples.map(([en,vi,mark])=><div className="examples" key={en}><p>{en} <AudioButton text={en}/></p><small>{vi}{mark&&' · Từ cần chú ý: '+mark}</small></div>)}</section>)}
  {guide.pairs&&<><h3>Ví dụ phân biệt</h3>{guide.pairs.map(pair=><section className="word-card" key={pair.title}><h4>{pair.title}</h4><p>{pair.note}</p>{pair.items.map(([en,vi,mark])=><div className="examples" key={en}><p>{en} <AudioButton text={en}/></p><small>{vi} · {mark}</small></div>)}</section>)}</>}
  <h3>{guide.pairs?'Ghi nhớ':'Dấu hiệu từ loại qua đuôi từ'}</h3><p>{guide.suffixes}</p>
  <h3>Dễ nhầm</h3><ul>{guide.traps.map(t=><li key={t}>{t}</li>)}</ul>
  {guide.pairs?null:<><h3>Bảng so sánh nhanh</h3>
  <div style={{overflowX:'auto'}}><table><thead><tr><th></th><th>Động từ</th><th>Tính từ</th><th>Trạng từ</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}>{r.map((c,i)=>i===0?<th key={i} scope="row">{c}</th>:<td key={i}>{c}</td>)}</tr>)}</tbody></table></div></>}
  {guide.pairs?null:<><h3>Phân tích một câu</h3>
  <p>She <b>quietly</b> opened the <b>old</b> door. <AudioButton text="She quietly opened the old door."/></p>
  <ul><li><b>opened</b> — động từ: đứng sau chủ ngữ “She”, chia ở quá khứ.</li><li><b>quietly</b> — trạng từ: trả lời “opened như thế nào?”.</li><li><b>old</b> — tính từ: đứng trước danh từ “door”, mô tả cánh cửa.</li></ul></>}
  <p className="notice">Cách dùng phụ thuộc vị trí và ngữ cảnh trong câu, không chỉ vào hình thức của từ. Khi không chắc, hãy tra từ điển và đọc thêm ví dụ thật.</p>
 </details>;
}
