import { Button, ButtonGroup, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import statIcon1 from "./Images/Clock.png"
import statIcon2 from "./Images/Activity.png"
import statIcon3 from "./Images/Graph.png"
import moreIcon from "./Images/more.png"
import arrowUp from "./Images/arrow-up.png"
import arrowDown from "./Images/arrow-down 2.png"
import TestAnalyticsIcon1 from "./Images/Frame 26.png"
import TestAnalyticsIcon2 from "./Images/Frame 26 2.png"
import TestAnalyticsIcon3 from "./Images/Frame 26 3.png"
import TestAnalyticsIcon4 from "./Images/Frame 26 4.png"
import Navbar from './Navbar'

const HomeDashboard = () => {
    return (
        <>
            <Card className='homeDashboard'>
                <div className='homeDashboard-main'>

                <Navbar />

                <div className='dashboardBlock' >
                    <div className='dashboardTitle'>
                        <Typography className='' variant='p'>
                            Your Dashboard
                        </Typography>
                    </div>
                    <div className="dailyStats">
                        <Card>
                            <div className='dailyStatsBlock1'>
                                <div>
                                    <Card>

                                        <img src={statIcon3} alt="" />
                                    </Card>
                                    <Typography variant='p'>Today’s <span>Visitors</span></Typography>
                                </div>
                                <div className='moreIcon'>
                                    <img src={moreIcon} alt="" />
                                </div>
                            </div>
                            <div className="dailyStatsBlock2">
                                <div className='dailyStatsBlock2-sub1'>
                                    <Typography variant='h4'> 5,432</Typography>
                                </div>
                                <hr />
                                <div className='dailyStatsBlock2-sub2'>
                                    <Typography variant='p'>Daily change:</Typography>

                                    <div>
                                        <img src={arrowUp} alt="" />

                                        <Typography variant='h4'> 12%</Typography>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className='dailyStatsBlock1'>
                                <div>
                                    <Card>

                                        <img src={statIcon1} alt="" />
                                    </Card>
                                    <Typography variant='p'>PricePerfect <span>Revenue</span></Typography>
                                </div>
                                <div className='moreIcon'>
                                    <img src={moreIcon} alt="" />
                                </div>
                            </div>
                            <div className="dailyStatsBlock2 ">
                                <div className='dailyStatsBlock2-sub1 revenue'>
                                    <Typography variant='h4'>  $3,401.89 </Typography>
                                </div>
                                <hr />
                                <div className='dailyStatsBlock2-sub2'>
                                    <Typography variant='p'>Daily change:</Typography>

                                    <div>
                                        <img src={arrowDown} alt="" />

                                        <Typography variant='h4' className='downArrow'> 20%</Typography>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className='dailyStatsBlock1'>
                                <div>
                                    <Card>

                                        <img src={statIcon2} alt="" />
                                    </Card>
                                    <Typography variant='p'>Revenue <span>Change</span></Typography>
                                </div>
                                <div className='moreIcon'>
                                    <img src={moreIcon} alt="" />
                                </div>
                            </div>
                            <div className="dailyStatsBlock2">
                                <div className='dailyStatsBlock2-sub1 changeRevenue'>
                                    <Typography variant='h4'>+6%</Typography>
                                </div>
                                <hr />
                                <div className='dailyStatsBlock2-sub2'>
                                    <Typography variant='p'>Daily change:</Typography>

                                    <div>
                                        <img src={arrowUp} alt="" />

                                        <Typography variant='h4'> 23%</Typography>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='analyticsSection'>
                        {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }}>
                            {Array.from(Array(6)).map((_, index) => (
                                <Grid className="test" item xs={3} sm={6} md={3} key={index}>
                                    <p>xs=2</p>
                                </Grid>
                            ))}
                        </Grid> */}

                        <Card className='testAnalytics'>
                            <div>
                                <Typography variant='h5'>Test Analytics</Typography>
                                <div className='analyticsBtnGroup'>
                                    <Button><img src={TestAnalyticsIcon1} alt="" /> <p>Lorem ipsum</p></Button>
                                    <Button><img src={TestAnalyticsIcon2} alt="" /><p>Lorem ipsum</p></Button>
                                    <Button><img src={TestAnalyticsIcon3} alt="" /><p>Lorem ipsum</p></Button>
                                    <Button><img src={TestAnalyticsIcon4} alt="" /><p>Lorem ipsum</p></Button>
                                </div>
                            </div>
                        </Card>
                        <Card className='yourTests'>
                            <div>
                                <Typography variant='h5'>Your Tests</Typography>
                            </div>
                        </Card>
                    </div>
                </div>
                </div>
            </Card>

        </>
    )
}

export default HomeDashboard