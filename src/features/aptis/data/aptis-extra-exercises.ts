import type {Quiz} from './aptis-data';
export const extraExercises:Record<string,Quiz[]>={
 'grammar-vocabulary/1':[
  {question:'They ___ dinner when I called.',options:['were having','was having','has'],answer:0,explanation:'“They” đi với “were”; hành động đang diễn ra khi cuộc gọi đến dùng “were having”. “Was” không hòa hợp; “has” sai dạng và thì.'},
  {question:'If it rains, we ___ at home.',options:['will stay','stayed','staying'],answer:0,explanation:'Trong điều kiện loại một, mệnh đề if dùng hiện tại và mệnh đề chính có thể dùng “will + V”. Hai phương án còn lại không hoàn chỉnh theo cấu trúc này.'},
  {question:'This book is ___ than that one.',options:['more interesting','most interesting','interest'],answer:0,explanation:'“Than” báo hiệu so sánh hơn; “more interesting” phù hợp. “Most” là so sánh nhất; “interest” không đúng dạng.'},
  {question:'The report ___ yesterday.',options:['was written','is write','writing'],answer:0,explanation:'Báo cáo được viết trong quá khứ: “was written” là bị động quá khứ. Hai dạng còn lại không tạo thành câu đúng.'}
 ],
 'grammar-vocabulary/2':[
  {question:'Please ___ attention to the instructions.',options:['pay','give up','borrow'],answer:0,explanation:'Cụm “pay attention to” nghĩa là chú ý đến. “Give up” là từ bỏ; “borrow” là mượn.'},
  {question:'I am interested ___ learning English.',options:['in','at','from'],answer:0,explanation:'Cấu trúc “interested in + V-ing”; “at” và “from” không phù hợp trong cấu trúc này.'},
  {question:'Which word is closest in meaning to “begin”?',options:['start','finish','forget'],answer:0,explanation:'“Start” gần nghĩa với “begin”. “Finish” là kết thúc; “forget” là quên.'},
  {question:'She felt ___ when she learned that she had passed the exam.',options:['relieved','wooden','square'],answer:0,explanation:'“Relieved” diễn tả cảm giác nhẹ nhõm khi biết mình đã đỗ; hai từ còn lại mô tả vật liệu và hình dạng.'}
 ],
 'reading/1':[
  {question:'The shop is closed today, ___ it will open tomorrow.',options:['but','because','if'],answer:0,explanation:'“But” nối hai ý tương phản: hôm nay đóng cửa, ngày mai mở cửa.'},
  {question:'Please bring an umbrella. It is ___ outside.',options:['raining','rain','rained'],answer:0,explanation:'“It is raining” mô tả trời đang mưa; “rain” và “rained” không phù hợp sau “is” ở đây.'},
  {question:'I put the keys ___ the table.',options:['on','during','since'],answer:0,explanation:'“On the table” chỉ vị trí trên bề mặt bàn; “during” và “since” không chỉ vị trí đó.'},
  {question:'Our class starts at nine, so please arrive ___ nine.',options:['before','because','between'],answer:0,explanation:'“Before nine” phù hợp với yêu cầu đến trước giờ bắt đầu; “because” và “between” không tạo cụm phù hợp.'}
 ],
 'listening/1':[
  {question:'Where should the visitor wait?',audio:'Please do not wait in the lobby. Our meeting room is on the second floor, so wait outside that room.',options:['Outside the meeting room','In the lobby','At the bus stop'],answer:0,explanation:'Người nói yêu cầu không đợi ở sảnh và đợi ngoài phòng họp.'},
  {question:'How much is the ticket now?',audio:'The ticket used to cost twelve dollars. The new price is fifteen dollars.',options:['Fifteen dollars','Twelve dollars','Twenty dollars'],answer:0,explanation:'Mười hai đô là giá cũ; giá mới là mười lăm đô.'},
  {question:'Which day is the class?',audio:'The class was on Tuesday last month. It now meets every Thursday.',options:['Thursday','Tuesday','Saturday'],answer:0,explanation:'Thứ Ba là lịch tháng trước; hiện lớp học vào thứ Năm.'},
  {question:'What should the customer bring?',audio:'You do not need to bring a printed receipt. Please bring the card you used to pay.',options:['The payment card','A printed receipt','A passport'],answer:0,explanation:'Người nói yêu cầu mang thẻ đã dùng thanh toán và nói không cần hóa đơn in.'}
 ],
 'reading/3':[
  {question:'Noah: “I enjoy working from home because I no longer spend two hours on the train.” Who values avoiding a long commute?',options:['Noah','Không đủ thông tin','Không ai'],answer:0,explanation:'Noah nói không còn mất hai giờ đi tàu; điều đó tương đương tránh hành trình đi làm dài.'},
  {question:'Linh: “I liked the course, although the room was too cold.” Who liked the course despite a problem?',options:['Linh','Không đủ thông tin','Không ai'],answer:0,explanation:'“Although” cho thấy Linh thích khóa học dù phòng quá lạnh.'},
  {question:'Omar: “I used to prefer buses, but now I cycle.” Who changed a travel preference?',options:['Omar','Không đủ thông tin','Không ai'],answer:0,explanation:'Omar từng thích xe buýt nhưng hiện đi xe đạp; sở thích di chuyển đã thay đổi.'},
  {question:'Anna: “The event was affordable, but I wanted more time for questions.” Who wanted a longer discussion?',options:['Anna','Không đủ thông tin','Không ai'],answer:0,explanation:'Anna muốn có thêm thời gian đặt câu hỏi; giá phải chăng là một ý khác.'}
 ],
 'reading/4':[
  {question:'The museum introduced guided tours for children. Families can now explore the collection together, and the tours include activities for younger visitors. What is the main idea?',options:['Making the museum welcoming to families','Why the museum closed','How paintings are repaired'],answer:0,explanation:'Các chi tiết đều nói về chuyến tham quan và hoạt động giúp gia đình trải nghiệm bảo tàng.'},
  {question:'A small town planted trees along its streets. The shade now makes walking more pleasant on hot days, and local residents enjoy the greener surroundings. What is the main idea?',options:['Benefits of planting trees in town','How to buy a house','Reasons to drive more'],answer:0,explanation:'Hai lợi ích của cây là bóng mát và không gian xanh; các lựa chọn còn lại không được đề cập.'},
  {question:'The club moved its lessons online during winter. Members who live far away can now participate without traveling, although some still prefer meeting in person. What is the main idea?',options:['Online lessons make participation easier for distant members','Members never want to meet in person','Winter lessons were canceled'],answer:0,explanation:'Việc học trực tuyến giúp người ở xa tham gia; đoạn nói một số người vẫn thích gặp trực tiếp, và không nói lớp bị hủy.'},
  {question:'The school asked students to bring reusable bottles. This reduced the number of disposable cups used each day and helped staff collect less waste. What is the main idea?',options:['Reducing waste with reusable bottles','Selling more disposable cups','Teaching students to cook'],answer:0,explanation:'Hai câu nêu biện pháp dùng bình tái sử dụng và kết quả giảm rác; hai lựa chọn khác không phù hợp.'}
 ],
 'listening/2':[
  {question:'Why does the speaker prefer the train?',audio:'I choose the train because I can read during the journey instead of concentrating on driving.',options:['To read while traveling','To drive faster','To buy a car'],answer:0,explanation:'Người nói chọn tàu để có thể đọc trong chuyến đi.'},
  {question:'What attracted the speaker to the course?',audio:'The course meets in the evening, so I can attend after my daytime job.',options:['Its evening schedule','Its free meals','Its weekend trips'],answer:0,explanation:'Lịch buổi tối phù hợp với công việc ban ngày; không có thông tin về bữa ăn hay chuyến đi.'},
  {question:'Why did the speaker join the club?',audio:'I joined the gardening club to meet neighbors who share my interest in plants.',options:['To meet people with a shared interest','To sell a house','To learn to drive'],answer:0,explanation:'Người nói muốn gặp hàng xóm có cùng sở thích cây cối.'},
  {question:'What does the speaker like about the market?',audio:'I like the market because the fruit comes from farms nearby, and I can talk to the growers.',options:['Local produce and contact with growers','Late-night movies','A large parking garage'],answer:0,explanation:'Người nói thích trái cây từ nông trại gần đó và cơ hội trò chuyện với người trồng.'}
 ],
 'listening/3':[
  {question:'Who thinks the bus is convenient?',audio:'Man: The bus is convenient because it stops near my office. Woman: I disagree. The bus is inconvenient for me, so I walk.',options:['Cả hai','Chỉ người nam','Chỉ người nữ'],answer:1,explanation:'Người nam nói xe buýt tiện lợi; người nữ nói xe buýt bất tiện với mình.'},
  {question:'Who wants more time for questions?',audio:'Woman: The talk was interesting, but I wanted more time for questions. Man: I agree. The question session ended too quickly.',options:['Cả hai','Chỉ người nam','Chỉ người nữ'],answer:0,explanation:'Người nữ muốn thêm thời gian; người nam đồng ý và nói phần hỏi đáp kết thúc quá nhanh.'},
  {question:'Who prefers a morning meeting?',audio:'Man: I would rather meet in the morning. Woman: Afternoon works better for me.',options:['Chỉ người nam','Chỉ người nữ','Cả hai'],answer:0,explanation:'Người nam thích buổi sáng; người nữ thích buổi chiều.'},
  {question:'Who thinks the room is too small?',audio:'Woman: This room is too small for our group. Man: I think it is large enough.',options:['Chỉ người nữ','Chỉ người nam','Cả hai'],answer:0,explanation:'Người nữ nói phòng quá nhỏ; người nam cho rằng phòng đủ lớn.'}
 ],
 'listening/4':[
  {question:'How does the speaker feel about the course?',audio:'The course took more time than I expected, but the feedback helped me improve. I would recommend it to others.',options:['Positive despite a difficulty','Completely negative','Unable to form an opinion'],answer:0,explanation:'Người nói gặp khó khăn về thời gian nhưng đánh giá phản hồi hữu ích và sẽ giới thiệu khóa học.'},
  {question:'What is the speaker trying to do?',audio:'We have a new recycling system at work. Please separate paper from food waste so that both can be collected properly.',options:['Explain what listeners should do','Sell a new product','Describe a holiday'],answer:0,explanation:'Người nói hướng dẫn tách giấy khỏi rác thực phẩm; không bán hàng hay kể chuyến nghỉ.'},
  {question:'What is the speaker’s attitude to the proposal?',audio:'The proposal has some useful ideas, but I would like to see evidence about the cost before we make a decision.',options:['Cautiously interested','Entirely opposed','Already certain it will work'],answer:0,explanation:'Người nói thấy có ý hữu ích nhưng muốn thêm bằng chứng trước khi quyết định.'},
  {question:'Why does the speaker mention a missed train?',audio:'I once missed the last train because I did not check the schedule. Now I always check the final departure before leaving.',options:['To explain a lesson learned','To advertise a station','To complain about a meal'],answer:0,explanation:'Trải nghiệm lỡ chuyến giải thích vì sao người nói giờ luôn kiểm tra giờ tàu cuối.'}
 ]
};
