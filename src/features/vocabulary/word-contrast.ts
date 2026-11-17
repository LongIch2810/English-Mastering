export type Rule={title:string;detail:string;examples:[string,string,string?][]};
export type Pair={title:string;note:string;items:[string,string,string][]};
export type Guide={title:string;question:string;rules:Rule[];suffixes:string;traps:string[];pairs?:Pair[];wordClass?:boolean};

export const contrastGuides:Record<string,Guide>={
 preposition:{
  title:'Cách nhận biết và phân biệt giới từ (preposition)',
  question:'Từ này nối một danh từ, đại từ hoặc V-ing với phần còn lại của câu để chỉ thời gian, nơi chốn, phương tiện, nguyên nhân…?',
  rules:[
   {title:'1. Sau giới từ là danh từ, đại từ hoặc V-ing',detail:'Không dùng động từ nguyên mẫu sau giới từ. Phép thử: thay phần theo sau bằng “it” hoặc “something”.',examples:[['She is good at drawing.','Cô ấy vẽ giỏi.','at'],['Thank you for helping me.','Cảm ơn bạn đã giúp tôi.','for']]},
   {title:'2. Phân biệt “to” là giới từ hay “to” + động từ',detail:'Nếu thay được bằng danh từ thì “to” là giới từ và theo sau là V-ing (look forward to meeting). Nếu theo sau là động từ nguyên mẫu thì là to-infinitive.',examples:[['I look forward to meeting you.','Tôi mong được gặp bạn.','to + V-ing (giới từ)'],['I want to meet you.','Tôi muốn gặp bạn.','to + V (to-infinitive)']]},
   {title:'3. Giới từ thường đi cố định sau động từ hoặc tính từ',detail:'Phải học theo cụm: depend on, listen to, interested in, afraid of, married to, different from.',examples:[['It depends on the weather.','Điều đó tùy thời tiết.','on'],['He is afraid of dogs.','Anh ấy sợ chó.','of']]},
   {title:'4. Phân biệt giới từ và liên từ cùng hình thức',detail:'before, after, since, until: nếu theo sau là danh từ hoặc V-ing thì là giới từ; nếu theo sau là mệnh đề (chủ ngữ + động từ) thì là liên từ.',examples:[['Call me after lunch.','Gọi tôi sau bữa trưa.','after + danh từ'],['Call me after you finish.','Gọi tôi sau khi bạn xong.','after + mệnh đề']]}
  ],
  suffixes:'Giới từ là nhóm từ đóng, không có đuôi nhận biết. Nên học theo cặp: in/on/at, for/since, to/for, by/with, between/among.',
  pairs:[
   {title:'at – on – in (thời gian)',note:'at = một điểm thời gian; on = ngày; in = khoảng thời gian dài hơn.',items:[['The class starts at 7 o’clock.','Lớp bắt đầu lúc 7 giờ.','at + giờ, at night, at the weekend'],['We meet on Monday.','Chúng tôi gặp nhau vào thứ Hai.','on + thứ, ngày tháng'],['I was born in May, in 1995.','Tôi sinh vào tháng Năm, năm 1995.','in + tháng, năm, mùa, buổi']]},
   {title:'at – on – in (nơi chốn)',note:'at = một điểm; on = trên bề mặt; in = bên trong một không gian.',items:[['Wait for me at the bus stop.','Đợi tôi ở trạm xe buýt.','at: một điểm'],['The book is on the table.','Cuốn sách ở trên bàn.','on: bề mặt'],['She lives in Hanoi.','Cô ấy sống ở Hà Nội.','in: thành phố, căn phòng, cái hộp']]},
   {title:'for – since – during',note:'for + khoảng thời gian; since + mốc bắt đầu; during + sự kiện hoặc giai đoạn.',items:[['I have lived here for five years.','Tôi sống ở đây năm năm rồi.','for + khoảng thời gian'],['I have lived here since 2020.','Tôi sống ở đây từ năm 2020.','since + mốc thời gian'],['I fell asleep during the film.','Tôi ngủ quên trong lúc xem phim.','during + sự kiện']]},
   {title:'to – for',note:'to chỉ hướng hoặc người nhận; for chỉ mục đích hoặc người hưởng lợi.',items:[['She gave the book to him.','Cô ấy đưa cuốn sách cho anh ấy.','to: người nhận'],['She bought a gift for him.','Cô ấy mua quà cho anh ấy.','for: dành cho']]},
   {title:'by – with',note:'by + phương tiện hoặc người thực hiện; with + dụng cụ hoặc người đi cùng.',items:[['I go to work by bus.','Tôi đi làm bằng xe buýt.','by + phương tiện'],['She cut the paper with scissors.','Cô ấy cắt giấy bằng kéo.','with + dụng cụ'],['I went with my sister.','Tôi đi cùng chị gái.','with + người đi cùng']]},
   {title:'between – among',note:'between = giữa hai (hoặc vài) đối tượng riêng biệt; among = giữa nhiều đối tượng trong một nhóm.',items:[['The shop is between the bank and the school.','Cửa hàng nằm giữa ngân hàng và trường học.','between'],['She was happy among her friends.','Cô ấy vui khi ở giữa bạn bè.','among']]},
   {title:'in time – on time và at the end – in the end',note:'Hai cặp dễ nhầm vì nghĩa khác nhau.',items:[['We arrived in time for the film.','Chúng tôi đến kịp giờ chiếu phim.','in time = kịp lúc'],['The train left on time.','Tàu rời ga đúng giờ.','on time = đúng giờ'],['At the end of the month, I pay rent.','Cuối tháng tôi trả tiền thuê nhà.','at the end of = ở cuối một mốc'],['In the end, we chose the red one.','Cuối cùng chúng tôi chọn cái màu đỏ.','in the end = rốt cuộc']]}
  ],
  traps:['Sai thường gặp: “depend of”, “listen music”, “discuss about”. Đúng: depend on, listen to music, discuss (không cần giới từ).','arrive at (nơi nhỏ như sân bay, trạm) và arrive in (thành phố, quốc gia).','Giới từ không đổi hình theo ngôi hay thì; hãy học cả cụm động từ/tính từ + giới từ.']
 },
 collocation:{
  title:'Cách nhận biết và phân biệt collocations',
  question:'Hai từ này có đi cùng nhau một cách tự nhiên với người bản ngữ, hay chỉ là dịch từng chữ từ tiếng Việt?',
  rules:[
   {title:'1. Collocation là cặp từ thường đi cùng nhau',detail:'Nghĩa vẫn hiểu được nếu đổi từ, nhưng nghe không tự nhiên. Hãy học cả cụm thay vì từng từ.',examples:[['She made a decision quickly.','Cô ấy quyết định nhanh chóng.','make a decision (không nói do a decision)'],['It was heavy rain.','Trời mưa to.','heavy rain (không nói strong rain)']]},
   {title:'2. Động từ + danh từ',detail:'Động từ nào đi với danh từ nào thường phải nhớ riêng: make/do, take/have, give/get.',examples:[['I need to take a break.','Tôi cần nghỉ một lát.','take a break'],['He does the washing-up.','Anh ấy rửa bát.','do the washing-up']]},
   {title:'3. Tính từ + danh từ',detail:'Mỗi danh từ chọn tính từ riêng: heavy traffic, strong coffee, high price, fast food.',examples:[['The traffic was heavy this morning.','Sáng nay giao thông đông nghẹt.','heavy traffic'],['I like strong coffee.','Tôi thích cà phê đậm.','strong coffee']]},
   {title:'4. Trạng từ + tính từ',detail:'Trạng từ mức độ cũng có cặp quen: deeply grateful, highly recommended, completely different, fully aware.',examples:[['The hotel is highly recommended.','Khách sạn này được đánh giá rất cao.','highly recommended'],['I am deeply grateful.','Tôi vô cùng biết ơn.','deeply grateful']]},
   {title:'5. Cách kiểm tra',detail:'Tra từ điển collocation, đọc nhiều câu ví dụ thật, và lưu nguyên cụm vào “Từ vựng của tôi” thay vì lưu từng từ riêng.',examples:[]}
  ],
  suffixes:'Collocation không có dấu hiệu qua đuôi từ; hãy nhận biết bằng cặp từ quen dùng và ví dụ thật.',
  pairs:[
   {title:'make – do',note:'make thường là tạo ra một kết quả; do thường là thực hiện một việc hoặc nhiệm vụ.',items:[['I made a mistake.','Tôi đã mắc lỗi.','make a mistake / a decision / a plan / money'],['I do my homework every night.','Tối nào tôi cũng làm bài tập.','do homework / the housework / a job'],['She made dinner, and I did the dishes.','Cô ấy nấu bữa tối còn tôi rửa bát.','make dinner ≠ do the dishes']]},
   {title:'take – have',note:'Nhiều cụm cùng nghĩa nhưng chỉ đi với một động từ.',items:[['Let’s take a break.','Nghỉ một lát nhé.','take a break / a photo / a bus / a risk'],['I usually have a shower before work.','Tôi thường tắm trước khi đi làm.','have a shower / a meal / a rest / fun'],['She had breakfast and took a taxi.','Cô ấy ăn sáng rồi đi taxi.','have breakfast ≠ take a taxi']]},
   {title:'say – tell – speak – talk',note:'Mỗi động từ đi với danh từ và cấu trúc riêng.',items:[['She said hello.','Cô ấy nói xin chào.','say hello / sorry'],['He told me the truth.','Anh ấy nói thật với tôi.','tell the truth / a story / a lie'],['I can speak English.','Tôi nói được tiếng Anh.','speak a language'],['We talked about the plan.','Chúng tôi bàn về kế hoạch.','talk about / talk to someone']]},
   {title:'heavy – strong – high – big',note:'Cùng gợi nghĩa “nhiều/mạnh” nhưng mỗi danh từ chọn tính từ riêng.',items:[['There was heavy rain and heavy traffic.','Có mưa to và giao thông đông.','heavy rain / traffic'],['He drinks strong tea.','Anh ấy uống trà đậm.','strong tea / coffee / wind'],['Prices are very high.','Giá cả rất cao.','high price / speed / level'],['It was a big mistake.','Đó là một sai lầm lớn.','big mistake / problem / decision']]},
   {title:'get – become – go (thay đổi trạng thái)',note:'get thông dụng nhất; become trang trọng hơn; go thường chỉ thay đổi tiêu cực.',items:[['It gets dark early in winter.','Mùa đông trời tối sớm.','get dark / cold / tired'],['She became a doctor.','Cô ấy trở thành bác sĩ.','become + danh từ'],['The milk went bad.','Sữa bị hỏng.','go bad / wrong / mad']]}
  ],
  traps:['Không dịch từng chữ từ tiếng Việt: “làm một quyết định” → make a decision; “mưa mạnh” → heavy rain.','Một số cụm chỉ đi với một động từ: take a photo (không nói make a photo), do homework (không nói make homework).','Mức độ trang trọng khác nhau: have a go (thân mật), make an attempt (trang trọng).']
 }
};
