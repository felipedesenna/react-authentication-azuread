import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import { AiOutlineUserAdd } from "react-icons/ai";


const headerProps = {
    icon: <AiOutlineUserAdd className="icon" />,
    title: 'Criar Usuário',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/create'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component {

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value="" onChange="{e => this.updateField(e)}" placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Sobrenome</label>
                            <input type="text" className="form-control" name="email" value="" onChange="{e => this.updateField(e)}" placeholder="Digite o sobrenome..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Usuário</label>
                            <input type="text" className="form-control" name="name" value="" onChange="{e => this.updateField(e)}" placeholder="Usuário" readOnly/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Unidade</label>
                            <select id="inputState" class="form-control">
                                <option selected>Selecione...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Ticket</label>
                            <input type="text" className="form-control" name="name" value="" onChange="{e => this.updateField(e)}" placeholder="Digite o ticket..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Solicitante</label>
                            <select id="inputState" class="form-control">
                                <option selected>Selecione...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Departamento</label>
                            <select id="inputState" class="form-control">
                                <option selected>Selecione...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                    {/* <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" name="email" value="" onChange="{e => this.updateField(e)}" placeholder="Digite o e-mail..." />
                        </div>
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Observações</label>

                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Informações complementares..."></textarea>
                        </div>
                    </div>
                    {/* <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" name="email" value="" onChange="{e => this.updateField(e)}" placeholder="Digite o e-mail..." />
                        </div>
                    </div> */}
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick="{e => this.save(e)}">
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick="{e => this.clear(e)}">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}