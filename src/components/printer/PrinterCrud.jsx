import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import * as Hi  from "react-icons/hi";


const headerProps = {
    icon: <Hi.HiOutlinePrinter className="icon"/>,
    title: 'Impressoras',
    subtitle: 'Cadastro de equipamentos'
}

const baseUrl = 'http://localhost:3333/printers'
const initialState = {
    printer: { sn: '', model: '', manufacturer: '', type: '' },
    list: []
}

export default class PrinterCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
            console.log(resp.data)
        }
        )
    }

    clear() {
        this.setState({ printer: initialState.printer })
    }

    save() {
        const printer = this.state.printer
        const method = printer.id ? 'put' : 'post'
        const url = printer.id ? `${baseUrl}/${printer.id}` : baseUrl
        axios[method](url, printer)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ printer: initialState.printer, list })
            })
    }

    getUpdatedList(printer, add = true) {
        const list = this.state.list.filter(u => u.id !== printer.id)
        if (add) list.unshift(printer)
        return list
    }

    updateField(event) {
        const printer = { ...this.state.printer }
        printer[event.target.name] = event.target.value
        this.setState({ printer })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>S/N</label>
                            <input type="text" className="form-control" name="sn" value={this.state.printer.sn} onChange={e => this.updateField(e)} placeholder="Digite o número de série..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Modelo</label>
                            <input type="text" className="form-control" name="model" value={this.state.printer.model} onChange={e => this.updateField(e)} placeholder="Digite o modelo..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Fabricante</label>
                            <input type="text" className="form-control" name="manufacturer" value={this.state.printer.manufacturer} onChange={e => this.updateField(e)} placeholder="Digite o fabricante..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Tipo</label>
                            <input type="text" className="form-control" name="type" value={this.state.printer.type} onChange={e => this.updateField(e)} placeholder="Digite o tipo..." />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(printer) {
        this.setState({ printer })
    }

    remove(printer) {
        axios.delete(`${baseUrl}/${printer.id}`).then(resp => {
            const list = this.getUpdatedList(printer, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>S/N</th>
                        <th>Modelo</th>
                        <th>Fabricante</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(printer => {
            return (
                <tr key={printer.id}>
                    <td>{printer.id}</td>
                    <td>{printer.sn}</td>
                    <td>{printer.model}</td>
                    <td>{printer.manufacturer}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(printer)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(printer)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}