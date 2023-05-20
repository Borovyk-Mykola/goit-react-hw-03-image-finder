import React from "react"

class Searchbar extends React.Component {
    state = {
        value: '',
    }

    handleOnChange = e => {
        this.setState({value: e.currentTarget.value})
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmitForm(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({
            value: '',
        })
    }

    render() {
        return (
        <header className="searchbar">
            <form className="form" onSubmit={this.onSubmit}>
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>

                <input
                className="input"
                type="text"
                autocomplete="off"
                autofocus
                placeholder="Search images and photos"
                value={this.state.value}
                onChange={this.handleOnChange}
                />
            </form>
        </header>
        )
    }
}

export default Searchbar