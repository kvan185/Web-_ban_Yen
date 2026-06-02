import CategoryShowcasePage from '@/components/CategoryShowcasePage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Combo quà tặng dưỡng sức khoẻ tại Yến Tinh Hoa',
  description:
    'Các combo yến dưỡng sức khoẻ phù hợp cho người cần bồi bổ thể trạng, phục hồi sau mệt mỏi hoặc làm quà sức khoẻ thiết thực.',
  pathname: '/wellness-gift-combo',
  keywords: ['combo dưỡng sức khoẻ', 'quà tặng sức khoẻ', 'combo yến phục hồi', 'set quà yến cao cấp'],
});

export default function WellnessGiftComboPage() {
  return (
    <CategoryShowcasePage
      categoryName="Combo quà tặng dưỡng sức khoẻ"
      eyebrow="Quà tặng dưỡng sức"
      title="Combo quà tặng dưỡng sức khoẻ từ yến sào cho nhu cầu bồi bổ và phục hồi"
      intro="Nhóm combo này phù hợp cho người cần chăm sóc thể trạng, bồi bổ sau giai đoạn mệt mỏi hoặc muốn chọn quà sức khoẻ có giá trị sử dụng rõ ràng."
      pageName="Combo dưỡng sức khoẻ đang bán"
      pagePath="/wellness-gift-combo"
      pageDescription="Trang giới thiệu các combo yến dưỡng sức khoẻ tại Yến Tinh Hoa."
      sectionTitle="Điểm nổi bật của combo dưỡng sức"
      whyTitle="Vì sao nên chọn combo dưỡng sức khoẻ?"
      whyParagraphs={[
        'Khác với quà biếu thông thường, combo dưỡng sức khoẻ tập trung nhiều hơn vào giá trị sử dụng thực tế. Đây là lựa chọn phù hợp khi bạn muốn gửi gắm sự quan tâm tới sức khoẻ người nhận.',
        'Các set này thường hướng tới người mới ốm dậy, người lớn tuổi, người làm việc căng thẳng hoặc người cần bổ sung dinh dưỡng nhẹ nhàng mỗi ngày.',
      ]}
      featureCards={[
        { title: 'Phù hợp nhu cầu bồi bổ', description: 'Định hướng rõ cho các trường hợp cần chăm sóc sức khoẻ hoặc phục hồi thể trạng.' },
        { title: 'Dễ dùng hằng ngày', description: 'Quy cách tiện lợi, dễ duy trì đều đặn theo tuần.' },
        { title: 'Ý nghĩa khi biếu tặng', description: 'Tạo cảm giác quan tâm đúng nhu cầu chứ không chỉ mang tính hình thức.' },
      ]}
      audienceTitle="Ai nên dùng các combo này?"
      audienceParagraphs={[
        'Người mới ốm dậy, người cần hồi phục sau giai đoạn làm việc căng thẳng hoặc người lớn tuổi thường phù hợp với dòng combo dưỡng sức.',
        'Ngoài ra, đây cũng là nhóm quà tặng hợp lý khi bạn muốn biếu bố mẹ, người thân hoặc đối tác trong những dịp cần thể hiện sự chăm sóc chân thành.',
      ]}
      noteTitle="Cách chọn nhanh"
      noteText="Nếu người nhận ưu tiên tiện lợi, bạn nên chọn set yến chưng sẵn; nếu ưu tiên cảm giác quà tặng đậm chất bồi bổ, nên chọn set có quy cách hộp lớn hơn."
      priceTitle="Giá combo quà tặng dưỡng sức khoẻ"
      priceNote="Giá phụ thuộc vào số lượng hũ, thành phần bổ sung và độ cao cấp của bộ quà."
      suggestionsTitle="Nên chọn loại nào?"
      suggestions={[
        { title: 'Combo phục hồi thể trạng', description: 'Phù hợp cho người vừa mệt, làm việc cường độ cao hoặc cần bồi bổ định kỳ.' },
        { title: 'Combo cho người lớn tuổi', description: 'Ưu tiên sự tiện dùng, vị dễ uống và quy cách nhẹ nhàng.' },
        { title: 'Combo biếu sức khoẻ', description: 'Phù hợp khi cần một món quà có ý nghĩa chăm sóc rõ ràng.' },
      ]}
      usageTitle="Cách dùng combo dưỡng sức"
      usageSteps={[
        'Dùng đều đặn theo khẩu phần khuyến nghị của từng sản phẩm.',
        'Có thể dùng vào buổi sáng hoặc giữa buổi để cơ thể dễ hấp thu hơn.',
        'Nếu là yến chưng, nên dùng lạnh hoặc nhiệt độ thường tuỳ sở thích.',
        'Theo dõi hạn dùng và bảo quản đúng hướng dẫn ghi trên hộp.',
      ]}
      usageNoteTitle="Không nên dùng quá nhiều"
      usageNoteText="Yến sào phù hợp nhất khi dùng đều và vừa phải, không cần tăng lượng quá mức trong một lần."
      faqTitle="Câu hỏi thường gặp về combo dưỡng sức"
      faqs={[
        { question: 'Combo dưỡng sức có phù hợp cho người mới ốm dậy không?', answer: 'Có, đây là một trong những nhóm sản phẩm phù hợp nhất cho nhu cầu bồi bổ nhẹ nhàng và tiện dùng.' },
        { question: 'Nên dùng bao lâu để thấy hợp lý?', answer: 'Thông thường nên dùng đều đặn theo tuần và theo khẩu phần của từng sản phẩm thay vì dùng dồn dập.' },
        { question: 'Combo dưỡng sức có dùng làm quà được không?', answer: 'Có. Đây là nhóm quà tặng rất thiết thực cho gia đình, người thân hoặc đối tác cần sự quan tâm tới sức khoẻ.' },
      ]}
    />
  );
}
