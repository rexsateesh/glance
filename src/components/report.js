import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

class Report extends React.Component {

    constructor(props) {
        super(props);

        // Setting state items
        this.state = {
            file: null,
            ndays: 7,
            isDisplayTable: false,
            tableRows: [],
            apiError: '',
            page: 0,
            rowsPerPage: 5
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeDays = this.onChangeDays.bind(this);
    }

    /**
     * Handling page change event
     * @returns {void}
     */
    handleChangePage = (event, newPage) => this.setState({ page: newPage });

    /**
     * Handle rows per page event
     * @returns {void}
     */
    handleChangeRowsPerPage = (event) => this.setState({
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0
    });

    /**
     * Handling submit form
     * @param {event} e
     * @returns {void}
     */
    onFormSubmit(e) {
        e.preventDefault()

        const url = 'http://localhost:3000/reports';
        const formData = new FormData();
        formData.append('csv', this.state.file);
        formData.append('ndays', this.state.ndays)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(url, formData, config)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        tableRows: response.data.data,
                        isDisplayTable: true
                    });
                } else {
                    this.setState({
                        apiError: 'Oops, Something went wrong'
                    });
                };
            })
            .catch(err => {
                this.setState({
                    apiError: 'Oops, Something went wrong'
                });
            })
    }

    /**
     * Handling file change event
     * @param {event} e
     * @returns {void}
     */
    onChangeFile(e) {
        this.setState({ file: e.target.files[0] })
    }

    /**
     * Handling no of days event
     * @param {event} e
     * @returns {void}
     */
    onChangeDays(e) {
        this.setState({ ndays: e.target.value })
    }

    /**
     * Rendering UI
     * @returns {void}
     */
    render() {
        const {
            page,
            rowsPerPage,
            isDisplayTable,
            apiError,
            tableRows
        } = this.state;

        return (
            <>
                <Container component="main" maxWidth="xs">
                    <br />
                    <Typography component="h1" variant="h5">
                        Generate Report
                    </Typography>
                    <form onSubmit={this.onFormSubmit} noValidate>
                        <br />
                        <input type="file" onChange={this.onChangeFile} />
                        <br /><br />
                        <input type="number" onChange={this.onChangeDays} style={{ padding: '10px', width: '100%' }} defaultValue={this.state.ndays} />
                        <br /><br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Upload</Button>
                    </form>
                    <br /><br />
                    {(apiError !== '' && isDisplayTable === false) && <Alert severity="error">{apiError}</Alert>}
                </Container>

                {isDisplayTable && <Container component="main" maxWidth="md">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Traffic</TableCell>
                                    <TableCell align="right">Trend</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : tableRows
                                ).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                        <TableCell align="right">{row.traffic}</TableCell>
                                        <TableCell align="right">{row.trend}</TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={this.state.tableRows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Container>}
            </>
        )
    }
}

export default Report;