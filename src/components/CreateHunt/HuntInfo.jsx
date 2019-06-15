import React from "react";
import PropTypes from "prop-types";
import FormExpansion from "./FormExpansion";
import { HuntInfoError } from "./error";
import HuntInfoForm from "./HuntInfoForm";

function HuntInfo(props) {
  const { infoFormError, ...restProps } = props;

  return (
    <FormExpansion inError={infoFormError.inError} label="Hunt Info">
      <HuntInfoForm {...restProps} infoFormError={infoFormError} />
    </FormExpansion>
  );
}

HuntInfo.propTypes = {
  infoFormError: PropTypes.instanceOf(HuntInfoError).isRequired
};

export default HuntInfo;
