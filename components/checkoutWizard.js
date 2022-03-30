import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import useStyles from "../utils/styles"

const CheckoutWizard = ({activeStep}) => {
  const classes = useStyles()
  return (
    <Stepper className={classes.transparentBackground}  activeStep={activeStep} alternativeLabel>
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutWizard;
