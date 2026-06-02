import CategoryShowcasePage from '@/components/CategoryShowcasePage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Combo quà tặng phổ thông từ yến sào tại Yến Tinh Hoa',
  description:
    'Các combo quà tặng phổ thông từ yến sào phù hợp biếu tặng bạn bè, người thân và khách hàng với mức giá dễ chọn.',
  pathname: '/popular-gift-combo',
  keywords: ['combo quà tặng yến', 'quà tặng phổ thông', 'set quà yến sào', 'combo yến giá tốt'],
});

export default function PopularGiftComboPage() {
  return (
    <CategoryShowcasePage
      categoryName="Combo quà tặng phổ thông"
      eyebrow="Quà tặng dễ chọn"
      title="Combo quà tặng phổ thông từ yến sào dành cho biếu tặng hằng ngày"
      intro="Dòng combo phổ thông phù hợp cho nhu cầu biếu tặng gọn gàng, lịch sự và vẫn giữ được giá trị dinh dưỡng của yến sào."
      pageName="Combo quà tặng phổ thông đang bán"
      pagePath="/popular-gift-combo"
      pageDescription="Trang giới thiệu các combo quà tặng phổ thông từ yến sào tại Yến Tinh Hoa."
      sectionTitle="Ưu điểm của combo quà tặng phổ thông"
      whyTitle="Combo quà tặng phổ thông phù hợp với ai?"
      whyParagraphs={[
        'Đây là nhóm sản phẩm phù hợp cho khách cần một món quà sức khoẻ chỉn chu nhưng vẫn tối ưu ngân sách. Các combo thường có quy cách gọn, dễ mang đi và dễ lựa chọn.',
        'Nhóm này phù hợp để tặng người thân, bạn bè, khách quen hoặc dùng trong các dịp thăm hỏi, sinh nhật, lễ tết quy mô vừa phải.',
      ]}
      featureCards={[
        { title: 'Giá dễ tiếp cận', description: 'Phù hợp nhiều nhu cầu tặng quà mà vẫn đảm bảo hình thức đẹp mắt.' },
        { title: 'Đóng gói gọn gàng', description: 'Dễ cầm, dễ gửi và tạo cảm giác lịch sự khi trao tặng.' },
        { title: 'Dinh dưỡng thiết thực', description: 'Vẫn giữ giá trị bồi bổ từ yến sào, phù hợp làm quà sức khoẻ.' },
      ]}
      audienceTitle="Khi nào nên chọn combo phổ thông?"
      audienceParagraphs={[
        'Nếu bạn cần quà biếu nhiều phần, hoặc muốn chọn một món quà lịch sự nhưng không quá nặng chi phí, combo phổ thông là lựa chọn hợp lý.',
        'Đây cũng là nhóm dễ tặng nhất vì người nhận có thể dùng ngay mà không cần biết cách sơ chế yến.',
      ]}
      noteTitle="Điểm mạnh của dòng này"
      noteText="Dòng combo phổ thông ưu tiên tính thực tế, dễ tặng, dễ dùng và phù hợp nhiều độ tuổi."
      priceTitle="Giá combo quà tặng phổ thông"
      priceNote="Mức giá sẽ thay đổi theo số hũ, quy cách hộp và thành phần đi kèm trong từng combo."
      suggestionsTitle="Nên chọn combo nào?"
      suggestions={[
        { title: 'Combo ít hũ', description: 'Phù hợp thăm hỏi nhẹ nhàng, tiết kiệm và vẫn lịch sự.' },
        { title: 'Combo trung cấp', description: 'Đủ đẹp để tặng đối tác nhỏ, khách hàng quen hoặc người thân.' },
        { title: 'Combo vị thanh nhẹ', description: 'Dễ uống, phù hợp cho nhiều đối tượng nhận quà khác nhau.' },
      ]}
      usageTitle="Cách dùng các combo yến quà tặng"
      usageSteps={[
        'Kiểm tra quy cách sản phẩm và hạn dùng trước khi tặng hoặc sử dụng.',
        'Lắc nhẹ từng hũ trước khi dùng nếu là yến chưng.',
        'Có thể dùng lạnh để hương vị dễ chịu hơn.',
        'Sau khi mở nắp, nên dùng hết trong thời gian ngắn để đảm bảo chất lượng.',
      ]}
      usageNoteTitle="Lưu ý khi chọn quà"
      usageNoteText="Nếu tặng cho người lớn tuổi hoặc người mới dùng yến, nên ưu tiên vị thanh nhẹ và quy cách dễ sử dụng."
      faqTitle="Câu hỏi thường gặp về combo quà tặng phổ thông"
      faqs={[
        { question: 'Combo phổ thông có phù hợp làm quà không?', answer: 'Có. Dòng này được thiết kế để vừa túi tiền nhưng vẫn giữ được sự lịch sự và giá trị sức khoẻ.' },
        { question: 'Combo phổ thông khác combo cao cấp thế nào?', answer: 'Combo phổ thông tối ưu ngân sách và tính thực tế, trong khi combo cao cấp tập trung nhiều hơn vào hình thức, quy cách và trải nghiệm biếu tặng.' },
        { question: 'Có thể dùng cho gia đình thay vì biếu tặng không?', answer: 'Có. Nhiều khách chọn combo phổ thông để dùng hằng ngày vì tiện và chi phí hợp lý.' },
      ]}
    />
  );
}
