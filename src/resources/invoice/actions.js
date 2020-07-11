import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

const prepareInvoiceBody = (data) => ({
  ...data,
  clientInfo: {
    ...data.clientInfo,
    cidNumber: data.clientInfo.cidNumber ? parseInt(data.clientInfo.cidNumber, 10) : null,
    original: `/clients/${data.clientInfo.original}`,
    postalCode: parseInt(data.clientInfo.postalCode, 10),
    taxNumber: data.clientInfo.taxNumber ? parseInt(data.clientInfo.taxNumber, 10) : null,
  },
  invoiceDate: data.invoiceDate.toJSON(),
  invoiceDueDate: data.invoiceDueDate.toJSON(),
  invoiceItems: data.invoiceItems.map((invoiceItem) => ({
    ...invoiceItem,
    pricePerQuantityUnit: parseInt(invoiceItem.pricePerQuantityUnit, 10),
    quantity: parseInt(invoiceItem.quantity, 10),
  })),
  invoicePaymentDate: data.invoicePaymentDate ? data.invoicePaymentDate.toJSON() : null,
  paymentVariableSymbol: parseInt(data.paymentVariableSymbol, 10),
  projectInfoItems: data.projectInfoItems.map((projectInfo) => ({
    ...projectInfo,
    original: `/projects/${projectInfo.original}`,
  })),
  userInfo: {
    ...data.userInfo,
    cidNumber: parseInt(data.userInfo.cidNumber, 10),
    original: `/users/${data.userInfo.original}`,
    postalCode: parseInt(data.userInfo.postalCode, 10),
    taxNumber: data.userInfo.taxNumber ? parseInt(data.userInfo.taxNumber, 10) : null,
  },
});

export const addInvoice = (data) => createApiAction({
  body: prepareInvoiceBody(data),
  endpoint: '/invoices',
  method: 'POST',
  notificationMessages: {
    failure: 'Přidání faktury se nezdařilo.',
    success: 'Faktura byla úspěšně přidána.',
  },
  types: [
    actionTypes.API_INVOICE_ADD_REQUEST,
    actionTypes.API_INVOICE_ADD_SUCCESS,
    actionTypes.API_INVOICE_ADD_FAILURE,
  ],
});

export const deleteInvoice = (invoiceId) => createApiAction({
  endpoint: `/invoices/${invoiceId}`,
  method: 'DELETE',
  notificationMessages: {
    failure: 'Smazání faktury se nezdařilo.',
    success: 'Faktura byla úspěšně smazána.',
  },
  types: [
    actionTypes.API_INVOICE_DELETE_REQUEST,
    actionTypes.API_INVOICE_DELETE_SUCCESS,
    actionTypes.API_INVOICE_DELETE_FAILURE,
  ],
});

export const editInvoice = (invoiceId, data) => createApiAction({
  body: prepareInvoiceBody(data),
  endpoint: `/invoices/${invoiceId}`,
  method: 'PUT',
  notificationMessages: {
    failure: 'Úprava faktury se nezdařila.',
    success: 'Faktura byla úspěšně upravena.',
  },
  types: [
    actionTypes.API_INVOICE_EDIT_REQUEST,
    actionTypes.API_INVOICE_EDIT_SUCCESS,
    actionTypes.API_INVOICE_EDIT_FAILURE,
  ],
});

export const getInvoice = (invoiceId) => createApiAction({
  dataPath: ['getInvoice'],
  endpoint: `/invoices/${invoiceId}`,
  method: 'GET',
  notificationMessages: {
    failure: 'Získání detailu faktury se nezdařilo.',
  },
  types: [
    actionTypes.API_INVOICE_GET_REQUEST,
    actionTypes.API_INVOICE_GET_SUCCESS,
    actionTypes.API_INVOICE_GET_FAILURE,
  ],
});

export const getInvoices = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    endpoint: `/users/${uid}/invoices`,
    method: 'GET',
    notificationMessages: {
      failure: 'Získání výpisu faktur se nezdařilo.',
    },
    types: [
      actionTypes.API_INVOICES_GET_REQUEST,
      {
        meta: {
          dataPath: ['getInvoices'],
        },
        type: actionTypes.API_INVOICES_GET_SUCCESS,
      },
      actionTypes.API_INVOICES_GET_FAILURE,
    ],
  })(dispatch, getState);
};
