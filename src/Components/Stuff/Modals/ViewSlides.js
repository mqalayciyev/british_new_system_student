import React, { Component } from 'react'

export default class ViewSlides extends Component {
    render() {
        return (
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src={this.props.slide} class="w-100" alt={this.props.slide} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
