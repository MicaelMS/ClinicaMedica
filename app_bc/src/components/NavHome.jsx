import React from "react";
import { Button, Col, Layout, Menu, Row, Image } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header } = Layout;

export default function NavHome() {
  return (
    <Header style={{ backgroundColor: "#7decff", padding: "0 20px" }}>
      <Row justify="space-between"
        align='middle'>
        <Col>
          <div className="logo" style={{ fontSize: "1.5em", color: "#fff" }}>
            <Image width={50}
              preview={false}
              src={'https://png.pngtree.com/png-clipart/20230427/original/pngtree-medical-logo-png-image_9116167.png'} />
          </div>
        </Col>
        <Col>
          <Link href="../" passHref>
            <Button type='text'
              style={{ borderstyle: 'dotted', borderColor: 'black' }}
              icon={<HomeOutlined />} />
          </Link>
        </Col>
        <Col>
          <Link href="../admin" passHref>
            <Button type="primary"
              icon={<AppstoreOutlined />}>
              Cadastrar
            </Button>
          </Link>
        </Col>
      </Row>
    </Header>
  );
}
