import initialState from './initialState';
import * as actionTypes from './actionTypes';

const transformInvoice = (rawData) => ({
  ...rawData,
  invoiceDate: rawData.invoiceDate ? new Date(rawData.invoiceDate) : null,
  invoiceDueDate: rawData.invoiceDueDate ? new Date(rawData.invoiceDueDate) : null,
  invoicePaymentDate: rawData.invoicePaymentDate ? new Date(rawData.invoicePaymentDate) : null,
  timeRecords: rawData.timeRecords.map((timeRecord) => ({
    ...timeRecord,
    endDateTime: new Date(timeRecord.endDateTime),
    startDateTime: new Date(timeRecord.startDateTime),
  })),
});

export default (state, action) => {
  if (state === undefined) {
    return initialState();
  }

  if (action.type === actionTypes.API_INVOICE_GET_SUCCESS) {
    return state.setIn(
      ['data', 'getInvoice'],
      transformInvoice(action.payload),
    );
  }

  return state;
};
