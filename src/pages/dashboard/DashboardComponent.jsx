import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import DetailIcon from '@material-ui/icons/Launch';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Layout } from '../../components/Layout';
import routes from '../../routes';
import styles from './styles.scss';

const getMonth = (month) => {
  const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];

  return months[month - 1];
};

const DashboardComponent = (props) => {
  const {
    getStatistics,
    getStatisticsIsPending,
    history,
    statistics,
  } = props;

  const data = statistics
    && statistics.monthStatistics
    && statistics.monthStatistics.map((item) => ({
      ...item,
      name: getMonth(item.month),
    }));

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  const handleClickOnChart = (chartData) => {
    const startDate = new Date(chartData.year, chartData.month - 1, 1, 0, 0, 0, 0);
    const endDate = new Date(chartData.year, chartData.month, 1, 0, 0, 0, 0);

    history.push(
      routes.invoices.path,
      {
        endDate,
        startDate,
      },
    );
  };

  const handleClickOnCard = (intervalType) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    if (intervalType === 'last_year') {
      startDate.setFullYear(currentDate.getFullYear() - 1, 0, 1);
      endDate.setMonth(0, 1);
    } else if (intervalType === 'this_year') {
      startDate.setMonth(0, 1);
      endDate.setFullYear(currentDate.getFullYear() + 1, 0, 1);
    } else if (intervalType === 'last_month') {
      startDate.setMonth(currentDate.getMonth() - 1, 1);
      endDate.setDate(1);
    } else if (intervalType === 'this_month') {
      startDate.setDate(1);
      endDate.setMonth(currentDate.getMonth() + 1, 1);
    }

    history.push(
      routes.invoices.path,
      {
        endDate,
        startDate,
      },
    );
  };

  const renderStatisticsBlock = (title, statisticsItem, intervalType) => (
    <Grid item xs={12} md={6} lg={3}>
      <Paper style={{ height: '100%' }}>
        <Box p={3}>
          <Box pb={3}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <h2 className={styles.title}>{title}</h2>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => {
                    handleClickOnCard(intervalType);
                  }}
                  title="Přejít na výpis faktur"
                >
                  <DetailIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          {
              (getStatisticsIsPending || !statisticsItem)
                ? (
                  <>
                    <Skeleton animation="wave" variant="text" height={37} />
                    <Skeleton animation="wave" variant="text" height={37} />
                    <Skeleton animation="wave" variant="text" height={37} />
                  </>
                ) : (
                  <TableContainer>
                    <Table style={{ width: '100%' }} size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell variant="head">
                            Zaplacené faktury
                          </TableCell>
                          <TableCell>
                            {statisticsItem.paidInvoicesPrice.toFixed(2)}
                            {' '}
                            CZK
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">
                            Nezaplacené faktury
                          </TableCell>
                          <TableCell>
                            {statisticsItem.unpaidInvoicesPrice.toFixed(2)}
                            {' '}
                            CZK
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">
                            Celkem
                          </TableCell>
                          <TableCell>
                            {(
                              statisticsItem.paidInvoicesPrice
                              + statisticsItem.unpaidInvoicesPrice
                            ).toFixed(2)}
                            {' '}
                            CZK
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
            }
        </Box>
      </Paper>
    </Grid>
  );

  return (
    <Layout title="Přehled">
      <Grid
        container
        spacing={2}
        style={{ gridAutoRows: '1fr' }}
      >
        <Grid item xs={12}>
          <Paper>
            <Box p={3}>
              {
                (getStatisticsIsPending || !statistics)
                  ? (
                    <Grid
                      container
                      spacing={2}
                      style={{
                        gridAutoRows: '1fr',
                      }}
                    >
                      {[...Array(12).keys()].map((value) => (
                        <Grid key={value} item xs={1}>
                          <Skeleton animation="wave" height="300px" variant="rect" />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <ResponsiveContainer height={300}>
                      <BarChart
                        data={data}
                        margin={{
                          bottom: 0,
                          left: 0,
                          right: 20,
                          top: 20,
                        }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(v) => `${v.toFixed(2)} CZK`}
                          labelStyle={{
                            marginBottom: 5,
                          }}
                        />
                        <Bar
                          dataKey="paidInvoicesPrice"
                          fill="#009688"
                          name="Zaplacené"
                          onClick={handleClickOnChart}
                          stackId="all"
                        />
                        <Bar
                          dataKey="unpaidInvoicesPrice"
                          fill="#7bcec5"
                          name="Nezaplacené"
                          onClick={handleClickOnChart}
                          stackId="all"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )
              }
            </Box>
          </Paper>
        </Grid>
        {renderStatisticsBlock('Minulý rok', statistics?.lastYear, 'last_year')}
        {renderStatisticsBlock('Tento rok', statistics?.thisYear, 'this_year')}
        {renderStatisticsBlock('Minulý měsíc', statistics?.lastMonth, 'last_month')}
        {renderStatisticsBlock('Tento měsíc', statistics?.thisMonth, 'this_month')}
      </Grid>
    </Layout>
  );
};

DashboardComponent.defaultProps = {
  statistics: null,
};

DashboardComponent.propTypes = {
  getStatistics: PropTypes.func.isRequired,
  getStatisticsIsPending: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  statistics: PropTypes.shape({
    lastMonth: PropTypes.shape({
      paidInvoicesPrice: PropTypes.number.isRequired,
      unpaidInvoicesPrice: PropTypes.number.isRequired,
    }).isRequired,
    lastYear: PropTypes.shape({
      paidInvoicesPrice: PropTypes.number.isRequired,
      unpaidInvoicesPrice: PropTypes.number.isRequired,
    }).isRequired,
    monthStatistics: PropTypes.arrayOf(PropTypes.shape({
      month: PropTypes.number.isRequired,
      paidInvoicesPrice: PropTypes.number.isRequired,
      unpaidInvoicesPrice: PropTypes.number.isRequired,
    })).isRequired,
    thisMonth: PropTypes.shape({
      paidInvoicesPrice: PropTypes.number.isRequired,
      unpaidInvoicesPrice: PropTypes.number.isRequired,
    }).isRequired,
    thisYear: PropTypes.shape({
      paidInvoicesPrice: PropTypes.number.isRequired,
      unpaidInvoicesPrice: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

export default DashboardComponent;

