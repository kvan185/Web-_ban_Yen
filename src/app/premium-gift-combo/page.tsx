import CategoryShowcasePage from '@/components/CategoryShowcasePage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Combo yến cao cấp và hộp quà premium tại Yến Tinh Hoa',
  description:
    'Các combo yến cao cấp, hộp quà premium và set quà sang trọng phù hợp biếu tặng đối tác, khách hàng và người thân trong dịp quan trọng.',
  pathname: '/premium-gift-combo',
  keywords: ['combo yến cao cấp', 'hộp quà yến cao cấp', 'set quà premium', 'quà biếu yến sang trọng'],
});

export default function PremiumGiftComboPage() {
  return (
    <CategoryShowcasePage
      categoryName="Combo cao cấp"
      eyebrow="Quà biếu cao cấp"
      title="Combo yến cao cấp và hộp quà premium cho nhu cầu biếu tặng sang trọng"
      intro="Đây là nhóm sản phẩm phù hợp khi bạn cần một món quà sức khoẻ có hình thức chỉn chu, giá trị cao và tạo ấn tượng tốt trong các dịp quan trọng."
      pageName="Combo cao cấp đang bán"
      pagePath="/premium-gift-combo"
      pageDescription="Trang giới thiệu các combo yến cao cấp và hộp quà premium tại Yến Tinh Hoa."
      sectionTitle="Điểm nổi bật của combo cao cấp"
      whyTitle="Khi nào nên chọn combo cao cấp?"
      whyParagraphs={[
        'Combo cao cấp thường được chọn trong các dịp biếu tặng đối tác, khách hàng quan trọng, gia đình hoặc người thân khi cần sự trang trọng và khác biệt về hình thức.',
        'Không chỉ là sản phẩm dinh dưỡng, nhóm này còn chú trọng trải nghiệm quà tặng: hộp đẹp, quy cách tinh tế và cảm giác chỉn chu khi trao tặng.',
      ]}
      featureCards={[
        { title: 'Thiết kế sang trọng', description: 'Hộp quà được đầu tư hơn về cảm giác cao cấp và hình thức trình bày.' },
        { title: 'Phù hợp dịp quan trọng', description: 'Rất hợp để biếu tặng trong lễ tết, tri ân, chúc mừng hoặc đối tác.' },
        { title: 'Giá trị quà tặng rõ ràng', description: 'Kết hợp giữa yếu tố sức khoẻ, hình thức và cảm xúc nhận quà.' },
      ]}
      audienceTitle="Ai thường chọn dòng combo này?"
      audienceParagraphs={[
        'Khách cần quà biếu cho đối tác, người thân lớn tuổi, khách hàng VIP hoặc những dịp cần món quà nhìn vào là thấy sự đầu tư sẽ phù hợp với nhóm cao cấp.',
        'Ngoài biếu tặng, một số gia đình cũng chọn dòng này để dùng trong những giai đoạn cần chăm sóc kỹ hơn hoặc muốn trải nghiệm sản phẩm quy cách đẹp hơn.',
      ]}
      noteTitle="Cách chọn nhanh"
      noteText="Nếu ưu tiên sự sang trọng, hãy chọn các set có quy cách hộp lớn, badge premium hoặc các dòng kết hợp nguyên liệu cao cấp."
      priceTitle="Giá các combo cao cấp"
      priceNote="Mức giá phụ thuộc vào số hũ, thiết kế hộp quà, thành phần đi kèm và độ cao cấp của từng set."
      suggestionsTitle="Nên chọn loại nào?"
      suggestions={[
        { title: 'Hộp quà yến cao cấp', description: 'Phù hợp biếu người thân, sếp hoặc khách hàng trong dịp trang trọng.' },
        { title: 'Combo premium', description: 'Ưu tiên cảm giác sang trọng và giá trị quà tặng toàn diện.' },
        { title: 'Set kết hợp nguyên liệu cao cấp', description: 'Hợp với khách cần một món quà sức khoẻ nổi bật và khác biệt hơn.' },
      ]}
      usageTitle="Cách dùng và bảo quản"
      usageSteps={[
        'Bảo quản sản phẩm theo đúng hướng dẫn trên hộp hoặc từng hũ.',
        'Nếu là yến chưng, có thể dùng ngay hoặc để lạnh trước khi dùng.',
        'Khi biếu tặng, nên kiểm tra quy cách hộp và hạn dùng trước khi giao.',
        'Sau khi mở nắp, sản phẩm nên được dùng sớm để giữ chất lượng tốt nhất.',
      ]}
      usageNoteTitle="Lưu ý khi biếu đối tác"
      usageNoteText="Nên ưu tiên set có thiết kế đồng bộ, dễ vận chuyển và phù hợp hình ảnh thương hiệu hoặc mối quan hệ tặng quà của bạn."
      faqTitle="Câu hỏi thường gặp về combo cao cấp"
      faqs={[
        { question: 'Combo cao cấp khác gì combo phổ thông?', answer: 'Combo cao cấp chú trọng hơn vào hình thức, trải nghiệm quà tặng và quy cách tổng thể, phù hợp những dịp cần sự sang trọng.' },
        { question: 'Có phù hợp làm quà cho đối tác không?', answer: 'Có, đây là một trong những nhóm sản phẩm phù hợp nhất để biếu tặng đối tác hoặc khách hàng quan trọng.' },
        { question: 'Combo cao cấp có dùng hằng ngày được không?', answer: 'Có thể, nhưng phần lớn khách chọn dòng này cho mục đích biếu tặng hoặc dùng trong dịp đặc biệt nhiều hơn.' },
      ]}
    />
  );
}
