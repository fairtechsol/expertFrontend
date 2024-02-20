import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])/, "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/, "Password must contain at least four alphabet letters"
    )
    .matches(
      /^(?=.*\d.*\d.*\d.*\d)/, "Password must contain at least four numbers"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const addMatchValidation = () => {
  return Yup.object({
    minBet: Yup.string().required("Min Bet is required"),
    betfairMatchMaxBet: Yup.string().test(
      "moreThanMinBet",
      "must be more than Min Bet",
      function (value) {
        const minBet = this.parent.minBet;
        return minBet && value && parseFloat(value) > parseFloat(minBet);
      }
    ),
    betfairSessionMaxBet: Yup.string().test(
      "moreThanMinBet",
      "must be more than Min Bet",
      function (value) {
        const minBet = this.parent.minBet;
        return minBet && value && parseFloat(value) > parseFloat(minBet);
      }
    ),
    betfairBookmakerMaxBet: Yup.string().test(
      "moreThanMinBet",
      "must be more than Min Bet",
      function (value) {
        const minBet = this.parent.minBet;
        return minBet && value && parseFloat(value) > parseFloat(minBet);
      }
    ),
    marketTiedMatchMaxBet: Yup.string().test(
      "moreThanMinBet",
      "must be more than Min Bet",
      function (value) {
        const minBet = this.parent.minBet;
        return minBet && value && parseFloat(value) > parseFloat(minBet);
      }
    ),
    manualTiedMatchMaxBet: Yup.string().test(
      "moreThanMinBet",
      "must be more than Min Bet",
      function (value) {
        const minBet = this.parent.minBet;
        return minBet && value && parseFloat(value) > parseFloat(minBet);
      }
    ),
    completeMatchMaxBet: Yup.string().test(
      "moreThanMinBet",
      "must be more than Min Bet",
      function (value) {
        const minBet = this.parent.minBet;
        return minBet && value && parseFloat(value) > parseFloat(minBet);
      }
    ),
  });
};
