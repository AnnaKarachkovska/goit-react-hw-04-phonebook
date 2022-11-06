import { Component } from "react";
import Notiflix from 'notiflix';

class ErrorBoundary extends Component {
    state = {error: ''};

    componentDidCatch(error) {
        if (error) {
            this.setState({error: error.message});
            Notiflix.Notify.failure(`Error!`);
        }
    }

    render() {
        const {children} = this.props;
        const {error} = this.state;
        return (
            <>
            {error ? (
            <h2>Ooops, something is wrong. Try again later.</h2>
            ) : (
            children
            )}
            </>
        )
    }
}

export default ErrorBoundary;