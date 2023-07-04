import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
//import Tooltip from '@mui/material/Tooltip';


function StockChart(props) {

    const [dataStock, setDataStock] = useState([]);

    const stockData = async () => {

        const response = await fetch('http://localhost:8080/ecommerce/categories', {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
        });
        
        const data = await response.json();
        let value = 0
        let datalist = []
        let name = "";
        {
            data.map( item => {
                value = 0;
                item.products.map( product => {
                    value += product.stock;
                } )
                name = item.title[0]+item.title[1]+item.title[2]+item.title[3]+item.title[4]+item.title[5];
                if( item.title.length >6 ) {
                    name += "..";
                }
                datalist.push( {
                    category : name,
                    stock : value,
                })
            })
        }

        setDataStock(datalist);

    }

    useEffect( () => {
        stockData();
    }, []);

    return (
        <div >
            <Paper>
                <Chart
                    data={dataStock}
                >
                    <ArgumentAxis />
                    <ValueAxis max={7} />

                    <BarSeries
                        valueField="stock"
                        argumentField="category"
                    />
                    <Title text=" Category to Products Stock" />
                    <Animation />
                </Chart>
            </Paper>

        </div>
    );
}

export default StockChart;