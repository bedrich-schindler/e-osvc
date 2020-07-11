import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React  from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { cloneDeep } from 'lodash';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Layout } from '../../components/Layout';
import { validateUser } from '../../resources/invoice/validator';
import { updateData } from '../../services/dataService';
import routes from '../../routes';
import styles from './styles.scss';

const initialFormData = {
  clientInfo: {
    cidNumber: null,
    city: null,
    name: null,
    original: null,
    postalCode: null,
    street: null,
    taxNumber: null,
  },
  invoiceDate: null,
  invoiceDueDate: null,
  invoiceIdentifier: null,
  invoiceItems: [
    {
      note: null,
      pricePerQuantityUnit: null,
      quantity: null,
      quantityUnit: null,
    },
  ],
  invoicePaymentDate: null,
  paymentVariableSymbol: null,
  projectInfoItems: [],
  userInfo: {
    bankAccount: null,
    cidNumber: null,
    city: null,
    firstName: null,
    lastName: null,
    postalCode: null,
    street: null,
    taxNumber: null,
  },
};

class InvoiceEditComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: cloneDeep(initialFormData),
      formValidity: {
        elements: cloneDeep(initialFormData),
        isValid: true,
      },
      isFailed: false,
    };

    this.addInvoiceItem = this.addInvoiceItem.bind(this);
    this.changeClientHandler = this.changeClientHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.changeProjectHandler = this.changeProjectHandler.bind(this);
    this.changeInvoiceDateHandler = this.changeInvoiceDateHandler.bind(this);
    this.changeInvoiceDueDateHandler = this.changeInvoiceDueDateHandler.bind(this);
    this.changeInvoicePaymentDateHandler = this.changeInvoicePaymentDateHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  addInvoiceItem() {
    this.setState((prevState) => {
      const {
        formData,
        formValidity,
      } = prevState;

      return {
        formData: {
          ...formData,
          invoiceItems: [
            ...formData.invoiceItems,
            cloneDeep(initialFormData.invoiceItems[0]),
          ],
        },
        formValidity: {
          ...formValidity,
          elements: {
            ...formValidity.elements,
            invoiceItems: [
              ...formValidity.elements.invoiceItems,
              cloneDeep(initialFormData.invoiceItems[0]),
            ],
          }
        },
      };
    })
  }

  deleteInvoiceItem(index) {
    this.setState((prevState) => {
      const {
        formData,
        formValidity,
      } = prevState;

      const invoiceItems = formData.invoiceItems.slice();
      const invoiceItemsErrors = formValidity.elements.invoiceItems.slice();

      invoiceItems.splice(index, 1);
      invoiceItemsErrors.splice(index, 1);

      return {
        formData: {
          ...formData,
          invoiceItems,
        },
        formValidity: {
          ...formValidity,
          elements: {
            ...formValidity.elements,
            invoiceItems: invoiceItemsErrors,
          },
        },
      };
    })
  }

  componentDidMount() {
    const {
      getClients,
      getInvoice,
      getProjects,
      getUser,
      match,
    } = this.props;

    getInvoice(match.params.id).then((response) => {
      const { payload } = response;

      this.setState((prevState) => ({
        formData: {
          ...payload,
          clientInfo: {
            ...payload.clientInfo,
            original: payload.clientInfo.original.id,
          },
          invoiceDate: payload.invoiceDate ? new Date(payload.invoiceDate) : null,
          invoiceDueDate: payload.invoiceDueDate ? new Date(payload.invoiceDueDate) : null,
          invoicePaymentDate: payload.invoicePaymentDate ? new Date(payload.invoicePaymentDate) : null,
          projectInfoItems: payload.projectInfoItems.map((projectInfo) => ({
            ...projectInfo,
            original: projectInfo.original.id,
          })),
        },
        formValidity: {
          ...prevState.formValidity,
          elements: {
            ...prevState.formValidity.elements,
            invoiceItems: payload.invoiceItems.map(
              () => cloneDeep(initialFormData.invoiceItems[0]),
            ),
          }
        }
      }))
    })
    getClients();
    getProjects();
    getUser();
  }

  changeHandler(e) {
    const eventTarget = e.target;
    let {
      name,
      value,
    } = eventTarget;

    this.setState((prevState) => ({
      formData: updateData(prevState.formData, name, value),
    }));
  }

  changeClientHandler(e) {
    const eventTarget = e.target;
    let { value } = eventTarget;
    const { clients } = this.props;

    const client = clients.find((p) => p.id === value);

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        clientInfo: {
          cidNumber: client.cidNumber,
          city: client.city,
          name: client.name,
          original: client.id,
          postalCode: client.postalCode,
          street: client.street,
          taxNumber: client.taxNumber,
        },
        projectInfoItems: [],
      },
    }));
  }

  changeProjectHandler(e) {
    const eventTarget = e.target;
    let { value } = eventTarget;
    const { projects } = this.props;

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        projectInfoItems: value.map((id) => {
          const { name } = projects.find((p) => p.id === id);

          return {
            name,
            original: id,
          }
        }),
      },
    }));
  }

  changeInvoiceDateHandler(value) {
    return this.changeHandler({
      target: {
        name: 'invoiceDate',
        value: value ? new Date(value) : null,
      },
    })
  }

  changeInvoiceDueDateHandler(value) {
    return this.changeHandler({
      target: {
        name: 'invoiceDueDate',
        value: value ? new Date(value) : null,
      },
    })
  }

  changeInvoicePaymentDateHandler(value) {
    return this.changeHandler({
      target: {
        name: 'invoicePaymentDate',
        value: value ? new Date(value) : null,
      },
    })
  }

  async saveHandler() {
    const {
      editInvoice,
      history,
      match,
    } = this.props;
    const { formData } = this.state;

    const elements = cloneDeep(initialFormData);
    const invoiceItem = elements.invoiceItems[0];

    for (let i = 0; i < formData.invoiceItems.length; i += 1) {
      elements.invoiceItems[i] = cloneDeep(invoiceItem);
    }

    const formValidity = validateUser(formData, {
      elements,
      isValid: true,
    });

    this.setState({
      formValidity,
      isFailed: false,
    });

    if (!formValidity.isValid) {
      return;
    }

    const response = await editInvoice(match.params.id, formData);

    if (response.error) {
      const { violations } = response.payload.response;

      if (violations) {
        violations.forEach((violation) => {
          formValidity.elements = updateData(formValidity.elements, violation.propertyPath, violation.message)
        })
      }

      this.setState({
        formValidity,
        isFailed: true,
      });

      return;
    }

    history.push(routes.invoices.path);
  }

  render() {
    const {
      clients,
      deleteInvoice,
      deleteInvoiceIsPending,
      getClientsIsPending,
      getInvoiceIsPending,
      getProjectsIsPending,
      getUserIsPending,
      editInvoiceIsPending,
      history,
      invoice,
      match,
      projects,
      user,
    } = this.props;
    const {
      formData,
      formValidity,
    } = this.state;

    let totalPrice = 0;
    if (formData && formData.invoiceItems) {
      totalPrice = formData.invoiceItems.reduce((total, invoiceItem) => {
        return total + invoiceItem.pricePerQuantityUnit * invoiceItem.quantity;
      }, 0);
    }

    return (
      <Layout
        actions={[
          <Button
            color="primary"
            disabled={!invoice || getInvoiceIsPending || editInvoiceIsPending}
            onClick={this.saveHandler}
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Uložit
          </Button>,
          <Button
            disabled={!invoice || getInvoiceIsPending || deleteInvoiceIsPending}
            onClick={() => {
              deleteInvoice(match.params.id).then(() => {
                history.push(routes.invoices.path);
              });
            }}
            startIcon={<DeleteIcon />}
            variant="contained"
          >
            Smazat
          </Button>,
        ]}
        title="Upravit fakturu"
      >
        {(getClientsIsPending || getProjectsIsPending || getUserIsPending) && (
          <CircularProgress />
        )}
        {clients && !getClientsIsPending && !getProjectsIsPending && !getUserIsPending && projects && user && (
          <Grid
            container
            spacing={5}
            style={{ gridAutoRows: '1fr' }}
          >
            <Grid item xs={12}>
              <Paper style={{ height: '100%' }}>
                <Box p={3}>
                  <TextField
                    autoFocus
                    error={Boolean(formValidity.elements.invoiceIdentifier)}
                    fullWidth
                    helperText={formValidity.elements.invoiceIdentifier}
                    id="invoiceIdentifier"
                    label="Číslo faktury"
                    margin="dense"
                    name="invoiceIdentifier"
                    onChange={this.changeHandler}
                    required
                    type="text"
                    value={formData.invoiceIdentifier ?? ''}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Paper style={{ height: '100%' }}>
                <Box p={3}>
                  <h2 className={styles.subheading}>
                    Dodavatel
                  </h2>
                  <TextField
                    autoFocus
                    error={Boolean(formValidity.elements.userInfo.firstName)}
                    fullWidth
                    helperText={formValidity.elements.userInfo.firstName}
                    id="userInfo.firstName"
                    label="Jméno"
                    margin="dense"
                    name="userInfo.firstName"
                    onChange={this.changeHandler}
                    required
                    type="text"
                    value={formData.userInfo.firstName ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.userInfo.lastName)}
                    fullWidth
                    helperText={formValidity.elements.userInfo.lastName}
                    id="userInfo.lastName"
                    label="Přijmení"
                    margin="dense"
                    name="userInfo.lastName"
                    onChange={this.changeHandler}
                    required
                    type="text"
                    value={formData.userInfo.lastName ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.userInfo.street)}
                    fullWidth
                    helperText={formValidity.elements.userInfo.street}
                    id="userInfo.street"
                    label="Ulice"
                    margin="dense"
                    name="userInfo.street"
                    onChange={this.changeHandler}
                    required
                    type="text"
                    value={formData.userInfo.street ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.userInfo.city)}
                    fullWidth
                    helperText={formValidity.elements.userInfo.city}
                    id="userInfo.city"
                    label="Město"
                    margin="dense"
                    name="userInfo.city"
                    onChange={this.changeHandler}
                    required
                    type="text"
                    value={formData.userInfo.city ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.userInfo.postalCode)}
                    fullWidth
                    helperText={formValidity.elements.userInfo.postalCode}
                    id="userInfo.postalCode"
                    label="PSČ"
                    margin="dense"
                    name="userInfo.postalCode"
                    onChange={this.changeHandler}
                    required
                    type="number"
                    value={formData.userInfo.postalCode ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.userInfo.cidNumber)}
                    fullWidth
                    helperText={formValidity.elements.userInfo.cidNumber}
                    id="userInfo.cidNumber"
                    label="IČ"
                    margin="dense"
                    name="userInfo.cidNumber"
                    onChange={this.changeHandler}
                    required
                    type="number"
                    value={formData.userInfo.cidNumber ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.userInfo.taxNumber)}
                    fullWidth
                    helperText={formValidity.elements.userInfo.taxNumber}
                    id="userInfo.taxNumber"
                    label="DIČ"
                    margin="dense"
                    name="userInfo.taxNumber"
                    onChange={this.changeHandler}
                    type="number"
                    value={formData.userInfo.taxNumber ?? ''}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item md={4} sm={6} xs={12} >
              <Paper style={{ height: '100%' }}>
                <Box p={3}>
                  <h2 className={styles.subheading}>
                    Odběratel
                  </h2>
                  <FormControl
                    error={Boolean(formValidity.elements.clientInfo.original)}
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="clientInfo.original">
                      Klient
                    </InputLabel>
                    <Select
                      fullWidth
                      id="clientInfo.original"
                      margin="dense"
                      name="clientInfo.original"
                      onChange={this.changeClientHandler}
                      required
                      value={formData.clientInfo.original ?? ''}
                    >
                      {clients.map((client) => (
                        <MenuItem
                          key={client.id}
                          value={client.id}
                        >
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {Boolean(formValidity.elements.clientInfo.original) && (
                      <FormHelperText>{formValidity.elements.clientInfo.original}</FormHelperText>
                    )}
                  </FormControl>
                  <TextField
                    autoFocus
                    error={Boolean(formValidity.elements.clientInfo.name)}
                    fullWidth
                    helperText={formValidity.elements.clientInfo.name}
                    id="clientInfo.name"
                    label="Jméno"
                    margin="dense"
                    name="clientInfo.name"
                    onChange={this.changeHandler}
                    required
                    type="text"
                    value={formData.clientInfo.name ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.clientInfo.street)}
                    fullWidth
                    helperText={formValidity.elements.clientInfo.street}
                    id="clientInfo.street"
                    label="Ulice"
                    margin="dense"
                    name="clientInfo.street"
                    onChange={this.changeHandler}
                    required
                    type="text"
                    value={formData.clientInfo.street ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.clientInfo.city)}
                    fullWidth
                    helperText={formValidity.elements.clientInfo.city}
                    id="clientInfo.city"
                    label="Město"
                    margin="dense"
                    name="clientInfo.city"
                    onChange={this.changeHandler}
                    required
                    type="text"
                    value={formData.clientInfo.city ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.clientInfo.postalCode)}
                    fullWidth
                    helperText={formValidity.elements.clientInfo.postalCode}
                    id="clientInfo.postalCode"
                    label="PSČ"
                    margin="dense"
                    name="clientInfo.postalCode"
                    onChange={this.changeHandler}
                    required
                    type="number"
                    value={formData.clientInfo.postalCode ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.clientInfo.cidNumber)}
                    fullWidth
                    helperText={formValidity.elements.clientInfo.cidNumber}
                    id="clientInfo.cidNumber"
                    label="IČ"
                    margin="dense"
                    name="clientInfo.cidNumber"
                    onChange={this.changeHandler}
                    type="number"
                    value={formData.clientInfo.cidNumber ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.clientInfo.taxNumber)}
                    fullWidth
                    helperText={formValidity.elements.clientInfo.taxNumber}
                    id="clientInfo.taxNumber"
                    label="DIČ"
                    margin="dense"
                    name="clientInfo.taxNumber"
                    onChange={this.changeHandler}
                    type="number"
                    value={formData.clientInfo.taxNumber ?? ''}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper style={{ height: '100%' }}>
                <Box p={3}>
                  <h2 className={styles.subheading}>
                    Platební údaje
                  </h2>
                  <FormControl
                    disabled
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="paymentType">
                      Způsob platby
                    </InputLabel>
                    <Select
                      fullWidth
                      id="paymentType"
                      margin="dense"
                      name="paymentType"
                      onChange={this.changeHandler}
                      required
                      value={0}
                    >
                      <MenuItem value={0}>
                        Převodem na účet
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    error={Boolean(formValidity.elements.userInfo.bankAccount)}
                    fullWidth
                    helperText={formValidity.elements.userInfo.bankAccount}
                    id="userInfo.bankAccount"
                    label="Číslo účtu"
                    margin="dense"
                    name="userInfo.bankAccount"
                    onChange={this.changeHandler}
                    required
                    type="text"
                    value={formData.userInfo.bankAccount ?? ''}
                  />
                  <TextField
                    error={Boolean(formValidity.elements.paymentVariableSymbol)}
                    fullWidth
                    helperText={formValidity.elements.paymentVariableSymbol}
                    id="paymentVariableSymbol"
                    label="Variabilní symbol"
                    margin="dense"
                    name="paymentVariableSymbol"
                    onChange={this.changeHandler}
                    required
                    type="number"
                    value={formData.paymentVariableSymbol ?? ''}
                  />
                  <Box mb={5} />
                  <KeyboardDatePicker
                    disableToolbar
                    error={Boolean(formValidity.elements.invoiceDate)}
                    fullWidth
                    helperText={formValidity.elements.invoiceDate}
                    variant="inline"
                    format="dd. MM. yyyy"
                    margin="normal"
                    id="invoiceDate"
                    label="Datum vystavení"
                    value={formData.invoiceDate}
                    onChange={this.changeInvoiceDateHandler}
                    required
                    KeyboardButtonProps={{
                      'aria-label': 'Změnit datum',
                    }}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    error={Boolean(formValidity.elements.invoiceDueDate)}
                    fullWidth
                    helperText={formValidity.elements.invoiceDueDate}
                    variant="inline"
                    format="dd. MM. yyyy"
                    margin="normal"
                    id="invoiceDueDate"
                    label="Datum splatnosti"
                    value={formData.invoiceDueDate}
                    onChange={this.changeInvoiceDueDateHandler}
                    required
                    KeyboardButtonProps={{
                      'aria-label': 'Změnit datum',
                    }}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    error={Boolean(formValidity.elements.invoicePaymentDate)}
                    fullWidth
                    helperText={formValidity.elements.invoicePaymentDate}
                    variant="inline"
                    format="dd. MM. yyyy"
                    margin="normal"
                    id="invoicePaymentDate"
                    label="Datum zaplacení"
                    value={formData.invoicePaymentDate}
                    onChange={this.changeInvoicePaymentDateHandler}
                    KeyboardButtonProps={{
                      'aria-label': 'Změnit datum',
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ height: '100%' }}>
                <Box p={3}>
                  <FormControl
                    disabled={projects.filter((p) => p.client.id === formData.clientInfo.original).length === 0}
                    error={typeof formValidity.elements.projectInfoItems === 'string'}
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="projectInfoItems">
                      Projekt
                    </InputLabel>
                    <Select
                      fullWidth
                      id="projectInfoItems"
                      margin="dense"
                      name="projectInfoItems"
                      multiple
                      onChange={this.changeProjectHandler}
                      required
                      value={formData.projectInfoItems.map((item) => item.original) ?? []}
                    >
                      {projects.filter((p) => p.client.id === formData.clientInfo.original).map((project) => (
                        <MenuItem
                          key={project.id}
                          value={project.id}
                        >
                          {project.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {Boolean(formValidity.elements.projectInfoItems) && (
                      <FormHelperText>{formValidity.elements.projectInfoItems}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table
                  aria-label="spanning table"
                  style={{ minWidth: 740 }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Množství</TableCell>
                      <TableCell>Množstevní jednotka</TableCell>
                      <TableCell>Popis</TableCell>
                      <TableCell>Cena za MJ</TableCell>
                      <TableCell>Cena celkem</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.invoiceItems.map((invoiceItem, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            error={Boolean(formValidity.elements.invoiceItems[index].quantity)}
                            fullWidth
                            helperText={formValidity.elements.invoiceItems[index].quantity}
                            id={`invoiceItems[${index}].quantity`}
                            label="Množství"
                            margin="dense"
                            name={`invoiceItems[${index}].quantity`}
                            onChange={this.changeHandler}
                            required
                            type="number"
                            value={invoiceItem.quantity ?? ''}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            error={Boolean(formValidity.elements.invoiceItems[index].quantityUnit)}
                            fullWidth
                            helperText={formValidity.elements.invoiceItems[index].quantityUnit}
                            id={`invoiceItems[${index}].quantityUnit`}
                            label="Jednotka"
                            margin="dense"
                            name={`invoiceItems[${index}].quantityUnit`}
                            onChange={this.changeHandler}
                            type="text"
                            value={invoiceItem.quantityUnit ?? ''}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            error={Boolean(formValidity.elements.invoiceItems[index].note)}
                            fullWidth
                            helperText={formValidity.elements.invoiceItems[index].note}
                            id={`invoiceItems[${index}].note`}
                            label="Popis"
                            margin="dense"
                            name={`invoiceItems[${index}].note`}
                            onChange={this.changeHandler}
                            required
                            type="text"
                            value={invoiceItem.note ?? ''}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            error={Boolean(formValidity.elements.invoiceItems[index].pricePerQuantityUnit)}
                            fullWidth
                            helperText={formValidity.elements.invoiceItems[index].pricePerQuantityUnit}
                            id={`invoiceItems[${index}].pricePerQuantityUnit`}
                            label="Cena za MJ"
                            margin="dense"
                            name={`invoiceItems[${index}].pricePerQuantityUnit`}
                            onChange={this.changeHandler}
                            required
                            type="number"
                            value={invoiceItem.pricePerQuantityUnit ?? ''}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            disabled
                            fullWidth
                            id={`invoiceItems[${index}].price`}
                            label="Cena celkem"
                            margin="dense"
                            name={`invoiceItems[${index}].price`}
                            type="number"
                            value={
                              ((invoiceItem.quantity ?? 0) * (invoiceItem.pricePerQuantityUnit ?? 0)).toFixed(2)
                            }
                          />
                        </TableCell>
                        <TableCell padding="none" size="small">
                          <IconButton
                            aria-label="Smazat"
                            disabled={formData.invoiceItems.length === 1}
                            onClick={() => this.deleteInvoiceItem(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Button
                          onClick={this.addInvoiceItem}
                          variant="contained"
                          startIcon={<AddIcon />}
                        >
                          Přidat
                        </Button>
                      </TableCell>
                      <TableCell align="right" variant="head">
                        Celkem {totalPrice.toFixed(2)} CZK
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </Layout>
    );
  }
}

InvoiceEditComponent.defaultProps = {
  clients: null,
  invoice: null,
  projects: null,
  user: null,
};

InvoiceEditComponent.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({
    cidNumber: PropTypes.number,
    city: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    postalCode: PropTypes.number.isRequired,
    street: PropTypes.string.isRequired,
    taxNumber: PropTypes.number,
  })),
  deleteInvoice: PropTypes.func.isRequired,
  deleteInvoiceIsPending: PropTypes.bool.isRequired,
  editInvoice: PropTypes.func.isRequired,
  editInvoiceIsPending: PropTypes.bool.isRequired,
  getClients: PropTypes.func.isRequired,
  getClientsIsPending: PropTypes.bool.isRequired,
  getInvoice: PropTypes.func.isRequired,
  getInvoiceIsPending: PropTypes.bool.isRequired,
  getProjects: PropTypes.func.isRequired,
  getProjectsIsPending: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserIsPending: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  invoice: PropTypes.shape({
    clientInfo: PropTypes.shape({
      cidNumber: PropTypes.number,
      city: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      postalCode: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      taxNumber: PropTypes.number,
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
    userInfo: PropTypes.shape({
      bankAccount: PropTypes.string.isRequired,
      cidNumber: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      postalCode: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      taxNumber: PropTypes.number,
    }).isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  user: PropTypes.shape({
    bankAccount: PropTypes.string.isRequired,
    cidNumber: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    lastName: PropTypes.string.isRequired,
    postalCode: PropTypes.number.isRequired,
    street: PropTypes.string.isRequired,
    taxNumber: PropTypes.number,
  }),
};

export default InvoiceEditComponent;

