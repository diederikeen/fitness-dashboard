import { styled } from "@stitches/react";
import { SubmitHandler } from "react-hook-form";
import format from "date-fns/format";
import * as yup from "yup";

import {
  useGetWeightQuery,
  useAddWeightMutation,
} from "../../common/utils/api";

import { useAuth } from "../../common/hooks/Auth";
import { StyledCard } from "../../common/components/StyledCard";
import {
  FormComposition,
  SchemaType,
} from "../../common/components/FormComposition";
import { skipToken } from "@reduxjs/toolkit/query";

const PageTitle = styled("h2", {
  fontSize: " 32px",
  textShadow: "0px 2px 4px rgba(0,0,0, .5)",
  color: "$primaryText",
  marginBottom: "$xlg",
});

interface FormFields {
  date: Date;
  weight: number;
}

const validationScheme = yup.object({
  weight: yup.number().positive().required().typeError("Weight is required"),
  date: yup.date().default(() => new Date()),
});

const formSchema: SchemaType = {
  fields: [
    {
      ns: "weight",
      type: "number",
      label: "Weight",
      inputProps: {
        step: "0.01",
      },
    },
    {
      ns: "date",
      type: "date",
      label: "Date",
      inputProps: {
        defaultValue: format(new Date(), "yyyy-LL-dd"),
      },
    },
  ],
  validation: validationScheme,
};

export function WeightTracker() {
  const auth = useAuth();
  const [addWeight] = useAddWeightMutation();

  const { data } = useGetWeightQuery(auth?.token || skipToken);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    return addWeight(data);
  };

  return (
    <>
      <PageTitle>Weight tracker</PageTitle>
      <StyledCard>
        <h3 color="$primaryText">Add new record</h3>
        <FormComposition<FormFields> schema={formSchema} submit={onSubmit} />
      </StyledCard>
      <div style={{ marginTop: "100px" }}>
        {data?.map((record, index) => (
          <p key={index}>
            {record.weight} - {format(new Date(record.date), "dd-LL-yyyy")}
          </p>
        ))}
      </div>
    </>
  );
}
