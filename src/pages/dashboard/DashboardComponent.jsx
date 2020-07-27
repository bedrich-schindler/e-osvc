import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
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

const getMonth = (month) => {
  const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];

  return months[month - 1];
};

const DashboardComponent = (props) => {
  const {
    getStatistics,
    getStatisticsIsPending,
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

  const renderStatisticsBlock = (title, statisticsItem) => (
    <Grid item xs={12} md={6} lg={3}>
      <Paper style={{ height: '100%' }}>
        <Box p={3}>
          <h2>{title}</h2>
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
                              statisticsItem.unpaidInvoicesPrice
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
                          stackId="all"
                        />
                        <Bar
                          dataKey="unpaidInvoicesPrice"
                          fill="#7bcec5"
                          name="Nezaplacené"
                          stackId="all"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )
              }
            </Box>
          </Paper>
        </Grid>
        {renderStatisticsBlock('Minulý rok', statistics?.lastYear)}
        {renderStatisticsBlock('Tento rok', statistics?.thisYear)}
        {renderStatisticsBlock('Minulý měsíc', statistics?.lastMonth)}
        {renderStatisticsBlock('Tento měsíc', statistics?.thisMonth)}
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

