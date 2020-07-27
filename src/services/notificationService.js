import { getInvoices } from '../resources/invoice';
import { getUser } from '../resources/user';

export const showNotification = (message) => {
  if (!('Notification' in window)) {
    return;
  }

  const showNotificationImpl = () => {
    if (IS_ELECTRON) {
      return new Notification('eOSVČ', {
        body: message,
      });
    }

    return new Notification('eOSVČ', {
      body: message,
      icon: '/images/favicon-96x96.png',
    });
  }

  if (Notification.permission === 'granted') {
    return showNotificationImpl();
  }

  if (Notification.permission !== 'denied') {
    return Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        return showNotificationImpl();
      }

      return null;
    });
  }

  return null;
};

const handleOverdueInvoice = async (store) => {
  let invoices = null;

  try {
    const invoicesResponse = await store.dispatch(getInvoices());
    invoices = invoicesResponse.payload;
  } catch (e) {
    return null;
  }

  invoices = invoices.map((invoice) => ({
    ...invoice,
    invoiceDueDate: invoice.invoiceDueDate
      ? new Date(invoice.invoiceDueDate)
      : null,
    invoicePaymentDate: invoice.invoicePaymentDate
      ? new Date(invoice.invoicePaymentDate)
      : null,
  }));

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const foundInvoices = invoices.filter((invoice) => {
    invoice.invoiceDueDate.setHours(0, 0, 0, 0);
    return invoice.invoiceDueDate < currentDate && invoice.invoicePaymentDate === null;
  });

  if (foundInvoices.length === 0) {
    return null;
  }

  return foundInvoices.map((foundInvoice) => showNotification(
    `Faktura ${foundInvoice.invoiceIdentifier} je po splatnosti`,
  ));
};

const handleHealthInsurance = async (store, dayOfMonth) => {
  const currentDate = new Date();

  if (currentDate.getDate() === dayOfMonth) {
    return showNotification('Proveďte platbu zálohy zdravotního pojištění');
  }

  return null;
};

const handleSicknessInsurance = async (store, dayOfMonth) => {
  const currentDate = new Date();

  if (currentDate.getDate() === dayOfMonth) {
    return showNotification('Proveďte platbu zálohy nemocenského pojištění');
  }

  return null;
};

const handleSocialInsurance = async (store, dayOfMonth) => {
  const currentDate = new Date();

  if (currentDate.getDate() === dayOfMonth) {
    return showNotification('Proveďte platbu zálohy sociálního pojištění');
  }

  return null;
};

const handleTax = async (store, dayOfMonth) => {
  const currentDate = new Date();

  if (currentDate.getDate() === dayOfMonth) {
    return showNotification('Proveďte platbu zálohy daně');
  }

  return null;
};

export const registerNotificationService = async (store) => {
  const handle = async () => {
    let userNotifications = null;

    try {
      const userResponse = await store.dispatch(getUser());
      userNotifications = userResponse.payload.userNotifications;
    } catch (e) {
      setTimeout(() => {
        handle();
      }, 30000);

      return;
    }

    if (!userNotifications) {
      return;
    }

    if (userNotifications.overdueInvoiceEnabled) {
      await handleOverdueInvoice(store);
    }

    if (userNotifications.healthInsuranceEnabled) {
      await handleHealthInsurance(store, userNotifications.healthInsuranceDayOfMonth);
    }

    if (userNotifications.sicknessInsuranceEnabled) {
      await handleSicknessInsurance(store, userNotifications.sicknessInsuranceDayOfMonth);
    }

    if (userNotifications.socialInsuranceEnabled) {
      await handleSocialInsurance(store, userNotifications.socialInsuranceDayOfMonth);
    }

    if (userNotifications.taxEnabled) {
      await handleTax(store, userNotifications.taxDayOfMonth);
    }
  };

  await handle();

  return setInterval(() => {
    handle();
  }, 3600000);
};
