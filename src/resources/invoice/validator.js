export const validateUser = (formData, initialFormValidity) => {
  const formValidity = { ...initialFormValidity };

  ['invoiceDate', 'invoiceDueDate', 'invoiceIdentifier', 'paymentVariableSymbol'].forEach((element) => {
    if (formData[element] === null || formData[element] === '') {
      formValidity.elements[element] = 'Toto pole je povinné.';
      formValidity.isValid = false;
    }
  });

  ['city', 'name', 'original', 'postalCode', 'street'].forEach((element) => {
    if (formData.clientInfo[element] === null || formData.clientInfo[element] === '') {
      formValidity.elements.clientInfo[element] = 'Toto pole je povinné.';
      formValidity.isValid = false;
    }
  });

  ['name', 'original'].forEach((element) => {
    if (formData.projectInfo[element] === null || formData.projectInfo[element] === '') {
      formValidity.elements.projectInfo[element] = 'Toto pole je povinné.';
      formValidity.isValid = false;
    }
  });

  ['bankAccount', 'cidNumber', 'city', 'firstName', 'lastName', 'postalCode', 'street']
    .forEach((element) => {
      if (formData.userInfo[element] === null || formData.userInfo[element] === '') {
        formValidity.elements.userInfo[element] = 'Toto pole je povinné.';
        formValidity.isValid = false;
      }
    });

  ['note', 'pricePerQuantityUnit', 'quantity']
    .forEach((element) => {
      formData.invoiceItems.forEach((rowData, rowIndex) => {
        if (rowData[element] === null || rowData[element] === '') {
          formValidity.elements.invoiceItems[rowIndex][element] = 'Toto pole je povinné.';
          formValidity.isValid = false;
        }
      });
    });

  if (formValidity.elements.invoiceIdentifier === null && formData.invoiceIdentifier.length > 32) {
    formValidity.elements.invoiceIdentifier = 'Toto pole musí být maximálně 32 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.clientInfo.name === null && formData.clientInfo.name.length > 64) {
    formValidity.elements.clientInfo.name = 'Toto pole musí být maximálně 64 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.clientInfo.street === null && formData.clientInfo.street.length > 128) {
    formValidity.elements.clientInfo.street = 'Toto pole musí být maximálně 128 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.clientInfo.city === null && formData.clientInfo.city.length > 128) {
    formValidity.elements.clientInfo.city = 'Toto pole musí být maximálně 128 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.clientInfo.postalCode === null
    && formData.clientInfo.postalCode <= 0
  ) {
    formValidity.elements.clientInfo.postalCode = 'Toto pole musí být větší než 0.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.clientInfo.postalCode === null
    && formData.clientInfo.postalCode > 99999
  ) {
    formValidity.elements.clientInfo.postalCode = 'Toto pole musí být menší než 100000.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.clientInfo.cidNumber === null
    && formData.clientInfo.cidNumber !== null
    && formData.clientInfo.cidNumber <= 0
  ) {
    formValidity.elements.clientInfo.cidNumber = 'Toto pole musí být větší než 0.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.clientInfo.taxNumber === null
    && formData.clientInfo.taxNumber !== null
    && formData.clientInfo.taxNumber <= 0
  ) {
    formValidity.elements.clientInfo.taxNumber = 'Toto pole musí být větší než 0.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.userInfo.firstName === null
    && formData.userInfo.firstName.length > 32
  ) {
    formValidity.elements.userInfo.firstName = 'Toto pole musí být maximálně 64 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.userInfo.lastName === null
    && formData.userInfo.lastName.length > 32
  ) {
    formValidity.elements.userInfo.lastName = 'Toto pole musí být maximálně 64 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.userInfo.street === null && formData.userInfo.street.length > 128) {
    formValidity.elements.userInfo.street = 'Toto pole musí být maximálně 128 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.userInfo.city === null && formData.userInfo.city.length > 128) {
    formValidity.elements.userInfo.city = 'Toto pole musí být maximálně 128 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.userInfo.postalCode === null
    && formData.userInfo.postalCode <= 0
  ) {
    formValidity.elements.userInfo.postalCode = 'Toto pole musí být větší než 0.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.userInfo.postalCode === null
    && formData.userInfo.postalCode > 99999
  ) {
    formValidity.elements.userInfo.postalCode = 'Toto pole musí být menší než 100000.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.userInfo.cidNumber === null
    && formData.userInfo.cidNumber <= 0
  ) {
    formValidity.elements.userInfo.cidNumber = 'Toto pole musí být větší než 0.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.userInfo.taxNumber === null
    && formData.userInfo.taxNumber !== null
    && formData.userInfo.taxNumber <= 0
  ) {
    formValidity.elements.userInfo.taxNumber = 'Toto pole musí být větší než 0.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.userInfo.bankAccount === null
    && formData.userInfo.bankAccount.length > 64
  ) {
    formValidity.elements.userInfo.bankAccount = 'Toto pole musí být maximálně 64 znaků dlouhé.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.projectInfo.name === null
    && formData.projectInfo.name > 64
  ) {
    formValidity.elements.projectInfo.name = 'Toto pole musí být maximálně 64 znaků dlouhé.';
    formValidity.isValid = false;
  }

  formData.invoiceItems.forEach((rowData, rowIndex) => {
    if (
      formValidity.elements.invoiceItems[rowIndex].quantity === null
      && rowData.quantity <= 0
    ) {
      formValidity.elements.invoiceItems[rowIndex].quantity = 'Toto pole musí být větší než 0.';
      formValidity.isValid = false;
    }

    if (
      formValidity.elements.invoiceItems[rowIndex].pricePerQuantityUnit === null
      && rowData.pricePerQuantityUnit <= 0
    ) {
      formValidity.elements.invoiceItems[rowIndex].pricePerQuantityUnit = 'Toto pole musí být větší než 0.';
      formValidity.isValid = false;
    }

    if (
      formValidity.elements.invoiceItems[rowIndex].quantityUnit === null
      && rowData.quantityUnit !== null
      && rowData.quantityUnit.length > 8
    ) {
      formValidity.elements.invoiceItems[rowIndex].quantityUnit = 'Toto pole musí být maximálně 8 znaků dlouhé.';
      formValidity.isValid = false;
    }
  });

  return formValidity;
};
