import { Line } from '@ant-design/plots';
import { useEffect, useState } from 'react';

function MultiLine() {
    const [dataLine, setDataLine] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            fetch(`https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json`)
                .then(res => res.json())
                .then(data => {
                    setDataLine(data);
                })
        }

        fetchAPI();
    }, [])

    const config = {
        data: dataLine,
        xField: (d) => new Date(d.year),
        yField: 'value',
        sizeField: 'value',
        shapeField: 'trail',
        legend: { size: false },
        colorField: 'category',
    }

    return (
        <>
            <Line {...config} />
        </>
    )
}


export default MultiLine;