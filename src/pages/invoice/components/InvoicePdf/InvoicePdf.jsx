import PropTypes from 'prop-types';
import React from 'react';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { getTimeDifferenceString } from '../../../../services/dateTimeService';
import { getTotalTime } from '../../helpers';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      fontWeight: 'normal',
      src: `${IS_ELECTRON ? '.' : ''}/fonts/roboto-regular.ttf`,
    },
    {
      fontWeight: 'bold',
      src: `${IS_ELECTRON ? '.' : ''}/fonts/roboto-bold.ttf`,
    },
  ],
});

const styles = StyleSheet.create({
  column: {
    flexGrow: 1,
    marginBottom: 25,
  },
  page: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 100,
    padding: 50,
    width: '100%',
  },
  section: {
    marginBottom: 25,
  },
  sectionSmall: {
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: 'bold',
  },
  tableBodyCellNarrow: {
    padding: 5,
    width: '20%',
  },
  tableBodyCellWide: {
    padding: 5,
    width: '40%',
  },
  tableFooterCellExtraWide: {
    padding: 5,
    width: '80%',
  },
  tableFooterCellNarrow: {
    padding: 5,
    width: '20%',
  },
  tableLine: {
    borderBottom: '1pt solid gray',
    display: 'flex',
    flexDirection: 'row',
  },
  tableLineFooter: {
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
  },
  twoColumnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

const InvoicePdf = ({ invoice }) => {
  let totalPrice = 0;
  if (invoice && invoice.invoiceItems) {
    totalPrice = invoice.invoiceItems.reduce(
      (total, invoiceItem) => total + invoiceItem.pricePerQuantityUnit * invoiceItem.quantity,
      0,
    );
  }

  return (
    <Document
      title={`Faktura ${invoice.invoiceIdentifier}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.title}>
            <Text>Faktura</Text>
          </View>
          <View style={styles.title}>
            <Text>{invoice.invoiceIdentifier}</Text>
          </View>
        </View>
        <View style={styles.twoColumnsWrapper}>
          <View style={styles.column}>
            <View style={styles.sectionSmall}>
              <Text style={styles.subtitle}>Dodavatel</Text>
            </View>
            <View style={styles.sectionSmall}>
              <Text>
                {invoice.userInfo.firstName}
                {' '}
                {invoice.userInfo.lastName}
              </Text>
              <Text>{invoice.userInfo.street}</Text>
              <Text>{invoice.userInfo.city}</Text>
              <Text>{invoice.userInfo.postalCode}</Text>
            </View>
            <View style={styles.section}>
              <Text>
                IČ:
                {invoice.userInfo.cidNumber}
              </Text>
              <Text>
                DIČ:
                {invoice.userInfo.taxNumber ?? 'neplátce DPH'}
              </Text>
            </View>
            <View style={styles.sectionSmall}>
              <Text style={styles.subtitle}>Platební údaje</Text>
            </View>
            <View style={styles.section}>
              <Text>Způsob platby: převodem na účet</Text>
              <Text>
                Číslo účtu:
                {invoice.userInfo.bankAccount}
              </Text>
              <Text>
                Variabilní symbol:
                {invoice.paymentVariableSymbol}
              </Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.sectionSmall}>
              <Text style={styles.subtitle}>Odběratel</Text>
            </View>
            <View style={styles.sectionSmall}>
              <Text>{invoice.clientInfo.name}</Text>
              <Text>{invoice.clientInfo.street}</Text>
              <Text>{invoice.clientInfo.city}</Text>
              <Text>{invoice.clientInfo.postalCode}</Text>
            </View>
            <View style={styles.section}>
              {
                invoice.clientInfo.cidNumber
                  ? (
                    <>
                      <Text>
                        IČ:
                        {invoice.clientInfo.cidNumber}
                      </Text>
                      <Text>
                        DIČ:
                        {invoice.clientInfo.taxNumber ?? 'neplátce DPH'}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text> </Text>
                      <Text> </Text>
                    </>
                  )
              }
            </View>
            <View style={styles.sectionSmall}>
              <Text style={styles.subtitle}>Údaje o splatnosti</Text>
            </View>
            <View style={styles.section}>
              <Text>
                Datum vystavení:
                {invoice.invoiceDate.toLocaleDateString()}
              </Text>
              <Text>
                Datum splatnosti:
                {invoice.invoiceDueDate.toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.tableLine}>
            <Text style={styles.tableBodyCellNarrow}>Množství</Text>
            <Text style={styles.tableBodyCellWide}>Popis</Text>
            <Text style={styles.tableBodyCellNarrow}>Cena za MJ</Text>
            <Text style={styles.tableBodyCellNarrow}>Cena celkem</Text>
          </View>
          {invoice.invoiceItems.map((invoiceItem) => (
            <View
              key={invoiceItem.id}
              style={styles.tableLine}
            >
              <Text style={styles.tableBodyCellNarrow}>
                {invoiceItem.quantity}
                {' '}
                {invoiceItem.quantityUnit}
              </Text>
              <Text style={styles.tableBodyCellWide}>
                {invoiceItem.note}
              </Text>
              <Text style={styles.tableBodyCellNarrow}>
                {invoiceItem.pricePerQuantityUnit.toFixed(2)}
                {' '}
                CZK
              </Text>
              <Text style={styles.tableBodyCellNarrow}>
                {(invoiceItem.pricePerQuantityUnit * invoiceItem.quantity).toFixed(2)}
                {' '}
                CZK
              </Text>
            </View>
          ))}
          <View style={styles.tableLineFooter}>
            <Text style={styles.tableFooterCellExtraWide} />
            <Text style={styles.tableFooterCellNarrow}>
              {totalPrice.toFixed(2)}
              {' '}
              CZK
            </Text>
          </View>
        </View>
      </Page>
      {invoice.timeRecords.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.title}>
              <Text>Přehled odpracovaných hodin</Text>
            </View>
            <View style={styles.title}>
              <Text>{invoice.invoiceIdentifier}</Text>
            </View>
          </View>
          <View>
            <View>
              <View style={styles.tableLine}>
                <Text style={styles.tableBodyCellNarrow}>Datum a čas</Text>
                <Text style={styles.tableBodyCellWide}>Poznámka</Text>
                <Text style={styles.tableBodyCellNarrow}>Projekt</Text>
                <Text style={styles.tableBodyCellNarrow}>Délka</Text>
              </View>
              {invoice.timeRecords.map((timeRecord) => (
                <View
                  key={timeRecord.id}
                  style={styles.tableLine}
                >
                  <Text style={styles.tableBodyCellNarrow}>
                    {timeRecord.startDateTime.toLocaleString()}
                  </Text>
                  <Text style={styles.tableBodyCellWide}>
                    {timeRecord.note}
                  </Text>
                  <Text style={styles.tableBodyCellNarrow}>
                    {timeRecord.project.name}
                  </Text>
                  <Text style={styles.tableBodyCellNarrow}>
                    {getTimeDifferenceString(timeRecord.startDateTime, timeRecord.endDateTime)}
                  </Text>
                </View>
              ))}
              <View style={styles.tableLineFooter}>
                <Text style={styles.tableFooterCellExtraWide} />
                <Text style={styles.tableFooterCellNarrow}>
                  {getTotalTime(invoice.timeRecords)}
                </Text>
              </View>
            </View>
          </View>
        </Page>
      )}
    </Document>
  );
};

InvoicePdf.propTypes = {
  invoice: PropTypes.shape({
    clientInfo: PropTypes.shape({
      cidNumber: PropTypes.number,
      city: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      postalCode: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      taxNumber: PropTypes.string,
    }).isRequired,
    id: PropTypes.number.isRequired,
    invoiceDate: PropTypes.object.isRequired,
    invoiceDueDate: PropTypes.object.isRequired,
    invoiceIdentifier: PropTypes.string.isRequired,
    invoiceItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      pricePerQuantityUnit: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      quantityUnit: PropTypes.string,
    })).isRequired,
    invoicePaymentDate: PropTypes.object,
    paymentVariableSymbol: PropTypes.number.isRequired,
    projectInfoItems: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      original: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired,
    })).isRequired,
    timeRecords: PropTypes.arrayOf(PropTypes.shape({
      endDateTime: PropTypes.object.isRequired,
      project: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      startDateTime: PropTypes.object.isRequired,
    })),
    userInfo: PropTypes.shape({
      bankAccount: PropTypes.string.isRequired,
      cidNumber: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      postalCode: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      taxNumber: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default InvoicePdf;
