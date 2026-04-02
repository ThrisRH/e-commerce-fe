import React, { useState, useEffect, useRef } from "react";
import { Modal, Input, Typography, Spin, Empty, Tag } from "antd";
import {
  EnvironmentOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { fetchProvinces, fetchDistricts } from "@/api/profiles/address-api";

const { Text } = Typography;

const ListItem = ({ label, sublabel, isSelected, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderRadius: 8,
        cursor: "pointer",
        background: isSelected
          ? "var(--primary-50, #fff5f5)"
          : hovered
            ? "var(--neutral-50, #fafafa)"
            : "transparent",
        borderLeft: isSelected
          ? "3px solid var(--primary-main, #e53935)"
          : "3px solid transparent",
        transition: "all 0.15s ease",
        marginBottom: 2,
      }}
    >
      <div>
        <div
          style={{
            fontWeight: isSelected ? 600 : 400,
            fontSize: 14,
            color: isSelected
              ? "var(--primary-main, #e53935)"
              : "var(--neutral-800, #262626)",
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div
            style={{
              fontSize: 12,
              color: "var(--neutral-400, #9e9e9e)",
              marginTop: 1,
            }}
          >
            {sublabel}
          </div>
        )}
      </div>
      {isSelected && (
        <CheckOutlined
          style={{ color: "var(--primary-main, #e53935)", fontSize: 14 }}
        />
      )}
    </div>
  );
};

const AddressPickerModal = ({ open, onClose, onConfirm, initialValue }) => {
  const [step, setStep] = useState("province");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    setStep("province");
    setSearch("");
    setSelectedProvince(initialValue?.province || null);
    setSelectedDistrict(initialValue?.district || null);

    setLoadingProvinces(true);
    fetchProvinces()
      .then(setProvinces)
      .catch(() => {})
      .finally(() => setLoadingProvinces(false));
  }, [open]);

  useEffect(() => {
    if (open && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [open, step]);

  const handleSelectProvince = async (province) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSearch("");
    setStep("district");
    setLoadingDistricts(true);
    try {
      const data = await fetchDistricts(province.code);
      setDistricts(data.districts || []);
    } catch {
      setDistricts([]);
    } finally {
      setLoadingDistricts(false);
    }
  };

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
  };

  const handleConfirm = () => {
    if (!selectedProvince || !selectedDistrict) return;
    onConfirm({ province: selectedProvince, district: selectedDistrict });
    onClose();
  };

  const handleBack = () => {
    setStep("province");
    setSearch("");
  };

  const filteredProvinces = provinces.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredDistricts = districts.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  const isConfirmDisabled = !selectedProvince || !selectedDistrict;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {step === "district" && (
            <ArrowLeftOutlined
              onClick={handleBack}
              style={{
                cursor: "pointer",
                color: "var(--neutral-600, #595959)",
                fontSize: 15,
                padding: "2px 6px",
                borderRadius: 4,
              }}
            />
          )}
          <EnvironmentOutlined
            style={{ color: "var(--primary-main, #e53935)" }}
          />
          <span style={{ fontSize: 15, fontWeight: 600 }}>
            {step === "province"
              ? "Chọn Tỉnh / Thành phố"
              : "Chọn Quận / Huyện"}
          </span>
        </div>
      }
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {selectedProvince && (
              <Tag
                color="default"
                style={{ borderRadius: 6, fontSize: 12, padding: "2px 8px" }}
              >
                {selectedProvince.name}
                {selectedDistrict && ` › ${selectedDistrict.name}`}
              </Tag>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onClose}
              style={{
                padding: "6px 16px",
                border: "1px solid var(--neutral-300, #d9d9d9)",
                borderRadius: 6,
                cursor: "pointer",
                background: "#fff",
                fontSize: 14,
              }}
            >
              Hủy
            </button>
            <button
              onClick={handleConfirm}
              disabled={isConfirmDisabled}
              style={{
                padding: "6px 20px",
                border: "none",
                borderRadius: 6,
                cursor: isConfirmDisabled ? "not-allowed" : "pointer",
                background: isConfirmDisabled
                  ? "var(--neutral-200, #e0e0e0)"
                  : "var(--primary-main, #e53935)",
                color: isConfirmDisabled
                  ? "var(--neutral-400, #9e9e9e)"
                  : "#fff",
                fontWeight: 600,
                fontSize: 14,
                transition: "all 0.2s",
              }}
            >
              Xác nhận
            </button>
          </div>
        </div>
      }
      width={480}
      centered
      styles={{ body: { padding: "12px 24px 4px", minHeight: 380 } }}
    >
      <Input
        ref={searchRef}
        prefix={
          <SearchOutlined style={{ color: "var(--neutral-400, #9e9e9e)" }} />
        }
        placeholder={
          step === "province"
            ? "Tìm tỉnh / thành phố..."
            : "Tìm quận / huyện..."
        }
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
        style={{ borderRadius: 8, marginBottom: 12 }}
      />

      <div style={{ height: 320, overflowY: "auto", paddingRight: 4 }}>
        {step === "province" && (
          <>
            {loadingProvinces ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 80,
                }}
              >
                <Spin tip="Đang tải..." />
              </div>
            ) : filteredProvinces.length === 0 ? (
              <Empty
                description="Không tìm thấy tỉnh/thành"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              filteredProvinces.map((province) => (
                <ListItem
                  key={province.code}
                  label={province.name}
                  sublabel={province.division_type}
                  isSelected={selectedProvince?.code === province.code}
                  onClick={() => handleSelectProvince(province)}
                />
              ))
            )}
          </>
        )}

        {step === "district" && (
          <>
            <div style={{ marginBottom: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Tỉnh / Thành phố:{" "}
                <Text
                  strong
                  style={{
                    color: "var(--primary-main, #e53935)",
                    fontSize: 12,
                  }}
                >
                  {selectedProvince?.name}
                </Text>
              </Text>
            </div>

            {loadingDistricts ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 60,
                }}
              >
                <Spin tip="Đang tải quận/huyện..." />
              </div>
            ) : filteredDistricts.length === 0 ? (
              <Empty
                description="Không tìm thấy quận/huyện"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              filteredDistricts.map((district) => (
                <ListItem
                  key={district.code}
                  label={district.name}
                  sublabel={district.division_type}
                  isSelected={selectedDistrict?.code === district.code}
                  onClick={() => handleSelectDistrict(district)}
                />
              ))
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default AddressPickerModal;
