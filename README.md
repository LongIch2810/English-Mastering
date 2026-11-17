# English Mastery

Ứng dụng React học tiếng Anh bằng tiếng Việt. Nội dung học được đóng gói sẵn; ứng dụng không chạy backend, không cần cơ sở dữ liệu hoặc khóa API. Tra cứu hiện chỉ tìm trong bộ từ có sẵn.

## Chạy

Cần Node.js 22.12 trở lên và npm để build:

```powershell
npm install
npm run build
```

Mở trực tiếp `dist/index.html` trong trình duyệt. File build chứa toàn bộ mã ứng dụng; không cần chạy server để sử dụng. Khi phát triển dùng `npm run dev` để mở Vite tại http://127.0.0.1:4180 (cổng cố định, đổi trong `vite.config.ts`); đây không phải backend của ứng dụng.

Từ đã lưu, lịch ôn, tiến độ và cài đặt giọng được lưu trong trình duyệt trên thiết bị. Xóa dữ liệu trình duyệt hoặc đổi trình duyệt có thể làm mất dữ liệu này; lưu trữ không tự đồng bộ giữa thiết bị. Mở file trực tiếp có thể có chính sách lưu trữ khác nhau tùy trình duyệt.

## Nội dung và phát âm

Bộ từ gồm 150 tính từ, 150 động từ, 50 trạng từ, 50 cụm từ và 15 giới từ. Nội dung được biên soạn cho người học từ cơ bản đến trung cấp; chưa có nguồn xác minh CEFR cho từng mục nên không gán nhãn A1–B2 tùy ý.

Phiên âm từ đơn được chuyển từ ARPABET của [CMU Pronouncing Dictionary](https://github.com/cmusphinx/cmudict); [giấy phép nguồn](docs/licenses/CMUDICT-LICENSE.txt) được lưu kèm. Dữ liệu gốc ghi trọng âm trên nguyên âm mà không đánh dấu ranh giới âm tiết, nên ứng dụng nêu thứ tự **nguyên âm** được nhấn thay vì tự đoán ranh giới âm tiết. Phần gần âm tiếng Việt là gợi ý từng âm, không phải phiên âm chính xác; một số từ có nhiều cách đọc tùy ngữ cảnh. Cụm từ chưa có phiên âm được đánh dấu rõ. Web Speech API phát âm trên thiết bị, ưu tiên giọng en-US nếu có. Chất lượng và âm sắc phụ thuộc trình duyệt, hệ điều hành và giọng đã cài.

Tổng quan Aptis dựa trên [British Council, Aptis ESOL General Test Format Overview](https://www.britishcouncil.org/sites/default/files/aptis_esol_general_test_format_overview_2023.pdf), kiểm tra ngày 17/11/2026.

`npm test` chạy kiểm thử lịch ôn, lưu trữ và phát âm bằng mock. Cần kiểm tra thủ công phát âm trên Chrome/Edge. Chưa có E2E.

## Các phần chưa hoàn thiện

Module Aptis có 18 trang phần học với hướng dẫn, mẹo, ví dụ giải chi tiết tự biên soạn và lưu tiến độ riêng trong localStorage. Ứng dụng không có phần luyện tập hay thi thử. Nội dung tự biên soạn không phải đề thi chính thức. Giọng Web Speech phụ thuộc thiết bị. Xem [nghiên cứu nguồn Aptis](docs/aptis-official-research.md).

Mục **Cấu trúc Aptis A–Z** giới thiệu năm hợp phần và hướng dẫn tuần tự 18 phần. Trang **Làm quen giao diện thi** là giao diện minh họa của website, không phải bản sao phần mềm thi British Council. Trạng thái đã đọc cấu trúc lưu riêng trong localStorage.

**BREM — Speaking & Writing** có các khung tự biên soạn cho cả tám Part, điền ô, sửa bài, nghe, đếm từ, ngân hàng câu và lưu bài trong localStorage. Mỗi dạng câu hỏi có mẫu tham khảo A2/B1/B2 tự biên soạn (không phải mức điểm đã thẩm định). BREM không phải phương pháp chấm điểm chính thức; hệ thống không tự kiểm tra ngữ pháp hay chấm điểm.

Lịch ôn từ vựng là biến thể đơn giản của SM-2, không phải FSRS.

## Cấu trúc thư mục

```
src/
  main.tsx                    # điểm vào, bố cục, định tuyến, các trang từ vựng cơ bản
  styles/style.css
  shared/                     # dùng chung: phát âm bằng Web Speech (speech.tsx)
  features/
    vocabulary/               # từ vựng, flashcards, lịch ôn, hướng dẫn nhận biết từ loại
      data/                   # bộ từ (words, extra-words, more-words, final-words)
    pronunciation/            # phiên âm CMUdict và cách đọc tiếng Việt
    aptis/                    # hướng dẫn 18 phần Aptis, cấu trúc đề, lưu tiến độ
      data/
    brem/                     # khung BREM cho Speaking và Writing
      data/
docs/                         # nghiên cứu nguồn và giấy phép dữ liệu
```
Kiểm thử đặt cạnh file được kiểm thử (`*.test.ts`, `*.test.tsx`).
