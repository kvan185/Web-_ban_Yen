import CategoryShowcasePage from '@/components/CategoryShowcasePage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Combo yến cho mẹ bầu và phụ nữ tại Yến Tinh Hoa',
  description:
    'Các combo yến dành cho mẹ bầu và phụ nữ hiện đại, tiện dùng, giàu dinh dưỡng và phù hợp nhu cầu chăm sóc sức khoẻ, sắc đẹp.',
  pathname: '/women-nutrition-combo',
  keywords: ['combo yến mẹ bầu', 'combo yến cho phụ nữ', 'yến cho bà bầu', 'combo yến dưỡng nhan'],
});

export default function WomenNutritionComboPage() {
  return (
    <CategoryShowcasePage
      categoryName="Combo cho mẹ bầu / phụ nữ"
      eyebrow="Dành cho phụ nữ"
      title="Combo yến cho mẹ bầu và phụ nữ cần chăm sóc sức khoẻ, dinh dưỡng và sắc đẹp"
      intro="Nhóm combo này hướng tới mẹ bầu, phụ nữ bận rộn hoặc người cần một món quà chăm sóc bản thân tinh tế và tiện lợi hơn trong sử dụng."
      pageName="Combo cho mẹ bầu và phụ nữ đang bán"
      pagePath="/women-nutrition-combo"
      pageDescription="Trang giới thiệu các combo yến dành cho mẹ bầu và phụ nữ tại Yến Tinh Hoa."
      sectionTitle="Ưu điểm của combo yến cho phụ nữ"
      whyTitle="Vì sao nhóm combo này được ưa chuộng?"
      whyParagraphs={[
        'Phụ nữ thường ưu tiên các sản phẩm vừa tiện, vừa nhẹ nhàng, vừa có giá trị dinh dưỡng hoặc hỗ trợ chăm sóc sắc đẹp. Vì vậy các combo được thiết kế riêng theo nhu cầu này rất dễ sử dụng và dễ chọn làm quà.',
        'Đặc biệt với mẹ bầu hoặc phụ nữ sau sinh, những set yến dùng sẵn, đóng gói đẹp và không mất công chuẩn bị thường thực tế hơn rất nhiều.',
      ]}
      featureCards={[
        { title: 'Tiện dùng hằng ngày', description: 'Phù hợp với lịch trình bận rộn, không cần sơ chế cầu kỳ.' },
        { title: 'Dễ tặng, dễ nhận', description: 'Thiết kế đẹp và phù hợp nhiều dịp tặng quà cho phụ nữ.' },
        { title: 'Định hướng chăm sóc nhẹ nhàng', description: 'Phù hợp nhu cầu bồi bổ, giữ sức và chăm sóc bản thân.' },
      ]}
      audienceTitle="Ai phù hợp với nhóm sản phẩm này?"
      audienceParagraphs={[
        'Mẹ bầu, phụ nữ sau sinh, phụ nữ làm việc cường độ cao hoặc người muốn duy trì thói quen chăm sóc sức khoẻ định kỳ là những nhóm rất phù hợp với dòng combo này.',
        'Ngoài ra, các set dưỡng nhan hoặc collagen cũng phù hợp cho người muốn chọn quà tặng có tính tinh tế và hướng tới trải nghiệm cá nhân hơn.',
      ]}
      noteTitle="Gợi ý chọn quà"
      noteText="Nếu tặng mẹ bầu, nên ưu tiên sản phẩm thành phần đơn giản và dễ dùng. Nếu tặng phụ nữ hiện đại, có thể ưu tiên dòng thiên về dưỡng nhan hoặc tiện lợi."
      priceTitle="Giá combo yến cho mẹ bầu và phụ nữ"
      priceNote="Mức giá phụ thuộc vào quy cách hộp, số hũ và dòng sản phẩm đi kèm như dưỡng nhan hoặc collagen."
      suggestionsTitle="Nên chọn dòng nào?"
      suggestions={[
        { title: 'Combo mẹ bầu', description: 'Phù hợp biếu tặng hoặc bổ sung dinh dưỡng tiện lợi trong thai kỳ.' },
        { title: 'Combo collagen', description: 'Hướng tới phụ nữ quan tâm chăm sóc sắc đẹp và sức sống hằng ngày.' },
        { title: 'Combo dưỡng nhan', description: 'Phù hợp làm quà tinh tế cho phụ nữ trong các dịp đặc biệt.' },
      ]}
      usageTitle="Cách dùng các combo cho phụ nữ"
      usageSteps={[
        'Dùng theo hướng dẫn ghi trên từng sản phẩm trong set.',
        'Ưu tiên dùng đều đặn thay vì dùng dồn trong thời gian ngắn.',
        'Có thể dùng lạnh để vị dễ chịu hơn nếu là yến chưng.',
        'Bảo quản sản phẩm đúng điều kiện để giữ chất lượng ổn định.',
      ]}
      usageNoteTitle="Lưu ý riêng cho mẹ bầu"
      usageNoteText="Trong thai kỳ hoặc giai đoạn nhạy cảm, nên ưu tiên khẩu phần vừa phải và lựa chọn sản phẩm phù hợp với cơ địa thực tế."
      faqTitle="Câu hỏi thường gặp về combo cho mẹ bầu và phụ nữ"
      faqs={[
        { question: 'Mẹ bầu có thể dùng các combo yến này không?', answer: 'Có thể, nếu dùng với lượng phù hợp và chọn dòng sản phẩm nhẹ nhàng, tiện dùng.' },
        { question: 'Combo dưỡng nhan khác gì combo mẹ bầu?', answer: 'Combo dưỡng nhan hướng tới phụ nữ quan tâm sắc đẹp và thói quen chăm sóc bản thân, còn combo mẹ bầu thiên về sự nhẹ nhàng, tiện dùng và phù hợp bối cảnh thai kỳ hơn.' },
        { question: 'Có phù hợp để làm quà cho phụ nữ không?', answer: 'Rất phù hợp vì đây là nhóm sản phẩm dễ dùng, hình thức đẹp và mang ý nghĩa chăm sóc cá nhân rõ ràng.' },
      ]}
    />
  );
}
