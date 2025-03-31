import { Col, Row } from 'antd';
import './grid.scss'
import MultiLine from '../MultiLine';
import DemoRadar from '../Radar';

function LearnGrid() {
    return (
        <>
            <Row gutter={[20,25]}>
                <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}><div className='col'>Box 1</div></Col>
                <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}><div className='col'>Box 2</div></Col>
                <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}><div className='col'>Box 3</div></Col>
                <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}><div className='col'>Box 4</div></Col>
                <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}><div className='col box-5'><MultiLine/></div></Col>
                <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}><div className='col box-6'><DemoRadar /></div></Col>
                <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}><div className='col box-7'>Box 7</div></Col>
                <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}><div className='col box-8'>Box 8</div></Col>
                <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}><div className='col box-9'>Box 9</div></Col>
                <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}><div className='col box-10'>Box 10</div></Col>
                <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}><div className='col box-11'>Box 11</div></Col>
            </Row>
        </>
    )
}

export default LearnGrid;