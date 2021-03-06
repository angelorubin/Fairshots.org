import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    getFeatures
} from "../../actions";
import Featured from "../../components/featured";
/**
 *
 */
class FeatureHolder extends Component {
    componentDidMount() {
        const { mainFeatures, doGetFeatures } = this.props;
        if (!mainFeatures.photographers) { doGetFeatures() }
    }


    render() {
        return (
            <Featured feats={this.props.mainFeatures} />
        );
    }
}

const mapStateToProps = state => ({
    mainFeatures: state.mainFeatures,
});
const mapDispatchToProps = dispatch => ({
    doGetFeatures: () => dispatch(getFeatures()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeatureHolder));
