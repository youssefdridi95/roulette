
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Select, InputLabel, MenuItem } from '@mui/material';

import { getUser } from '../utils/common';
import servIP from '../ServConf';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [RTP,setRTP] = useState("85-95");
  const [totalStores,SetTotalStores] = useState(0);
  const [totalBalance,SetTotalBalance] = useState(0);
  const[totalTickets,setTotalTickets] = useState(0);
  const fetchInfos = () => {
    fetch(`http://152.228.133.73:3251/totalInfos`)
    .then(res=>res.json())
    .then(results => {
      console.log(results);
      SetTotalStores(results.Count);
      SetTotalBalance(results.TotalBalance);
      setTotalTickets(results.TotalTickets);
    }).catch(err => {
        console.log(err)
    });
    fetch(`http://152.228.133.73:3251/getRTP`)
    .then(res=>res.json())
    .then(results => {
      setRTP(results.RTP);
    }).catch(err => {
        console.log(err)
    })
  }

  const updateRTP = (rtpv) => {
    fetch(`http://152.228.133.73:3251/updateRTP`, {
      method:"post",
      headers: {
          'Content-Type': 'application/json'
      }, 
      body:JSON.stringify({
        RTP:rtpv
      })
  })
  .then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err)
  });
  }

  useEffect(()=> {
    const myUser = getUser();
    if(myUser == null)
    navigate("/login");  
    else fetchInfos();
  },[]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
        Salut, bienvenue à nouveau
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Solde" total={totalBalance} currency icon={'ant-design:dollar-circle-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Stores" total={totalStores} color="info" icon={'ant-design:shop-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Tickets" total={totalTickets} color="warning" icon={'ant-design:container-filled'} />
          </Grid>
          {/*
            <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
            */
            }
        </Grid>
        <InputLabel id="demo-simple-select-label" style={{marginTop:20}}>RTP</InputLabel>
                <Select
                onChange={(e) => {setRTP(e.target.value); updateRTP(e.target.value)}}
                value={RTP}
                label="RTP"
                style={{marginTop:20}}
                >
                <MenuItem value="5-10">5-10</MenuItem>
                <MenuItem value="10-15">10-15</MenuItem>
                <MenuItem value="15-20">15-20</MenuItem>
                <MenuItem value="20-25">20-25</MenuItem>
                <MenuItem value="25-30">25-30</MenuItem>
                <MenuItem value="30-35">30-35</MenuItem>
                <MenuItem value="35-40">35-40</MenuItem>
                <MenuItem value="40-45">40-45</MenuItem>
                <MenuItem value="45-50">45-50</MenuItem>
                <MenuItem value="50-55">50-55</MenuItem>
                <MenuItem value="55-65">55-65</MenuItem>
                <MenuItem value="65-75">65-75</MenuItem>
                <MenuItem value="75-85">75-85</MenuItem>
                <MenuItem value="85-95">85-95</MenuItem>²
                <MenuItem value="95-105">95-105</MenuItem>
                <MenuItem value="105-115">105-115</MenuItem>
                <MenuItem value="115-120">115-120</MenuItem>
                <MenuItem value="115-120">115-120</MenuItem>
                </Select>
      </Container>
    </Page>
  );
}
