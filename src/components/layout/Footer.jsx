import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Button,
  Divider,
  Input,
} from "antd";
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  GithubFilled,
  SendOutlined,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter
      style={{
        backgroundColor: "#f5f5f5",
        color: "#595959",
        padding: "64px 50px 32px",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", width: "100%" }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={8}>
            <Title level={4} style={{ color: "#262626", fontWeight: 700 }}>
              GALAXY STORE
            </Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 24, maxWidth: 300 }}
            >
              Your one-stop destination for the latest in electronics, fashion,
              and home essentials. Quality products, delivered to your doorstep.
            </Text>
            <Space size="large">
              <Link href="#" style={{ fontSize: 20, color: "#595959" }}>
                <FacebookFilled />
              </Link>
              <Link href="#" style={{ fontSize: 20, color: "#595959" }}>
                <TwitterOutlined />
              </Link>
              <Link href="#" style={{ fontSize: 20, color: "#595959" }}>
                <InstagramOutlined />
              </Link>
              <Link href="#" style={{ fontSize: 20, color: "#595959" }}>
                <GithubFilled />
              </Link>
            </Space>
          </Col>

          <Col xs={12} sm={4}>
            <Title level={5} style={{ color: "#262626", marginBottom: 24 }}>
              Shop
            </Title>
            <Space direction="vertical" size="middle">
              <Link href="#" style={{ color: "#595959" }}>
                Electronics
              </Link>
              <Link href="#" style={{ color: "#595959" }}>
                Fashion
              </Link>
              <Link href="#" style={{ color: "#595959" }}>
                Home
              </Link>
              <Link href="#" style={{ color: "#595959" }}>
                Deals
              </Link>
            </Space>
          </Col>

          <Col xs={12} sm={4}>
            <Title level={5} style={{ color: "#262626", marginBottom: 24 }}>
              Support
            </Title>
            <Space direction="vertical" size="middle">
              <Link href="#" style={{ color: "#595959" }}>
                Help Center
              </Link>
              <Link href="#" style={{ color: "#595959" }}>
                Track Order
              </Link>
              <Link href="#" style={{ color: "#595959" }}>
                Returns
              </Link>
              <Link href="#" style={{ color: "#595959" }}>
                Shipping Info
              </Link>
            </Space>
          </Col>

          <Col xs={24} sm={8}>
            <Title level={5} style={{ color: "#262626", marginBottom: 24 }}>
              Newsletter
            </Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 24 }}
            >
              Subscribe to stay updated with our latest offers and product
              launches.
            </Text>
            <div style={{ display: "flex", gap: 8 }}>
              <Input
                placeholder="Enter your email"
                style={{ borderRadius: 4, height: 40 }}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                style={{ height: 40 }}
              />
            </div>
            <Text
              type="secondary"
              style={{ fontSize: 12, marginTop: 16, display: "block" }}
            >
              Join 50,000+ happy customers
            </Text>
          </Col>
        </Row>

        <Divider style={{ margin: "48px 0 24px" }} />

        <div style={{ textAlign: "center" }}>
          <Text type="secondary">
            © {new Date().getFullYear()} Galaxy Store. All rights reserved.
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
