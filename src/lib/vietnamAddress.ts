export type AddressSelection = {
  province: string;
  ward: string;
  detail: string;
};

export const emptyAddressSelection: AddressSelection = {
  province: '',
  ward: '',
  detail: '',
};

export const provinceWards: Record<string, string[]> = {
  'TP. Ho Chi Minh': [
    'Phuong Ben Nghe',
    'Phuong Ben Thanh',
    'Phuong Cau Kho',
    'Phuong Da Kao',
    'Phuong Tan Dinh',
    'Phuong Thao Dien',
    'Phuong An Khanh',
    'Phuong Binh Thanh',
    'Phuong Gia Dinh',
    'Phuong Go Vap',
    'Phuong Tan Son Hoa',
    'Phuong Tan Son Nhat',
    'Phuong Binh Tan',
    'Phuong An Lac',
    'Phuong Binh Tri Dong',
    'Phuong Tan Phu',
    'Phuong Tay Thanh',
    'Phuong Phu Thanh',
    'Phuong Cho Lon',
    'Phuong Binh Tay',
    'Phuong Phu Tho Hoa',
    'Phuong Phu Nhuan',
    'Phuong Duc Nhuan',
    'Phuong Rach Chiec',
    'Phuong Thu Duc',
    'Phuong Linh Xuan',
    'Phuong Hiep Binh',
    'Phuong Tam Binh',
    'Phuong Tan Binh',
    'Phuong Tan Tao',
    'Xa Binh Chanh',
    'Xa Hung Long',
    'Xa Tan Kien',
    'Xa Cu Chi',
    'Xa Tan An Hoi',
    'Xa Hoc Mon',
    'Xa Ba Diem',
    'Xa Nha Be',
    'Xa Hiep Phuoc',
    'Xa Can Gio',
  ],
  'Ha Noi': [
    'Phuong Hoan Kiem',
    'Phuong Cua Nam',
    'Phuong Ba Dinh',
    'Phuong Ngoc Ha',
    'Phuong Giang Vo',
    'Phuong Dong Da',
    'Phuong Kim Lien',
    'Phuong Hai Ba Trung',
    'Phuong Bach Mai',
    'Phuong Cau Giay',
    'Phuong Dich Vong',
    'Phuong Tay Ho',
    'Phuong Phu Thuong',
    'Phuong Long Bien',
    'Phuong Bo De',
    'Phuong Hoang Mai',
    'Phuong Linh Nam',
    'Phuong Ha Dong',
    'Phuong Van Quan',
    'Xa Dong Anh',
    'Xa Gia Lam',
    'Xa Thanh Tri',
    'Xa Hoai Duc',
  ],
  'Da Nang': [
    'Phuong Hai Chau',
    'Phuong Thanh Khe',
    'Phuong Son Tra',
    'Phuong Ngu Hanh Son',
    'Phuong Cam Le',
    'Phuong Lien Chieu',
    'Xa Hoa Vang',
    'Xa Hoa Tien',
  ],
  'Can Tho': [
    'Phuong Ninh Kieu',
    'Phuong Cai Khe',
    'Phuong Binh Thuy',
    'Phuong Cai Rang',
    'Phuong O Mon',
    'Phuong Thot Not',
    'Xa Phong Dien',
    'Xa Co Do',
  ],
  'Dong Nai': [
    'Phuong Tran Bien',
    'Phuong Tam Hiep',
    'Phuong Bien Hoa',
    'Phuong Long Binh',
    'Xa Long Thanh',
    'Xa Nhon Trach',
    'Xa Trang Bom',
    'Xa Vinh Cuu',
  ],
  'Binh Duong': [
    'Phuong Thu Dau Mot',
    'Phuong Di An',
    'Phuong Thuan An',
    'Phuong Tan Uyen',
    'Phuong Ben Cat',
    'Xa Bau Bang',
    'Xa Dau Tieng',
  ],
  'Ba Ria - Vung Tau': [
    'Phuong Vung Tau',
    'Phuong Tam Thang',
    'Phuong Ba Ria',
    'Phuong Phu My',
    'Xa Long Dien',
    'Xa Dat Do',
    'Xa Xuyen Moc',
  ],
  'Long An': ['Phuong Tan An', 'Xa Ben Luc', 'Xa Duc Hoa', 'Xa Can Giuoc', 'Xa Chau Thanh'],
  'Tien Giang': ['Phuong My Tho', 'Xa Cai Lay', 'Xa Chau Thanh', 'Xa Go Cong', 'Xa Cho Gao'],
  'Khanh Hoa': ['Phuong Nha Trang', 'Phuong Cam Ranh', 'Xa Dien Khanh', 'Xa Ninh Hoa', 'Xa Van Ninh'],
  'Lam Dong': ['Phuong Da Lat', 'Phuong Bao Loc', 'Xa Duc Trong', 'Xa Don Duong', 'Xa Di Linh'],
};

export const provinces = Object.keys(provinceWards);

export function composeAddress(address: AddressSelection) {
  return [address.detail.trim(), address.ward, address.province].filter(Boolean).join(', ');
}

export function splitStoredAddress(address = ''): AddressSelection {
  const parts = address
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  const province = [...parts].reverse().find((part) => provinces.includes(part)) || '';
  const wards = province ? provinceWards[province] : [];
  const ward = [...parts].reverse().find((part) => wards.includes(part)) || '';
  const detail = parts.filter((part) => part !== province && part !== ward).join(', ');

  return { province, ward, detail };
}
