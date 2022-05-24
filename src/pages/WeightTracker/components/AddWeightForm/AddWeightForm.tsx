import * as yup from "yup";
import format from "date-fns/format";

import { FormComposition } from "../../../../common/components/FormComposition";
import { StyledCard } from "../../../../common/components/StyledCard";
import {
  useAddWeightMutation,
  WeightPayload,
} from "../../../../common/utils/api";
import { SubmitHandler } from "react-hook-form";

const validationScheme = yup.object({
  weight: yup.number().positive().required().typeError("Weight is required"),
  date: yup
    .date()
    .max(new Date(), "Date is wrong")
    .default(() => new Date()),
});

const formSchema = {
  fields: {
    weight: {
      type: "number",
      label: "Weight",
      inputProps: {
        step: "0.01",
        min: 0,
      },
    },
    date: {
      type: "date",
      label: "Date",
      inputProps: {
        defaultValue: format(new Date(), "yyyy-LL-dd"),
      },
    },
  },
  validation: validationScheme,
};

export function AddWeightForm() {
  const [addWeight] = useAddWeightMutation();
  const onSubmit: SubmitHandler<WeightPayload> = (data) => {
    return addWeight(data);
  };

  return (
    <StyledCard>
      <h3 color="$primaryText">Add new record</h3>
      <FormComposition schema={formSchema} submit={onSubmit} />
    </StyledCard>
  );
}
