import { styled } from "@stitches/react";

import { useGetWeightQuery } from "../../common/utils/api";
import { AddWeightForm } from "./components/AddWeightForm/AddWeightForm";

const PageTitle = styled("h2", {
  fontSize: " 32px",
  textShadow: "0px 2px 4px rgba(0,0,0, .5)",
  color: "$primaryText",
  marginBottom: "$xlg",
});

export function WeightTracker() {
  const { data } = useGetWeightQuery();

  return (
    <>
      <PageTitle>Weight tracker</PageTitle>
      <AddWeightForm />
      {data?.map((result, index) => (
        <div key={index}>
          {result.date} — {result.weight}
        </div>
      ))}
    </>
  );
}
