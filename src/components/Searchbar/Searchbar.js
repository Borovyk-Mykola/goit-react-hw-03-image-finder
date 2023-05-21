import React from "react"

class Searchbar extends React.Component {
    state = {
        value: '',
    }

    handleOnChange = e => {
        this.setState({value: e.currentTarget.value})
    };

    onSubmitForm = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({
            value: '',
        })
    }

    render() {
        return (
        
            <form className="form" onSubmitForm={this.onSubmitForm}>
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>

                <input
                className="input"
                type="text"
                style={{autocomplete: 'off',
                        autofocus: 'true'}}
                placeholder="Search images and photos"
                value={this.state.value}
                onChange={this.handleOnChange}
                />
            </form>
        
        )
    }
}

export default Searchbar