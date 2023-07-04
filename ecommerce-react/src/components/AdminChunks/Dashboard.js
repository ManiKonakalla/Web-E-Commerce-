import React, { useEffect, useState } from 'react';
import OrderPart from './DashboardParts/OrderPart';
import Profit from './DashboardParts/Profit';
import RecentlyProduct from './DashboardParts/RecentlyProduct';
import { useSelector } from 'react-redux';
import AllUsers from './DashboardParts/AllUsers';
import OutOfStock from './DashboardParts/OutOfStock';
import StockChart from './DashboardParts/StockChart';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
        borderRadius: "20px"
    },

}))

function Dashboard(props) {

    const styleclasses = useStyles();

    const productAddedList = useSelector(state => state.recent.recentlyAdded);
    const productUpdatedList = useSelector(state => state.recent.recentlyUpdated);

    const [placed, setPlaced] = useState(0);
    const [ship, setShip] = useState(0);
    const [transit, setTransit] = useState(0);
    const [delivered, setDelivered] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [profit, setProfit] = useState(0);

    const ordersCalc = () => {
        let p = 0;
        let s = 0;
        let t = 0;
        let d = 0;
        let r = 0;
        let pr = 0;

        let stat = null;
        let today = new Date().getTime();
        {
            props.orderList.map(order => {

                let odate = new Date(order.timestamp).getTime();

                var msDiff = today - odate;
                var days = Math.floor(msDiff / (1000 * 60 * 60 * 24)) + 2;

                stat = order.status;
                if (days < 8) {
                    pr += order.amount;
                    if (stat === "Placed") {
                        p += 1;
                    }
                    if (stat === "Ship") {
                        s += 1;
                    }
                    if (stat === "In-transit") {
                        t += 1;
                    }
                    if (stat === "Delivered") {
                        d += 1;
                    }
                    if (stat === "Rejected") {
                        r += 1;
                    }
                }

            })
        }
        setPlaced(p);
        setShip(s);
        setTransit(t);
        setDelivered(d);
        setRejected(r);
        setProfit(pr);
    }

    const profitCalc = () => {

    }

    useEffect(() => {
        ordersCalc();
        //profitCalc();
    })


    return (
        <div>

            {/* <Container maxWidth="lg" className={styleclasses.container}>
                <Grid container spacing={3}>

                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={styleclasses.fixedHeightPaper}>
                            <OrderPart key="placed" logo="bi bi-journal-check" pos="Placed" value={placed} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={styleclasses.fixedHeightPaper}>
                            <OrderPart key="ship" logo="bi bi-truck" pos="Ship" value={ship} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={styleclasses.fixedHeightPaper}>
                            <OrderPart key="transit" logo="bi bi-truck" pos="In-transit" value={transit} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={styleclasses.fixedHeightPaper}>
                            <OrderPart key="delivered" logo="bi bi-gift" pos="Delivered" value={delivered} />
                        </Paper>
                    </Grid>

                </Grid>
            </Container> */}
            <div class="row">
                <div class="col-sm-3" style={{ paddingLeft: "15px" }}>
                    <OrderPart key="placed" logo="bi bi-journal-check" pos="Placed" value={placed} />
                </div>
                <div class="col-sm-3" style={{ paddingLeft: "15px" }}>
                    <OrderPart key="ship" logo="bi bi-truck" pos="Ship" value={ship} />
                </div>
                <div class="col-sm-3" style={{ paddingLeft: "15px" }}>
                    <OrderPart key="transit" logo="bi bi-truck" pos="In-transit" value={transit} />
                </div>
                <div class="col-sm-3" style={{ paddingLeft: "15px" }}>
                    <OrderPart key="delivered" logo="bi bi-gift" pos="Delivered" value={delivered} />
                </div>
            </div>
            <div class="row" style={{ paddingTop: "20px" }}>
                <div class="col-sm-2" style={{ paddingLeft: "35px" }}>
                    <OrderPart key="rejected" logo="bi bi-hand-thumbs-down" pos="Rejected" value={rejected} />

                    <Profit key="profit" value={profit} />

                    <AllUsers />
                </div>
                <div class="col-sm-8" style={{ paddingLeft: "140px", width: "900px" }}>
                    <StockChart />
                </div>
            </div>
            <div class="row" style={{ paddingTop: "35px" }}>

                <div class="col-sm-4" style={{ paddingLeft: "32px" }}>
                    <RecentlyProduct key="Added" name="Added" products={productAddedList} />
                </div>
                <div class="col-sm-4" style={{ paddingLeft: "10px" }}>
                    <RecentlyProduct key="Updated" name="Updated" products={productUpdatedList} />
                </div>
                <div class="col-sm-4" style={{ paddingLeft: "10px" }}>
                    <OutOfStock />
                </div>

            </div>

        </div>
    );
}

export default Dashboard;