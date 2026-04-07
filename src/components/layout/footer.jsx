import React from "react";
import { Layout, Row, Col, Typography, Space, Divider } from "antd";
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  GithubFilled,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter
      style={{
        backgroundColor: "#141414",
        color: "#ffffff",
        padding: "80px 50px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <Row gutter={[48, 40]}>
          <Col xs={24} sm={12} lg={10}>
            <Title
              level={3}
              style={{
                color: "#ffffff",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                marginBottom: 24,
              }}
            >
              GALAXY STORE
            </Title>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.65)",
                display: "block",
                marginBottom: 32,
                maxWidth: 400,
                lineHeight: "1.8",
              }}
            >
              Hệ thống bán lẻ thiết bị công nghệ hàng đầu, chuyên cung cấp các
              dòng Laptop, PC và Gaming Gear cao cấp từ các thương hiệu nổi
              tiếng thế giới. Chúng tôi cam kết mang đến trải nghiệm mua sắm
              công nghệ tuyệt vời nhất.
            </Text>
            <Space size="large">
              <Link href="#" className="footer-social-link">
                <FacebookFilled
                  style={{ fontSize: 24, color: "rgba(255, 255, 255, 0.65)" }}
                />
              </Link>
              <Link href="#" className="footer-social-link">
                <TwitterOutlined
                  style={{ fontSize: 24, color: "rgba(255, 255, 255, 0.65)" }}
                />
              </Link>
              <Link href="#" className="footer-social-link">
                <InstagramOutlined
                  style={{ fontSize: 24, color: "rgba(255, 255, 255, 0.65)" }}
                />
              </Link>
              <Link href="#" className="footer-social-link">
                <GithubFilled
                  style={{ fontSize: 24, color: "rgba(255, 255, 255, 0.65)" }}
                />
              </Link>
            </Space>
          </Col>

          <Col xs={12} sm={6} lg={7}>
            <Title
              level={5}
              style={{ color: "#ffffff", marginBottom: 32, fontWeight: 600 }}
            >
              Chính sách & Quy định
            </Title>
            <Space direction="vertical" size="middle">
              <Link
                href="#"
                style={{
                  color: "rgba(255, 255, 255, 0.65)",
                  transition: "all 0.3s",
                }}
              >
                Chính sách bảo hành
              </Link>
              <Link
                href="#"
                style={{
                  color: "rgba(255, 255, 255, 0.65)",
                  transition: "all 0.3s",
                }}
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="#"
                style={{
                  color: "rgba(255, 255, 255, 0.65)",
                  transition: "all 0.3s",
                }}
              >
                Chính sách đổi trả
              </Link>
              <Link
                href="#"
                style={{
                  color: "rgba(255, 255, 255, 0.65)",
                  transition: "all 0.3s",
                }}
              >
                Chính sách vận chuyển
              </Link>
            </Space>
          </Col>

          <Col xs={12} sm={6} lg={7}>
            <Title
              level={5}
              style={{ color: "#ffffff", marginBottom: 32, fontWeight: 600 }}
            >
              Dịch vụ khách hàng
            </Title>
            <Space direction="vertical" size="middle">
              <Link
                href="#"
                style={{
                  color: "rgba(255, 255, 255, 0.65)",
                  transition: "all 0.3s",
                }}
              >
                Câu hỏi thường gặp
              </Link>
              <Link
                href="#"
                style={{
                  color: "rgba(255, 255, 255, 0.65)",
                  transition: "all 0.3s",
                }}
              >
                Hướng dẫn mua hàng
              </Link>
              <Link
                href="/order-tracking"
                style={{
                  color: "rgba(255, 255, 255, 0.65)",
                  transition: "all 0.3s",
                }}
              >
                Theo dõi đơn hàng
              </Link>
              <Link
                href="#"
                style={{
                  color: "rgba(255, 255, 255, 0.65)",
                  transition: "all 0.3s",
                }}
              >
                Liên hệ hỗ trợ
              </Link>
            </Space>
          </Col>
        </Row>

        <Divider
          style={{
            borderColor: "rgba(255, 255, 255, 0.1)",
            margin: "64px 0 32px",
          }}
        />

        <div style={{ textAlign: "center" }}>
          <Text style={{ color: "rgba(255, 255, 255, 0.45)", fontSize: 13 }}>
            © {new Date().getFullYear()} Galaxy Store - Design by Tri.Tran
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
