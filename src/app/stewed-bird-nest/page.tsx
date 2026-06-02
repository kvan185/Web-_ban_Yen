import CategoryShowcasePage from '@/components/CategoryShowcasePage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Yến chưng là gì? Các dòng yến chưng tiện dùng tại Yến Tinh Hoa',
  description:
    'Yến chưng là dòng yến sào đã chế biến sẵn, tiện dùng ngay, phù hợp bồi bổ sức khoẻ hằng ngày. Xem các loại yến chưng tại Yến Tinh Hoa.',
  pathname: '/stewed-bird-nest',
  keywords: ['yến chưng', 'yến chưng sẵn', 'yến hũ', 'nước yến', 'mua yến chưng'],
});

export default function StewedBirdNestPage() {
  return (
    <CategoryShowcasePage
      categoryName="Yến Chưng"
      eyebrow="Yến chưng tiện dùng"
      title="Yến chưng là gì? Các dòng yến chưng sẵn tiện lợi cho gia đình bận rộn"
      intro="Yến chưng là lựa chọn phù hợp cho người muốn dùng yến nhanh, không cần sơ chế hay chưng tại nhà. Chỉ cần mở hũ là có thể dùng ngay hoặc dùng lạnh tuỳ khẩu vị."
      pageName="Các dòng yến chưng đang bán"
      pagePath="/stewed-bird-nest"
      pageDescription="Trang giới thiệu yến chưng, đặc điểm, cách chọn và danh sách sản phẩm yến chưng tại Yến Tinh Hoa."
      sectionTitle="Đặc điểm của yến chưng"
      whyTitle="Yến chưng là gì?"
      whyParagraphs={[
        'Yến chưng là sản phẩm tổ yến đã được chế biến sẵn thành từng hũ hoặc từng phần tiện dụng. Người dùng không cần ngâm nở, nhặt lông hay chưng cách thuỷ như yến thô và yến tinh chế.',
        'Dòng này phù hợp cho người bận rộn, người lớn tuổi cần dùng đều đặn, hoặc gia đình muốn bổ sung dinh dưỡng hằng ngày theo cách nhanh gọn hơn.',
      ]}
      featureCards={[
        { title: 'Dùng ngay tiện lợi', description: 'Không cần sơ chế hay chưng lại nhiều bước, rất phù hợp với nhịp sống bận rộn.' },
        { title: 'Dễ kiểm soát khẩu phần', description: 'Mỗi hũ là một lần dùng gọn gàng, thuận tiện mang theo hoặc biếu tặng.' },
        { title: 'Phù hợp nhiều đối tượng', description: 'Người lớn tuổi, dân văn phòng, người cần bồi bổ nhẹ nhàng đều có thể dùng.' },
      ]}
      audienceTitle="Khi nào nên chọn yến chưng?"
      audienceParagraphs={[
        'Nếu bạn cần một sản phẩm mở nắp là dùng được ngay, yến chưng sẽ thực tế hơn nhiều so với tổ yến khô. Đây là lựa chọn hợp lý cho nhịp sống hiện đại và lịch trình bận rộn.',
        'Yến chưng cũng phù hợp làm quà tặng vì bao bì đẹp, dễ sử dụng và không đòi hỏi người nhận phải biết sơ chế yến trước khi dùng.',
      ]}
      noteTitle="Nên dùng lúc nào?"
      noteText="Yến chưng thường phù hợp khi dùng buổi sáng, giữa buổi hoặc buổi tối nhẹ. Có thể dùng trực tiếp hoặc làm mát để dễ uống hơn."
      priceTitle="Giá các dòng yến chưng tại Yến Tinh Hoa"
      priceNote="Giá yến chưng phụ thuộc vào thành phần đi kèm, quy cách hộp, số hũ và mức độ cao cấp của set quà."
      suggestionsTitle="Nên chọn loại yến chưng nào?"
      suggestions={[
        { title: 'Yến chưng truyền thống', description: 'Phù hợp nhu cầu dùng hằng ngày, vị thanh nhẹ, dễ làm quen.' },
        { title: 'Yến chưng quà tặng', description: 'Hộp đẹp và gọn gàng, phù hợp làm quà cho người thân hoặc khách hàng.' },
        { title: 'Yến chưng dưỡng sức', description: 'Thích hợp khi cần bồi bổ thể trạng hoặc dùng cho người lớn tuổi.' },
      ]}
      usageTitle="Cách dùng yến chưng"
      usageSteps={[
        'Lắc nhẹ trước khi dùng để hương vị và kết cấu đồng đều hơn.',
        'Có thể dùng trực tiếp ở nhiệt độ thường hoặc để lạnh trước khi uống.',
        'Sau khi mở nắp nên dùng hết sớm để giữ hương vị tốt nhất.',
        'Bảo quản nơi khô ráo, tránh nắng; nếu đã mở nắp nên bảo quản lạnh.',
      ]}
      usageNoteTitle="Lưu ý bảo quản"
      usageNoteText="Yến chưng tiện lợi nhưng nên chú ý hạn dùng, tình trạng nắp hũ và điều kiện bảo quản sau khi mở."
      faqTitle="Câu hỏi thường gặp về yến chưng"
      faqs={[
        { question: 'Yến chưng có cần chưng lại không?', answer: 'Thông thường không cần. Sản phẩm đã được chế biến sẵn để có thể dùng trực tiếp.' },
        { question: 'Yến chưng có phù hợp dùng hằng ngày không?', answer: 'Có, nếu dùng với khẩu phần phù hợp và đều đặn theo nhu cầu sức khoẻ của từng người.' },
        { question: 'Yến chưng khác gì tổ yến khô?', answer: 'Yến chưng tiện dùng ngay, còn tổ yến khô cần ngâm nở, làm sạch hoặc chưng tại nhà trước khi sử dụng.' },
      ]}
    />
  );
}
