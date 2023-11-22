import React, { useState } from "react";
import { Button, Card, Col, Row, Table, Input } from "antd";

function TabelaConsultaSUS(props) {
  // const [data, setData] = useState();
  const data = [{
    paciente: 'teste',
    descricao: 'Primeira consulta',
    data: new Date(),
  },
  {
    paciente: 'vasco',
    descricao: 'Retorno',
    data: new Date(),
  }
  ]
  const columns = [
    {
      title: 'Paciente',
      key: 'paciente',
      dataIndex: 'paciente',
      width: 250,
    },
    {
      title: 'Descrição',
      key: 'descricao',
      dataIndex: 'descricao',
    },
    {
      title: 'Horário',
      key: 'data',
      dataIndex: 'data',
      width: 250,
      render : (value) => (
        new Date(value)
      )
    },
  ]

  return (
    <Card>
      <Row gutter={[10, 10]}
        justify='space-between'>
        <Col span={12}>
          <Input placeholder="Filtre por paciente" />
        </Col>
        <Col span={24}>
          <Table size="small"
            dataSource={data}
            columns={columns}
            bordered />
        </Col>
      </Row>
    </Card>
  )
}

export default TabelaConsultaSUS;