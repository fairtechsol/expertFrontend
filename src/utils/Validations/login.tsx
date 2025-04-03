import * as Yup from "yup";
import { eventWiseMatchData } from "../Constants";

export const loginValidationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
export const notificationvalidationSchema = Yup.object({
  value: Yup.string().required("Field is required"),
});
export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
      "Password must contain at least four alphabet letters"
    )
    .matches(
      /^(?=.*\d.*\d.*\d.*\d)/,
      "Password must contain at least four numbers"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});
export const changePasswordValidation = (item: any) => {
  return Yup.object({
    oldPassword: Yup.string()
      .required("Old Password is required")
      .test({
        name: "oldPassword",
        message: "Old Password Does Not Match",
        test: async function (value: any) {
          if (value) {
            try {
              return item;
            } catch (error: any) {
              console.log(error);
            }
          }
          return true;
        },
      }),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
        "Password must contain at least four alphabet letters"
      )
      .matches(
        /^(?=.*\d.*\d.*\d.*\d)/,
        "Password must contain at least four numbers"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Confirm password is required"),
  });
};
export const addMatchValidation = (isManual: boolean, gameType: any, matchTypeList: any) => {
  return Yup.object({
    minBet: Yup.string().required("Min Bet is required"),
    ...(gameType && eventWiseMatchData[gameType]
      ? Object.fromEntries(
          Object.entries(eventWiseMatchData[gameType]).flatMap(([keys, items]) =>
            items
              .filter((item: any) =>
                matchTypeList[item.marketIdKey]?.marketId !== null &&
                matchTypeList[item.marketIdKey]?.marketId !== undefined
              )
              .map((item) => {
                return([
                item.matchType.toString(),
                Yup.object({
                  maxBet: Yup.string().test(
                    "moreThanMinBet",
                    "must be more than Min Bet",
                    function (value, context) {
                                            const minBet = context?.from?.[1]?.value?.minBet;
                      if (isManual && keys === "market") {
                        return true;
                      }
                      return minBet && value && parseFloat(value) > parseFloat(minBet);
                    }
                  ),
                }),
              ])})
          )
        )
      : {}),
      ...(gameType === "cricket"
      ? {
          betfairSessionMaxBet: Yup.string().test(
            "moreThanMinBet",
            "must be more than Min Bet",
            function (value) {
              const minBet = this.parent.minBet;
              return minBet && value && parseFloat(value) > parseFloat(minBet);
            }
          ),
        }
      : {}),
  });
};

export const addManualMatchBettingValidation = () =>
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
    minBet: Yup.number()
      .min(0, "Minimum bet must be greater than or equal to 0")
      .required("Minimum bet is required"),
    maxBet: Yup.number()
      .min(Yup.ref("minBet"), "Maximum bet must be greater than or equal to minimum bet")
      .required("Maximum bet is required"),
    betLimit: Yup.number()
      .min(0, "Bet limit must be greater than or equal to 0")
      .required(),
    exposureLimit: Yup.number()
      .min(0, "Exposure limit must be greater than or equal to 0")
      .required(),
    isCommissionActive: Yup.boolean().required("Commission status is required"),
    runners: Yup.array()
      .of(
        Yup.object().shape({
          matchId: Yup.mixed().required("Match ID is required"),
          metadata: Yup.object().notRequired(),
          runnerName: Yup.string().required("Runner name is required"),
          selectionId: Yup.string().required("Selection ID is required"),
          sortPriority: Yup.number()
            .integer("Sort priority must be an integer")
            .min(0, "Sort priority must be greater than or equal to 0")
            .required("Sort priority is required"),
        })
      )
      .min(1, "At least one runner is required")
  });