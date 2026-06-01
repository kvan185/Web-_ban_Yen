'use client';

import { AddressSelection, provinceWards, provinces } from '@/lib/vietnamAddress';

type AddressFieldsProps = {
  value: AddressSelection;
  onChange: (value: AddressSelection) => void;
  compact?: boolean;
};

export default function AddressFields({ value, onChange, compact = false }: AddressFieldsProps) {
  const wards = value.province ? provinceWards[value.province] || [] : [];

  const updateAddress = (nextValue: Partial<AddressSelection>) => {
    onChange({ ...value, ...nextValue });
  };

  const handleProvinceChange = (province: string) => {
    updateAddress({ province, ward: '' });
  };

  return (
    <div className={compact ? 'address-fields address-fields-compact' : 'address-fields'}>
      <label>
        <span>Tỉnh/Thành phố</span>
        <input
          list="province-options"
          value={value.province}
          onChange={(event) => handleProvinceChange(event.target.value)}
          placeholder="Gõ tên tỉnh/thành phố"
          required
        />
        <datalist id="province-options">
          {provinces.map((province) => (
            <option key={province} value={province} />
          ))}
        </datalist>
      </label>

      <label>
        <span>Xã/Phường</span>
        <input
          list="ward-options"
          value={value.ward}
          onChange={(event) => updateAddress({ ward: event.target.value })}
          placeholder={value.province ? 'Gõ tên xã/phường' : 'Chọn tỉnh/thành phố trước'}
          disabled={!value.province}
          required
        />
        <datalist id="ward-options">
          {wards.map((ward) => (
            <option key={ward} value={ward} />
          ))}
        </datalist>
      </label>

      <label className="address-detail-field">
        <span>Địa chỉ chi tiết</span>
        <input
          value={value.detail}
          onChange={(event) => updateAddress({ detail: event.target.value })}
          placeholder="Số nhà, tên đường, tòa nhà..."
          required
        />
      </label>
    </div>
  );
}
