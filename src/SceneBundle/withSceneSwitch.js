import PropTypes from "prop-types";
import React, { Component, createElement } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "./redux/actions";

export default function withSceneSwitch(SceneBundle) {
  class SceneSwitchWrapper extends Component {
    static contextTypes = {
      sceneSwitchKey: PropTypes.string
    };
    mapDispatchToProps = dispatch => {
      return bindActionCreators(actions, dispatch);
    };

    mapStateToProps = state => {
      return {
        PlayingScene: state[this.context.sceneSwitchKey].PlayingScene,
        sceneNo: state[this.context.sceneSwitchKey].sceneNo
      };
    };

    render() {
      return createElement(
        connect(this.mapStateToProps, this.mapDispatchToProps)(
          withRouter(this.props.Component)
        ),
        this.props.originProps
      );
    }
  }

  return props =>
    <SceneSwitchWrapper Component={SceneBundle} originProps={props} />;
}
