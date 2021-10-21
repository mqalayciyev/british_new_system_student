import React, { Component } from 'react'

export default class ViewVideo extends Component {
    click = (e) => {
        if (e.target.classList.contains('hide-modal')) {
            this.props.removeComponent()
        }
    }
    render() {
        return (
            <div class="modal fade hide-modal" id="exampleModal" tabindex="-1" onClick={this.click} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog hide-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close hide-modal" data-dismiss="modal" aria-label="Close">
                                <span className="hide-modal" aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row justify-content-center">
                                <video width="320" height="240" src={this.props.media} controls />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
